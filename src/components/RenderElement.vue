<template>
  <div :class="$style.renderElement">
    {{element.name}}
  </div>
</template>

<script>
export default {
  name: 'RenderElement',

  props: {
    element: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" module>
.render-element {
  :global {

  }
}
</style>
