<template>
  <el-input
    v-model="inputValue"
    :placeholder="placeholder"
    :class="$style.mInput">
  </el-input>
</template>

<script>
export default {
  name: 'MInput',

  props: {
    inputValue: {
      type: String,
      required: false,
      default: ''
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

}
</style>
