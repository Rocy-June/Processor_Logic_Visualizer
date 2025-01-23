<template>
  <div class="not-gate-page-box">
    <h1 class="main-title">
      <button type="button" class="menu-button" @click="emit('menu-page')">
        <ColoredSVG :src="list_logo" :color="'var(--text-light)'" />
      </button>
      <span class="title-content">{{ $t('not_gate_page.title') }}</span>
    </h1>

    <transition name="slide-to-bottom">
      <div class="explain" v-if="handled">
        <div class="explain-text">{{ $t('not_gate_page.explain') }}</div>
        <div class="explain-truth-table-box">
          <table>
            <thead>
              <tr>
                <th>A</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="true">1</td>
                <td class="false">0</td>
              </tr>
              <tr>
                <td class="false">0</td>
                <td class="true">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>

    <div :class="{ 'handle-box': true, handled: handled }">
      <div class="background-text a">A</div>
      <SwitchButton class="switch a" :size="'4.5cqw'" v-model="switch_a" />
      <LogicWire
        class="wire-front"
        :width="555"
        :height="500"
        :delay="200"
        :prop_in="switch_a"
        v-model="wire_a"
      >
        <path d="m215 250h320" />
        <circle r="5" fill="var(--border-color)" style="offset-path: path('m55 250h280')" />
      </LogicWire>
      <NotGate class="gate" :size="'10cqw'" :a="wire_a" v-model="wire_y" />
      <LogicWire
        class="wire-back"
        :width="555"
        :height="500"
        :delay="200"
        :prop_in="wire_y"
        v-model="switch_y"
      >
        <path d="m55 250h280" />
        <circle r="5" fill="var(--border-color)" style="offset-path: path('m55 250h280')" />
      </LogicWire>
      <div class="background-text y">Y</div>
      <SwitchButton class="switch y" :size="'4.5cqw'" v-model="switch_y" :disabled="true" />
    </div>

    <transition name="slide-to-left">
      <MainHandleButton class="next" v-if="handled" @click="next_page">
        {{ $t('or_gate_page.next_section') }}
      </MainHandleButton>
    </transition>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import LogicWire from '@/components/LogicWire.vue'
import NotGate from '@/components/NotGate.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import list_logo from '@/assets/list.svg'

const emit = defineEmits(['menu-page', 'next-page'])

const switch_a = ref(true)
const switch_y = ref(false)

const wire_a = ref(true)
const wire_y = ref(false)

const handled = ref(false)

watch(switch_y, () => {
  if (switch_y.value) {
    handled.value = true
  }

  console.log(handled.value)
})

const next_page = () => {
  nextTick(() => {
    emit('next-page')
  })
}
</script>

<style lang="less" scoped>
.not-gate-page-box {
  padding: 2em;
  font-size: 2.17cqw;

  .explain {
    font-size: 2cqw;

    .explain-truth-table-box {
      text-align: center;

      table {
        margin: auto;
        border-collapse: collapse;

        td,
        th {
          padding: 0.15em 2em;
          border: 0.2cqw solid var(--border-color);
          background-color: var(--primary-gray);

          &.true {
            background-color: #adeba0;
          }

          &.false {
            background-color: #ebb0a0;
          }
        }
      }
    }
  }

  .handle-box {
    position: absolute;
    bottom: 15cqh;
    left: 0;
    right: 0;
    width: 100cqw;
    height: 60cqh;
    overflow: hidden;
    transition: all 0.3s;

    &.handled {
      bottom: 6cqh;
    }

    .background-text {
      position: absolute;
      font-size: 20cqw;
      top: -40%;
      left: 50%;
      z-index: 2;

      &.a {
        top: 25%;
        left: 15%;
      }
      &.y {
        top: 25%;
        left: 85%;
      }
    }

    .switch,
    .gate {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 3;

      &.a {
        top: 60%;
        left: 15%;
      }
      &.y {
        top: 60%;
        left: 85%;
      }
    }

    .wire-front {
      position: absolute;
      top: 10%;
      width: 50%;
      left: 0;
      height: 100%;
    }

    .wire-back {
      position: absolute;
      top: 10%;
      width: 50%;
      right: 0;
      height: 100%;
    }

    .gate {
      top: 60%;
      left: 50%;
    }
  }

  .next {
    position: absolute;
    right: 2em;
    bottom: 2em;
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
