<template>
  <p>{{text.data}}</p>
</template>

<script>
export default {
  name: 'MText',

  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  data () {
    return {
      ...this.content
    }
  }
}
</script>
