export default {
  name: 'Animation',
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
  data () {
    return {
      loaded: false,
      style: {},
      className: {}
    }
  },
  methods: {
    start () {
      const {duration, delay, iteration, name, animateClass} = this
      this.className = [name, animateClass];
      this.style = {
        animationDuration: duration,
        animationDelay: delay,
        animationIterationCount: iteration
      }
      this.$el.addEventListener('animationend', this.end);
      this.$emit('animationStarted');
    },
    end () {
      this.className = [];
      this.style = {};
      this.$el.removeEventListener('animationend', this.end);
      this.observer.disconnect();
      this.$emit('animationEnded');
    },
  },
  created() {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          this.start();
        }
      });
    });
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  render (h) {
    return h('div', {
      attrs: this.$attrs,
      style: this.style,
      class: this.className
    }, this.$slots.default)
  }
}