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
            <div v-else-if="tab.value === 'interact'" class="interact-container">
              <div
                v-for="(interact, interactIndex) in activeElement.interacts"
                :key="interact.id"
                class="interact-item clear-fix">
                <config-select
                  :value="interact.event"
                  @input="value => interact.event = value "
                  label="事件"
                  :options="getEventOptions(interact)"
                  class="event-select">
                </config-select>
                <el-switch
                  v-model="interact.isAble"
                  :disabled="!interact.event"
                  class="interact-switch">
                </el-switch>
                <Icon
                  svg-id="iconshanchu"
                  color="#999"
                  title="删除交互"
                  class="delete-interact"
                  @click="deleteInteract(interactIndex)">
                </Icon>
                <template v-if="interact.isAble">
                  <div
                    v-for="(action, actionIndex) in interact.actions"
                    :key="action.id"
                    class="action-item">
                    <config-select
                      :value="action.type"
                      @input="type => selectAction(type, action)"
                      :label="`行为${ interact.actions.length > 1 ? actionIndex + 1 : '' }`"
                      :options="getActionOptions(interact, action)"
                      class="action-select">
                    </config-select>
                    <el-switch
                      v-model="action.isAble"
                      :disabled="!action.type"
                      class="action-switch">
                    </el-switch>
                    <Icon
                      svg-id="iconshanchu"
                      color="#999"
                      title="删除行为"
                      class="delete-action"
                      @click="deleteAction(interact, actionIndex)">
                    </Icon>
                    <ul
                      v-if="action.isAble && getActionConfigs(action).length"
                      class="config-list">
                      <li
                        v-for="config in getActionConfigs(action)"
                        :key="config.key"
                        class="config-item">
                        <component
                          :is="config.component"
                          :value="action.value[config.key]"
                          @input="value => action.value[config.key] = value"
                          v-bind="config.props">
                        </component>
                      </li>
                    </ul>
                  </div>
                  <el-button
                    size="small"
                    :disabled="isAddActionDisabled(interact)"
                    class="add-action"
                    @click="addAction(interact)">
                    添加行为
                  </el-button>
                </template>
              </div>
              <el-button
                size="small"
                type="primary"
                :disabled="isAddInteractDisabled"
                class="add-interact"
                @click="addInteract">
                添加交互
              </el-button>
            </div>
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
      return this.activeElement.interacts.length >= this.activeConfig.eventOptions.length
    }
  },

  watch: {
    'activeElement.type': {
      handler () {
        this.activeTab = (this.tabs.find(tab => !this.isTabDisabled(tab.value)) || {}).value
      },
      immediate: true
    },

    'activeElement.interacts': {
      handler () {
        this.updateInteract()
      },
      deep: true
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
            if (!(filterItem.removes && filterItem.removes.some(remove => remove(this.activeElement)))) {
              filterList.push(filterItem)
            }
          } else {
            const filterResult = Object.assign({}, filterItem, {
              list: filter(filterItem.list)
            })
            if (filterResult.list.length) {
              filterList.push(filterResult)
            }
          }
          return filterList
        }, [])
      }
      return filter(collapse)
    },

    getValueFromObj () {
      return utils.getValueFromObj(...arguments)
    },

    addInteract () {
      const { interacts } = this.activeElement
      utils.getId('interact')
        .then(res => {
          const id = res
          interacts.push({
            id,
            isAble: true,
            event: '',
            actions: []
          })
          this.addAction(interacts[interacts.length - 1])
        })
    },

    deleteInteract (interactIndex) {
      this.activeElement.interacts.splice(interactIndex, 1)
    },

    getEventOptions (interact) {
      return this.activeConfig.eventOptions.filter(eventOption =>
        eventOption.value === interact.event ||
        this.activeElement.interacts.every(interact => interact.event !== eventOption.value)
      )
    },

    addAction (interact) {
      utils.getId('action')
        .then(res => {
          const id = res
          interact.actions.push({
            id,
            isAble: true,
            type: '',
            value: {}
          })
        })
    },

    isAddActionDisabled (interact) {
      return interact.actions.length >= this.getActionAllOptions(interact).length
    },

    getActionAllOptions (interact) {
      return interact.event
        ? this.activeConfig.eventOptions.find(eventOption => eventOption.value === interact.event).actionOptions
        : []
    },

    getActionOptions (interact, action) {
      return this.getActionAllOptions(interact)
        .filter(actionOption =>
          actionOption.value === action.type ||
          interact.actions.every(action => action.type !== actionOption.value)
        )
    },

    selectAction (type, action) {
      this.$set(action, 'type', type)
      this.$set(action, 'value', this.getActionConfigs(action).reduce((value, config) => {
        value[config.key] = config.default
        return value
      }, {}))
    },

    deleteAction (interact, actionIndex) {
      interact.actions.splice(actionIndex, 1)
    },

    getActionConfigs (action) {
      return this.activeConfig.actionOptions[action.type] || []
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
        color: $--color-primary;
      }
      .el-collapse-item__content {
        padding: 10px 6px;
      }
    }
    .config-row {
      & + .config-row {
        margin-top: 10px;
      }
    }
    .interact-container {
      padding-bottom: 10px;
    }
    .interact-item {
      position: relative;
      padding: 10px 6px;
      & + .interact-item {
        border-top: 1px solid $--border-color-base;
      }
    }
    .interact-switch {
      position: absolute;
      top: 16px;
      right: 35px;
    }
    .delete-interact {
      position: absolute;
      top: 18px;
      right: 13px;
      cursor: pointer;
      &:hover {
        fill: $--color-danger !important;
      }
    }
    .event-select {
      .config-label {
        padding: 0 6px;
        font-weight: bold;
        color: $--color-primary;
      }
      .el-select {
        width: calc(100% - 150px) !important;
        margin-left: 16px !important;
      }
    }
    .action-item {
      position: relative;
      margin-top: 10px;
      padding: 8px 6px;
      background-color: $--hover-color-primary;
      .el-input__inner {
        background-color: $--hover-color-primary;
      }
    }
    .action-select {
      .el-select {
        width: calc(100% - 138px) !important;
      }
    }
    .action-switch {
      position: absolute;
      top: 14px;
      right: 28px;
    }
    .delete-action {
      position: absolute;
      top: 16px;
      right: 6px;
      cursor: pointer;
      &:hover {
        fill: $--color-danger !important;
      }
    }
    .config-list {
      margin-top: 8px;
      border-top: 1px solid $--border-color-base;
    }
    .config-item {
      padding-top: 6px;
    }
    .add-action {
      margin-top: 6px;
      float: right;
    }
    .add-interact {
      width: calc(100% - 12px);
      margin: 18px 6px 0 6px;
    }
  }
}
</style>
