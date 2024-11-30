<template>
  <div :class="{ 'switches-box': true, active: switch_on }">
    <h1>
      <button type="button" class="prev-button" @click="emit('menu-page')">
        <ColoredSVG
          :src="list_logo"
          :color="switch_on ? 'var(--text-light)' : 'var(--text-dark)'"
        />
      </button>
      {{ $t('switches_page.title') }}
    </h1>

    <div class="explain">{{ $t('switches_page.explain') }}</div>

    <transition name="switch-off" apear>
      <div class="state-off" v-if="!switch_on">
        <div class="state-text">{{ $t('switches_page.switch_off') }}</div>
        <div class="state-number">0</div>
      </div>
    </transition>
    <transition name="switch-on" apear>
      <div class="state-on" v-if="switch_on">
        <div class="state-text">{{ $t('switches_page.switch_on') }}</div>
        <div class="state-number">1</div>
      </div>
    </transition>

    <SwitchButton class="switch-button" v-model="switch_on" />

    <MainHandleButton class="next" @click="emit('next-page')">
      {{ $t('switches_page.next_section') }}
    </MainHandleButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import list_logo from '@/assets/list.svg'

const emit = defineEmits(['menu-page', 'next-page'])

const switch_on = ref(false)
</script>

<style lang="less" scoped>
.switches-box {
  position: relative;
  padding: 2rem;
  font-size: 24px;
  color: var(--text-dark);
  background-image: linear-gradient(
    115deg,
    var(--background-dark) 0%,
    var(--background-dark) 33.33%,
    var(--background-light) 66.67%,
    var(--background-light) 100%
  );
  background-size: 400% 100%;
  background-position-x: 0%;
  background-repeat: no-repeat;
  transition: all 0.3s;

  &.active {
    color: var(--text-light);
    background-position-x: 100%;

    .prev-button:hover {
      background-color: var(--secondary-light-blue);
    }
  }

  .prev-button {
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: transparent;
    border: 0;
    border-radius: 99px;
    transition: all 0.2s;

    &:hover {
      background-color: var(--dark-blue);
    }

    .colored-svg-box {
      transition: background-color 0.2s;
    }
  }

  .state-on,
  .state-off {
    position: absolute;
    top: 65vh;
    text-align: center;
    font-size: 20vw;
    line-height: 100%;
    transform: translateY(-50%);

    .state-text {
      position: absolute;
      top: -40%;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      color: transparent;
      background: linear-gradient(0deg, transparent 20%, var(--sub-text-color) 80%);
      background-clip: text;
      z-index: 1;
    }

    .state-number {
      position: relative;
      z-index: 2;
    }
  }

  .state-on {
    right: 20vw;

    .state-number {
      color: var(--text-light);
    }
  }
  .state-off {
    left: 20vw;

    .state-number {
      color: var(--text-dark);
    }
  }

  .switch-button {
    position: absolute;
    left: 50vw;
    bottom: 25vh;
    transform: translate(-50%, -50%);
  }

  .next {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
  }
}

.switch-on-enter-active,
.switch-on-leave-active {
  transition: all 0.3s;
  transform-origin: 0% 0%;
}
.switch-on-enter-from {
  transform: translate(-50vw, -50%) !important;
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
  transform: translate(-50vw, -50%) !important;
  opacity: 0;
}

.switch-off-enter-active,
.switch-off-leave-active {
  transition: all 0.3s;
  transform-origin: 0% 0%;
}
.switch-off-enter-from {
  transform: translate(50vw, -50%) !important;
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
  transform: translate(50vw, -50%) !important;
  opacity: 0;
}
</style>
