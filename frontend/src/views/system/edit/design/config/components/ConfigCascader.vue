<template>
  <div :class="$style.configSelect">
    <span v-if="label" class="config-label">{{label}}</span>
    <el-cascader
      :value="value"
      @input="$emit('input', $event)"
      size="small"
      :options="actualOptions"
      :show-all-levels="false"
      :props="{ label: optionLabel, value: optionValue, children: 'childrens' }"
      :style="getSelectStyle">
    </el-cascader>
  </div>
</template>

<script>
import store from '@/store/index.js'
import utils from '@/utils/index.js'

export default {
  name: 'ConfigCascader',

  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    options: {
      type: [Array, String],
      required: true,
      default: () => []
    },

    optionLabel: {
      type: String,
      required: false,
      default: 'label'
    },

    optionValue: {
      type: String,
      required: false,
      default: 'value'
    }
  },

  computed: {
    getSelectStyle () {
      return {
        width: !this.label ? '100%' : 'calc(100% - 65px)',
        marginLeft: !this.label ? '0' : '10px'
      }
    },

    actualOptions () {
      // options在config中会提前生成，导致vuex变量不会实时更新，所以传入key，在组件中获取
      return utils.isArray(this.options) ? this.options : store.getters[this.options]
    }
  }
}
</script>

<style lang="scss" module>
.config-cascader {
  :global {
    .config-label {
      width: 55px;
      display: inline-block;
      line-height: 32px;
      vertical-align: top;
      font-size: 13px;
    }
  }
}
</style>
