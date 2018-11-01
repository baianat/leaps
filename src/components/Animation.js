export default {
  name: 'Animation',
  functional: true,
  props: {
    duration: {
      type: String,
      default: '1s'
    },
    delay: {
      type: String,
      default: '0'
    },
    iteration: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: ''
    },
    animateClass: {
      type: String,
      default: 'animated'
    },
    lazy: {
      type: Boolean,
      default: false
    },
  },
  render (h, ctx) {
    const data = {
      attrs: ctx.data.attrs,
      directives: [
        { name: 'animation-observer', value: ctx.props }
      ]
    };

    return h('div', data, ctx.slots().default);
  }
};
