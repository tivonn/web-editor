<template>
  <div :class="$style.canvas">
    <div class="container">
      <render-element
        v-for="element in elements"
        :key="element.id"
        :element="element"
        class="render-element"
        :class="getElementClass(element)"
        :style="getElementStyle(element)"
        @select-element="selectElement(element)">
      </render-element>
    </div>
  </div>
</template>

<script>
import RenderElement from '@/components/RenderElement.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'DesignCanvas',

  computed: {
    ...mapGetters([
      'elements',
      'activeElements'
    ])
  },

  methods: {
    getElementClass (element) {
      return {
        active: this.activeElements.some(activeElement => activeElement.id === element.id)
      }
    },

    getElementStyle (element) {
      const { xCoordinate, yCoordinate } = element.data.style.position
      return {
        left: `${xCoordinate || 0}px`, // 区分预览和打包模式
        top: `${yCoordinate || 0}px`
      }
    },

    selectElement (element) {
      // todo single and multiple
      this.$store.dispatch('setActiveElements', [element])
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
  :global {
    .container {
      width: 1366px;
      height: 100%;
      position: relative;
    }
    .render-element {
      position: absolute;
      border: 1px dashed transparent;
      &.active {
        border: 1px dashed $--color-border;
      }
    }
  }
}
</style>
