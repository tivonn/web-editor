<template>
  <div :class="$style.configCode">
    <p>{{label}}</p>
    <textarea ref="codemirror"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

let editor

export default {
  name: 'ConfigCode',

  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({})
    },

    label: {
      type: String,
      required: false,
      default: ''
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.initEditor()
    },

    initEditor () {
      editor = CodeMirror.fromTextArea(this.$refs.codemirror, {
        theme: 'monokai',
        mode: 'application/json',
        lineNumbers: true,
        tabSize: 2
      })
      editor.setSize('100%', '200px')
      editor.setValue(JSON.stringify(this.value, null, '\t'))
      editor.on('blur', () => {
        try {
          this.$emit('update', JSON.parse(editor.getValue()))
        } catch {
          this.$message.warning('格式错误')
        }
      })
    }
  }
}
</script>

<style lang="scss" module>
.config-code {
  :global {

  }
}
</style>
