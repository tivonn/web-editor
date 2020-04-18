<template>
  <el-button
    :type="type"
    :class="$style.mButton">
    {{text}}
  </el-button>
</template>

<script>
export default {
  name: 'MButton',

  props: {
    type: {
      type: String,
      required: false,
      default: 'primary'
    },

    text: {
      type: String,
      required: false,
      default: '按钮'
    }
  }
}
</script>

<style lang="scss" module>
.m-button {

}
</style>
