<template>
  <div :class="$style.config">
    <el-tabs v-model="activeTab" class="config-tabs">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab.label"
        :name="tab.value"
        :disabled="isTabDisabled(tab.value)">
        <template v-if="isSystemActive">
          全局
        </template>
        <template v-else-if="isSingleActive || isCombinationActive">
          <el-collapse
            v-if="tab.value === activeTab"
            :value="activeConfig.map(block => block.key)"
            class="config-collapse">
            <el-collapse-item
              v-for="(block, blockKey) in filterCollapse(activeConfig)"
              :key="blockKey"
              :title="block.label"
              :name="block.key">
              <el-row
                v-for="(row, rowIndex) in block.list"
                :key="`${blockKey}-row${rowIndex}`"
                :gutter="row.gutter"
                class="config-row">
                <el-col
                  v-for="col in row.list"
                  :key="col.key"
                  :span="col.span"
                  :offset="col.offset">
                  <component
                    :is="col.component"
                    :value="activeElement[tab.value][block.key][col.key]"
                    @input="value => updateElement(`${tab.value}.${block.key}.${col.key}`, value)"
                    v-bind="col.props">
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
import utils from '@/utils/index.js'

export default {
  name: 'DesignConfig',

  data () {
    return {
      activeTab: '',
      tabs: [
        {
          label: '内容',
          value: 'content'
        },
        {
          label: '样式',
          value: 'style'
        },
        {
          label: '交互',
          value: 'interact'
        }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'activeElements'
    ]),

    isSystemActive () {
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

    disabledTabList () {
      return this.isSingleActive ? [] : ['content', 'interact']
    },

    activeElement () {
      switch (true) {
        case this.isSystemActive:
          return {}
        case this.isSingleActive:
        case this.isCombinationActive:
          return this.activeElements[0]
        case this.isMultipleActive:
          return this.activeElements
        default:
          return {}
      }
    },

    activeConfig () {
      const isComponent = this.activeElement.type === 'component'
      return isComponent
        ? require(`@/packages/${this.activeElement.value}/config.js`).default[this.activeTab]
        : require(`@/core/${this.activeElement.type}`).default.config[this.activeTab]
    }
  },

  watch: {
    'activeElement.type': {
      handler () {
        this.activeTab = this.tabs.find(tab => !this.isTabDisabled(tab.value)).value
      },
      immediate: true
    }
  },

  methods: {
    isTabDisabled (value) {
      return this.disabledTabList.some(disabledTab => disabledTab === value)
    },

    updateElement (key, value) {
      // todo 多选
      const { id } = this.activeElement
      this.$store.dispatch('updateElement', {
        id,
        [key]: value
      })
    },

    filterCollapse (collapse) {
      const filter = (list) => {
        return list.reduce((filterList, filterItem) => {
          if (filterItem.remove || !filterItem.list) {
            const filterResult = !(filterItem.removes && filterItem.removes.some(remove => this.eval(`this.activeElement.${remove}`))) ? [filterItem] : []
            return filterList.concat(filterResult)
          } else {
            const filterResult = Object.assign({}, filterItem, {
              list: filter(filterItem.list)
            })
            return filterList.concat(filterResult.list.length ? [filterResult] : [])
          }
        }, [])
      }
      return filter(collapse)
    },

    eval (value) {
      // eslint-disable-next-line
      return eval(value)
    }
  },

  components: Object.assign({},
    utils.importFiles(require.context('@/views/system/edit/design/config/components', false, /\.vue$/))
  )
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
        &.is-disabled {
          font-weight: unset;
          color: $--color-disabled;
          cursor: not-allowed;
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
      .config-row {
        &+.config-row {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
