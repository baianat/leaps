import { observe, unobserve } from './components/Animation';

const directive = {
  bind (el, { value }) {
    el.__leapsProps = value;
    observe(el);
  }, 
  destroyed (el) {
    unobserve(el);
  }
};

export { directive };