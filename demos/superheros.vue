<template>
  <leaps :from="defaultState" :to="isHover ? activeState : defaultState" :stiffness="150">
    <div 
      class="card"
      slot-scope="{ leaps }"
      :style="`width: ${leaps.width}px`"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      >
      <leaps :to="{ x: isHover ? 15 : 0 }" :stiffness="250" :damping="10" :mass="1.5">
        <img
          slot-scope="{ leaps }"
          class="card-image"
          :src="`./superheros/${img}.png`"
          alt="speaker"
          :style="`transform: translate(${leaps.x}px, ${-leaps.x}px)`"
          >
      </leaps>
      <div class="card-content">
        <h2
          class="card-title"
        >
          {{ name }}
        </h2>
        <h3
          class="card-subtitle"
        >
          {{ title }}
        </h3>
        <div
        class="card-bio"
        v-show="isHover"
        :style="`opacity: ${leaps.fadeIn}; transform: translate(0, ${leaps.bioY}%);`"
        >
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, odit quia expedita commodi esse aliquid cumque voluptates? Magni temporibus vero sint at voluptas ullam reiciendis obcaecati voluptate fugiat, tempore suscipit.
          </p>
        </div>
      </div>
    </div>
  </leaps>
</template>

<script>
import { Leaps } from '../src/index.js'

export default {
  name: 'Card',
  props: ['img', 'name', 'title'],
  components: {
    Leaps
  },
  data () {
    return {
      isHover: false,
      defaultState: {
        bioY: 120,
        width: 170,
        fadeIn: 0,
        fadeOut: 1
      },
      activeState: {
        bioY: 0,
        width: 500,
        fadeIn: 1,
        fadeOut: 0
      }
    }
  }
}
</script>

<style lang="stylus">
$black = #404d6d
$green = #46ba7c
$blue = #2196F3
$violet = #da1b60
$gray = lighten($black, 50%)
$white = #fff

.card
  position: relative
  display: flex
  justify-content: flex-start
  flex-direction: column
  border-radius: 20px
  padding: 20px
  margin: 100px 10px 10px
  box-shadow: 2px 2px 5px alpha($green, 0.2)
  transform-origin: top left
  will-change: width
  flex-shrink: 0
  &:nth-child(1)
    background-image: linear-gradient(45deg, $green,  lighten($green, 30%))
  &:nth-child(2)
    background-image: linear-gradient(45deg, $violet,  lighten($violet, 30%))
  &:nth-child(3)
    background-image: linear-gradient(45deg, $blue,  lighten($green, 30%))
  &:nth-child(4)
    background-image: linear-gradient(45deg, $black,  lighten($gray, 30%))
.card-image
  width: 100px
  margin-bottom: 20px
  margin-top: -40px
  flex-shrink: 0
  transform-origin: top left
.card-title
  font-size: 16px
  color: $white
  margin: 0.5em 0

.card-subtitle
  font-size: 12px
  color: darken($white, 20%)
  margin: 0

.card-bio
  pointer-events: none
  position: absolute
  width: 350px
  top: 0
  left: 160px
  color: $white
  font-size: 16px
</style>