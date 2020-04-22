<template>
  <router-view/>
</template>

<script>
export default {
  name: 'System',

  computed: {
    systemtId () {
      return Number(this.$route.params.sid)
    },

    pageId () {
      return Number(this.$route.params.pid)
    }
  },

  watch: {
    systemtId: {
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
      this.$store.dispatch('setSystem', this.systemtId)
    },

    getPage () {
      this.$store.dispatch('setPage', this.pageId)
    }
  }
}
</script>
