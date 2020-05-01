<template>
  <div
    :class="$style.preview"
    :style="getPreviewStyle">
    <element-list
      :elements="elements">
    </element-list>
  </div>
</template>

<script>
import ElementList from '@/components/ElementList.vue'
import { mapGetters } from 'vuex'

export default {
  // todo 复制时动态生成
  name: 'Preview',

  computed: {
    ...mapGetters([
      'system',
      'elements'
    ]),

    getPreviewStyle () {
      const { width, height } = this.system
      return {
        minWidth: width ? `${width}px` : '100%',
        minHeight: height ? `${height}px` : '100%'
      }
    }
  },

  provide () {
    return {
      getElementStyle: this.getElementStyle
    }
  },

  methods: {
    getElementStyle (element, fromCombination, combinationPosition) {
      const { xCoordinate, yCoordinate } = element.data.style.position
      return {
        // 1px为边框
        left: `${Number(xCoordinate) - (fromCombination ? Number(combinationPosition.xCoordinate) + 1 : 0)}px`,
        top: `${Number(yCoordinate) - (fromCombination ? Number(combinationPosition.yCoordinate) + 1 : 0)}px`
      }
    }
  },

  components: {
    ElementList
  }
}
</script>

<style lang="scss" module>
.preview {
  width: 100%;
  height: 100%;
  border: 10px solid #55c580;
  :global {
    .element-item {
      position: absolute;
    }
  }
}
</style>
