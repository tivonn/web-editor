<template>
  <div :class="$style.edit">
    <edit-header></edit-header>
    <div class="edit-body">
      <component :is="editComponent"></component>
    </div>
  </div>
</template>

<script>
import EditHeader from '@/views/system/edit/header.vue'
import Design from '@/views/system/edit/design/index.vue'
import Develop from '@/views/system/edit/develop/index.vue'

export default {
  name: 'Edit',

  data () {
    return {
      isDesign: true
    }
  },

  computed: {
    editComponent () {
      return this.isDesign ? 'design' : 'develop'
    }
  },

  components: {
    EditHeader,
    Design,
    Develop
  }
}
</script>

<style lang="scss" module>
.edit {
  width: 100%;
  height: 100%;
  user-select: none;
  :global {
    .edit-body {
      width: 100%;
      height: calc(100% - 48px);
    }
  }
}
</style>
