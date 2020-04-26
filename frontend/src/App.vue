<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mixin from '@/app.mixin.js'

export default {
  name: 'App',

  mixins: [mixin]
}
</script>

<style lang="scss">
#app {
  width: 100%;
  min-width: 768px;
  height: 100%;
  font-size: 14px;
  font-family: PingFangSC, 微软雅黑, Helvetica, Arial, sans-serif;
  color: $--color-text-primary;
}
</style>
