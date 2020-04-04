<template>
  <div :class="$style.canvas">
    <render-element
      v-for="element in elements"
      :key="element.id"
      :element="element">
    </render-element>
  </div>
</template>

<script>
import RenderElement from '@/components/RenderElement'
import { mapGetters } from 'vuex'

export default {
  name: 'DesignCanvas',

  computed: {
    ...mapGetters([
      'elements'
    ])
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
  vertical-align: middle;
  :global {

  }
}
</style>
