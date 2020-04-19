<template>
  <el-input
    v-model="inputValue"
    :placeholder="placeholder.data">
  </el-input>
</template>

<script>
export default {
  name: 'MInput',

  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({})
    },

    inputValue: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      ...this.content
    }
  }
}
</script>
