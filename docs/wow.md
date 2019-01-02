# Wow

`Wow` component used to apply CSS animation class to the element when it enters the view-port.
You can create your desired animation, or use [animista](http://animista.net/), (animate.css)[https://daneden.github.io/animate.css/], or any similar library.

::: tip
you can add a starter classes to `Wow` element, all classes will be removed when animation ends'
:::

## Example

<wow name="bounceInTop">
  <div class="box"></div>
</wow>

```vue
<wow name="bounce">
  <div class="box"></div>
</wow>
```

## Props

|Prop          |Default|Description|
|--------------|-------|-----------|
|`duration`    |'1s'   |Length of time that an animation takes to complete one cycle.|
|`delay`       |'0s'   |When an animation starts. accepts negative values |
|`iteration`   |1      |The number of times an animation cycle should be played before stopping.|
|`animateClass`|'animated'|Main class name that triggers animation|
|`name`        |''     |The animation class name|
|`visible`     |false  |Set if element starts visible or hidden|

<style lang="stylus">
.bounceInTop
  animation: bounce-in-top 1.1s both

@keyframes bounce-in-top
  0%
    transform: translateY(-500px)
    animation-timing-function: ease-in
    opacity: 0
  38%
    transform: translateY(0)
    animation-timing-function: ease-out
    opacity: 1
  55%
    transform: translateY(-65px)
    animation-timing-function: ease-in
  72%
    transform: translateY(0)
    animation-timing-function: ease-out
  81%
    transform: translateY(-28px)
    -webkit-animation-timing-function: ease-in
  90%
    transform: translateY(0)
    animation-timing-function: ease-out
  95%
    transform: translateY(-8px)
    animation-timing-function: ease-in
  100%
    transform: translateY(0)
    animation-timing-function: ease-out
</style>