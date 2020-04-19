<template>
  <el-checkbox-group v-model="checkValue" :class="$style.mCheckbox">
    <el-checkbox
      v-for="option in options"
      :key="option.label"
      :label="option.label">
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'MCheckbox',

  props: {
    checkValue: {
      type: Array,
      required: true,
      default: () => []
    },

    options: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style lang="scss" module>
.m-checkbox {

}
</style>
