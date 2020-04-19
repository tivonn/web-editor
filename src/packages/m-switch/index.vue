<template>
  <el-switch
    v-model="switchValue"
    v-bind="{
      activeText
    }">
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
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.m-switch {

}
</style>
