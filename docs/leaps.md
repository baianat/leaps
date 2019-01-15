# Leaps

`Lepas` is the primary animation component, which is a spring-physics based. Its main role is to move property from one value to another, with more natural animation and easing.

## Using

`Leaps` is a render-less component, which accepts `from` and `to` props, and provide you with the current state using `leaps` [scoped-slot](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots).

### basic example

<leaps :from="{ x: 0 }" :to="{ x: 300 }" direction="alternate">
  <div
    class="box"
    slot-scope="{ leaps }"
    :style="`transform: translateX(${leaps.x}px);`"
  ></div>
</leaps>

```vue
<leaps :from="{ x: 0 }" :to="{ x: 300 }">
  <div
    class="box"
    slot-scope="{ leaps }"
    :style="`transform: translateX(${leaps.x}px);`"
  ></div>
</leaps>
```

### animate attributes

<leaps :from="{ x: 0 }" :to="{ x: 72 }" direction="alternate">
  <svg viewBox="0 0 24 21.1" id="heart" fill="none" slot-scope="{ leaps }" stroke="rgb(255, 99, 132)" :stroke-dashoffset="leaps.x" stroke-dasharray="72" width="200px" >
    <path d="M21.3,3c-1.2-1.2-2.7-1.8-4.4-1.8c-1.6,0-3.2,0.6-4.3,1.8L12,3.6L11.4,3c-1.2-1.2-2.7-1.8-4.3-1.8C5.5,1.2,3.9,1.8,2.8,3
C1.6,4.2,1,5.7,1,7.3s0.6,3.2,1.8,4.3l7.6,7.6c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7l7.6-7.6C23.6,9.3,23.6,5.4,21.3,3z"/>
  </svg>
</leaps>

```vue
<leaps :from="{ x: 0 }" :to="{ x: 72 }">
  <svg
    slot-scope="{ leaps }"
    :stroke-dashoffset="leaps.x">
    <path d="..."
  />
  </svg>
</leaps>
```

### inner text

<leaps :from="{ text: 0 }" :to="{ text: 100 }" direction="alternate">
  <span slot-scope="{ leaps }" class="text">{{ Math.round(leaps.text) }}</span>
</leaps>

```vue
<leaps :from="{ text: 0 }" :to="{ text: 100 }">
  <span slot-scope="{ leaps }">{{ Math.round(leaps.text) }}</span>
</leaps>
```

## Configuration

The animation duration and easing is based on physics parameters (stiffness, damping and mass), changing one of those parms or all can give you a different animation behavior. in this demo section there's a great "Spring Parameters Chooser" for you to have a feel of what spring is appropriate, rather than guessing a duration in the dark.

<label>Damping: {{ damping }}</label>
<input type="range" v-model="damping" min="10" max="100">
<label>Stiffness: {{ stiffness }}</label>
<input type="range" v-model="stiffness" min="50" max="300">
<label>Mass: {{ mass }}</label>
<input type="range" v-model="mass" min="1" max="5" step="0.1">

<leaps :from="{ x: 0 }" :to="{ x: 400 }" :damping="Number(damping)" :mass="Number(mass)" :stiffness="Number(stiffness)" direction="alternate">
  <div
    class="box"
    slot-scope="{ leaps }"
    :style="`transform: translateX(${leaps.x}px);`"
  >
{{ Math.round(leaps.x * 100) / 100 }}
   </div>
</leaps>

<Chart :damping="damping" :stiffness="stiffness" :mass="mass"></Chart>

## Props

|Prop        |Default |Description|
|------------|-----|-----------|
|`from`      |{}  |start values|
|`to`        |1   |end values|
|`stiffness` |170 |the force required to cause element deflection|
|`damping`   |26  |element damping force|
|`mass`      |1   |element mass|
|`velocity`  |0   |element starting velocity|
|`precision` |0.01|animation damped precision|
|`direction` |'forwards'|set animation direction to be forward, reverse, or alternate|

<script>
export default {
  data () {
    return {
      damping: 26,
      stiffness: 180,
      mass: 1
    }
  }
}
</script>