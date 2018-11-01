import Animation from './components/Animation.js';
import { directive } from './observer';

function install (Vue) {
  Vue.directive('animation-observer', directive);
};

export { Animation, install };
