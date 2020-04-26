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
    inputValue: {
      type: String,
      required: false,
      default: ''
    },

    placeholder: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>
