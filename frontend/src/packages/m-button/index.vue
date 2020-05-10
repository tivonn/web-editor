<template>
  <el-button
    :type="type">
    {{data.source[dataField]}}
  </el-button>
</template>

<script>
export default {
  name: 'MButton',

  props: {
    data: {
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
    dataField () {
      return this.data.parses.find(parse => parse.property === '文本').field
    }
  }
}
</script>
