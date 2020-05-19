<template>
  <div :class="$style.sidebar">
    <el-tabs v-model="activeTab" class="sidebar-tabs">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab.label"
        :name="tab.value">
        <template v-if="tab.value === activeTab">
          <template v-if="isPageActive">
            页面
          </template>
          <template v-if="isElementActive">
            <el-tree
              ref="elementTree"
              :data="elements"
              node-key="id"
              :props="{ children: 'childrens', label: 'name' }"
              default-expand-all
              show-checkbox
              highlight-current
              :expand-on-click-node="false"
              check-on-click-node
              @node-click="clickElement">
              <span slot-scope="{ data }" class="element-item">
                <span class="element-name">{{data.name}}</span>
                <span class="delete-element" @click="deleteElement(data)">delete</span>
              </span>
            </el-tree>
          </template>
        </template>
      </el-tab-pane>
    </el-tabs>
    <p class="package-title">元件</p>
    <table class="package-table">
      <tr
        v-for="rowIndex in Math.ceil(packages.length / 3)"
        :key="rowIndex"
        class="package-row">
        <td
          v-for="packageItem in packages.slice((rowIndex - 1) * 3, rowIndex * 3)"
          :key="packageItem.name"
          class="package-item"
          @click="selectPackage(packageItem)">
          <p>{{packageItem.name}}</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import utils from '@/utils/index.js'
import coreUtils from '@/core/utils.js'
import { packages } from '@/views/system/edit/config.js'

export default {
  name: 'EditSidebar',

  data () {
    return {
      activeTab: 'element',
      tabs: [
        {
          label: '页面总览',
          value: 'page'
        },
        {
          label: '元件总览',
          value: 'element'
        }
      ],
      packages
    }
  },

  computed: {
    ...mapGetters([
      'elements',
      'activeElements'
    ]),

    isPageActive () {
      return this.activeTab === 'page'
    },

    isElementActive () {
      return this.activeTab === 'element'
    }
  },

  watch: {
    activeElements (newValue) {
      this.$refs.elementTree[0].setCheckedKeys(newValue.map(activeElement => activeElement.id))
    }
  },

  methods: {
    clickElement (element, node) {
      const isSelected = !node.checked
      let activeElements
      if (isSelected) {
        activeElements = this.activeElements.filter(activeElement => activeElement.id !== element.id)
      } else {
        activeElements = this.activeElements.concat([element])
      }
      this.$store.dispatch('setActiveElements', activeElements)
    },

    selectPackage (packageItem) {
      Promise.all([
        utils.getId('element'),
        require(`@/packages/${packageItem.value}/data.js`)
      ])
        .then(res => {
          const [idRes, dataRes] = res
          const id = idRes
          const { default: data } = dataRes
          const { name, value: packageType } = packageItem
          const count = coreUtils.getCount(this.elements, true, packageType)
          const element = Object.assign({
            id,
            type: 'component',
            ...utils.deepClone(data)
          }, {
            name: `${name}-${count + 1}`,
            packageType
          })
          this.$store.dispatch('setElements', this.elements.concat([element]))
        })
        .catch(() => this.$message.error('获取元件数据失败'))
    },

    deleteElement (data) {
      console.log(data)
      // this.$store.dispatch('setElements',
      //   this.elements
      //     .filter(element =>
      //       this.activeElements
      //         .every(activeElement => activeElement.id !== element.id)
      //     )
      // )
      // this.$store.dispatch('setActiveElements', [])
    }
  }
}
</script>

<style lang="scss" module>
.sidebar {
  width: 300px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  :global {
    .sidebar-tabs {
      height: 410px;
      .el-tabs__header {
        margin-bottom: 0;
      }
      .el-tabs__nav {
        width: 100%;
      }
      .el-tabs__item {
        width: 50%;
        padding: 0;
        text-align: center;
        font-weight: bold;
        color: $--color-text-regular;
        &.is-active {
          color: $--color-primary;
        }
        &.is-disabled {
          font-weight: unset;
          color: $--color-disabled;
          cursor: not-allowed;
        }
      }
      .el-tabs__active-bar {
        width: 50% !important;
      }
      .el-tabs__content {
        height: calc(100% - 40px);
        padding: 5px 0;
        overflow: auto;
      }
      .el-tree-node__content {
        height: 32px;
      }
    }
    .element-item {
      width: 100%;
      display: inline-block;
    }
    .element-name {
      width: 170px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .delete-element {
      float: right;
    }
    .package-title {
      padding: 0 10px;
      line-height: 32px;
    }
    .package-table {
      width: 100%;
      border-collapse: collapse;
    }
    .package-item {
      border: 1px solid $--border-color-base;
      &:nth-child(1) {
        border-left: none;
      }
      &:nth-child(3) {
        border-right: none;
      }
    }
    .package-item {
      width: calc(100% / 3);
      padding: 5px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
    }
  }
}
</style>
