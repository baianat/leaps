<template>

<div class="wrapper">
  <parallax :from="{ translateY: 0 }" :to="{ translateY: 100 }">
    <div
      class="box"
      slot-scope="{ parallax }"
      :style="`transform: translateY(${parallax.translateY}px)`"
    ></div>
  </parallax>
  <div class="space"></div>
  <Animation name="slideInUp" class="default-class">
    <img alt="Test image" src="https://source.unsplash.com/random/200x300">
  </Animation>
</div>

</template>

<script>
import { Parallax, Animation } from '../src/index.js'
import 'animate.css/animate.min.css';
export default {
  name: 'App',
  components: {
    Parallax,
    Animation
  }
}
</script>

<style>
.space {
  height: 120vh;
}
.box {
  width: 200px;
  height: 200px;
  background: rgb(23, 124, 37);
}
</style>

