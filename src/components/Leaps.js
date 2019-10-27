export default {
  name: 'Leaps',
  props: {
    from: {
      default() {
        return {};
      },
      type: Object,
    },
    to: {
      default() {
        return {};
      },
      type: Object,
    },
    // spring stiffness, in kg / s^2
    stiffness: {
      default: 170,
      type: Number,
    },
    // damping constant, in kg / s
    damping: {
      default: 26,
      type: Number,
    },
    // spring mass
    mass: {
      default: 1,
      type: Number,
    },
    // initial velocity
    velocity: {
      default: 0,
      type: Number,
    },
    // precision
    precision: {
      default: 0.1,
      type: Number,
    },
    // animation direction, forward, reverse, or alternate
    direction: {
      default: 'forward',
      type: String,
    },
  },
  data() {
    return {
      looping: '',
      frameRate: 1 / 60, // how many frame per ms
      start: {},
      end: {},
      leaps: {},
      AnimationRequestID: 0,
      velocities: {},
      isReverse: (() => this.direction === 'reverse')(),
      isAlternate: (() => this.direction === 'alternate')(),
    };
  },
  computed: {
    isLeapEnd() {
      return Object.keys(this.velocities).every(key => {
        return this.velocities[key] === 0;
      });
    },
  },
  watch: {
    to() {
      window.requestAnimationFrame(this.leap);
    },
    from() {
      this.setup();
    },
  },
  methods: {
    setup() {
      Object.keys(this.to).forEach(key => {
        if (!this.from[key]) {
          this.$set(this.from, key, 0);
        }
        this.$set(this.velocities, key, this.velocity);
        this.$set(this.leaps, key, this.isReverse ? this.to[key] : this.from[key]);
      });
    },
    leap() {
      const end = this.isReverse ? this.from : this.to;

      Object.keys(this.to).forEach(key => {
        const springForce = -this.stiffness * (this.leaps[key] - end[key]);
        const damperForce = -this.damping * this.velocities[key];
        const acceleration = (springForce + damperForce) / this.mass;

        this.velocities[key] += acceleration * this.frameRate;
        this.leaps[key] += this.velocities[key] * this.frameRate;

        if (this.isDumped(this.velocities[key], this.leaps[key] - end[key])) {
          this.velocities[key] = 0;
          this.leaps[key] = Number(end[key]);
        }
      });
      if (!this.isLeapEnd) {
        window.cancelAnimationFrame(this.AnimationRequestID);
        this.AnimationRequestID = window.requestAnimationFrame(this.leap);
      }
    },
    isDumped(velocity, distance) {
      return Math.abs(velocity) < this.precision && Math.abs(distance) < this.precision;
    },
  },
  created() {
    this.setup();
  },
  mounted() {
    window.requestAnimationFrame(this.leap);
  },
  render() {
    return this.$scopedSlots.default({
      leaps: this.leaps,
    });
  },
};
