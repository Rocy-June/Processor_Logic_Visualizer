<template>
  <div
    :class="{ 'drop-list-option-box': true, active: active, hide: search_filter(label, filter) }"
    @click="handle_select"
  >
    <slot />
    | {{ label }} x {{ filter }}
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: String,
  },
})

const select_option = inject('select_option')

const handle_select = () => {
  if (select_option) {
    select_option(props.value, props.label)
  }
}

const search_filter = (l, f) => {
  return l.indexOf(f) >= 0
}
</script>

<style lang="less" scoped>
.drop-list-option-box {
  padding: 0.3rem 0.75rem;
  width: 100%;
  cursor: pointer;
  background-color: transparent;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover,
  &.active {
    background-color: var(--secondary-light-blue);
  }

  &.hide {
    display: none;
  }
}
</style>
