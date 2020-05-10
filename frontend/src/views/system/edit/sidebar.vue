<template>
  <div :class="$style.sidebar">
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
import { packages } from '@/views/system/edit/config.js'

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
        utils.getId('element'),
        require(`@/packages/${packageItem.value}/data.js`)
      ])
        .then(res => {
          const [idRes, dataRes] = res
          const id = idRes
          const { default: data } = dataRes
          const element = Object.assign({
            id,
            type: 'component',
            ...utils.deepClone(data)
          }, packageItem)
          this.$store.dispatch('setElements', this.elements.concat([element]))
        })
        .catch(() => this.$message.error('获取元件数据失败'))
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
