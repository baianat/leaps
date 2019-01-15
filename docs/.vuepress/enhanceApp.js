import { Leaps, Parallax, Wow, install } from '../../dist/leaps.esm.js';
import Chart from './Chart.vue';

export default ({ Vue }) => {
  Vue.use(install);
  Vue.component('Leaps', Leaps);
  Vue.component('Parallax', Parallax);
  Vue.component('Wow', Wow);
  Vue.component('Chart', Chart);
};
