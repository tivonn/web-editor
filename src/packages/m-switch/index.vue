<template>
  <el-switch
    v-model="switchValue"
    :active-text="activeText">
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

    activeText: {
      type: String,
      required: false,
      default: '开关'
    }
  }
}
</script>

<style lang="scss" module>
.m-switch {
  :global {

  }
}
</style>
