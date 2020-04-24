<template>
  <div :class="$style.header">
    <div style="float: right;">
      <el-button @click="save">保存</el-button>
      <el-button @click="preview">预览</el-button>
      <el-button @click="download">源码下载</el-button>
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

  inject: {
    systemId: {
      default: 0
    },

    pageId: {
      default: 0
    }
  },

  methods: {
    save () {
      const data = {
        systemId: this.systemId,
        elements: this.elements
      }
      this.$axios.put(`/pages/${this.pageId}`, data)
    },

    preview () {
      window.open(
        this.$router.resolve({
          name: 'Preview',
          params: { sid: this.systemId, pid: this.pageId }
        }).href,
        '_blank'
      )
    },

    download () {
      this.$axios.put(`/build/${this.systemId}`)
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
