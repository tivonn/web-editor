<template>
  <div :class="$style.design">
    <design-sidebar></design-sidebar>
    <design-canvas></design-canvas>
    <design-config></design-config>
  </div>
</template>

<script>
import DesignSidebar from '@/views/system/edit/design/sidebar.vue'
import DesignCanvas from '@/views/system/edit/design/canvas.vue'
import DesignConfig from '@/views/system/edit/design/config/index.vue'

export default {
  name: 'Design',

  components: {
    DesignSidebar,
    DesignCanvas,
    DesignConfig
  }
}
</script>

<style lang="scss" module>
.design {
  width: 100%;
  height: 100%;
}
</style>
