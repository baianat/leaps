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
    // spring stiffness
    stiffness: {
      default: 180,
      type: Number
    },
    // damping constant
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
      default: 0.001,
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
      frameRate: 1/60,
      start: 0,
      end: 0,
      leaps: {},
      isReverse: (() => this.direction === 'reverse')(),
      isAlternate: (() => this.direction === 'alternate')()
    }
  },
  computed: {
    isDumped () {
      return Math.abs(this.leaps.velocity) <= this.precision;
    }
  },
  methods: {
    setup () {
      Object.keys(this.to).forEach(key => {
        this.$set(this.leaps, key, 0);
      });
      this.$set(this.leaps, 'velocity', this.velocity);
      this.isR
    },
    loop () {
      Object.keys(this.to).forEach(key => {
        let springForce = -this.stiffness * ( this.leaps[key] - this.end );
        let damperForce = -this.damping * this.leaps.velocity;
        let acceleration = ( springForce + damperForce ) / this.mass;

        this.leaps.velocity += acceleration * this.frameRate;
        this.leaps[key] += this.leaps.velocity * this.frameRate;
      });

      if (this.isDumped) {
        this.stop();
      }
    },
    play () {
      Object.keys(this.to).forEach(key => {
        [this.start, this.end] = [this.from[key], this.to[key]];
        if (this.isReverse) {
          [this.start, this.end] = [ this.end, this.start];
        }
        this.leaps[key] = this.start;
      });
      this.looping = setInterval(this.loop, this.frameRate * 1000);
    },
    stop () {
      window.clearInterval(this.looping);
      if (this.isAlternate) {
        this.isReverse = !this.isReverse;
        this.play();
      }
    }
  },
  created() {
    this.setup();
  },
  mounted () {
    this.play();
  },
  render () {
    return this.$scopedSlots.default({
      leaps: this.leaps
    });
  }
}
