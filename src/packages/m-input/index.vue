<template>
  <el-input
    v-model="inputValue"
    v-bind="{
      placeholder
    }"
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
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.m-input {

}
</style>
