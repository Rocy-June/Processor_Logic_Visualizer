<template>
  <div
    :class="{ 'and-gate-box': true, active: y }"
    :style="{ width: size, height: size }"
    :title="$t('word.and_gate_full_name')"
  >
    <svg width="100" height="100" viewBox="0 0 100 100">
      <path class="and-gate-path" d="m0 0v100h50a1 1 0 000-100z" />
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
  y.value = props.a && props.b
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.and-gate-box {
  font-size: 0;

  &.active {
    .and-gate-path {
      fill: var(--border-color);
    }
  }

  > svg {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .and-gate-path {
    fill: var(--text-solid-color);
    stroke: transparent;
  }
}
</style>
