module.exports = (systemId) => {
  const template =
`export default {
  data () {
    return {
      systemId: ${systemId}
    }
  },
      
  computed: {
    pageId () {
      return this.$route.params.pid
    }
  },
     
  watch: {
    systemId: {
      handler () {
        this.getSystem()
      },
      immediate: true
    },
        
    pageId: {
      handler () {
        this.getPage()
      }
      // immediate: true
    }
  },
    
  methods: {
    getSystem () {
      this.$store.dispatch('setSystem', require('@/views/system/data.js').default)
    },
 
    getPage () {
      this.$store.dispatch('setElements', require(\`@/views/\${this.pageId}/data.js\`).default)
    }
  }
}`
  return template
}
