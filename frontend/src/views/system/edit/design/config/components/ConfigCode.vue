<template>
  <div :class="$style.configCode">
    <p class="config-label">{{label}}</p>
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

    elementId: {
      type: Number,
      required: true,
      default: 0
    },

    label: {
      type: String,
      required: true,
      default: ''
    }
  },

  watch: {
    elementId: {
      handler () {
        this.setEditor()
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.initEditor()
      this.setEditor()
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
      editor.on('blur', () => {
        try {
          this.$emit('input', JSON.parse(editor.getValue()))
        } catch {
          this.$message.warning('格式错误')
        }
      })
    },

    setEditor () {
      editor.setValue(JSON.stringify(this.value, null, '\t'))
    }
  }
}
</script>

<style lang="scss" module>
.config-code {
  :global {
    .config-label {
      line-height: 32px;
      font-size: 13px;
    }
    .code-editor {
      margin-top: 1px;
    }
  }
}
</style>
