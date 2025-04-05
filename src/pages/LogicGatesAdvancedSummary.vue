<template>
  <div class="logic-gates-advanced-summary-box">
    <h1 class="main-title">
      <button type="button" class="menu-button" @click="emit('menu-page')">
        <ColoredSVG :src="list_logo" :color="'var(--text-light)'" />
      </button>
      <span class="title-content">{{ $t('logic_gates_advanced_summary.title') }}</span>
    </h1>

    <transition name="slide-to-bottom" appear>
      <div class="explain">{{ $t('logic_gates_advanced_summary.explain') }}</div>
    </transition>

    <div class="handle-box">
      <div class="nand-gate">
        <div class="background-text gate-name">{{ $t('word.nand_gate') }}</div>
        <div class="background-text a">A</div>
        <SwitchButton class="switch a" size="2.6cqw" v-model="nand_switch_a" />
        <div class="background-text b">B</div>
        <SwitchButton class="switch b" size="2.6cqw" v-model="nand_switch_b" />
        <LogicWire
          class="wire-front a"
          :width="276"
          :height="83"
          :delay="200"
          :prop_in="nand_switch_a"
          v-model="nand_wire_a"
        >
          <path d="m75 40h92v41h92" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 40h92v41h92')" />
        </LogicWire>
        <LogicWire
          class="wire-front b"
          :width="276"
          :height="83"
          :delay="200"
          :prop_in="nand_switch_b"
          v-model="nand_wire_b"
        >
          <path d="m75 55h92v-41h92" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 55h92v-41h92')" />
        </LogicWire>
        <NandGate
          class="gate"
          :size="'3.33cqw'"
          :a="nand_wire_a"
          :b="nand_wire_b"
          v-model="nand_wire_y"
        />
        <LogicWire
          class="wire-back"
          :width="235"
          :height="166"
          :delay="200"
          :prop_in="nand_wire_y"
          v-model="nand_switch_y"
        >
          <path d="m15 88h155" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m15 88h155')" />
        </LogicWire>
        <div class="background-text y">Y</div>
        <SwitchButton class="switch y" size="2.6cqw" v-model="nand_switch_y" :disabled="true" />
      </div>
      <div class="nor-gate">
        <div class="background-text gate-name">{{ $t('word.nor_gate') }}</div>
        <div class="background-text a">A</div>
        <SwitchButton class="switch a" size="2.6cqw" v-model="nor_switch_a" />
        <div class="background-text b">B</div>
        <SwitchButton class="switch b" size="2.6cqw" v-model="nor_switch_b" />
        <LogicWire
          class="wire-front a"
          :width="276"
          :height="83"
          :delay="200"
          :prop_in="nor_switch_a"
          v-model="nor_wire_a"
        >
          <path d="m75 40h102v41h102" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 40h102v41h102')" />
        </LogicWire>
        <LogicWire
          class="wire-front b"
          :width="276"
          :height="83"
          :delay="200"
          :prop_in="nor_switch_b"
          v-model="nor_wire_b"
        >
          <path d="m75 55h102v-41h102" />
          <circle
            r="6"
            fill="var(--border-color)"
            style="offset-path: path('m75 55h102v-41h102')"
          />
        </LogicWire>
        <NorGate
          class="gate"
          :size="'3.33cqw'"
          :a="nor_wire_a"
          :b="nor_wire_b"
          v-model="nor_wire_y"
        />
        <LogicWire
          class="wire-back"
          :width="235"
          :height="166"
          :delay="200"
          :prop_in="nor_wire_y"
          v-model="nor_switch_y"
        >
          <path d="m15 88h155" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m15 88h155')" />
        </LogicWire>
        <div class="background-text y">Y</div>
        <SwitchButton class="switch y" size="2.6cqw" v-model="nor_switch_y" :disabled="true" />
      </div>
      <div class="xor-gate">
        <div class="background-text gate-name">{{ $t('word.xor_gate') }}</div>
        <div class="background-text a">A</div>
        <SwitchButton class="switch a" size="2.6cqw" v-model="xor_switch_a" />
        <div class="background-text b">B</div>
        <SwitchButton class="switch b" size="2.6cqw" v-model="xor_switch_b" />
        <LogicWire
          class="wire-front a"
          :width="276"
          :height="83"
          :delay="200"
          :prop_in="xor_switch_a"
          v-model="xor_wire_a"
        >
          <path d="m75 40h102v41h102" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 40h102v41h102')" />
        </LogicWire>
        <LogicWire
          class="wire-front b"
          :width="276"
          :height="83"
          :delay="200"
          :prop_in="xor_switch_b"
          v-model="xor_wire_b"
        >
          <path d="m75 55h102v-41h102" />
          <circle
            r="6"
            fill="var(--border-color)"
            style="offset-path: path('m75 55h102v-41h102')"
          />
        </LogicWire>
        <XorGate
          class="gate"
          :size="'3.33cqw'"
          :a="xor_wire_a"
          :b="xor_wire_b"
          v-model="xor_wire_y"
        />
        <LogicWire
          class="wire-back"
          :width="235"
          :height="166"
          :delay="200"
          :prop_in="xor_wire_y"
          v-model="xor_switch_y"
        >
          <path d="m15 88h155" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m15 88h155')" />
        </LogicWire>
        <div class="background-text y">Y</div>
        <SwitchButton class="switch y" size="2.6cqw" v-model="xor_switch_y" :disabled="true" />
      </div>
      <div class="xnor-gate">
        <div class="background-text gate-name">{{ $t('word.xnor_gate') }}</div>
        <div class="background-text a">A</div>
        <SwitchButton class="switch a" size="2.6cqw" v-model="xnor_switch_a" />
        <div class="background-text b">B</div>
        <SwitchButton class="switch b" size="2.6cqw" v-model="xnor_switch_b" />
        <LogicWire
          class="wire-front a"
          :width="276"
          :height="83"
          :delay="200"
          :prop_in="xnor_switch_a"
          v-model="xnor_wire_a"
        >
          <path d="m75 40h102v41h102" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m75 40h102v41h102')" />
        </LogicWire>
        <LogicWire
          class="wire-front b"
          :width="276"
          :height="83"
          :delay="200"
          :prop_in="xnor_switch_b"
          v-model="xnor_wire_b"
        >
          <path d="m75 55h102v-41h102" />
          <circle
            r="6"
            fill="var(--border-color)"
            style="offset-path: path('m75 55h102v-41h102')"
          />
        </LogicWire>
        <XnorGate
          class="gate"
          :size="'3.33cqw'"
          :a="xnor_wire_a"
          :b="xnor_wire_b"
          v-model="xnor_wire_y"
        />
        <LogicWire
          class="wire-back"
          :width="235"
          :height="166"
          :delay="200"
          :prop_in="xnor_wire_y"
          v-model="xnor_switch_y"
        >
          <path d="m15 88h155" />
          <circle r="6" fill="var(--border-color)" style="offset-path: path('m15 88h155')" />
        </LogicWire>
        <div class="background-text y">Y</div>
        <SwitchButton class="switch y" size="2.6cqw" v-model="xnor_switch_y" :disabled="true" />
      </div>
    </div>

    <transition name="slide-to-top" appear>
      <MainHandleButton class="next" @click="next_page">
        {{ $t('logic_gates_advanced_summary.next_section') }}
      </MainHandleButton>
    </transition>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import LogicWire from '@/components/LogicWire.vue'
import NandGate from '@/components/NandGate.vue'
import NorGate from '@/components/NorGate.vue'
import XorGate from '@/components/XorGate.vue'
import XnorGate from '@/components/XnorGate.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import list_logo from '@/assets/list.svg'

const emit = defineEmits(['menu-page', 'next-page'])

const nand_switch_a = ref(true)
const nand_switch_b = ref(true)
const nand_switch_y = ref(false)

const nand_wire_a = ref(true)
const nand_wire_b = ref(true)
const nand_wire_y = ref(false)

const nor_switch_a = ref(true)
const nor_switch_b = ref(true)
const nor_switch_y = ref(false)

const nor_wire_a = ref(true)
const nor_wire_b = ref(true)
const nor_wire_y = ref(false)

const xor_switch_a = ref(false)
const xor_switch_b = ref(false)
const xor_switch_y = ref(false)

const xor_wire_a = ref(false)
const xor_wire_b = ref(false)
const xor_wire_y = ref(false)

const xnor_switch_a = ref(true)
const xnor_switch_b = ref(false)
const xnor_switch_y = ref(false)

const xnor_wire_a = ref(true)
const xnor_wire_b = ref(false)
const xnor_wire_y = ref(false)

const next_page = () => {
  nextTick(() => {
    emit('next-page')
  })
}
</script>

<style lang="less" scoped>
.logic-gates-advanced-summary-box {
  padding: 2em;
  font-size: 2.17cqw;

  .explain {
    font-size: 2cqw;
  }

  .handle-box {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    bottom: 9cqh;
    left: 0;
    right: 0;
    width: 100cqw;
    height: 60cqh;
    overflow: hidden;
    transition: all 0.3s;

    .nand-gate,
    .nor-gate,
    .xor-gate,
    .xnor-gate {
      width: 50cqw;

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

    .nand-gate {
      .background-text {
        &.gate-name {
          top: 5%;
          left: 25%;
        }
        &.a {
          top: 9%;
          left: 5%;
        }
        &.b {
          top: 30%;
          left: 5%;
        }
        &.y {
          top: 19.45%;
          left: 46%;
        }
      }

      .switch,
      .gate {
        &.a {
          top: 22%;
          left: 5%;
        }
        &.b {
          top: 43%;
          left: 5%;
        }
        &.y {
          top: 33%;
          left: 46%;
        }
      }

      .wire-front {
        width: 27%;
        left: 0;

        &.a {
          top: 14%;
          height: 18%;
        }
        &.b {
          top: 32%;
          height: 18%;
        }
      }

      .wire-back {
        top: 14%;
        width: 23%;
        left: 27%;
        height: 36%;
      }

      .gate {
        top: 33%;
        left: 27%;
      }
    }
    .nor-gate {
      .background-text {
        &.gate-name {
          top: 5%;
          left: 75%;
        }
        &.a {
          top: 9%;
          left: 55%;
        }
        &.b {
          top: 30%;
          left: 55%;
        }
        &.y {
          top: 19.45%;
          left: 96%;
        }
      }

      .switch,
      .gate {
        &.a {
          top: 22%;
          left: 55%;
        }
        &.b {
          top: 43%;
          left: 55%;
        }
        &.y {
          top: 33%;
          left: 96%;
        }
      }

      .wire-front {
        width: 27%;
        left: 50%;

        &.a {
          top: 14%;
          height: 18%;
        }
        &.b {
          top: 32%;
          height: 18%;
        }
      }

      .wire-back {
        top: 14%;
        width: 23%;
        left: 77%;
        height: 36%;
      }

      .gate {
        top: 33%;
        left: 77%;
      }
    }
    .xor-gate {
      .background-text {
        &.gate-name {
          top: 55%;
          left: 25%;
        }
        &.a {
          top: 59%;
          left: 5%;
        }
        &.b {
          top: 80%;
          left: 5%;
        }
        &.y {
          top: 69.45%;
          left: 46%;
        }
      }

      .switch,
      .gate {
        &.a {
          top: 72%;
          left: 5%;
        }
        &.b {
          top: 93%;
          left: 5%;
        }
        &.y {
          top: 83%;
          left: 46%;
        }
      }

      .wire-front {
        width: 27%;
        left: 0;

        &.a {
          top: 64%;
          height: 18%;
        }
        &.b {
          top: 82%;
          height: 18%;
        }
      }

      .wire-back {
        top: 64%;
        width: 23%;
        left: 27%;
        height: 36%;
      }

      .gate {
        top: 83%;
        left: 27%;
      }
    }
    .xnor-gate {
      .background-text {
        &.gate-name {
          top: 55%;
          left: 75%;
        }
        &.a {
          top: 59%;
          left: 55%;
        }
        &.b {
          top: 80%;
          left: 55%;
        }
        &.y {
          top: 69.45%;
          left: 96%;
        }
      }

      .switch,
      .gate {
        &.a {
          top: 72%;
          left: 55%;
        }
        &.b {
          top: 93%;
          left: 55%;
        }
        &.y {
          top: 83%;
          left: 96%;
        }
      }

      .wire-front {
        width: 27%;
        left: 50%;

        &.a {
          top: 64%;
          height: 18%;
        }
        &.b {
          top: 82%;
          height: 18%;
        }
      }

      .wire-back {
        top: 64%;
        width: 23%;
        left: 77%;
        height: 36%;
      }

      .gate {
        top: 83%;
        left: 77%;
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
