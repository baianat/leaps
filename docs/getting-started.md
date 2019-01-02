# Leaps

Leaps is a set of simple, physics-based Vue.js animation components. It covers the most of your UI related animation needs where CSS just isn't enough anymore.

Leaps does not have to resort to using hard-coded easing curves and duration. Set up a stiffness and damping for your UI element, and let the magic of physics take care of the rest This isn't meant to solve each and every problem, but rather give you tools that are flexible enough to confidently cast ideas into moving interfaces.

## Available Components

* [Leaps](/leaps.html)
* [Parallax](/parallax.html)
* [wow](/wow.html)

## Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install leaps

# or use yarn
yarn add leaps
```

## Install Plug-in

```js
import Vue from 'vue';
import { install as VueLeaps } from '../dist/leaps';

Vue.use(VueLeaps);
```