<template>
  <div :class="$style.configTable">
    <p class="table-label">{{label}}</p>
    <el-table
      :data="value"
      size="small">
      <el-table-column
        v-for="col in cols"
        :key="col.label"
        :label="col.label"
        :width="col.width"
        :align="col.align">
        <template slot-scope="scope">
          <component
            :is="col.prop.component"
            :value="value[scope.$index][col.prop.key]"
            v-bind="col.props"
            @input="componentValue => updateComponent(componentValue, value[scope.$index], col.prop.key)">
          </component>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import utils from '@/utils/index.js'

export default {
  name: 'ConfigTable',

  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    cols: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  methods: {
    updateComponent (componentValue, row, key) {
      this.$set(row, key, componentValue)
      this.$emit('input', this.value)
    }
  },

  components: Object.assign({},
    utils.importFiles(require.context('@/views/system/edit/design/config/components', false, /\.vue$/))
  )
}
</script>

<style lang="scss" module>
.config-table {
  :global {
    .table-label {
      line-height: 24px;
    }
  }
}
</style>
