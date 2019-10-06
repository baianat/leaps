import merge from 'lodash.merge';

let ANIMATION_OBSERVER;

export default {
  name: 'LeapsReveal',
  functional: true,
  props: {
    duration: {
      type: String,
      default: '1s'
    },
    delay: {
      type: String,
      default: '0'
    },
    iteration: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: ''
    },
    animateClass: {
      type: String,
      default: 'animated'
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: null
    }
  },
  render (h, ctx) {
    const data = merge(
      ctx.data,
      {
        style: {
          visibility: ctx.props.visible ? 'visible' : 'hidden'
        },
        attrs: {
          'aria-hidden': ctx.props.visible ? false : true
        },
        directives: [
          { name: 'leaps-observer', value: ctx.props }
        ]
      });
    const children = ctx.slots().default;
    if (!children && process.env.NODE_ENV !== 'production') {
      console.warn('Your component does not have any elements');
      return;
    }
    if (children.length === 1 && !ctx.props.tag) {
      const el = children[0];
      const tag = el.tag || ctx.props.tag || 'span';
      const elData = merge(el.data, data);
      return h(tag, elData, el.children || el.text)
    }
    return h(ctx.props.tag || 'span', data, children);
  }
};

export function install (Vue) {
  const directive = {
    bind (el, { value }) {
      el.__leapsProps = value;
      observe(el);
    }, 
    destroyed (el) {
      unobserve(el);
    }
  };  
  Vue.directive('leaps-observer', directive);
};

function startAnimating (el) {
  const { name, animateClass, delay, iteration, duration } = el.__leapsProps;
  el.style.visibility = '';
  el.style.animationDelay = delay;
  el.style.animationDuration = duration;
  el.style.animationIterationCount = iteration;
  el.classList.add(name, animateClass);
  el.setAttribute('aria-hidden', false);

  const onEnd = () => {
    el.classList.remove(name, animateClass);
    el.removeAttribute('style');
    unobserve(el);
    el.removeEventListener('animationend', onEnd);
  };

  el.addEventListener('animationend', onEnd);
}

function unobserve (el) {
  ANIMATION_OBSERVER.unobserve(el);
}

function observe (el) {
  if (!ANIMATION_OBSERVER) { 
    initObserver();
   }
  ANIMATION_OBSERVER.observe(el);
}

function initObserver () {
  ANIMATION_OBSERVER = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        startAnimating(entry.target);
      }
    });
  });
}
