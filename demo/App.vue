<template>

<div class="wrapper">
  <Animation name="slideInUp" delay="3s">
    <img alt="Test image" src="https://source.unsplash.com/random/200x200">
  </Animation>
  <div class="space"></div>
  <Animation name="slideInUp" class="default-class">
    <img alt="Test image" src="https://source.unsplash.com/random/200x300">
  </Animation>
</div>

</template>

<script>
import { Animation } from '../dist/leaps.js'
import 'animate.css/animate.min.css';
export default {
  name: 'App',
  components: {
    Animation
  }
}
</script>

<style>
.space {
  height: 120vh;
}
</style>

