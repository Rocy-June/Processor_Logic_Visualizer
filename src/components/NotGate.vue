<template>
  <div :class="{ 'not-gate-box': true, active: y }" :title="$t('word.not_gate_full_name')">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <path
        class="not-gate-path"
        d="m0 0v100l89-50zm85 50a1 1 0 0015 0 1 1 0 00-15 0zm4 0a1 1 0 017 0 1 1 0 01-7 0z"
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
})

const y = defineModel({ default: false })

const input_changed = () => {
  y.value = !props.a
}

watch(() => props.a, input_changed)
</script>

<style lang="less" scoped>
.not-gate-box {
  font-size: 0;

  &.active {
    .not-gate-path {
      fill: var(--border-color);
    }
  }

  .not-gate-path {
    fill: var(--text-solid-color);
    stroke: transparent;
  }
}
</style>
