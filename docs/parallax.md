# Parallax

`Parallax` component used move property from one value to another, based on the scrolled distance.

## Using

`Parallax` is a render-less component, which accepts `from` and `to` props, and provide you with the current state using `parallax` [scoped-slot](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots).

```vue
  <parallax :from="{ x: 0 }" :to="{ x: 300 }">
    <div
      class="box"
      slot-scope="{ parallax }"
      :style="`transform: translateX(${parallax.x}px)`"
    ></div>
  </parallax>
```

The element will have the starting value, when its top enters the view-port, the value will accelerate when view-port scrolls, and will reach its ending value when the element leaves the view-port.

<parallax :from="{ x: 0 }" :to="{ x: 300 }">
  <div
    class="box"
    slot-scope="{ parallax }"
    :style="`transform: translateX(${parallax.x}px)`"
  >{{ parallax.x }}</div>
</parallax>

```vue
  <parallax :from="{ x: 0 }" :to="{ x: 300 }">
    <div
      class="box"
      slot-scope="{ parallax }"
      :style="`transform: translateX(${parallax.x}px)`"
    ></div>
  </parallax>
```

You can set ratio of view-port, that the element should travel to reach its ending value, using `viewportRatio` prop.

<parallax :from="{ x: 0 }" :to="{ x: 300 }" :viewportRatio="0.5">
  <div
    class="box"
    slot-scope="{ parallax }"
    :style="`transform: translateX(${parallax.x}px)`"
  >{{ parallax.x }}</div>
</parallax>

```vue
<parallax :from="{ x: 0 }" :to="{ x: 300 }" :viewportRatio="0.5">
  <div
    class="box"
    slot-scope="{ parallax }"
    :style="`transform: translateX(${parallax.x}px)`"
  >{{ parallax.x }}</div>
</parallax>
```

In the previous example, the element reached its ending value, when the element bottom arrives to the half of the view-port.
If you want to reach the ending value when element top edge reached the half of the view-port, you can set `useElHeight` prop to be false.

<parallax :from="{ x: 0 }" :to="{ x: 300 }" :viewportRatio="0.5" :useElHeight="false">
  <div
    class="box"
    slot-scope="{ parallax }"
    :style="`transform: translateX(${parallax.x}px)`"
  >{{ parallax.x }}</div>
</parallax>

```vue
<parallax :from="{ x: 0 }" :to="{ x: 300 }" :viewportRatio="0.5" :useElHeight="false">
  <div
    class="box"
    slot-scope="{ parallax }"
    :style="`transform: translateX(${parallax.x}px)`"
  ></div>
</parallax>
```

## Props

|Prop          |Default|Description|
|---------------|-------|-----------|
|`from`         |{}     |start values|
|`to`           |{}     |end values|
|`viewportRatio`|'1'    |ratio of the view-port, where the element should reach the end value|
|`useElHeight`  |true   |flag to indicated, whether using element's height in calculations or not|
