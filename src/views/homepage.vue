<template>
  <div :class="$style.homepage">
    <p>homepage</p>
    <router-link :to="{ name: 'Edit', params: { pid: 1 } }">to edit</router-link>
  </div>
</template>

<script>
export default {
  name: 'Homepage'
}
</script>

<style lang="scss" module>
.homepage {

}
</style>
