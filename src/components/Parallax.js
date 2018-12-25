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
    translateX: {
      type: Array
    },
    translateY: {
      type: Array
    },
    rotate: {
      type: Array
    },
    scale: {
      type: Array
    },
    opacity: {
      type: Array
    },
    finishRatio: {
      default: 1,
      type: Number
    }
  },
  data () {
    return {
      scrolled: 0,
      viewportHeight: 0,
      viewportWidth: 0,
      moved: 0,
      elRect: null,
      output: {},
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
      this.denominator = this.finishRatio * this.viewportHeight + (this.translateY ? this.translateY[1] : 0);
      ['translateX', 'translateY', 'scale', 'rotate', 'opacity'].forEach(trans => {
        if (!this[trans]) return;
        this.unitPerScroll[trans] = this.valuePerScroll(this[trans]);
      });
    },
    valuePerScroll ([start, end]) {
      return (end - start) / this.denominator;
    },
    inViewport () {
      return SCROLLED <= this.elRect.bottom &&
             SCROLLED >= this.elRect.top - this.viewportHeight;
    },
    getValue ([start, end], uPS) {
      const upperBound = Math.max(start, end);
      const lowerBound = Math.min(start, end);
      return Math.max(Math.min(start + uPS * this.moved, upperBound), lowerBound);
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
        ['translateX', 'translateY', 'scale', 'rotate', 'opacity'].forEach(trans => {
          if (!this[trans]) return;
          this.output[trans] = this.getValue(this[trans], this.unitPerScroll[trans])
        });
        this.parallax = {
          translateX: this.output.translateX || 0,
          translateY: this.output.translateY || 0,
          rotate: this.output.rotate || 0,
          scale: this.output.scale || 1,
          opacity: this.output.opacity || 1
        }
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
