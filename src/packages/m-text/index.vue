<template>
  <p :class="$style.text">{{text}}</p>
</template>

<script>
export default {
  name: 'MText',

  props: {
    text: {
      type: String,
      required: true,
      default: '文本'
    }
  }
}
</script>

<style lang="scss" module>
.text {

}
</style>
