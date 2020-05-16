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
    pageId: 'getPage'
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.getSystem()
        .then(() => this.getPage())
    },

    getSystem () {
      return this.$store.dispatch('setSystem', this.systemId)
    },

    getPage () {
      this.$store.dispatch('setPage', this.pageId)
    }
  }
}
</script>
