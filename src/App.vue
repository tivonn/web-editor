<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted () {
    this.init()
  },

  methods: {
    init () {
      // todo 改为获取服务端数据
      this.$store.dispatch('setSystem', {
        width: '800',
        height: '600'
      })
    }
  }
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
