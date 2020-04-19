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
    content: {
      type: Object,
      required: true,
      default: () => ({})
    },

    type: {
      type: String,
      required: false,
      default: 'primary'
    }
  },

  data () {
    return {
      ...this.content
    }
  }
}
</script>
