<template>
  <el-button
    :type="type">
    {{text.data}}
  </el-button>
</template>

<script>
export default {
  name: 'MButton',

  props: {
    text: {
      type: Object,
      required: false,
      default: () => ({})
    },

    type: {
      type: String,
      required: false,
      default: 'primary'
    }
  }
}
</script>
