import Vue from 'vue';
import { install as Movia } from '../dist/movia';
import App from './App.vue';

Vue.use(Movia);

new Vue({
  el: '#app',
  render: h => h(App)
});

