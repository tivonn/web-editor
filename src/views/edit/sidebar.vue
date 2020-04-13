<template>
  <div :class="$style.sidebar">
    <p class="package-title">组件</p>
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
import { packages } from '@/views/edit/config.js'
import { guid } from '@/utils/tool.js'

export default {
  name: 'EditSidebar',

  data () {
    return {
      packages
    }
  },

  computed: {
    ...mapGetters([
      'elements'
    ])
  },

  methods: {
    selectPackage (packageItem) {
      const element = Object.assign({
        id: guid() // todo
      }, packageItem)
      this.$store.dispatch('setElements', this.elements.concat([element]))
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
    .package-title {
      padding: 0 10px;
      line-height: 32px;
    }
    .package-table {
      width: 100%;
      border-collapse: collapse;
    }
    .package-table, .package-row, .package-item {
      border: 1px solid $--color-border;
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
