let PARALLAX_OBSERVERS_FLAG;
let PARALLAX_ELEMENTS = [];
let SCROLLED;

// scroll optimization https://developer.mozilla.org/en-US/docs/Web/Events/scroll
function scrollHandler () {
  SCROLLED = window.scrollY;
  let ticking = false;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      PARALLAX_ELEMENTS.forEach(el => el.update());
      ticking = false;
    });
    ticking = true;
  }
}
function resizeHandler () {
  let ticking = false;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      PARALLAX_ELEMENTS.forEach(el => {
        el.updateConfig();
        el.update();
      });
      ticking = false;
    });
    ticking = true;
  }
}

function initObservers () {
  PARALLAX_OBSERVERS_FLAG = true;
  if (SCROLLED === undefined) {
    SCROLLED = window.scrollY;
  }
  window.addEventListener('scroll', scrollHandler, { passive: true });
  window.addEventListener('resize', resizeHandler, { passive: true });
}

function destroyObservers () {
  PARALLAX_OBSERVERS_FLAG = false;
  window.removeEventListener('scroll', scrollHandler, { passive: true });
  window.removeEventListener('resize', resizeHandler, { passive: true });
}

export default {
  name: "LeapsParallax",
  props: {
    from: {
      default: {},
      type: Object
    },
    to: {
      default: {},
      type: Object
    },
    finishRatio: {
      default: 1,
      type: Number
    },
    elementHeight: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      scrolled: 0,
      viewportHeight: 0,
      viewportWidth: 0,
      moved: 0,
      elRect: null,
      unitPerScroll: {},
      parallax: {}
    }
  },
  methods: {
    updateConfig () {
      const elRect = this.$el.getBoundingClientRect();
      this.elRect = {
        top: elRect.top + SCROLLED - (this.parallax.translateY || 0),
        bottom: elRect.bottom + SCROLLED - (this.parallax.translateY || 0),
        height: elRect.height,
        width: elRect.width
      }
      this.viewportHeight = window.innerHeight;
      this.viewportWidth = window.innerWidth;
      this.denominator = 
        this.finishRatio * this.viewportHeight + 
        (this.to.translateY || 0) + 
        (this.elementHeight ? this.elRect.height: 0);
      Object.keys(this.to).forEach(key => {
        this.unitPerScroll[key] = this.valuePerScroll(key);
      });
      this.parallax = Object.assign({}, this.from);
    },
    valuePerScroll (key) {
      const from = this.from[key] || 0;
      const to = this.to[key];
      return (to - from) / this.denominator;
    },
    inViewport () {
      return SCROLLED <= this.elRect.bottom &&
             SCROLLED >= this.elRect.top - this.viewportHeight;
    },
    getValue (key) {
      const from = this.from[key] || 0;
      const to = this.to[key];
      const uPS = this.unitPerScroll[key];
      const upperBound = Math.max(from, to);
      const lowerBound = Math.min(from, to);
      return Math.max(Math.min(from + uPS * this.moved, upperBound), lowerBound);
    },
    observe () {
      if (!PARALLAX_OBSERVERS_FLAG) { 
        initObservers();
       }
      PARALLAX_ELEMENTS.push(this);
    },
    unobserve () {
      PARALLAX_ELEMENTS.splice(PARALLAX_ELEMENTS.indexOf(this), 1);
      if (!PARALLAX_ELEMENTS.length) {
        destroyObservers();
      }
    },
    update () {
      if (this.inViewport()) {
        this.moved = SCROLLED - this.elRect.top + this.viewportHeight;
        Object.keys(this.to).forEach(key => {
          this.parallax[key] = this.getValue(key)
        });
      }
    }
  },
  mounted () {
    this.observe();
    this.updateConfig();
    this.update();
  },
  render () {
    return this.$scopedSlots.default({
      parallax: this.parallax
    });
  },
  destroyed () {
    this.unobserve();
  },
}
