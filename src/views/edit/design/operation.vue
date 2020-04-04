<template>
  <div :class="$style.operation">operation</div>
</template>

<script>
export default {
  name: 'DesignOperation'
}
</script>

<style lang="scss" module>
.operation {
  width: 400px;
  height: 100%;
  display: inline-block;
  border-left: 1px solid $--color-border;
  vertical-align: middle;
  :global {

  }
}
</style>
