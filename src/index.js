import Leaps from './components/leaps';
import Parallax from './components/Parallax.js';
import Wow from './components/Wow.js';
import { observe, unobserve } from './components/Wow';

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
  Vue.directive('leaps-observer', directive);
};

export { Leaps, Wow, Parallax, install };

export default Leaps;
