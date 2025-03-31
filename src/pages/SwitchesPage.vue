s
<template>
  <div :class="{ 'switches-box': true, dark: !switch_on }">
    <h1 class="main-title">
      <button type="button" class="menu-button" @click="emit('menu-page')">
        <ColoredSVG
          :src="list_logo"
          :color="switch_on ? 'var(--text-light)' : 'var(--text-dark)'"
        />
      </button>
      <span class="title-content">{{ $t('switches_page.title') }}</span>
    </h1>

    <transition name="slide-to-bottom">
      <div class="explain" v-if="handled">{{ $t('switches_page.explain') }}</div>
    </transition>

    <transition name="switch-off" apear>
      <div :class="{ 'state-off': true, handled: handled }" v-if="!switch_on">
        <div class="background-text">{{ $t('switches_page.switch_off') }}</div>
        <div class="state-number">0</div>
      </div>
    </transition>
    <transition name="switch-on" apear>
      <div :class="{ 'state-on': true, handled: handled }" v-if="switch_on">
        <div class="background-text">{{ $t('switches_page.switch_on') }}</div>
        <div class="state-number">1</div>
      </div>
    </transition>

    <SwitchButton
      :class="{ 'switch-button': true, handled: handled }"
      v-model="switch_on"
      @click="switch_clicked"
    />

    <transition name="slide-to-left">
      <MainHandleButton class="next" v-if="handled" @click="next_page">
        {{ $t('switches_page.next_section') }}
      </MainHandleButton>
    </transition>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import list_logo from '@/assets/list.svg'

const emit = defineEmits(['menu-page', 'next-page'])

const switch_on = ref(true)
const handled = ref(false)

const switch_clicked = () => {
  handled.value = true
}

const next_page = () => {
  switch_on.value = true
  nextTick(() => {
    emit('next-page')
  })
}

onMounted(() => {
  setTimeout(() => {
    switch_on.value = false
  }, 750)
})
</script>

<style lang="less" scoped>
.switches-box {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2em;
  font-size: 2.17cqw;
  color: var(--text-light);
  background-image: linear-gradient(
    115deg,
    var(--background-dark) 0%,
    var(--background-dark) 33.33%,
    var(--background-light) 66.67%,
    var(--background-light) 100%
  );
  background-size: 400% 100%;
  background-position-x: 100%;
  background-repeat: no-repeat;
  transition: all 0.3s;

  &.dark {
    color: var(--text-dark);
    background-position-x: 0%;

    .menu-button:hover {
      background-color: var(--dark-blue);
    }
  }

  .state-on,
  .state-off {
    position: absolute;
    top: 50cqh;
    text-align: center;
    font-size: 20cqw;
    line-height: 100%;
    transform: translateY(-50%);
    transition: all 0.3s;

    &.handled {
      top: 65cqh;
    }

    .background-text {
      position: absolute;
      top: -40%;
      left: 50%;
      z-index: 1;
    }

    .state-number {
      position: relative;
      z-index: 2;
    }
  }

  .state-on {
    right: 20cqw;

    .state-number {
      color: var(--text-light);
    }
  }
  .state-off {
    left: 20cqw;

    .state-number {
      color: var(--text-dark);
    }
  }

  .switch-button {
    position: absolute;
    left: 50cqw;
    bottom: 40cqh;
    transform: translate(-50%, -50%);
    transition: all 0.3s;

    &:hover {
      transform: translate(-50%, -50%) scale(1.03);
    }

    &:active {
      transform: translate(-50%, -50%) scale(0.97);
    }

    &.handled {
      bottom: 25cqh;
    }
  }

  .next {
    position: absolute;
    right: 2em;
    bottom: 2em;
  }
}

.switch-on-enter-active,
.switch-on-leave-active {
  transition: all 0.3s;
}
.switch-on-enter-from {
  transform: translate(-50cqw, -50%) !important;
  opacity: 0;
}
.switch-on-enter-to {
  transform: translate(0, -50%) !important;
  opacity: 1;
}
.switch-on-leave-from {
  transform: translate(0, -50%) !important;
  opacity: 1;
}
.switch-on-leave-to {
  transform: translate(-50cqw, -50%) !important;
  opacity: 0;
}

.switch-off-enter-active,
.switch-off-leave-active {
  transition: all 0.3s;
}
.switch-off-enter-from {
  transform: translate(50cqw, -50%) !important;
  opacity: 0;
}
.switch-off-enter-to {
  transform: translate(0, -50%) !important;
  opacity: 1;
}
.switch-off-leave-from {
  transform: translate(0, -50%) !important;
  opacity: 1;
}
.switch-off-leave-to {
  transform: translate(50cqw, -50%) !important;
  opacity: 0;
}

.slide-to-bottom-enter-active,
.slide-to-bottom-leave-active {
  transition: all 0.3s;
}
.slide-to-bottom-enter-from {
  transform: translateY(-50%);
  opacity: 0;
}
.slide-to-bottom-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-to-bottom-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-to-bottom-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}

.slide-to-left-enter-active,
.slide-to-left-leave-active {
  transition: all 0.3s;
}
.slide-to-left-enter-from {
  transform: translateX(50%);
  opacity: 0;
}
.slide-to-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-to-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-to-left-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
</style>
<style lang="less">
body {
  &:has(.switches-box.dark) {
    background-color: var(--background-dark);
  }

  .page-transition::before {
    display: none;
  }
}
</style>
