<template>
  <div :class="$style.configWhether">
    <el-checkbox
      :value="value"
      @input="$emit('input', $event)">
      {{label}}
    </el-checkbox>
  </div>
</template>

<script>
export default {
  name: 'ConfigWhether',

  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    },

    label: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.config-whether {
  height: 24px;
  line-height: 32px;
  :global {
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: $--color-text-regular;
    }
    .el-checkbox__label {
      font-size: 13px;
    }
  }
}
</style>
