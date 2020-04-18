<template>
  <div :class="$style.style">
    <template v-if="isNoActive">
      全局
    </template>
    <template v-else-if="isSingleActive">
      <el-collapse :value="activeNames" class="config-collapse">
        <el-collapse-item
          v-for="(block, blockKey) in activeElement.config.style"
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
                v-model="activeElement.data.style[block.key][col.key]"
                v-bind="col"
                @input="value => updateActiveElement(`data.style.${block.key}.${col.key}`, value)">
                </config-input>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </template>
    <template v-else>
      组件组
    </template>
  </div>
</template>

<script>
import ConfigInput from '@/views/edit/design/config/components/operations/input.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ConfigStyle',

  computed: {
    ...mapGetters([
      'activeElements'
    ]),

    isNoActive () {
      return !this.activeElements.length
    },

    isSingleActive () {
      return this.activeElements.length === 1
    },

    isMultipleActive () {
      return this.activeElements.length > 1
    },

    activeElement () {
      switch (true) {
        case this.isNoActive:
          return {}
        case this.isSingleActive:
          return this.activeElements[0]
        case this.isMultipleActive:
          return this.activeElements
        default:
          return {}
      }
    },

    activeNames () {
      // 区分多种情况，暂时用于固定展开
      return this.activeElement.config.style.map(style => style.key)
    }
  },

  methods: {
    updateActiveElement (key, value) {
      const { id } = this.activeElement
      this.$store.dispatch('updateActiveElement', {
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
.style {
  :global {
    .config-collapse {
      .el-collapse-item__header {
        height: 36px;
        padding: 0 6px;
        line-height: 36px;
        border-color: $--color-border;
      }
      .el-collapse-item__content {
        padding: 10px 6px;
      }
    }
    .config-line {
      &+.config-line {
        margin-top: 10px;
      }
    }
  }
}
</style>
