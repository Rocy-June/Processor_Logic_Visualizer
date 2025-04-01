<template>
  <div :class="{ 'xnor-gate-box': true, active: y }" :title="$t('word.xnor_gate_full_name')">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <path
        class="xnor-gate-path"
        d="m5 0a1 1.75 1 010 100 1 1 0 010-5A1 2 0 005 5a1 1 0 010-5m10 0a1 1.75 1 010 100h35c25 0 30-21 35-50C80 20 75 0 50 0zm70 50a1 1 0 0014 0 1 1 0 00-14 0zm4 0a1 1 0 017 0 1 1 0 01-7 0z"
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
  y.value = props.a === props.b
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.xnor-gate-box {
  font-size: 0;

  &.active {
    .xnor-gate-path {
      fill: var(--border-color);
    }
  }

  .xnor-gate-path {
    fill: var(--text-solid-color);
    stroke: transparent;
  }
}
</style>
