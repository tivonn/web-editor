<template>
  <div :class="$style.edit">
    <edit-header></edit-header>
    <div class="body">
      <edit-sidebar></edit-sidebar>
      <div class="main">
        <template v-if="isDesign">
          <design-canvas></design-canvas>
          <design-operation></design-operation>
        </template>
        <develop-code v-else></develop-code>
      </div>
    </div>
  </div>
</template>

<script>
import EditHeader from '@/views/edit/header'
import EditSidebar from '@/views/edit/sidebar'
import DesignCanvas from '@/views/edit/design/canvas'
import DesignOperation from '@/views/edit/design/operation'
import DevelopCode from '@/views/edit/develop/code'

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
    DesignOperation,
    DevelopCode
  }
}
</script>

<style lang="scss" module>
.edit {
  width: 100%;
  height: 100%;
  :global {
    .body {
      width: 100%;
      height: calc(100% - 48px);
    }
    .main {
      width: calc(100% - 301px);
      height: 100%;
      display: inline-block;
    }
  }
}
</style>
