<template>
  <div :class="$style.configSelect">
    <span v-if="label" class="config-label">{{label}}</span>
    <el-select
      :value="value"
      @input="$emit('input', $event)"
      size="small"
      :style="getSelectStyle">
      <el-option
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionLabel]"
        :value="item[optionValue]">
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
    },

    optionLabel: {
      type: String,
      required: false,
      default: 'label'
    },

    optionValue: {
      type: String,
      required: false,
      default: 'value'
    }
  },

  computed: {
    getSelectStyle () {
      return {
        width: !this.label ? '100%' : 'calc(100% - 65px)',
        marginLeft: !this.label ? '0' : '10px'
      }
    }
  }
}
</script>

<style lang="scss" module>
.config-select {
  :global {
    .config-label {
      width: 55px;
      display: inline-block;
      line-height: 32px;
      vertical-align: top;
      font-size: 13px;
    }
  }
}
</style>
