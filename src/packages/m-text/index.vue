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
      default: () => ({
        width: '50',
        height: '22',
        fontSize: '14'
      })
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
