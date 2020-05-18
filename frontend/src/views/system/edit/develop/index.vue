<template>
  <div :class="$style.develop">
    <develop-code></develop-code>
  </div>
</template>

<script>
import DevelopCode from '@/views/system/edit/develop/code.vue'

export default {
  name: 'Develop',

  components: {
    DevelopCode
  }
}
</script>

<style lang="scss" module>
.develop {
  width: 100%;
  height: 100%;
}
</style>
