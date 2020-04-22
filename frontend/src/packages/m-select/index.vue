<template>
  <!--todo 拖拽时自动下拉-->
  <el-select
    v-model="selectValue"
    :placeholder="placeholder.data">
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
      default: null
    },

    options: {
      type: Array,
      required: false,
      default: () => []
    },

    placeholder: {
      type: Object,
      required: false,
      default: () => ({})
    }
  }
}
</script>
