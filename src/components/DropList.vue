<template>
  <div class="drop-list-box" ref="drop_list">
    <div class="list-input">
      <input
        type="text"
        class="list-input-text"
        v-model="label"
        @click="input_click"
        @input="input_text_changed"
      />
      <div :class="{ seletor: true, active: show_drop_list }"></div>
    </div>
    <div class="list-options-position">
      <transition name="slide-to-left">
        <div class="list-options-box" v-if="show_drop_list">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, provide } from 'vue'

const show_drop_list = ref(false)
const drop_list = ref(null)
const value = defineModel()
const label = defineModel('label')
const filter = defineModel('filter')

const emits = defineEmits(['change'])

const input_click = () => {
  show_drop_list.value = !show_drop_list.value
  if (show_drop_list.value) {
    filter.value = ''
  }
}

const input_text_changed = () => {
  show_drop_list.value = true
  filter.value = label.value
}

const handle_click_outside = (event) => {
  if (drop_list.value && !drop_list.value.contains(event.target)) {
    show_drop_list.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handle_click_outside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handle_click_outside)
})

const select_option = (v, t) => {
  label.value = t
  value.value = v
  show_drop_list.value = false
  emits('change')
}

provide('select_option', select_option)
</script>

<style lang="less" scoped>
.drop-list-box {
  display: flex;
  flex-direction: column;

  .list-input {
    position: relative;
    font-size: 0;

    .list-input-text {
      font-size: 16px;
      background-image: var(--input-background-image);
      border: 1px solid var(--border-color);
      border-radius: 9rem;
      transition: border 0.3s;
      outline: 0;
      padding: 0.25rem 0.5rem;
      color: var(--text-color);

      &:hover,
      &:active {
        border: 1px solid var(--border-hover-color);
      }
    }

    .seletor {
      position: absolute;
      display: block;
      top: 50%;
      right: 0.75rem;
      border-style: solid;
      border-width: 0 0.35rem 0.35rem 0.35rem;
      border-color: transparent transparent var(--text-color) transparent;
      transform: translateY(-50%) rotate(0deg);
      transition: transform 0.2s;
      pointer-events: none;

      &.active {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  .list-options-position {
    position: relative;

    .list-options-box {
      position: absolute;
      top: 0.25rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0.25rem;
      border-radius: 8px;
      background-color: var(--background-color);
      box-shadow: var(--box-shadow);
    }
  }
}

.slide-to-left-enter-active,
.slide-to-left-leave-active {
  transition: all 0.3s;
  transform-origin: 0% 0%;
}
.slide-to-left-enter-from {
  transform: scaleY(0.8);
  opacity: 0;
}
.slide-to-left-enter-to {
  transform: scaleY(1);
  opacity: 1;
}
.slide-to-left-leave-from {
  transform: scaleY(1);
  opacity: 1;
}
.slide-to-left-leave-to {
  transform: scaleY(0.8);
  opacity: 0;
}
</style>
