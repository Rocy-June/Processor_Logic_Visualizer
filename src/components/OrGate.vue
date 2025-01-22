<template>
  <div :class="{ 'or-gate-box': true, active: y }">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <path class="or-gate-path" d="m0 0a1 1.75 1 010 100h50c25 0 40-20 50-50C90 20 75 0 50 0z" />
    </svg>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  size: {
    type: String,
  },
  a: {
    type: Boolean,
    default: false,
  },
  b: {
    type: Boolean,
    default: false,
  },
})

const y = defineModel({ default: false })

const input_changed = () => {
  y.value = props.a || props.b
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.or-gate-box {
  font-size: 0;

  &.active {
    .or-gate-path {
      fill: var(--border-color);
    }
  }

  .or-gate-path {
    fill: var(--text-solid-color);
    stroke: transparent;
  }
}
</style>
