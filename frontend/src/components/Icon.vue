<script type="text/babel">
export default {
  name: 'iconfont',

  functional: true,

  props: {
    svgId: {
      type: String,
      required: true
    },

    size: {
      type: String,
      default: '16px'
    },

    color: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    }
  },

  render (h, context) {
    const props = context.props
    return (
      <svg class="iconfont"
        {...context.data }
        style={{ width: props.size, height: props.size, fill: props.color }}>
        { props.title ? <title>{ props.title }</title> : '' }
        <use href={'#' + props.svgId}></use>
      </svg>
    )
  }
}
</script>
