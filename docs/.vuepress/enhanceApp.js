import { Leaps, Parallax, Wow, install } from '../../dist/leaps.esm.js';

export default ({ Vue }) => {
  Vue.use(install);
  Vue.component('Leaps', Leaps);
  Vue.component('Parallax', Parallax);
  Vue.component('Wow', Wow);
};
