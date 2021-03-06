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
              :expand-on-click-node="false"
              @mouseout.native="mouseoutElement">
              <div
                slot-scope="{ node, data }"
                class="element-item"
                :style="getElementStyle(node)"
                @mousemove="mousemoveElement(data)">
                <el-checkbox
                  :value="getElementChecked(data)"
                  @change="clickElement(data, node)">
                  <span class="element-name">{{data.name}}</span>
                </el-checkbox>
                <Icon
                  svg-id="iconshanchu"
                  color="#999"
                  title="删除元件"
                  class="delete-element"
                  @click="deleteElement(data)">
                </Icon>
              </div>
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
import Operation from '@/core/operation.js'
import { packages } from '@/views/system/edit/config.js'

export default {
  name: 'DesignSidebar',

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
    getElementStyle (node) {
      return {
        paddingLeft: `${8 + node.level * 18}px`
      }
    },

    mousemoveElement: utils.throttle(function (element) {
      let current = element
      const hoverElements = [current]
      let hasParent = !!element.parentId
      while (hasParent) {
        current = utils.deepQuery(this.elements, current.parentId)
        hoverElements.push(current)
        hasParent = !!current.parentId
      }
      this.$store.dispatch('setHoverElements', hoverElements)
    }, 100),

    mouseoutElement () {
      // 为了解决mousemove的节流导致二次执行hover
      setTimeout(() => {
        this.$store.dispatch('setHoverElements', [])
      }, 100)
    },

    clickElement (element) {
      const activeElements = Operation.getActiveElements(element, true)
      this.$store.dispatch('setActiveElements', activeElements)
    },

    getElementChecked (element) {
      return this.activeElements.some(activeElement => activeElement.id === element.id)
    },

    deleteElement (element) {
      Operation.deleteElements([element])
    },

    selectPackage (packageItem) {
      const { name, value } = packageItem
      Operation.createElement(name, value)
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
  overflow: auto;
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
        position: relative;
        &:hover {
          .delete-element {
            display: inline-block;
          }
        }
      }
    }
    .element-item {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      line-height: 32px;
      .el-checkbox {
        width: calc(100% - 20px);
      }
      .el-checkbox__label {
        width: calc(100% - 14px);
      }
    }
    .element-name {
      width: 100%;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .delete-element {
      display: none;
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      &:hover {
        fill: $--color-danger !important;
      }
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
