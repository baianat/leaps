let ANIMATION_OBSERVER;

function startAnimating (el) {
  const { name, animateClass, delay, iteration, duration } = el.__leapsProps;
  el.style.visibility = '';
  el.style.animationDelay = delay;
  el.style.animationDuration = duration;
  el.style.animationIterationCount = iteration;
  el.classList.add(name, animateClass);

  const onEnd = () => {
    el.className = [];
    el.style = {};
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
  name: 'Animation',
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
    visible: {
      type: Boolean,
      default: false
    }
  },
  render (h, ctx) {
    const data = {
      ...ctx.data,
      style: {
        visibility: ctx.props.visible ? 'visible' : 'hidden'
      },
      directives: [
        { name: 'animation-observer', value: ctx.props }
      ]
    };

    return h('div', data, ctx.slots().default);
  }
};
