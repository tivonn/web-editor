<template>
  <div :class="$style.interactContainer">
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
      <template v-if="interact.event && interact.isAble">
        <draggable
          :list="interact.actions">
          <div
            v-for="(action, actionIndex) in interact.actions"
            :key="action.id"
            class="action-item">
            <template>
              <config-select
                :value="action.type"
                @input="type => selectAction(type, action)"
                :label="`行为${ interact.actions.length > 1 ? actionIndex + 1 : '' }`"
                :options="actionAllOptions"
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
            </template>
            <ul
              v-if="action.type && action.isAble"
              class="config-list">
              <li
                v-for="config in filterActionConfigs(action)"
                :key="config.key"
                class="config-item">
                <component
                  :is="config.component"
                  :value="action.value[config.key]"
                  @input="value => action.value[config.key] = value"
                  v-bind="config.props"
                  @update-item="value => Object.assign(action.value[config.key][value.index], value.itemUpdateData)">
                </component>
              </li>
            </ul>
          </div>
        </draggable>
        <el-button
          size="small"
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

<script>
import draggable from 'vuedraggable'
import utils from '@/utils/index.js'
import InteractController from '@/core/interact-controller.js'

export default {
  name: 'ConfigInteract',

  props: {
    activeElement: {
      type: Object,
      required: true,
      default: () => ({})
    },

    activeConfig: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  computed: {
    isAddInteractDisabled () {
      return this.activeElement.interacts.length >= this.activeConfig.eventOptions.length
    },

    eventAllOptions () {
      return InteractController.options.event
        .filter(eventOption => this.activeConfig.eventOptions.includes(eventOption.value))
    },

    actionAllOptions () {
      return InteractController.options.action
        .filter(actionOption => this.activeConfig.actionOptions.includes(actionOption.value))
    }
  },

  watch: {
    'activeElement.interacts': {
      handler () {
        this.$emit('update-element', 'interacts', this.activeElement.interacts)
      },
      deep: true
    }
  },

  methods: {
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
      return this.eventAllOptions.filter(eventOption =>
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
      return InteractController.config[action.type]
    },

    filterActionConfigs (action) {
      return this.getActionConfigs(action).filter(config => !(config.removes && config.removes.some(remove => remove(action))))
    }
  },

  components: Object.assign({
    draggable
  }, utils.importFiles(require.context('@/views/system/edit/design/config/components', false, /\.vue$/)))
}
</script>

<style lang="scss" module>
.interact-container {
  padding-bottom: 10px;
  :global {
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
    .add-interact {
      width: calc(100% - 12px);
      margin: 18px 6px 0 6px;
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
      cursor: move;
      .el-input__inner, .el-textarea__inner, .el-radio-button:not(.is-active) .el-radio-button__inner, .el-table th, .el-table td, .el-button {
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
    .add-action {
      margin-top: 6px;
      float: right;
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
  }
}
</style>
