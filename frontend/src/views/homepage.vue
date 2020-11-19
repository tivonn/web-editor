<template>
  <div :class="$style.homepage">
    <router-link :to="{ name: 'Edit', params: { sid: 1, pid: 1 } }">
      <el-button type="primary">to edit</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Homepage'
}
</script>

<style lang="scss" module>
.homepage {
  padding: 12px;
}
</style>
