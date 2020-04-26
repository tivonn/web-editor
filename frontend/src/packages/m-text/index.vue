<template>
  <p :style="getTextStyle">{{text.data}}</p>
</template>

<script>
export default {
  name: 'MText',

  props: {
    text: {
      type: Object,
      required: false,
      default: () => ({})
    },

    size: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  computed: {
    getTextStyle () {
      return {
        fontSize: `${this.size.fontSize}px`
      }
    }
  }
}
</script>
