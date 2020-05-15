<template>
  <router-view/>
</template>

<script>
export default {
  name: 'System',

  computed: {
    systemId () {
      return Number(this.$route.params.sid)
    },

    pageId () {
      return Number(this.$route.params.pid)
    }
  },

  provide () {
    return {
      systemId: this.systemId,
      pageId: this.pageId
    }
  },

  watch: {
    // todo asnyc system and page
    systemId: {
      handler () {
        this.getSystem()
      },
      immediate: true
    },

    pageId: {
      handler () {
        this.getPage()
      },
      immediate: true
    }
  },

  methods: {
    getSystem () {
      this.$store.dispatch('setSystem', this.systemId)
    },

    getPage () {
      this.$store.dispatch('setPage', this.pageId)
    }
  }
}
</script>
