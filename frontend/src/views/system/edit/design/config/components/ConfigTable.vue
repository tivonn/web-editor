<template>
  <div :class="$style.configTable">
    <p class="table-label">{{label}}</p>
    <el-table
      :data="value"
      style="width: 100%">
      <el-table-column
        v-for="col in cols"
        :key="col.label"
        :label="col.label"
        :prop="col.prop">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
  }
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
