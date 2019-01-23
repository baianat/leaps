export default {
  inject: {
    $timeline: { default: null }
  },
  name: 'Leaps',
  props: {
    from: {
      default() { return {} },
      type: Object
    },
    to: {
      default() { return {} },
      type: Object
    },
    // spring stiffness, in kg / s^2
    stiffness: {
      default: 170,
      type: Number
    },
    // damping constant, in kg / s
    damping: {
      default: 26,
      type: Number
    },
    // spring mass
    mass: {
      default: 1,
      type: Number
    },
    // initial velocity
    velocity: {
      default: 0,
      type: Number
    },
    // precision
    precision: {
      default: 0.1,
      type: Number
    },
    // animation direction, forward, reverse, or alternate
    direction: {
      default: 'forward',
      type: String
    }
  },
  data () {
    return {
      looping: '',
      frameRate: 1/60, // how many frame per ms
      start: {},
      end: {},
      leaps: {},
      velocities: {},
      isReverse: (() => this.direction === 'reverse')(),
      isAlternate: (() => this.direction === 'alternate')()
    }
  },
  computed: {
    isLeapEnd () {
      return Object.keys(this.velocities).every(key => {
        return this.velocities[key] === 0;
      })
    }
  },
  methods: {
    setup () {
      Object.keys(this.to).forEach(key => {
        this.$set(this.from, key, this.from[key] || 0);
        this.$set(this.velocities, key, this.velocity);
        this.$set(this.leaps, key, this.isReverse ? this.to[key] : this.from[key]);
      });
    },
    animate () {
      const end = this.isReverse ? this.from : this.to;
      // console.log(end.x);
      Object.keys(this.to).forEach(key => {
        let springForce = -this.stiffness * (this.leaps[key] - end[key]);
        let damperForce = -this.damping * this.velocities[key];
        let acceleration = ( springForce + damperForce ) / this.mass;

        this.velocities[key] += acceleration * this.frameRate;
        this.leaps[key] += this.velocities[key] * this.frameRate;

        if (
          this.isDumped(
            this.velocities[key],
            this.leaps[key] - end[key]
          )
        ) {
          this.velocities[key] = 0;
          this.leaps[key] = Number(end[key]);
        }
      });
    },
    leap () {
      this.animate();
      if (!this.isLeapEnd) {
        window.requestAnimationFrame(this.leap);
        return;
      }
      if (this.$timeline) {
        if (!this.$timeline.isLastFrame) {
          this.$timeline.$emit('next');
          window.requestAnimationFrame(this.leap);
        }
        return;
      }
      if (this.isAlternate) {
        this.isReverse = !this.isReverse;
        window.requestAnimationFrame(this.leap);
        return;
      }
      this.$emit('leapEnd');
    },
    isDumped (velocity, distance) {
      return Math.abs(velocity) < this.precision && Math.abs(distance) < this.precision;
    }
  },
  created() {
    this.setup();
  },
  mounted () {
    window.requestAnimationFrame(this.leap);
  },
  render () {
    return this.$scopedSlots.default({
      leaps: this.leaps
    });
  }
}
