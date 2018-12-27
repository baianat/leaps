export default {
  name: "Leaps",
  props: {
    from: {
      default: {},
      type: Object
    },
    to: {
      default: {},
      type: Object
    },
    transition: {
      default: 1000,
      type: Number
    }
  },
  data () {
    return {
      leaps: {}
    }
  },
  methods: {
  },
  mounted () {
  },
  render () {
    return this.$scopedSlots.default({
      leaps: this.leaps
    });
  }
}
