<template>
  <div :class="$style.header">
    <div style="float: right; padding-right: 10px;">
      <el-button size="small" @click="command('combine')">组合</el-button>
      <el-button size="small" @click="command('uncombine')">解除组合</el-button>
      <el-button size="small" @click="command('save', systemId, pageId, elements)">保存</el-button>
      <el-button size="small" @click="command('preview', systemId, pageId, elements)">预览</el-button>
      <el-button size="small" @click="command('download', systemId)">源码下载</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Command from '@/core/command.js'

export default {
  name: 'EditHeader',

  inject: {
    systemId: {
      default: 0
    },

    pageId: {
      default: 0
    }
  },

  computed: {
    ...mapGetters([
      'elements'
    ])
  },

  methods: {
    command (type, ...arg) {
      Command[type](...arg)
    }
  }
}
</script>

<style lang="scss" module>
.header {
  width: 100%;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid $--border-color-base;
  :global {

  }
}
</style>
