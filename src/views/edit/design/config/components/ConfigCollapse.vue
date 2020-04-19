<template>
  <el-collapse
    :value="activeNames"
    :class="$style.configCollapse">
    <el-collapse-item
      v-for="(block, blockKey) in activeElement.config[configKey]"
      :key="blockKey"
      :title="block.label"
      :name="block.key">
      <el-row
        v-for="line in block.list"
        :key="line.key"
        :gutter="line.gutter"
        class="config-line">
        <el-col
          v-for="col in line.list"
          :key="col.label"
          :span="col.span"
          :offset="col.offset">
          <config-input
            v-model="activeElement.data[configKey][block.key][col.key]"
            v-bind="col"
            @input="value => updateElement(`data.${configKey}.${block.key}.${col.key}`, value)">
          </config-input>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import ConfigInput from '@/views/edit/design/config/components/operations/input.vue' // todo 按需引入configComponent

export default {
  name: 'ConfigCollapse',

  props: {
    activeElement: {
      type: Object,
      required: true,
      default: () => ({})
    },

    configKey: {
      type: String,
      required: true,
      default: ''
    }
  },

  computed: {
    activeNames () {
      // todo 区分多种情况，暂时用于固定展开
      return this.activeElement.config[this.configKey].map(block => block.key)
    }
  },

  methods: {
    updateElement (key, value) {
      const { id } = this.activeElement
      this.$store.dispatch('updateElement', {
        id,
        [key]: value
      })
    }
  },

  components: {
    ConfigInput
  }
}
</script>

<style lang="scss" module>
.config-collapse {
  :global {
    .el-collapse-item__header {
      height: 36px;
      padding: 0 6px;
      line-height: 36px;
      border-color: $--color-border;
      font-weight: bold;
      color: $--color-text-secondary;
    }
    .el-collapse-item__content {
      padding: 10px 6px;
    }
    .config-line {
      &+.config-line {
        margin-top: 10px;
      }
    }
  }
}
</style>
