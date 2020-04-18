<template>
  <div>
    <p>{{label}}</p>
    <el-input
      :value="value"
      @input="$emit('input', $event)"
      size="small"
      :class="$style.configInput">
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'configInput',

  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },

    label: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.config-input {

}
</style>
