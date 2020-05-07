<template>
  <div :class="$style.configInput">
    <p class="input-label">{{label}}</p>
    <el-input
      :value="value"
      @input="$emit('update', $event)"
      :type="type"
      :rows="rows"
      size="small">
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
      line-height: 24px;
    }
    .el-input__suffix-inner {
      line-height: 30px;
    }
  }
}
</style>
