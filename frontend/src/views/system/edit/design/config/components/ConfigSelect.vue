<template>
  <div :class="$style.configSelect">
    <p class="config-label">{{label}}</p>
    <el-select
      :value="value"
      @input="$emit('input', $event)"
      size="small">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ConfigSelect',

  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    options: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style lang="scss" module>
.config-select {
  :global {
    .el-select {
      width: 100%;
    }
  }
}
</style>
