# Leaps

Declarative Vue.js animations library

## Available Components

* Animation
* Parallax

## Getting started

### Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install leaps

# or use yarn
yarn add leaps
```

### Install Plug-in

```js
import Vue from 'vue';
import { install as Leaps } from '../dist/leaps';

Vue.use(Leaps);
```

## Animation Component

```html
<Animation name="flash" :iteration="3" delay="1s" class="custom-class">
  <img alt="Test image" src="https://source.unsplash.com/random/200x200">
</Animation>
```

> note: you can add start classes to `Animation` element, all classes will be removed when animation ends'

### Available Props

|Prop          |Default|Description|
|--------------|-------|-----------|
|`duration`    |'1s'   |Length of time that an animation takes to complete one cycle.|
|`delay`       |'0s'   |When an animation starts. accepts negative values |
|`iteration`   |1      |The number of times an animation cycle should be played before stopping.|
|`animateClass`|'animated'|Main class name that triggers animation|
|`name`        |''     |The animation class name|
|`visible`     |false  |Set if element starts visible or hidden|