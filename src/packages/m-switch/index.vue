<template>
  <!--todo 点击时会改变值-->
  <el-switch
    v-model="switchValue"
    :active-text="text.data">
  </el-switch>
</template>

<script>
export default {
  name: 'MSwitch',

  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({})
    },

    switchValue: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      ...this.content
    }
  }
}
</script>
