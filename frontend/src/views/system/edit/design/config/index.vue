<template>
  <div :class="$style.config">
    <el-tabs v-model="activeConfig" class="config-tabs">
      <el-tab-pane
        v-for="config in configs"
        :key="config.value"
        :label="config.label"
        :name="config.value">
        <config-operation :config-key="config.value"></config-operation>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConfigOperation from '@/views/system/edit/design/config/components/ConfigOperation.vue'
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

  components: {
    ConfigOperation
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
