<template>
  <leaps :to="{x: position.x, y: position.y }" ref="leep" :damping="20" :stiffness="50">
    <div
      @mousedown="handleMousedown"
      class="hockey"
      slot-scope="{ leaps }"
      :style="`transform: translate(${leaps.x}px, ${leaps.y}px)`"
    >
      x: {{ Math.round(leaps.x * 100) / 100 }}
      y: {{ Math.round(leaps.y * 100) / 100 }}
    </div>
  </leaps>
</template>

<script>
import { Leaps } from 'leaps';

export default {
  name: 'hockey',
  components: {
    Leaps
  },
  data() {
    return {
      position: {
        x: 200,
        y: 200
      }
    }
  },
  methods: {
    handleMousedown (event) {
      const start = { x: event.clientX, y: event.clientY };
      const lastMove = Object.assign({}, this.position);
      const handleMouseup = () => {
        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
      }
      const handleMousemove = (evt) => {
        const end = { x: evt.clientX, y: evt.clientY };
        const delta = {
          x: end.x - start.x,
          y: end.y - start.y
        }
        this.position.x = lastMove.x + delta.x;
        this.position.y = lastMove.y + delta.y;
      }
      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('mouseup', handleMouseup);

    }
  }
}
</script>

<style>
.hockey {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  color: #fff;
  background: rgb(193, 200, 235);
  border: 1px solid rgb(216, 222, 252, 0.2);
  user-select: none;
  box-shadow: inset -2px -2px 1px 1px rgba(0, 0, 0, 0.2),
      inset 2px 2px 4px rgba(255, 255, 255, 0.8),
      1px 1px 10px rgba(0, 0, 0, 0.6);
}
</style>

