<template>
  <div class="and-gate-page-box">
    <h1 class="main-title">
      <button type="button" class="menu-button" @click="emit('menu-page')">
        <ColoredSVG :src="list_logo" :color="'var(--text-light)'" />
      </button>
      <span class="title-content">{{ $t('and_gate_page.title') }}</span>
    </h1>

    <transition name="slide-to-bottom">
      <div class="explain" v-if="handled">{{ $t('and_gate_page.explain') }}</div>
    </transition>

    <div class="handle-box">
      <SwitchButton class="switch-a" :size="'4.5cqw'" v-model="switch_a" />
      <SwitchButton class="switch-b" :size="'4.5cqw'" v-model="switch_b" />
      <LogicWire
        class="wire-front-a"
        :width="200"
        :height="150"
        :delay="200"
        :prop_in="switch_a"
        v-model="gate_a"
      >
        <path d="m78 105h50v35h50" />
        <circle r="5" fill="var(--border-color)" style="offset-path: path('m78 105h50v35h50')" />
      </LogicWire>
      <LogicWire
        class="wire-front-b"
        :width="200"
        :height="150"
        :delay="200"
        :prop_in="switch_b"
        v-model="gate_b"
      >
        <path d="m78 45h50v-35h50" />
        <circle r="5" fill="var(--border-color)" style="offset-path: path('m78 45h50v-35h50')" />
      </LogicWire>
      <AndGate class="gate" :size="'10cqw'" :a="gate_a" :b="gate_b" v-model="gate_y" />
      <LogicWire
        class="wire-back"
        :width="200"
        :height="300"
        :delay="200"
        :prop_in="gate_y"
        v-model="switch_y"
      >
        <path d="m22 150h100" />
        <circle r="5" fill="var(--border-color)" style="offset-path: path('m22 150h100')" />
      </LogicWire>
      <SwitchButton class="switch-y" :size="'4.5cqw'" v-model="switch_y" :disabled="true" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ColoredSVG from '@/components/ColoredSVG.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import LogicWire from '@/components/LogicWire.vue'
import AndGate from '@/components/AndGate.vue'

import list_logo from '@/assets/list.svg'

const emit = defineEmits(['menu-page', 'next-page'])

const switch_a = ref(false)
const switch_b = ref(false)
const switch_y = ref(false)

const gate_a = ref(false)
const gate_b = ref(false)
const gate_y = ref(false)

const handled = ref(false)

watch(switch_y, () => {
  if (switch_y.value) {
    handled.value = true
  }

  console.log(handled.value)
})
</script>

<style lang="less" scoped>
.and-gate-page-box {
  padding: 2em;

  .handle-box {
    position: relative;
    container: size;
    width: min(1000px, 100vw - 4em);
    height: min(750px, (100vw - 4em) / 4 * 3);
    margin: 2em auto 0;
    overflow: hidden;

    .switch-a,
    .switch-b,
    .switch-y,
    .gate {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 2;
    }

    .switch-a {
      top: 35%;
      left: 15%;
    }

    .switch-b {
      top: 65%;
      left: 15%;
    }

    .wire-front-a,
    .wire-front-b,
    .wire-back {
      position: absolute;
      width: 50%;
    }

    .wire-front-a,
    .wire-front-b {
      left: 0;
    }

    .wire-front-a {
      top: 0;
      height: 50%;
    }

    .wire-front-b {
      bottom: 0;
      height: 50%;
    }

    .wire-back {
      right: 0;
      height: 100%;
    }

    .switch-y {
      top: 50%;
      left: 85%;
    }

    .gate {
      top: 50%;
      left: 50%;
    }
  }
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
</style>
