<template>
  <div
    :class="$style.elementList"
    @click="$emit('click', $event)"
    @mousemove="$emit('mousemove', $event)">
    <element-item
      v-for="element in elements"
      :key="element.id"
      :element="element">
    </element-item>
  </div>
</template>

<script>
import ElementItem from '@/views/system/components/ElementItem.vue'

export default {
  name: 'ElementList',

  props: {
    elements: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  components: {
    ElementItem
  }
}
</script>

<style lang="scss" module>
.element-list {
  width: 100%;
  height: 100%;
}
</style>
