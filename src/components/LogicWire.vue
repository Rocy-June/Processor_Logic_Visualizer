<template>
  <div :class="{ 'logic-wire-box': true, ready: prop_in, active: model }">
    <svg :viewBox="`0 0 ${width} ${height}`" ref="svg">
      <slot />
    </svg>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  delay: {
    type: Number,
    default: 0,
  },
  prop_in: {},
})

const model = defineModel()

const svg = ref(null)

const change_function = () => {
  if (props.delay && props.delay < 0) {
    model.value = props.prop_in
    return
  }

  setTimeout(() => {
    model.value = props.prop_in
  }, props.delay)

  nextTick(() => {
    const animates = svg.value.querySelectorAll('animate')
    for (let animate of animates) {
      animate.beginElement()
    }
  })
}

if (typeof watch_prop == 'object') {
  watch(props.prop_in, change_function)
} else {
  watch(() => props.prop_in, change_function)
}
</script>

<style lang="less">
.logic-wire-box {
  pointer-events: none;
  z-index: 1;

  &.ready {
    circle {
      animation: move 0.2s linear forwards;
    }
  }

  &.active {
    path {
      stroke: var(--border-color);
    }
  }

  path {
    stroke: var(--text-color);
    stroke-width: 2.5px;
    fill: transparent;

    @keyframes move {
      0% {
        opacity: 0;
        offset-distance: 0%;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        offset-distance: 100%;
      }
    }
  }

  circle {
    opacity: 0;
  }
}
</style>
