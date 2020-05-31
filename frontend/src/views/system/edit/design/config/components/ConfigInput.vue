<template>
  <div :class="$style.configInput">
    <span v-if="label" class="config-label">{{label}}</span>
    <span
      v-if="canToggle && !showInput"
      class="input-value"
      @click="showInput = true">
      {{value}}
    </span>
    <el-input
      v-else
      :value="value"
      @input="$emit('input', $event)"
      ref="input"
      size="small"
      :type="type"
      :rows="rows"
      :placeholder="placeholder"
      :style="getInputStyle"
      @blur="blurInput">
      <template slot="suffix">{{suffix}}</template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'ConfigInput',

  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    canToggle: {
      type: Boolean,
      required: false,
      default: false
    },

    type: {
      type: String,
      required: false,
      default: 'text'
    },

    rows: {
      type: Number,
      required: false,
      default: 0
    },

    placeholder: {
      type: String,
      required: false,
      default: ''
    },

    suffix: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      showInput: !this.canToggle
    }
  },

  computed: {
    getInputStyle () {
      return {
        width: !this.label ? '100%' : 'calc(100% - 65px)',
        marginLeft: !this.label ? '0' : '10px'
      }
    }
  },

  watch: {
    showInput: {
      handler (newValue) {
        if (newValue && this.canToggle) {
          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        }
      },
      immediate: true
    }
  },

  methods: {
    blurInput () {
      if (this.canToggle) {
        this.showInput = false
      }
      this.$emit('trigger')
    }
  }
}
</script>

<style lang="scss" module>
.config-input {
  :global {
    .config-label {
      width: 55px;
      display: inline-block;
      line-height: 32px;
      vertical-align: top;
      font-size: 13px;
    }
    .input-value {
      width: 100%;
      height: 100%;
      display: inline-block;
      line-height: 32px;
      cursor: pointer;
    }
    .el-input__inner {
      padding: 0 15px;
    }
    .el-input__suffix-inner {
      line-height: 30px;
    }
  }
}
</style>
