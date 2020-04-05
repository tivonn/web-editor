<template>
  <el-select
    v-model="selectValue"
    :placeholder="placeholder">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MSelect',

  props: {
    selectValue: {
      type: null,
      required: false,
      default: 1
    },

    options: {
      type: Array,
      required: false,
      default: () => [{
        value: 1,
        label: '选项1'
      }, {
        value: 2,
        label: '选项2'
      }, {
        value: 3,
        label: '选项3'
      }]
    },

    placeholder: {
      type: String,
      required: false,
      default: '请输入内容'
    }
  }
}
</script>

<style lang="scss" module>
.m-input {
  :global {

  }
}
</style>
