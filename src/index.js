import Leaps from './components/leaps';
import Parallax from './components/Parallax.js';
import Animation from './components/Animation.js';
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
