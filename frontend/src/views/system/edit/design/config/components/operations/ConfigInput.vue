<template>
  <div>
    <p>{{label}}</p>
    <el-input
      :value="value"
      @input="$emit('input', $event)"
      size="small"
      :class="$style.configInput">
      <template slot="suffix">{{suffix}}</template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'ConfigInput',

  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },

    label: {
      type: String,
      required: true,
      default: ''
    },

    suffix: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.config-input {
  :global {
    .el-input__suffix-inner {
      line-height: 30px;
    }
  }
}
</style>
