<template>
  <el-select
    v-model="selectValue"
    v-bind="{
      placeholder
    }">
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
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.m-input {

}
</style>
