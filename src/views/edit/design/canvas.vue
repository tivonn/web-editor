<template>
  <div
    ref="canvas"
    :class="$style.canvas"
    @mousedown="mousedownCanvas">
    <div
      ref="container"
      class="container"
      :style="getContainerStyle">
      <render-element
        v-for="(element, index) in elements"
        :key="element.id"
        ref="elements"
        :element="element"
        class="render-element"
        :class="getElementClass(element)"
        :style="getElementStyle(element)"
        @click="selectElement(element)"
        @mousedown.stop="$event => mousedownElement($event, element, index)">
      </render-element>
    </div>
  </div>
</template>

<script>
import RenderElement from '@/components/RenderElement.vue'
import { mapGetters } from 'vuex'
import tools from '@/utils/tools.js'

export default {
  name: 'DesignCanvas',

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

  methods: {
    init () {
      this.getPage()
    },

    getPage () {
      const { sid, pid } = this.$route.params
      const elements = JSON.parse(localStorage.getItem(`${sid}-${pid}`) || [])
      this.$store.dispatch('setElements', elements)
    },

    mousedownCanvas (e) {
      tools.drag(e, this.$refs.canvas, (offsetX, offsetY) => {
        this.$refs.canvas.scrollLeft -= offsetX
        this.$refs.canvas.scrollTop -= offsetY
      })
    },

    getElementClass (element) {
      return {
        active: this.activeElements.some(activeElement => activeElement.id === element.id)
      }
    },

    getElementStyle (element) {
      const { xCoordinate, yCoordinate } = element.data.style.position
      return {
        left: `${xCoordinate || 0}px`,
        top: `${yCoordinate || 0}px`
      }
    },

    selectElement (element) {
      // todo single and multiple
      this.$store.dispatch('setActiveElements', [element])
    },

    mousedownElement (e, element, index) {
      tools.drag(e, this.$refs.elements[index].$el, (offsetX, offsetY) => {
        const { id } = element
        const xCoordinateKey = 'data.style.position.xCoordinate'
        const yCoordinateKey = 'data.style.position.yCoordinate'
        this.$store.dispatch('updateElement', {
          id,
          [xCoordinateKey]: String(tools.clamp(
            Number(tools.getValueFromObj(element, xCoordinateKey)) + offsetX,
            0,
            this.$refs.container.clientWidth - Number(tools.getValueFromObj(element, 'data.style.size.width'))
          )),
          [yCoordinateKey]: String(tools.clamp(
            Number(tools.getValueFromObj(element, yCoordinateKey)) + offsetY,
            0,
            this.$refs.container.clientHeight - Number(tools.getValueFromObj(element, 'data.style.size.height'))
          ))
        })
      })
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
    cursor: grabbing; // todo 会不一直生效
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
