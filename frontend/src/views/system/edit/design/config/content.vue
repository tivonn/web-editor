<template>
  <config-collapse
    tab="content"
    :active-element="activeElement"
    :active-config="activeConfig"
    @update-element="(key, value) => $emit('update-element', key, value)">
  </config-collapse>
</template>

<script>
import ConfigCollapse from '@/views/system/edit/design/config/collapse.vue'

export default {
  name: 'ConfigContent',

  props: {
    activeElement: {
      type: Object,
      required: true,
      default: () => ({})
    },

    activeConfig: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  components: {
    ConfigCollapse
  }
}
</script>
