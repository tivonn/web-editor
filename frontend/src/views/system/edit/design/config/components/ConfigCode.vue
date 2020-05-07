<template>
  <div :class="$style.configCode">
    <p class="code-label">{{label}}</p>
    <div ref="editor" class="code-editor"></div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/json-lint.js'
import jsonlint from 'jsonlint'
window.jsonlint = jsonlint

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
      editor = CodeMirror(this.$refs.editor, {
        theme: 'monokai',
        mode: 'application/json',
        lineNumbers: true,
        tabSize: 2,
        gutters: ['CodeMirror-lint-markers'],
        lint: true
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
    .code-label {
      line-height: 24px;
    }
    .code-editor {
      margin-top: 1px;
    }
  }
}
</style>
