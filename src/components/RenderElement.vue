<template>
  <div :class="$style.renderElement" :style="getElementStyle" @click="$emit('select-element')">
    <div ref="element"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'RenderElement',

  props: {
    element: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  computed: {
    getElementStyle () {
      const { width, height, fontSize } = this.element.data.style.size
      const { xCoordinate, yCoordinate } = this.element.data.style.position
      return {
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${fontSize}px`,
        left: `${xCoordinate || 0}px`, // 区分预览和打包模式
        top: `${yCoordinate || 0}px`
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      const Package = Vue.extend(require(`../packages/${this.element.value}`).default)
      new Package().$mount(this.$refs.element)
    }
  }
}
</script>

<style lang="scss" module>
.render-element {
  display: inline-block;
  position: absolute;
}
</style>
