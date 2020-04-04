<template>
  <div :class="$style.header"></div>
</template>

<script>
export default {
  name: 'EditHeader'
}
</script>

<style lang="scss" module>
.header {
  :global {
    width: 100%;
    height: 48px;
    border-bottom: 1px solid $--color-border;
  }
}
</style>
