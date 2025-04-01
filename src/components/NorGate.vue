<template>
  <div :class="{ 'nor-gate-box': true, active: y }" :title="$t('word.nor_gate_full_name')">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <path
        class="nor-gate-path"
        d="m0 0a1 1.75 1 010 100h45c25 0 35-20 40-50C80 20 60 0 45 0zm85 50a1 1 0 0015 0 1 1 0 00-15 0zm4 0a1 1 0 017 0 1 1 0 01-7 0z"
      />
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
  y.value = !(props.a || props.b)
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.nor-gate-box {
  font-size: 0;

  &.active {
    .nor-gate-path {
      fill: var(--border-color);
    }
  }

  .nor-gate-path {
    fill: var(--text-solid-color);
    stroke: transparent;
  }
}
</style>
