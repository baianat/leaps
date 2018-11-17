import { observe, unobserve } from './components/Animation';

const directive = {
  bind (el, { value }) {
    el.__moviaProps = value;
    observe(el);
  }, 
  destroyed (el) {
    unobserve(el);
  }
};

export { directive };