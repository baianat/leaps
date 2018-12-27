<template>

<div class="wrapper">
    
  <leaps :from="{ translateX: 0 }" :to="{ translateX: 100 }">
    <div
      class="box"
      slot-scope="{ leaps }"
      :style="`transform: translateY(${leaps.translateX}px)`"
    >{{ Math.round(leaps.translateX * 100) / 100 }}</div>
  </leaps>
  <div class="space"></div>

  <parallax :from="{ rotate: 0 }" :to="{ rotate: 180 }">
    <div
      class="box"
      slot-scope="{ parallax }"
      :style="`transform: rotate(${parallax.rotate}deg)`"
    ></div>
  </parallax>
  <div class="space"></div>
  <Animation name="slideInUp" class="default-class">
    <img alt="Test image" src="https://source.unsplash.com/random/200x300">
  </Animation>
</div>

</template>

<script>
import { Parallax, Animation, Leaps } from '../src/index.js'
import 'animate.css/animate.min.css';
export default {
  name: 'App',
  components: {
    Parallax,
    Animation,
    Leaps
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

