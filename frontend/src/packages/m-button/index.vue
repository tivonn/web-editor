<template>
  <el-button
    :type="type">
    {{text.staticData[textField]}}
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
  },

  computed: {
    textField () {
      return this.text.parses.find(parse => parse.property === '文本').field
    }
  }
}
</script>
