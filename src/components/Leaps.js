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
      start: {},
      end: {},
      leaps: {},
      velocities: {},
      isReverse: (() => this.direction === 'reverse')(),
      isAlternate: (() => this.direction === 'alternate')()
    }
  },
  computed: {
    isDumped () {
      return Object.keys(this.velocities).every(key => {
        return Math.abs(this.velocities[key]) <= this.precision;
      })
    }
  },
  methods: {
    setup () {
      Object.keys(this.to).forEach(key => {
        this.$set(this.leaps, key, 0);
        this.$set(this.velocities, key, this.velocity);
      });
    },
    loop () {
      Object.keys(this.to).forEach(key => {
        let springForce = -this.stiffness * ( this.leaps[key] - this.end[key] );
        let damperForce = -this.damping * this.velocities[key];
        let acceleration = ( springForce + damperForce ) / this.mass;

        this.velocities[key] += acceleration * this.frameRate;
        this.leaps[key] += this.velocities[key] * this.frameRate;
      });

      if (this.isDumped) {
        this.stop();
      }
    },
    play () {
      Object.keys(this.to).forEach(key => {
        [this.start[key], this.end[key]] = [this.from[key], this.to[key]];
        if (this.isReverse) {
          [this.start[key], this.end[key]] = [ this.end[key], this.start[key]];
        }
        this.leaps[key] = this.start[key];
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
