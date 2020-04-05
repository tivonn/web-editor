<template>
  <div ref="package" :class="$style.renderElement">
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
    const Pacakge = Vue.extend(require(`../packages/${this.element.package}`).default)
    new Pacakge().$mount(this.$refs.package)
  }
}
</script>

<style lang="scss" module>
.render-element {
  :global {

  }
}
</style>
