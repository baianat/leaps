<p align="center">
  <a href="https://baianat.github.io/leaps/" target="_blank">
    <img width="500" alt="leaps logo" src="https://github.com/baianat/leaps/blob/master/docs/.vuepress/public/leaps.svg">
  </a>
</p>

<p align="center">
  <a href="http://isitmaintained.com/project/baianat/leaps"><img src="http://isitmaintained.com/badge/resolution/baianat/leaps.svg" alt="Average time to resolve an issue"/></a>
  <a href="http://isitmaintained.com/project/baianat/leaps"><img src="http://isitmaintained.com/badge/open/baianat/leaps.svg" alt="Percentage of issues still open"/></a>
  <a href="https://npm-stat.com/charts.html?package=leaps"><img src="https://img.shields.io/npm/dm/leaps.svg" alt="npm"/></a>
  <a href="https://www.npmjs.com/package/leaps"><img src="https://img.shields.io/npm/v/leaps.svg" alt="npm"/></a>
</p>


<p align="center">
  <a href="https://github.com/baianat/leaps/blob/master/demos/gifs/innet%20text.gif"><img width="250px" src="https://github.com/baianat/leaps/blob/master/demos/gifs/innet%20text.gif" alt="Inner Text Animation"/></a>
  <a href="https://github.com/baianat/leaps/blob/master/demos/gifs/basic.gif"><img width="320px" src="https://github.com/baianat/leaps/blob/master/demos/gifs/basic.gif" alt="Basic Animation"/></a>
  <a href="https://github.com/baianat/leaps/blob/master/demos/gifs/svh.gif"><img width="250px" src="https://github.com/baianat/leaps/blob/master/demos/gifs/svh.gif" alt="SVG Animation"/></a>
</p>

<p align="center">
  <a href="https://github.com/baianat/leaps/blob/master/demos/air-hockey.vue"><img width="500px" src="https://github.com/baianat/leaps/blob/master/demos/gifs/air-hockey.gif" alt="Inner Text Animation"/></a>
</p>

<p align="center">
  <a href="https://github.com/baianat/leaps/blob/master/demos/superheros.vue"><img width="500px" src="https://github.com/baianat/leaps/blob/master/demos/gifs/superheros.gif" alt="Inner Text Animation"/></a>
</p>

# Leaps

Leaps is a set of simple, physics-based Vue.js animation components. It covers the most of your UI related animation needs where CSS just isn't enough anymore.

## Shipped with

* [Leaps](https://baianat.github.io/leaps/leaps.html)
  * The primary animation component, which is a spring-physics based. Its main role is to move property from one value to another, with more natural animation and easing.
* [Parallax](https://baianat.github.io/leaps/parallax.html)
  * Used move property from one value to another, based on the scrolled distance.
* [Reveal](https://baianat.github.io/leaps/Reveal.html)
  * Used to apply CSS animation class to an element, when it enters the view-port.

## Why Physics

Traditional animation methods are based on duration time and ease function, while the animation goes from the start state to the end state, event if using Bézier easing can be very limiting. Due to having only two handles, you can't produce some complex physics effects. If you go beyond three sequences CSS become complex with delays and you end up having to do a lot of recalculation if you adjust the timing.

Hard-coded durations are opposed to continuous, fluid interactivity. If your animation is interrupted mid-way, you'd get a weird completion animation if you hard-coded the time.
Instead of hard-coded duration, we will use a [physical model](https://en.wikipedia.org/wiki/Damping_ratio) to determine our animation duration and easing, based on the element dumping, and mass. Instead of guessing the animation parameters that fits best with your animation, there is an interactive configuration section in the documentation that will guide you.

<p align="center">
  <a href="https://baianat.github.io/leaps/leaps.html#configuration"><img width="600px" src="https://github.com/baianat/leaps/blob/master/demos/gifs/config.gif" alt="Config Animation"/></a>
</p>