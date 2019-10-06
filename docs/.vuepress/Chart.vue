<template>
  <div class="wrapper" style="max-width: 50vw; margin: auto">
    <canvas id="base-chart" ref="dampingChart"></canvas>
  </div>
</template>


<script>
import Chart from 'chart.js';

export default {
  name: 'Chart',
  props: ["damping", "stiffness", "mass"],
  data () {
    return {
      frameRate: 1/60
    }
  },
  watch: {
    damping () {
      this.update();
    },
    stiffness () {
      this.update();
    },
    mass () {
      this.update();
    }
  },
  computed: {
    getChartData () {
      let velocity = 0; 
      let from = 0;
      let to = 400;
      const data = [...Array(500)].map((_, time) => {
        let springForce = -this.stiffness * (from - to);
        let damperForce = -this.damping * velocity;
        let acceleration = ( springForce + damperForce ) / this.mass;
        velocity += acceleration * this.frameRate;
        from += velocity * this.frameRate;
        return {x: time * this.frameRate * 1000, y: from };
      });
      return {
        datasets: [{ 
          label:'ball',
          borderColor: 'rgb(75, 192, 192)',
          pointRadius: 0,
          fill: false,
          data
        }, { 
          label: 'equilibrium',
          borderColor: 'rgba(0, 0, 0, 0.3)',
          pointRadius: 0,
          fill: false,
          data: [{x:0, y: 400}, {x: 9000, y: 400}]
        }]
      };
    }
  },
  methods: {
    update () {
      this.myChart.data = this.getChartData;
      this.myChart.update(0);
    }
  },
  mounted () {
    const ctx = this.$refs.dampingChart;
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: this.getChartData,
      options: {
        title: {
          display: true,
          text: 'Damped Oscillator'
        },
        scales: {
          yAxes: [{
            id: 'positon',
            scaleLabel: {
              display: true,
              labelString: "Position X"
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Time in (ms)"
            },
            id: 'time',
              type: 'linear',
              position: 'bottom'
          }]
          }
        }
      }
    )
  }
}
</script>