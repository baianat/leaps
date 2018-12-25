let OBSERVER_FLAG;
let ALL_ELEMENTS = [];
let SCROLLED = 0;

function unobserve (el) {
  // todo:
}

function observe (el) {
  if (!OBSERVER_FLAG) { 
    initObserver();
   }
  ALL_ELEMENTS.push(el);
}

function initObserver () {
  // scroll optimization https://developer.mozilla.org/en-US/docs/Web/Events/scroll
  OBSERVER_FLAG = true;
  window.addEventListener('scroll', () => {
    SCROLLED = window.scrollY;
    let ticking = false;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        ALL_ELEMENTS.forEach(el => el.animate());
        ticking = false;
      });
      ticking = true;
    }
  }, {
    passive: true
  });
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
    init () {
      observe(this);
      this.initDefaults();
    },
    initDefaults () {
      SCROLLED = window.scrollY;
      const elRect = this.$el.getBoundingClientRect();
      this.elRect = {
        top: elRect.top + SCROLLED,
        bottom: elRect.bottom + SCROLLED,
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
    update () {
      this.viewportHeight = window.innerHeight;
      this.viewportWidth = window.innerWidth;
      this.animate();
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
    animate () {
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
    this.init();
    this.update();
  },
  render () {
    return this.$scopedSlots.default({
      parallax: this.parallax
    });
  },
}
