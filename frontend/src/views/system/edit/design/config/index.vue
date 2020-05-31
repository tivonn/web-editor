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
            <component
              :is="`config-${tab.value}`"
              :active-element="activeElement"
              :active-config="activeConfig"
              @update-element="updateElement">
            </component>
          </template>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfigContent from '@/views/system/edit/design/config/content.vue'
import ConfigStyle from '@/views/system/edit/design/config/style.vue'
import ConfigInteract from '@/views/system/edit/design/config/interact.vue'
import ConfigInput from '@/views/system/edit/design/config/components/ConfigInput.vue'

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

    updateElement (key, value) {
      const { id } = this.activeElement
      this.$store.dispatch('updateElement', {
        id,
        updateData: {
          [key]: value
        }
      })
    }
  },

  components: {
    ConfigContent,
    ConfigStyle,
    ConfigInteract,
    ConfigInput
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
  }
}
</style>
