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
    // spring stiffness, in kg/s^2
    stiffness: {
      default: 170,
      type: Number
    },
    // damping constant, in kg/s
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
      default: 0.01,
      type: Number
    }
  },
  data () {
    return {
      looping: '',
      frameRate: 1/60,
      block: {},
      leaps: {}
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
        this.$set(this.leaps, key, this.from[key]);
      });
      this.$set(this.leaps, 'velocity', this.velocity);
    },
    loop () {
      Object.keys(this.to).forEach(key => {
        let springForce = -this.stiffness * ( this.leaps[key] - this.to[key] );
        let damperForce = -this.damping * this.leaps.velocity;
        let acceleration = ( springForce + damperForce ) / this.mass;

        this.leaps.velocity += acceleration * this.frameRate;
        this.leaps[key] += this.leaps.velocity * this.frameRate;
      });

      if (this.isDumped) {
        this.stop();
      }
    },
    stop () {
      window.clearInterval(this.looping);
    }
  },
  created() {
    this.setup();
  },
  mounted () {
    this.looping = setInterval(this.loop, this.frameRate * 1000);
  },
  render () {
    return this.$scopedSlots.default({
      leaps: this.leaps
    });
  }
}
