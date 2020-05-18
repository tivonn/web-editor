<template>
  <div :class="$style.configInput">
    <p class="config-label">{{label}}</p>
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
    .input-value {
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
