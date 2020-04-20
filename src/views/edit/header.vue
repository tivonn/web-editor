<template>
  <div :class="$style.header">
    <div style="float: right;">
      <el-button @click="save">保存</el-button>
      <el-button @click="preview">预览</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditHeader',

  computed: {
    ...mapGetters([
      'elements'
    ])
  },

  methods: {
    save () {
      // todo 改为存在服务端
      const { sid, pid } = this.$route.params
      localStorage.setItem(`${sid}-${pid}`, JSON.stringify(this.elements || []))
    },

    preview () {
      const { sid, pid } = this.$route.params
      this.$router.push({ name: 'Preview', params: { sid, pid } })
    }
  }
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
