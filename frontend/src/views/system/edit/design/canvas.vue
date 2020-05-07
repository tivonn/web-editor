<template>
  <div
    ref="canvas"
    class="canvas"
    :class="$style.canvas"
    @mousedown="mousedownCanvas"
    @click.capture="captureCanvas">
    <div
      ref="container"
      class="container"
      :style="getContainerStyle">
      <element-list
        :elements="elements"
        @click="clickElementList"
        @mousemove="mousemoveElementList">
      </element-list>
    </div>
  </div>
</template>

<script>
import ElementList from '@/components/ElementList'
import Mousetrap from 'mousetrap'
import { mapGetters } from 'vuex'
import utils from '@/utils/index.js'

export default {
  name: 'DesignCanvas',

  data () {
    return {
      isCaptureElement: false,
      isKeydownCtrl: false,
      hoverElements: []
    }
  },

  computed: {
    ...mapGetters([
      'system',
      'elements',
      'activeElements'
    ]),

    getContainerStyle () {
      const { width, height } = this.system
      return {
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%'
      }
    }
  },

  provide () {
    return {
      getElementClass: this.getElementClass,
      getElementStyle: this.getElementStyle
    }
  },

  mounted () {
    this.init()
  },

  beforeDestroy () {
    this.reset()
  },

  methods: {
    init () {
      this.initMousetrap()
    },

    initMousetrap () {
      Mousetrap.bind('ctrl', () => this.toggleKeydownCtrl(true), 'keydown')
      Mousetrap.bind('ctrl', () => this.toggleKeydownCtrl(false), 'keyup')
      Mousetrap.bind('del', this.deleteElement)
    },

    mousedownCanvas (e) {
      const elementEl = utils.getPath(e).find(element => utils.containClass(element, 'element-item'))
      const isDragElement = !!elementEl
      if (isDragElement) {
        const mousedownTime = utils.getDate().getTime()
        const id = Number(elementEl.id)
        const element = utils.deepQuery(this.elements, id)
        const xCoordinateKey = 'data.style.position.xCoordinate'
        const yCoordinateKey = 'data.style.position.yCoordinate'
        utils.drag(e, this.$refs.canvas, (offsetX, offsetY) => {
          this.isCaptureElement = true
          this.$store.dispatch('updateElement', {
            id,
            [xCoordinateKey]: String(utils.clamp(
              Number(utils.getValueFromObj(element, xCoordinateKey)) + offsetX,
              0,
              this.$refs.container.clientWidth - Number(utils.getValueFromObj(element, 'data.style.size.width')) - 1
            )),
            [yCoordinateKey]: String(utils.clamp(
              Number(utils.getValueFromObj(element, yCoordinateKey)) + offsetY,
              0,
              this.$refs.container.clientHeight - Number(utils.getValueFromObj(element, 'data.style.size.height')) - 1
            ))
          })
        }, (e) => {
          const mouseupTime = utils.getDate().getTime()
          // 快速点击或鼠标在画布外部释放
          if (mouseupTime - mousedownTime < 100 || utils.getPath(e).every(element => !utils.containClass(element, 'canvas'))) {
            this.isCaptureElement = false
          }
        })
      } else {
        utils.drag(e, this.$refs.canvas, (offsetX, offsetY) => {
          this.$refs.canvas.scrollLeft -= offsetX
          this.$refs.canvas.scrollTop -= offsetY
        })
      }
    },

    captureCanvas (e) {
      if (this.isCaptureElement) {
        this.isCaptureElement = false
        e.stopPropagation()
      }
    },

    toggleKeydownCtrl (isKeyDownCtrl) {
      this.isKeydownCtrl = isKeyDownCtrl
    },

    getElementClass (element) {
      return {
        hover:
          this.hoverElements.some(hoverElement => Number(hoverElement.id) === element.id) ||
          this.activeElements.some(activeElement =>
            Object.keys(utils.deepQuery(element, Number(activeElement.id))).length
          ),
        active: this.activeElements.some(activeElement => activeElement.id === element.id)
      }
    },

    getElementStyle (element) {
      const { xCoordinate, yCoordinate } = element.data.style.position
      const hasParent = !!element.parentId
      let parentPosition
      if (hasParent) {
        parentPosition = utils.getValueFromObj(utils.deepQuery(this.elements, element.parentId), 'data.style.position')
      }
      return {
        // 1px为边框
        left: `${Number(xCoordinate) - (hasParent ? Number(parentPosition.xCoordinate) + 1 : 0)}px`,
        top: `${Number(yCoordinate) - (hasParent ? Number(parentPosition.yCoordinate) + 1 : 0)}px`
      }
    },

    clickElementList (e) {
      const elementEl = utils.getPath(e).find(element => utils.containClass(element, 'element-item'))
      const isSelectElement = !!elementEl
      let activeElements
      if (isSelectElement) {
        const id = Number(elementEl.id)
        const element = utils.deepQuery(this.elements, id)
        const isSelected = this.activeElements.some(activeElement => activeElement.id === element.id)
        if (isSelected) {
          activeElements = this.activeElements.filter(activeElement => activeElement.id !== element.id)
        } else {
          activeElements = this.isKeydownCtrl ? this.activeElements.concat([element]) : [element]
        }
      } else {
        activeElements = []
      }
      this.$store.dispatch('setActiveElements', activeElements)
    },

    mousemoveElementList: utils.throttle(function (e) {
      this.hoverElements = utils.getPath(e).filter(element => utils.containClass(element, 'element-item'))
    }, 100),

    deleteElement () {
      // todo 组合情况
      this.$store.dispatch('setElements',
        this.elements
          .filter(element =>
            this.activeElements
              .every(activeElement => activeElement.id !== element.id)
          )
      )
      this.$store.dispatch('setActiveElements', [])
    },

    reset () {
      this.resetMousetrap()
    },

    resetMousetrap () {
      Mousetrap.reset()
    }
  },

  components: {
    ElementList
  }
}
</script>

<style lang="scss" module>
.canvas {
  width: calc(100% - 400px);
  height: 100%;
  display: inline-block;
  border-left: 1px solid $--border-color-base;
  border-right: 1px solid $--border-color-base;
  vertical-align: middle;
  overflow: auto;
  cursor: grab;
  &:global(.dragging) {
    cursor: grabbing;
  }
  :global {
    .container {
      position: relative;
      border: 10px solid #55c580;
    }
    .element-item {
      position: absolute;
      border: 1px dashed transparent;
      &.hover {
        border-color: $--border-color-base;
      }
      &.active {
        border-color: $--border-color-dark;
      }
      &.dragging {
        cursor: grabbing;
      }
    }
  }
}
</style>
