import Animation from './components/Animation.js';
import Parallax from './components/Parallax.js';
import Leaps from './leaps';
import { observe, unobserve } from './components/Animation';

function install (Vue) {
  const directive = {
    bind (el, { value }) {
      el.__leapsProps = value;
      if (value.observe) {
        observe(el);
      }
    }, 
    destroyed (el) {
      unobserve(el);
    }
  };  
  Vue.directive('animation-observer', directive);
};

export { Leaps, Animation, Parallax, install };

export default Leaps;
