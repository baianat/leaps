import Vue from 'vue';
import { install as Leaps } from '../dist/leaps';
import App from './App.vue';

Vue.use(Leaps);

new Vue({
  el: '#app',
  render: h => h(App)
});

