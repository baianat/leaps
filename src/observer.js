let observer = null;

function startAnimating ({ name, animateClass, delay, iteration, duration }, el) {
  el.classList.add(name, animateClass);
  el.style.animationDuration = duration;
  el.style.animationDelay = delay;
  el.style.animationIterationCount = iteration;

  const onEnd = () => {
    endAnimation(el);
    el.removeEventListener('animationend', onEnd);
  };

  el.addEventListener('animationend', onEnd);
}

function endAnimation (el, ctx) {
  el.className = [];
  el.style = {};
  observer.unobserve(el);
}

function initObserver () {
  return new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        startAnimating(entry.target.__vectorProps, entry.target);
      }
    });
  });
}

const directive = {
  bind (el, { value }) {
    if (!observer) {
      observer = initObserver();
    }
    
    el.__vectorProps = value;
    observer.observe(el);
  }
};

export { directive };