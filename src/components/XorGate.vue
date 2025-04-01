<template>
  <div :class="{ 'xor-gate-box': true, active: y }" :title="$t('word.xor_gate_full_name')">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <path
        class="xor-gate-path"
        d="m5 0a1 1.75 1 010 100 1 1 0 010-5A1 2 0 005 5a1 1 0 010-5m10 0a1 1.75 1 010 100h40c20 0 40-20 45-50C95 20 75 0 55 0z"
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
  y.value = props.a !== props.b
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.xor-gate-box {
  font-size: 0;

  &.active {
    .xor-gate-path {
      fill: var(--border-color);
    }
  }

  .xor-gate-path {
    fill: var(--text-solid-color);
    stroke: transparent;
  }
}
</style>
