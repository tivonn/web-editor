<template>
  <div :class="$style.edit">
    <p>edit</p>
    <router-link :to="{ name: 'Preview' }">to preview</router-link>
  </div>
</template>

<script>
export default {
  name: 'Edit'
}
</script>

<style lang="scss" module>
.edit {
  :global {
  }
}
</style>
