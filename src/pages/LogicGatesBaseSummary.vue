<template>
  <div class="logic-gates-base-summary-box">
    <h1 class="main-title">
      <button type="button" class="menu-button" @click="emit('menu-page')">
        <ColoredSVG :src="list_logo" :color="'var(--text-light)'" />
      </button>
      <span class="title-content">{{ $t('logic_gates_base_summary.title') }}</span>
    </h1>

    <transition name="slide-to-bottom" appear>
      <div class="explain">{{ $t('logic_gates_base_summary.explain') }}</div>
    </transition>

    <div class="handle-box">
      <div class="and-gate">
        <div class="background-text gate-name">{{ $t('word.and_gate') }}</div>
        <div class="background-text a">A</div>
        <SwitchButton class="switch a" size="2.6cqw" v-model="and_switch_a" />
        <div class="background-text b">B</div>
        <SwitchButton class="switch b" size="2.6cqw" v-model="and_switch_b" />
        <LogicWire
          class="wire-front a"
          :width="188"
          :height="230"
          :delay="200"
          :prop_in="and_switch_a"
          v-model="and_wire_a"
        >
          <path d="m75 185h50v38h50" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 185h50v38h50')" />
        </LogicWire>
        <LogicWire
          class="wire-front b"
          :width="188"
          :height="250"
          :delay="200"
          :prop_in="and_switch_b"
          v-model="and_wire_b"
        >
          <path d="m75 47h50v-38h50" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 47h50v-38h50')" />
        </LogicWire>
        <AndGate
          class="gate"
          :size="'3.33cqw'"
          :a="and_wire_a"
          :b="and_wire_b"
          v-model="and_wire_y"
        />
        <LogicWire
          class="wire-back"
          :width="153"
          :height="460"
          :delay="200"
          :prop_in="and_wire_y"
          v-model="and_switch_y"
        >
          <path d="m15 229h60" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m15 229h60')" />
        </LogicWire>
        <div class="background-text y">Y</div>
        <SwitchButton class="switch y" size="2.6cqw" v-model="and_switch_y" :disabled="true" />
      </div>
      <div class="or-gate">
        <div class="background-text gate-name">{{ $t('word.or_gate') }}</div>
        <div class="background-text a">A</div>
        <SwitchButton class="switch a" size="2.6cqw" v-model="or_switch_a" />
        <div class="background-text b">B</div>
        <SwitchButton class="switch b" size="2.6cqw" v-model="or_switch_b" />
        <LogicWire
          class="wire-front a"
          :width="188"
          :height="230"
          :delay="200"
          :prop_in="or_switch_a"
          v-model="or_wire_a"
        >
          <path d="m75 185h55v38h55" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 185h55v38h55')" />
        </LogicWire>
        <LogicWire
          class="wire-front b"
          :width="188"
          :height="250"
          :delay="200"
          :prop_in="or_switch_b"
          v-model="or_wire_b"
        >
          <path d="m75 47h55v-38h55" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 47h55v-38h55')" />
        </LogicWire>
        <OrGate class="gate" :size="'3.33cqw'" :a="or_wire_a" :b="or_wire_b" v-model="or_wire_y" />
        <LogicWire
          class="wire-back"
          :width="153"
          :height="460"
          :delay="200"
          :prop_in="or_wire_y"
          v-model="or_switch_y"
        >
          <path d="m15 229h60" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m15 229h60')" />
        </LogicWire>
        <div class="background-text y">Y</div>
        <SwitchButton class="switch y" size="2.6cqw" v-model="or_switch_y" :disabled="true" />
      </div>
      <div class="not-gate">
        <div class="background-text gate-name">{{ $t('word.not_gate') }}</div>
        <div class="background-text a">A</div>
        <SwitchButton class="switch a" size="2.6cqw" v-model="not_switch_a" />
        <LogicWire
          class="wire-front"
          :width="171"
          :height="460"
          :delay="200"
          :prop_in="not_switch_a"
          v-model="not_wire_a"
        >
          <path d="m75 230h80" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 230h80')" />
        </LogicWire>
        <NotGate class="gate" :size="'3.33cqw'" :a="not_wire_a" v-model="not_wire_y" />
        <LogicWire
          class="wire-back"
          :width="171"
          :height="460"
          :delay="200"
          :prop_in="not_wire_y"
          v-model="not_switch_y"
        >
          <path d="m15 230h80" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m15 230h80')" />
        </LogicWire>
        <div class="background-text y">Y</div>
        <SwitchButton class="switch y" size="2.6cqw" v-model="not_switch_y" :disabled="true" />
      </div>
    </div>

    <transition name="slide-to-top" appear>
      <MainHandleButton class="next" @click="next_page">
        {{ $t('logic_gates_base_summary.next_section') }}
      </MainHandleButton>
    </transition>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import LogicWire from '@/components/LogicWire.vue'
import AndGate from '@/components/AndGate.vue'
import OrGate from '@/components/OrGate.vue'
import NotGate from '@/components/NotGate.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import list_logo from '@/assets/list.svg'

const emit = defineEmits(['menu-page', 'next-page'])

const and_switch_a = ref(false)
const and_switch_b = ref(false)
const and_switch_y = ref(false)

const and_wire_a = ref(false)
const and_wire_b = ref(false)
const and_wire_y = ref(false)

const or_switch_a = ref(false)
const or_switch_b = ref(false)
const or_switch_y = ref(false)

const or_wire_a = ref(false)
const or_wire_b = ref(false)
const or_wire_y = ref(false)

const not_switch_a = ref(true)
const not_switch_y = ref(false)

const not_wire_a = ref(true)
const not_wire_y = ref(false)

const next_page = () => {
  nextTick(() => {
    emit('next-page')
  })
}
</script>

<style lang="less" scoped>
.logic-gates-base-summary-box {
  padding: 2em;
  font-size: 2.17cqw;

  .explain {
    font-size: 2cqw;
  }

  .handle-box {
    position: absolute;
    display: flex;
    bottom: 4cqh;
    left: 0;
    right: 0;
    width: 100cqw;
    height: 60cqh;
    overflow: hidden;
    transition: all 0.3s;

    .and-gate,
    .or-gate,
    .not-gate {
      flex: 1;

      .background-text {
        position: absolute;
        font-size: 6.67cqw;
        z-index: 2;
      }
      .switch,
      .gate {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 3;
      }
      .wire-front,
      .wire-back {
        position: absolute;
      }
    }

    .and-gate {
      .background-text {
        &.gate-name {
          top: 15%;
          left: 18%;
        }
        &.a {
          top: 37%;
          left: 5%;
        }
        &.b {
          top: 57%;
          left: 5%;
        }
        &.y {
          top: 47%;
          left: 28.33%;
        }
      }

      .switch,
      .gate {
        &.a {
          top: 50%;
          left: 5%;
        }
        &.b {
          top: 70%;
          left: 5%;
        }
        &.y {
          top: 60%;
          left: 28.33%;
        }
      }

      .wire-front {
        width: 18.33%;
        left: 0;

        &.a {
          top: 10%;
          height: 50%;
        }
        &.b {
          bottom: -10%;
          height: 50%;
        }
      }

      .wire-back {
        top: 10%;
        width: 15%;
        right: 66.67%;
        height: 100%;
      }

      .gate {
        top: 60%;
        left: 18.33%;
      }
    }
    .or-gate {
      .background-text {
        &.gate-name {
          top: 15%;
          left: 51%;
        }
        &.a {
          top: 37%;
          left: 38.33%;
        }
        &.b {
          top: 57%;
          left: 38.33%;
        }
        &.y {
          top: 47%;
          left: 61.67%;
        }
      }

      .switch,
      .gate {
        &.a {
          top: 50%;
          left: 38.33%;
        }
        &.b {
          top: 70%;
          left: 38.33%;
        }
        &.y {
          top: 60%;
          left: 61.67%;
        }
      }

      .wire-front {
        width: 18.33%;
        left: 33.33%;

        &.a {
          top: 10%;
          height: 50%;
        }
        &.b {
          bottom: -10%;
          height: 50%;
        }
      }

      .wire-back {
        top: 10%;
        width: 15%;
        right: 33.33%;
        height: 100%;
      }

      .gate {
        top: 60%;
        left: 51.67%;
      }
    }
    .not-gate {
      .background-text {
        &.gate-name {
          top: 15%;
          left: 83%;
        }
        &.a {
          top: 47%;
          left: 71.67%;
        }
        &.y {
          top: 47%;
          left: 95%;
        }
      }

      .switch,
      .gate {
        &.a {
          top: 60%;
          left: 71.67%;
        }
        &.y {
          top: 60%;
          left: 95%;
        }
      }

      .wire-front {
        top: 10%;
        width: 16.67%;
        left: 66.67;
        height: 100%;
      }

      .wire-back {
        top: 10%;
        width: 16.67%;
        right: 0;
        height: 100%;
      }

      .gate {
        top: 60%;
        left: 83.33%;
      }
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
