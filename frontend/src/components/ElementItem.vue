<template>
  <div
    v-if="isComponent"
    :id="element.id"
    class="element-item"
    :class="[getElementClass(element)]"
    :style="[getElementStyle(element, fromCombination, combinationPosition), selfGetElementStyle]">
    <div ref="element"></div>
  </div>
  <element-list
    v-else
    :id="element.id"
    :elements="element.children"
    from-combination
    :combination-position="element.data.style.position"
    class="element-item"
    :class="[getElementClass(element)]"
    :style="[getElementStyle(element), selfGetElementStyle]">
  </element-list>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'ElementItem',

  inject: {
    getElementClass: {
      default: () => () => {}
    },

    getElementStyle: {
      default: () => () => {}
    }
  },

  props: {
    element: {
      type: Object,
      required: true,
      default: () => ({})
    },

    fromCombination: {
      type: Boolean,
      required: false,
      default: false
    },

    combinationPosition: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  computed: {
    isComponent () {
      return this.element.type === 'component'
    },

    selfGetElementStyle () {
      const { width, height } = this.element.data.style.size
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.mountElement()
    },

    mountElement () {
      if (!this.isComponent) return
      const { value, data } = this.element
      const { style, content, interact } = data
      const Package = Vue.extend(require(`../packages/${value}/index.vue`).default)
      new Package({
        propsData: {
          ...style,
          ...content,
          ...interact
        }
      }).$mount(this.$refs.element)
    }
  },

  components: {
    ElementList: () => import('@/components/ElementList.vue') // 为了解决递归调用时报Unknown custom element的错误
  }
}
</script>
