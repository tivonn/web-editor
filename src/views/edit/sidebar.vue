<template>
  <div :class="$style.sidebar">
    <p class="element-title">组件</p>
    <table class="element-table">
      <tr
        v-for="rowIndex in Math.ceil(elements.length / 3)"
        :key="rowIndex"
        class="element-row">
        <td
          v-for="element in elements.slice((rowIndex - 1) * 3, rowIndex * 3)"
          :key="element.name"
          class="element-item"
          @click="selectElement(element)">
          <p>{{element.name}}</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { elements } from '@/views/edit/config.js'

export default {
  name: 'EditSidebar',

  data () {
    return {
      elements
    }
  },

  methods: {
    selectElement (element) {
      element.id = 1 // todo
      this.$store.dispatch('addElement', element)
    }
  }
}
</script>

<style lang="scss" module>
.sidebar {
  width: 301px;
  height: 100%;
  display: inline-block;
  border-right: 1px solid $--color-border;
  vertical-align: middle;
  :global {
    .element-title {
      padding: 0 10px;
      line-height: 32px;
    }
    .element-table {
      width: 100%;
      border-collapse: collapse;
    }
    .element-table, .element-row, .element-item {
      border: 1px solid $--color-border;
    }
    .element-item {
      width: calc(100% / 3);
      padding: 5px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: $--color-success;
      }
    }
  }
}
</style>
