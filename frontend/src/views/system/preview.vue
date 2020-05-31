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
import ElementList from '@/views/system/components/ElementList.vue'
import { mapGetters } from 'vuex'
import utils from '@/utils/index.js'

export default {
  // todo 复制时动态生成
  name: 'Preview',

  computed: {
    ...mapGetters([
      'system',
      'elements'
    ]),

    getPreviewStyle () {
      const { width, height } = this.system.style
      return {
        minWidth: width ? `${width}px` : '100%',
        minHeight: height ? `${height}px` : '100%'
      }
    }
  },

  provide () {
    return {
      isEdit: false,
      getElementStyle: this.getElementStyle
    }
  },

  methods: {
    getElementStyle (element) {
      const { xCoordinate, yCoordinate } = element.style.position
      const hasParent = !!element.parentId
      let parentPosition
      if (hasParent) {
        parentPosition = utils.getValueFromObj(utils.deepQuery(this.elements, element.parentId), 'style.position')
      }
      return {
        // 1px为边框
        left: `${Number(xCoordinate) - (hasParent ? Number(parentPosition.xCoordinate) + 1 : 0)}px`,
        top: `${Number(yCoordinate) - (hasParent ? Number(parentPosition.yCoordinate) + 1 : 0)}px`
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
