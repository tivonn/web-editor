<template>
  <div :class="$style.operation">
    <el-tabs v-model="activeOperation" class="operation-tabs">
      <el-tab-pane
        v-for="operation in operations"
        :key="operation.value"
        :label="operation.name"
        :name="operation.value">
        <component
          :is="`operation-${operation.value}`">
        </component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OperationStyle from '@/views/edit/design/operation/style.vue'
import OperationContent from '@/views/edit/design/operation/content.vue'
import OperationInteract from '@/views/edit/design/operation/interact.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'DesignOperation',

  data () {
    return {
      activeOperation: 'style',
      operations: [{
        name: '样式',
        value: 'style'
      }, {
        name: '内容',
        value: 'content'
      }, {
        name: '交互',
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
    isActiveOperation (type) {
      return type === this.activeOperation
    }
  },

  components: {
    OperationStyle,
    OperationContent,
    OperationInteract
  }
}
</script>

<style lang="scss" module>
.operation {
  width: 400px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  :global {
    .operation-tabs {
      .el-tabs__nav {
        width: 100%;
      }
      .el-tabs__item {
        width: calc(100% / 3);
        padding: 0;
        text-align: center;
      }
      .el-tabs__active-bar {
        width: calc(100% / 3) !important;
      }
    }
  }
}
</style>
