<template>
  <div :class="$style.style" @click="test">
    <template v-if="!activeElements.length">
      全局
    </template>
    <template v-else-if="activeElements.length === 1">
      单个
    </template>
    <template v-else>
      组件组
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OperationStyle',

  computed: {
    ...mapGetters([
      'activeElements'
    ])
  }
}
</script>

<style lang="scss" module>
.style {
  :global {

  }
}
</style>
