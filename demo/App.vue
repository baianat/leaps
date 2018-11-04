<template>

<div class="wrapper">
  <Animation name="flash" :iteration="3" delay="1s">
    <!-- TODO: handle lazy image load -->
    <img alt="Test image" src="https://source.unsplash.com/random/200x200">
  </Animation>
  <div class="space"></div>
    <Animation name="flash">
    <img alt="Test image" src="https://source.unsplash.com/random/200x300">
  </Animation>
</div>

</template>

<script>
import { Animation } from '../dist/vector.js'
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

