<template>
  <div :class="$style.configRadio">
    <span class="config-label">{{label}}</span>
    <el-radio-group
      :value="value"
      @input="$emit('input', $event)"
      size="small"
      class="radio-group">
      <el-radio-button
        v-for="item in options"
        :key="item.value"
        :label="item.value">
        {{item.label}}
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'ConfigRadio',

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

    options: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style lang="scss" module>
.config-radio {
  :global {
    .config-label {
      width: 55px;
      display: inline-block;
      line-height: 32px;
      vertical-align: top;
      font-size: 13px;
    }
    .radio-group {
      width: calc(100% - 65px);
      margin-left: 10px;
    }
  }
}
</style>
