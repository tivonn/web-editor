<template>
  <el-collapse
    :value="activeConfig.map(block => block.key)"
    :class="$style.configCollapse">
    <el-collapse-item
      v-for="(block, blockKey) in filterCollapse(activeConfig)"
      :key="blockKey"
      :title="block.label"
      :name="block.key">
      <el-row
        v-for="(row, rowIndex) in block.list"
        :key="`${blockKey}-row${rowIndex}`"
        :gutter="row.gutter"
        class="config-row">
        <el-col
          v-for="col in row.list"
          :key="col.key"
          :span="col.span"
          :offset="col.offset">
          <component
            :is="col.component"
            :value="getValueFromObj(activeElement, getComponentKey(block, col))"
            @input="value => $emit('update-element', getComponentKey(block, col), value)"
            @update-item="value => $emit('update-element', getComponentKey(block, col), value)"
            v-bind="col.props"
            @trigger="key => triggerElement(`${getComponentKey(block, col)}${key ? `.${key}` : ''}`)">
          </component>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import utils from '@/utils/index.js'

export default {
  name: 'ConfigCollapse',

  props: {
    tab: {
      type: String,
      required: true,
      default: ''
    },

    activeElement: {
      type: Object,
      required: true,
      default: () => ({})
    },

    activeConfig: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },

  methods: {
    getComponentKey (block, col) {
      return `${this.tab}.${block.key}.${col.key}`
    },

    triggerElement (key) {
      const { id } = this.activeElement
      this.$store.dispatch('triggerElement', {
        id,
        key
      })
    },

    filterCollapse (collapse) {
      const filter = (list) => {
        return list.reduce((filterList, filterItem) => {
          if (filterItem.remove || !filterItem.list) {
            if (!(filterItem.removes && filterItem.removes.some(remove => remove(this.activeElement)))) {
              filterList.push(filterItem)
            }
          } else {
            const filterResult = Object.assign({}, filterItem, {
              list: filter(filterItem.list)
            })
            if (filterResult.list.length) {
              filterList.push(filterResult)
            }
          }
          return filterList
        }, [])
      }
      return filter(collapse)
    },

    getValueFromObj () {
      return utils.getValueFromObj(...arguments)
    }
  },

  components: Object.assign({},
    utils.importFiles(require.context('@/views/system/edit/design/config/components', false, /\.vue$/))
  )
}
</script>

<style lang="scss" module>
.config-collapse {
  :global {
    .el-collapse-item__header {
      height: 36px;
      padding: 0 6px;
      line-height: 36px;
      border-color: $--border-color-base;
      font-weight: bold;
      color: $--color-primary;
    }
    .el-collapse-item__content {
      padding: 10px 6px;
    }
    .config-row {
      & + .config-row {
        margin-top: 10px;
      }
    }
  }
}
</style>
