<template>
  <el-switch
    v-model="switchValue"
    :active-text="text.data">
  </el-switch>
</template>

<script>
export default {
  name: 'MSwitch',

  props: {
    switchValue: {
      type: Boolean,
      required: false,
      default: false
    },

    text: {
      type: Object,
      required: false,
      default: () => ({})
    }
  }
}
</script>
