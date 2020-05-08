<template>
  <div :class="$style.configText">
    <p class="text-label">{{value}}</p>
  </div>
</template>

<script>
export default {
  name: 'ConfigText',

  props: {
    value: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.config-text {
  :global {
  }
}
</style>
