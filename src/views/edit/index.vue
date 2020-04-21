<template>
  <div :class="$style.edit">
    <edit-header></edit-header>
    <div class="body">
      <edit-sidebar></edit-sidebar>
      <div class="main">
        <template v-if="isDesign">
          <design-canvas></design-canvas>
          <design-config></design-config>
        </template>
        <develop-code v-else></develop-code>
      </div>
    </div>
  </div>
</template>

<script>
import EditHeader from '@/views/edit/header.vue'
import EditSidebar from '@/views/edit/sidebar.vue'
import DesignCanvas from '@/views/edit/design/canvas.vue'
import DesignConfig from '@/views/edit/design/config/index.vue'
import DevelopCode from '@/views/edit/develop/code.vue'

export default {
  name: 'Edit',

  data () {
    return {
      isDesign: true
    }
  },

  components: {
    EditHeader,
    EditSidebar,
    DesignCanvas,
    DesignConfig,
    DevelopCode
  }
}
</script>

<style lang="scss" module>
.edit {
  width: 100%;
  height: 100%;
  user-select: none;
  :global {
    .body {
      width: 100%;
      height: calc(100% - 48px);
    }
    .main {
      width: calc(100% - 300px);
      height: 100%;
      display: inline-block;
    }
  }
}
</style>
