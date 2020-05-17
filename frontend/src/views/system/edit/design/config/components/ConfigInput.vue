<template>
  <div :class="$style.configInput">
    <p class="config-label">{{label}}</p>
    <el-input
      :value="value"
      @input="$emit('input', $event)"
      size="small"
      :type="type"
      :rows="rows"
      :placeholder="placeholder"
      @blur="$emit('trigger')">
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
    .el-input__inner {
      padding: 0 15px;
    }
    .el-input__suffix-inner {
      line-height: 30px;
    }
  }
}
</style>
