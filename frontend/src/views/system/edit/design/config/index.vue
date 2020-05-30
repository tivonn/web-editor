<template>
  <div :class="$style.config">
    <div class="current-element">
      <template v-if="isSystemActive">
        <Icon
          svg-id="iconfaxianweixuanzhong"
          size="18px"
          color="#606266"
          title="未选中"
          class="current-icon system-icon">
        </Icon>
        <span class="current-text">未选中</span>
      </template>
      <template v-else-if="isSingleActive">
        <Icon
          v-if="isSingleComponentActive"
          svg-id="iconshow_danxuan"
          size="16px"
          color="#606266"
          title="元件"
          class="current-icon single-icon single-component-icon">
        </Icon>
        <Icon
          v-else
          svg-id="iconzuhe"
          size="19px"
          color="#606266"
          title="组合"
          class="current-icon single-icon single-combination-icon">
        </Icon>
        <config-input
          :value="activeElement.name"
          @input="value => updateElement('name', value)"
          style="display: inline-block;"
          can-toggle
          placeholder="请输入元件名"
          class="current-input">
        </config-input>
      </template>
      <template v-else-if="isMultipleActive">
        <Icon
          svg-id="iconyunongtongduoxuanxuanzhong"
          size="16px"
          color="#606266"
          title="多选"
          class="current-icon multiple-icon">
        </Icon>
        <span class="current-text">多选</span>
      </template>
    </div>
    <el-tabs v-model="activeTab" class="config-tabs">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab.label"
        :name="tab.value"
        :disabled="isTabDisabled(tab.value)">
        <template v-if="tab.value === activeTab">
          <template v-if="isSystemActive">
            全局
          </template>
          <template v-else-if="isSingleActive || isMultipleActive">
            <el-collapse
              v-if="tab.value === 'content' || tab.value === 'style'"
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
                      :value="getValueFromObj(activeElement, getComponentKey(tab, block, col))"
                      @input="value => updateElement(getComponentKey(tab, block, col), value)"
                      :active-element="activeElement"
                      :current-key="getComponentKey(tab, block, col)"
                      v-bind="col.props"
                      @trigger="key => triggerElement(`${getComponentKey(tab, block, col)}${key ? `.${key}` : ''}`)">
                    </component>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
            <template v-else-if="tab.value === 'interact'">
              <ul>
                <li v-for="interact in activeElement.interacts" :key="interact.action">
                  <!--todo 触发vuex-->
                  <config-select
                    :value="interact.action"
                    @input="value => { interact.action = value; updateInteract() }"
                    label="触发行为"
                    :options="getActionOptions(interact)">
                  </config-select>
                  <template v-if="interact.action">
                    <div v-for="event in interact.events" :key="event.type">
                      <config-select
                        :value="event.type"
                        @input="type => { selectEvent(type, event); updateInteract() }"
                        label="触发事件"
                        :options="getEventOptions(interact, event)">
                      </config-select>
                      <ul>
                        <li v-for="config in getEventConfigs(event)" :key="config.key">
                          <component
                            :is="config.component"
                            :value="event.value[config.key]"
                            @input="value => { event.value[config.key] = value; updateInteract() }"
                            v-bind="config.props">
                          </component>
                        </li>
                      </ul>
                    </div>
                    <el-button
                      :disabled="isAddEventDisabled(interact)"
                      @click="addEvent(interact)">
                      添加事件
                    </el-button>
                  </template>
                </li>
              </ul>
              <el-button
                size="small"
                type="primary"
                :disabled="isAddInteractDisabled"
                class="add-interact"
                @click="addInteract">
                添加交互
              </el-button>
            </template>
          </template>
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
      'activeElements',
      'multipleElement'
    ]),

    isSystemActive () {
      return !this.activeElements.length
    },

    isSingleActive () {
      return this.activeElements.length === 1
    },

    isSingleComponentActive () {
      return this.isSingleActive && this.activeElement.type === 'component'
    },

    isMultipleActive () {
      return this.activeElements.length > 1
    },

    disabledTabList () {
      switch (true) {
        case this.isSystemActive: {
          return ['content', 'interact']
        }
        case this.isSingleActive: {
          return this.isSingleComponentActive ? [] : ['content', 'interact']
        }
        case this.isMultipleActive: {
          return ['content', 'style', 'interact']
        }
        default: {
          return []
        }
      }
    },

    activeElement () {
      switch (true) {
        case this.isSystemActive: {
          return {}
        }
        case this.isSingleActive: {
          return this.activeElements[0]
        }
        case this.isMultipleActive: {
          return this.multipleElement
        }
        default: {
          return {}
        }
      }
    },

    activeConfig () {
      return this.isSingleComponentActive
        ? require(`@/packages/${this.activeElement.packageType}/config.js`).default[this.activeTab]
        : require(`@/core/${this.activeElement.type}`).default.config[this.activeTab]
    },

    isAddInteractDisabled () {
      return this.activeElement.interacts.length >= this.activeConfig.actionOptions.length
    }
  },

  watch: {
    'activeElement.type': {
      handler () {
        this.activeTab = (this.tabs.find(tab => !this.isTabDisabled(tab.value)) || {}).value
      },
      immediate: true
    }
  },

  methods: {
    isTabDisabled (value) {
      return this.disabledTabList.some(disabledTab => disabledTab === value)
    },

    getComponentKey (tab, block, col) {
      return `${tab.value}.${block.key}.${col.key}`
    },

    updateElement (key, value) {
      const { id } = this.activeElement
      this.$store.dispatch('updateElement', {
        id,
        updateData: {
          [key]: value
        }
      })
    },

    triggerElement (key) {
      const { id } = this.activeElement
      this.$store.dispatch('triggerElement', {
        id,
        key
      })
    },

    filterCollapse (collapse) {
      const filter = (list) => {
        return list.reduce((filterList, filterItem) => {
          if (filterItem.remove || !filterItem.list) {
            const filterResult = !(filterItem.removes && filterItem.removes.some(remove => remove(this.activeElement))) ? [filterItem] : []
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

    getValueFromObj () {
      return utils.getValueFromObj(...arguments)
    },

    setValueToObj () {
      return utils.setValueToObj(...arguments)
    },

    addInteract () {
      this.activeElement.interacts.push({
        action: '',
        events: []
      })
      this.updateInteract()
    },

    getActionOptions (interact) {
      return this.activeConfig.actionOptions.filter(actionOption =>
        actionOption.value === interact.action ||
        this.activeElement.interacts.every(interact => interact.action !== actionOption.value)
      )
    },

    addEvent (interact) {
      interact.events.push({
        type: ''
      })
      this.updateInteract()
    },

    isAddEventDisabled (interact) {
      return interact.events.length >= this.getEventAllOptions(interact).length
    },

    getEventAllOptions (interact) {
      return this.activeConfig.actionOptions.find(actionOption => actionOption.value === interact.action).eventOptions
    },

    getEventOptions (interact, event) {
      return this.getEventAllOptions(interact)
        .filter(eventOption =>
          eventOption.value === event.type ||
          interact.events.every(event => event.type !== eventOption.value)
        )
    },

    selectEvent (type, event) {
      this.$set(event, 'type', type)
      this.$set(event, 'value', this.getEventConfigs(event).reduce((value, config) => {
        value[config.key] = config.default
        return value
      }, {}))
    },

    getEventConfigs (event) {
      return this.activeConfig.eventOptions[event.type]
    },

    updateInteract () {
      this.updateElement('interacts', this.activeElement.interacts)
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
    .current-element {
      height: 36px;
      padding: 2px 6px;
      line-height: 26px;
    }
    .current-icon {
      vertical-align: middle;
    }
    .system-icon {
      position: relative;
      top: 1px;
      margin-right: 3px;
    }
    .single-icon {
      position: relative;
      bottom: 1px;
    }
    .single-component-icon {
      margin-left: 1px;
      margin-right: 4px;
    }
    .single-combination-icon {
      margin-right: 3px;
    }
    .multiple-icon {
      position: relative;
      top: 1px;
      margin-left: 1px;
      margin-right: 4px;
    }
    .current-text {
      vertical-align: middle;
    }
    .current-input {
      width: calc(100% - 22px);
      vertical-align: middle;
      .input-value {
        position: relative;
        bottom: 1px;
        line-height: 32px;
      }
    }
    .config-tabs {
      height: calc(100% - 36px);
      border-top: 1px solid $--border-color-base;
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
        padding: 2px 6px 10px 6px;
      }
    }
    .config-row {
      &+.config-row {
        margin-top: 10px;
      }
    }
    .config-label {
      line-height: 36px;
    }
    .add-interact {
      width: calc(100% - 24px);
      margin: 18px 12px 0 12px;
    }
  }
}
</style>
