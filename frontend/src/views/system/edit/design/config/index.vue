<template>
  <div :class="$style.config">
    <el-tabs v-model="activeConfig" class="config-tabs">
      <el-tab-pane
        v-for="config in configs"
        :key="config.value"
        :label="config.label"
        :name="config.value">
        <template v-if="isNoActive">
          全局
        </template>
        <template v-else-if="isSingleActive || isCombinationActive">
          <el-collapse
            :value="activeElement.config[config.value].map(block => block.key)"
            class="config-collapse">
            <el-collapse-item
              v-for="(block, blockKey) in activeElement.config[config.value]"
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
                  :key="col.key"
                  :span="col.span"
                  :offset="col.offset">
                  <component
                    :is="col.component"
                    v-model="activeElement.data[config.value][block.key][col.key]"
                    v-bind="col.props"
                    @update="value => updateElement(`data.${config.value}.${block.key}.${col.key}`, value)">
                  </component>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </template>
        <template v-else-if="isMultipleActive">
          多选
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DesignConfig',

  data () {
    return {
      activeConfig: 'style',
      configs: [{
        label: '样式',
        value: 'style'
      }, {
        label: '内容',
        value: 'content'
      }, {
        label: '交互',
        value: 'interact'
      }]
    }
  },

  computed: {
    ...mapGetters([
      'activeElements'
    ]),

    isNoActive () {
      return !this.activeElements.length
    },

    isSingleActive () {
      return this.activeElements.length === 1 && this.activeElements[0].type === 'component'
    },

    isCombinationActive () {
      return this.activeElements.length === 1 && this.activeElements[0].type === 'combination'
    },

    isMultipleActive () {
      return this.activeElements.length > 1
    },

    activeElement () {
      switch (true) {
        case this.isNoActive:
          return {}
        case this.isSingleActive:
        case this.isCombinationActive:
          return this.activeElements[0]
        case this.isMultipleActive:
          return this.activeElements
        default:
          return {}
      }
    }
  },

  methods: {
    updateElement (key, value) {
      // todo 多选
      const { id } = this.activeElement
      this.$store.dispatch('updateElement', {
        id,
        [key]: value
      })
    }
  },

  components: {
    ConfigInput: () => import('@/views/system/edit/design/config/components/ConfigInput.vue')
  }
}
</script>

<style lang="scss" module>
.config {
  width: 400px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  :global {
    .config-tabs {
      height: 100%;
      .el-tabs__header {
        margin-bottom: 0;
      }
      .el-tabs__nav {
        width: 100%;
      }
      .el-tabs__item {
        width: calc(100% / 3);
        padding: 0;
        text-align: center;
        font-weight: bold;
        color: $--color-text-regular;
        &.is-active {
          color: $--color-primary;
        }
      }
      .el-tabs__active-bar {
        width: calc(100% / 3) !important;
      }
      .el-tabs__content {
        height: calc(100% - 40px);
        overflow: auto;
      }
    }
    .config-collapse {
      .el-collapse-item__header {
        height: 36px;
        padding: 0 6px;
        line-height: 36px;
        border-color: $--border-color-base;
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
}
</style>
