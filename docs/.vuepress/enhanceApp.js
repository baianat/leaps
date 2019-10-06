import { Leaps, Parallax, Reveal, install } from '../../dist/leaps.esm.js';
import Chart from './Chart.vue';

export default ({ Vue }) => {
  Vue.use(install);
  Vue.component('Leaps', Leaps);
  Vue.component('Parallax', Parallax);
  Vue.component('Reveal', Reveal);
  Vue.component('Chart', Chart);
};
