<template>
  <div :class="$style.renderElement" @click="$emit('select-element')">
    <div ref="package"></div>
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

  mounted () {
    const Package = Vue.extend(require(`../packages/${this.element.package}`).default)
    new Package().$mount(this.$refs.package)
  }
}
</script>

<style lang="scss" module>
.render-element {
  display: inline-block;
  :global {

  }
}
</style>
