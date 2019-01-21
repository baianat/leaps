let ANIMATION_OBSERVER;

function startAnimating (el) {
  const { name, animateClass, delay, iteration, duration } = el.__leapsProps;
  el.style.visibility = '';
  el.style.animationDelay = delay;
  el.style.animationDuration = duration;
  el.style.animationIterationCount = iteration;
  el.classList.add(name, animateClass);

  const onEnd = () => {
    el.classList.remove(name, animateClass);
    el.removeAttribute('style');
    unobserve(el);
    el.removeEventListener('animationend', onEnd);
  };

  el.addEventListener('animationend', onEnd);
}

export function unobserve (el) {
  ANIMATION_OBSERVER.unobserve(el);
}

export function observe (el) {
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

export default {
  name: 'LeapsWow',
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
    }
  },
  render (h, ctx) {
    const data = {
      ...ctx.data,
      style: {
        visibility: ctx.props.isVisible ? 'visible' : 'hidden'
      },
      directives: [
        { name: 'leaps-observer', value: { ...ctx.props, observe: true } }
      ]
    };

    const children = ctx.slots().default;
    if (children.length === 1) {
      const el = children[0];
      return h(el.tag, { ...el.data, ...data }, el.children)
    }

    return h('div', data, children);
  }
};
