<template>
  <div :class="$style.config">
    <el-tabs v-model="activeConfig" class="config-tabs">
      <!-- todo 点击tab时再加载组件 -->
      <el-tab-pane
        v-for="config in configs"
        :key="config.value"
        :label="config.label"
        :name="config.value">
        <component
          :is="`config-${config.value}`">
        </component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConfigStyle from '@/views/edit/design/config/style.vue'
import ConfigContent from '@/views/edit/design/config/content.vue'
import ConfigInteract from '@/views/edit/design/config/interact.vue'
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
    ])
  },

  methods: {
    isActiveConfig (type) {
      return type === this.activeConfig
    }
  },

  components: {
    ConfigStyle,
    ConfigContent,
    ConfigInteract
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
  }
}
</style>
