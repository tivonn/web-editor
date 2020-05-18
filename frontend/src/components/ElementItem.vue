<template>
  <div
    v-if="isComponent"
    :id="element.id"
    class="element-item"
    :class="[getElementClass(element)]"
    :style="[getElementStyle(element), selfGetElementStyle]">
    <div ref="element"></div>
  </div>
  <element-list
    v-else
    :id="element.id"
    :elements="element.childrens"
    class="element-item"
    :class="[getElementClass(element)]"
    :style="[getElementStyle(element), selfGetElementStyle]">
  </element-list>
</template>

<script>
import Vue from 'vue'
import DataController from '@/core/data-controller.js'

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
    }
  },

  computed: {
    isComponent () {
      return this.element.type === 'component'
    },

    selfGetElementStyle () {
      const { width, height } = this.element.style.size
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
      DataController.init(this.element)
      const { packageType, style, content, interact } = this.element
      const Package = Vue.extend(require(`@/packages/${packageType}/index.vue`).default)
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
