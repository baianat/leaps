import Vue from 'vue';
import { install as Vector } from '../dist/vector';
import App from './App.vue';

Vue.use(Vector);

new Vue({
  el: '#app',
  render: h => h(App)
});

