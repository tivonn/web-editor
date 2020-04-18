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
import tools from '@/utils/tools.js'

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
      Promise.all([
        import('@/packages/m-text/data.js'),
        import('@/packages/m-text/config.js')
      ])
        .then(res => {
          const [dataRes, configRes] = res
          const { default: data } = dataRes
          const { default: config } = configRes
          const element = Object.assign({
            id: tools.guid(),
            data: tools.deepClone(data),
            config: tools.deepClone(config)
          }, packageItem)
          this.$store.dispatch('setElements', this.elements.concat([element]))
        })
        .catch(() => this.$message.error('获取组件数据失败'))
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
    .package-title {
      padding: 0 10px;
      line-height: 32px;
    }
    .package-table {
      width: 100%;
      border-collapse: collapse;
    }
    .package-item {
      border: 1px solid $--color-border;
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
