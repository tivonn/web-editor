<template>
  <div
    :id="element.id"
    :class="$style.renderElement"
    :style="getElementStyle"
    @click="$emit('click', $event)">
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
      const { width, height } = this.element.data.style.size
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.mountElement()
    },

    mountElement () {
      const { value, data } = this.element
      const { style, content, interact } = data
      const Package = Vue.extend(require(`../packages/${value}/index.vue`).default)
      new Package({
        propsData: {
          ...style,
          ...content,
          ...interact
        }
      }).$mount(this.$refs.element)
    }
  }
}
</script>

<style lang="scss" module>
.render-element {
  display: inline-block;
}
</style>
