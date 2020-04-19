<template>
  <div>
    <template v-if="isNoActive">
      全局
    </template>
    <template v-else-if="isSingleActive">
      <config-collapse
        :active-element="activeElement"
        :config-key="configKey">
      </config-collapse>
    </template>
    <template v-else>
      组件组
    </template>
  </div>
</template>

<script>
import ConfigCollapse from '@/views/edit/design/config/components/ConfigCollapse.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ConfigOperation',

  props: {
    configKey: {
      type: String,
      required: true,
      default: ''
    }
  },

  computed: {
    ...mapGetters([
      'activeElements'
    ]),

    isNoActive () {
      return !this.activeElements.length
    },

    isSingleActive () {
      return this.activeElements.length === 1
    },

    isMultipleActive () {
      return this.activeElements.length > 1
    },

    activeElement () {
      switch (true) {
        case this.isNoActive:
          return {}
        case this.isSingleActive:
          return this.activeElements[0]
        case this.isMultipleActive:
          return this.activeElements
        default:
          return {}
      }
    }
  },

  components: {
    ConfigCollapse
  }
}
</script>
