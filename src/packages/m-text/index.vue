<template>
  <p :class="$style.mText">{{text}}</p>
</template>

<script>
export default {
  name: 'MText',

  props: {
    text: {
      type: String,
      required: false,
      default: '文本'
    }
  }
}
</script>

<style lang="scss" module>
.m-text {

}
</style>
