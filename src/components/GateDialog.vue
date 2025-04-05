<template>
  <Transition name="zoom-out-center">
    <div class="gate-dialog-box" ref="dialog" v-show="enabled">
      <div class="close-button" @click="close_click">
        <ColoredSVG :src="cross_logo" color="var(--background-dark)" />
      </div>
      <div class="gate-dialog-content">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import ColoredSVG from './ColoredSVG.vue'

import cross_logo from '@/assets/cross.svg'

const dialog = ref(null)
const emit = defineEmits(['close'])

const enabled = defineModel('enabled', { default: false })

const close_click = () => {
  enabled.value = false
  emit('close')
}

const handle_click_outside = (event) => {
  if (dialog.value && !dialog.value.contains(event.target)) {
    enabled.value = false
  }
}

// onMounted(() => {
//   document.addEventListener('mousedown', handle_click_outside)
// })
// onBeforeUnmount(() => {
//   document.removeEventListener('mousedown', handle_click_outside)
// })
</script>

<style lang="less" scoped>
.gate-dialog-box {
  position: relative;
  background-color: var(--background-color);
  box-shadow: var(--box-shadow);
  border-radius: 2cqw;
  transition: all 0.3s;
  cursor: default;

  .close-button {
    position: absolute;
    top: 1.5cqw;
    right: 1.5cqw;
    width: 2cqw;
    height: 2cqw;
    background-image: url(../assets/cross.svg);
    background-size: 100%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .gate-dialog-content {
    width: 100%;
    height: 100%;
  }
}

.zoom-out-center-enter-active,
.zoom-out-center-leave-active {
  transition: all 0.3s;
}
.zoom-out-center-enter-from {
  transform: scale(0.25);
  opacity: 0;
}
.zoom-out-center-enter-to {
  transform: scale(1);
  opacity: 1;
}
.zoom-out-center-leave-from {
  transform: scale(1);
  opacity: 1;
}
.zoom-out-center-leave-to {
  transform: scale(0.25);
  opacity: 0;
}
</style>
