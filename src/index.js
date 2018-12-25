import Animation from './components/Animation.js';
import Parallax from './components/Parallax.js';
import { directive } from './leaps';

function install (Vue) {
  Vue.directive('animation-observer', directive);
};

export { Animation, Parallax, install };
