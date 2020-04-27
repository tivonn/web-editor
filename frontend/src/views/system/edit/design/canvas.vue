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
      <render-element
        v-for="element in elements"
        :key="element.id"
        ref="elements"
        :element="element"
        class="render-element"
        :class="getElementClass(element)"
        :style="getElementStyle(element)"
        @click="selectElement(element)">
      </render-element>
    </div>
  </div>
</template>

<script>
import RenderElement from '@/components/RenderElement.vue'
import Mousetrap from 'mousetrap'
import { mapGetters } from 'vuex'
import tools from '@/utils/tools.js'

export default {
  name: 'DesignCanvas',

  data () {
    return {
      isCaptureElement: false
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
      Mousetrap.bind('del', this.deleteElement)
    },

    mousedownCanvas (e) {
      const elementEl = tools.getPath(e).find(element => tools.containClass(element, 'render-element'))
      const isDragElement = !!elementEl
      if (isDragElement) {
        const mouseDownTime = tools.getDate().getTime()
        const id = Number(elementEl.id)
        const element = this.elements.find(element => element.id === id)
        const xCoordinateKey = 'data.style.position.xCoordinate'
        const yCoordinateKey = 'data.style.position.yCoordinate'
        tools.drag(e, this.$refs.canvas, (offsetX, offsetY) => {
          this.isCaptureElement = true
          this.$store.dispatch('updateElement', {
            id,
            [xCoordinateKey]: String(tools.clamp(
              Number(tools.getValueFromObj(element, xCoordinateKey)) + offsetX,
              0,
              this.$refs.container.clientWidth - Number(tools.getValueFromObj(element, 'data.style.size.width')) - 1
            )),
            [yCoordinateKey]: String(tools.clamp(
              Number(tools.getValueFromObj(element, yCoordinateKey)) + offsetY,
              0,
              this.$refs.container.clientHeight - Number(tools.getValueFromObj(element, 'data.style.size.height')) - 1
            ))
          })
        }, (e) => {
          const mouseUpTime = tools.getDate().getTime()
          // 快速点击或鼠标在画布外部释放
          if (mouseUpTime - mouseDownTime < 100 || tools.getPath(e).every(element => !tools.containClass(element, 'canvas'))) {
            this.isCaptureElement = false
          }
        })
      } else {
        tools.drag(e, this.$refs.canvas, (offsetX, offsetY) => {
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

    getElementClass (element) {
      return {
        active: this.activeElements.some(activeElement => activeElement.id === element.id)
      }
    },

    getElementStyle (element) {
      const { xCoordinate, yCoordinate } = element.data.style.position
      return {
        left: `${xCoordinate}px`,
        top: `${yCoordinate}px`
      }
    },

    selectElement (element) {
      // todo single and multiple
      this.$store.dispatch('setActiveElements', [element])
    },

    deleteElement () {
      this.$store.dispatch('setElements', this.elements.filter(element => this.activeElements.every(activeElement => activeElement.id !== element.id)))
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
    RenderElement
  }
}
</script>

<style lang="scss" module>
.canvas {
  width: calc(100% - 400px);
  height: 100%;
  display: inline-block;
  border-left: 1px solid $--color-border;
  border-right: 1px solid $--color-border;
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
    .render-element {
      position: absolute;
      border: 1px dashed transparent;
      &.active {
        border: 1px dashed $--color-border;
      }
      &.dragging {
        cursor: grabbing;
      }
    }
  }
}
</style>
