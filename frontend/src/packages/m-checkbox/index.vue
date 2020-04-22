<template>
  <el-checkbox-group v-model="checkValue">
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
