<template>
  <div class="half-adder-box">
    <h1 class="main-title">
      <button type="button" class="menu-button" @click="emit('menu-page')">
        <ColoredSVG :src="list_logo" :color="'var(--text-light)'" />
      </button>
      <span class="title-content">{{ $t('half_adder_page.title') }}</span>
    </h1>

    <transition name="slide-to-bottom">
      <div class="explain" v-if="handled">
        <div class="explain-text">{{ $t('half_adder_page.explain') }}</div>
        <div class="explain-truth-table-box">
          <table>
            <thead>
              <tr>
                <th colspan="2">输入</th>
                <th colspan="2">输出</th>
              </tr>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>S</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="false">0</td>
                <td class="false">0</td>
                <td class="false">0</td>
                <td class="false">0</td>
              </tr>
              <tr>
                <td class="false">0</td>
                <td class="true">1</td>
                <td class="false">0</td>
                <td class="true">1</td>
              </tr>
              <tr>
                <td class="true">1</td>
                <td class="false">0</td>
                <td class="false">0</td>
                <td class="true">1</td>
              </tr>
              <tr>
                <td class="true">1</td>
                <td class="true">1</td>
                <td class="true">1</td>
                <td class="false">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>

    <div :class="{ 'handle-box': true, handled: handled }">
      <div class="background-text a reverse">A</div>
      <SwitchButton class="switch a" size="3.4cqw" v-model="switch_a" />
      <div class="background-text b">B</div>
      <SwitchButton class="switch b" size="3.4cqw" v-model="switch_b" />
      <LogicWire
        class="wire a_wire_a"
        :width="430"
        :height="345"
        :delay="200"
        :prop_in="switch_a"
        v-model="wire_a_wire_a"
      >
        <path d="m85 60h160" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m85 60h160')" />
      </LogicWire>
      <LogicWire
        class="wire wire_a_xor"
        :width="430"
        :height="345"
        :delay="200"
        :prop_in="wire_a_wire_a"
        v-model="wire_wire_a_xor"
      >
        <path d="m245 60h160" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m245 60h160')" />
      </LogicWire>
      <LogicWire
        class="wire wire_a_and"
        :width="430"
        :height="345"
        :delay="200"
        :prop_in="wire_a_wire_a"
        v-model="wire_wire_a_and"
      >
        <path d="m245 60v165h160" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m245 60v165h160')" />
      </LogicWire>
      <LogicWire
        class="wire b_wire_b"
        :width="430"
        :height="345"
        :delay="200"
        :prop_in="switch_b"
        v-model="wire_b_wire_b"
      >
        <path d="m85 60h80" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m85 60h80')" />
      </LogicWire>
      <LogicWire
        class="wire wire_b_xor"
        :width="430"
        :height="345"
        :delay="200"
        :prop_in="wire_b_wire_b"
        v-model="wire_wire_b_xor"
      >
        <path d="m165 60h240" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m165 60h240')" />
      </LogicWire>
      <LogicWire
        class="wire wire_b_and"
        :width="430"
        :height="345"
        :delay="200"
        :prop_in="wire_b_wire_b"
        v-model="wire_wire_b_and"
      >
        <path d="m165 60v165h240" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m165 60v165h240')" />
      </LogicWire>
      <LogicWire
        class="wire xor_s"
        :width="327"
        :height="92"
        :delay="200"
        :prop_in="wire_xor_s"
        v-model="switch_s"
      >
        <path d="m30 45h205" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m30 45h205')" />
      </LogicWire>
      <LogicWire
        class="wire and_c"
        :width="327"
        :height="92"
        :delay="200"
        :prop_in="wire_and_c"
        v-model="switch_c"
      >
        <path d="m30 45h205" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m30 45h205')" />
      </LogicWire>
      <div class="background-text s">S</div>
      <SwitchButton class="switch s" size="3.4cqw" v-model="switch_s" :disabled="true" />
      <div class="background-text c">C</div>
      <SwitchButton class="switch c" size="3.4cqw" v-model="switch_c" :disabled="true" />
      <AndGate
        class="gate and"
        size="10cqw"
        :a="wire_wire_a_and"
        :b="wire_wire_b_and"
        v-model="wire_and_c"
      />
      <XorGate
        class="gate xor"
        size="10cqw"
        :a="wire_wire_a_xor"
        :b="wire_wire_b_xor"
        v-model="wire_xor_s"
      />
    </div>

    <transition name="slide-to-left">
      <MainHandleButton class="next" v-if="handled" @click="next_page">
        {{ $t('half_adder_page.next_section') }}
      </MainHandleButton>
    </transition>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import LogicWire from '@/components/LogicWire.vue'
import XorGate from '@/components/XorGate.vue'
import AndGate from '@/components/AndGate.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import list_logo from '@/assets/list.svg'

const emit = defineEmits(['menu-page', 'next-page'])

const switch_a = ref(false)
const switch_b = ref(false)
const switch_s = ref(false)
const switch_c = ref(false)

const wire_a_wire_a = ref(false)
const wire_wire_a_xor = ref(false)
const wire_wire_a_and = ref(false)
const wire_b_wire_b = ref(false)
const wire_wire_b_xor = ref(false)
const wire_wire_b_and = ref(false)
const wire_xor_s = ref(false)
const wire_and_c = ref(false)

const handled = ref(false)

watch(switch_c, () => {
  if (switch_c.value) {
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
.half-adder-box {
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
          padding: 0.05em 1.65em;
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
      bottom: 0;
    }

    .background-text {
      position: absolute;
      font-size: 12cqw;
      z-index: 2;

      &.a {
        top: 9.4%;
        left: 15%;
      }
      &.b {
        top: 34%;
        left: 15%;
      }
      &.s {
        top: 12%;
        right: 11%;
      }
      &.c {
        top: 47%;
        right: 11%;
      }
    }

    .switch,
    .gate {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 3;
    }

    .switch {
      &.a {
        top: 28%;
        left: 20%;
      }
      &.b {
        top: 40%;
        left: 20%;
      }
      &.s {
        top: 35%;
        right: 10%;
      }
      &.c {
        top: 70%;
        right: 10%;
      }
    }

    .gate {
      &.xor {
        top: 35%;
        left: 55%;
      }
      &.and {
        top: 70%;
        left: 55%;
      }
    }

    .wire {
      position: absolute;

      &.a_wire_a,
      &.wire_a_xor,
      &.wire_a_and {
        top: 15%;
        left: 15%;
        width: 42%;
        height: 75%;
      }
      &.b_wire_b,
      &.wire_b_xor,
      &.wire_b_and {
        top: 27%;
        left: 15%;
        width: 42%;
        height: 75%;
      }
      &.xor_s {
        top: 25%;
        left: 57%;
        width: 32%;
        height: 20%;
      }
      &.and_c {
        top: 60%;
        left: 57%;
        width: 32%;
        height: 20%;
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
