import { initObserver, observe } from './components/Animation';

const directive = {
  bind (el, { value }) {
    el.__vectorProps = value;
    initObserver();
    observe(el);
  }
};

export { directive };