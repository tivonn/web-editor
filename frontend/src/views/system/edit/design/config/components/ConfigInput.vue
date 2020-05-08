<template>
  <div :class="$style.configInput">
    <p class="input-label">{{label}}</p>
    <el-input
      :value="value"
      @input="$emit('input', $event)"
      size="small"
      :type="type"
      :rows="rows"
      :placeholder="placeholder">
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
      required: false,
      default: ''
    },

    type: {
      type: String,
      required: false,
      default: 'text'
    },

    rows: {
      type: Number,
      required: false,
      default: 0
    },

    placeholder: {
      type: String,
      required: false,
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
    .input-label {
      line-height: 28px;
    }
    .el-input__suffix-inner {
      line-height: 30px;
    }
  }
}
</style>
