<template>
  <div class="drop-list-box" ref="drop_list">
    <div class="list-input">
      <input
        type="text"
        class="list-input-text"
        v-model="label"
        @click="input_click"
        @input="input_text_changed"
        @blur="emit('blur')"
      />
      <div :class="{ seletor: true, active: show_drop_list }"></div>
    </div>
    <div class="list-options-position">
      <transition name="scale-y">
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
const obj = defineModel('obj')
const filter = defineModel('filter')

const emit = defineEmits(['change', 'blur'])

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

const select_option = (v, t, o) => {
  label.value = t
  value.value = v
  obj.value = o
  show_drop_list.value = false
  emit('change')
}

provide('select_option', select_option)
</script>

<style lang="less" scoped>
.drop-list-box {
  display: flex;
  flex-direction: column;

  .list-input {
    position: relative;

    .list-input-text {
      font-size: 1.44cqw;
      background-image: var(--input-background-image);
      border: 0.1cqw solid var(--border-color);
      border-radius: 9em;
      transition: border 0.3s;
      outline: 0;
      padding: 0.41em 0.92em;
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
      right: 0.75em;
      border-style: solid;
      border-width: 0 0.35em 0.35em 0.35em;
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
      top: 0.25em;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0.25em;
      border-radius: 0.72cqw;
      background-color: var(--background-color);
      box-shadow: var(--box-shadow);
    }
  }
}

.scale-y-enter-active,
.scale-y-leave-active {
  transition: all 0.3s;
  transform-origin: 0% 0%;
}
.scale-y-enter-from {
  transform-origin: 0% 0%;
  transform: scaleY(0.6);
  opacity: 0;
}
.scale-y-enter-to {
  transform-origin: 0% 0%;
  transform: scaleY(1);
  opacity: 1;
}
.scale-y-leave-from {
  transform-origin: 0% 0%;
  transform: scaleY(1);
  opacity: 1;
}
.scale-y-leave-to {
  transform-origin: 0% 0%;
  transform: scaleY(0.6);
  opacity: 0;
}
</style>
