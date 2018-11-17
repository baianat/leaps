import Animation from './components/Animation.js';
import { directive } from './movia';

function install (Vue) {
  Vue.directive('animation-observer', directive);
};

export { Animation, install };
