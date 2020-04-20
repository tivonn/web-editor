<template>
  <div
    :class="$style.preview"
    :style="getPreviewStyle">
    <render-element
        v-for="element in elements"
        :key="element.id"
        :element="element"
        class="render-element"
        :style="getElementStyle(element)">
      </render-element>
  </div>
</template>

<script>
import RenderElement from '@/components/RenderElement.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Preview',

  data () {
    return {
      elements: []
    }
  },

  computed: {
    ...mapGetters([
      'system'
    ]),

    getPreviewStyle () {
      const { width, height } = this.system
      return {
        minWidth: width ? `${width}px` : '100%',
        minHeight: height ? `${height}px` : '100%'
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.getPage()
    },

    getPage () {
      const { sid, pid } = this.$route.params
      this.elements = JSON.parse(localStorage.getItem(`${sid}-${pid}`) || [])
    },

    getElementStyle (element) {
      const { xCoordinate, yCoordinate } = element.data.style.position
      return {
        left: `${xCoordinate || 0}px`,
        top: `${yCoordinate || 0}px`
      }
    }
  },

  components: {
    RenderElement
  }
}
</script>

<style lang="scss" module>
.preview {
  width: 100%;
  height: 100%;
  border: 10px solid #55c580;
  :global {
    .render-element {
      position: absolute;
    }
  }
}
</style>
