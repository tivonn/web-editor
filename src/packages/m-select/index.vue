<template>
  <!--todo 点击不生效-->
  <el-select
    v-model="selectValue"
    :placeholder="placeholder.data">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MSelect',

  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({})
    },

    selectValue: {
      type: null,
      required: false,
      default: null
    },

    options: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data () {
    return {
      ...this.content
    }
  }
}
</script>
