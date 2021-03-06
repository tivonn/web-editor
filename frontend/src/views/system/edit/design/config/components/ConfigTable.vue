<template>
  <div class="clear-fix" :class="$style.configTable">
    <p class="config-label">{{label}}</p>
    <el-table
      :data="value"
      size="small">
      <el-table-column
        v-for="col in cols"
        :key="col.key"
        :label="col.label"
        :width="col.width"
        :align="col.align">
        <template slot-scope="scope">
          <template
            v-for="item in getComponents(col, scope)">
            <component
              :key="item.key"
              :is="item.component"
              :value="value[scope.$index][item.key]"
              @input="componentValue => updateRow(componentValue, scope.$index, item.key)"
              v-bind="item.props"
              @trigger="triggerElement(item.key)">
            </component>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-if="operations.delete"
        :width="operations.delete.width"
        align="right">
        <template slot-scope="scope">
          <icon
            svg-id="iconshanchu"
            size="18px"
            :title="operations.delete.label"
            color="#999"
            class="delete-row"
            :class="getAddClass"
            @click="deleteRow(scope.$index)">
          </icon>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="operations.add"
      size="small"
      class="add-row"
      @click="addDefault">
      {{operations.add.label}}
    </el-button>
  </div>
</template>

<script>
import utils from '@/utils/index.js'

export default {
  name: 'ConfigTable',

  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    },

    label: {
      type: String,
      required: true,
      default: ''
    },

    cols: {
      type: Array,
      required: true,
      default: () => []
    },

    default: {
      type: Object,
      required: false,
      default: () => ({})
    },

    operations: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  computed: {
    canDelete () {
      return this.operations.delete && this.value.length > 1
    },

    getAddClass () {
      return {
        disabled: !this.canDelete
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.setDefault()
    },

    setDefault () {
      if (!this.value.length) {
        this.addDefault()
      }
    },

    addDefault () {
      this.$emit('input', this.value.concat([utils.deepClone(this.default)]))
    },

    deleteRow (index) {
      if (!this.canDelete) return
      this.$emit('input', this.value.slice(0, index).concat(this.value.slice(index + 1, this.value.length)))
      this.$emit('trigger', 'delete')
    },

    updateRow (componentValue, rowIndex, key) {
      this.$emit('update-item', {
        index: rowIndex,
        itemUpdateData: {
          [key]: componentValue
        }
      })
    },

    getComponents (col, scope) {
      return col.list.filter(item => !(item.removes && item.removes.some(remove => remove(this.value[scope.$index]))))
    },

    triggerElement (key) {
      this.$emit('trigger', key)
    }
  },

  components: Object.assign({},
    utils.importFiles(require.context('@/views/system/edit/design/config/components', false, /\.vue$/))
  )
}
</script>

<style lang="scss" module>
.config-table {
  :global {
    .config-label {
      line-height: 32px;
      font-size: 13px;
    }
    th {
      padding-top: 0;
      .cell {
        font-size: 13px;
        font-weight: normal;
      }
    }
    .delete-row {
      vertical-align: -0.3em;
      cursor: pointer;
      &:hover:not(.disabled) {
        fill: $--color-danger !important;
      }
      &.disabled {
        cursor: not-allowed;
      }
    }
    .add-row {
      float: right;
      margin-top: 6px;
    }
  }
}
</style>
