<template>
  <div
    :class="{ 'xor-gate-box': true, active: y }"
    :style="{ width: size }"
    :title="$t('word.xor_gate_full_name')"
  >
    <div class="hover-box" @click="gate_click"></div>
    <svg width="100" height="100" viewBox="0 0 100 100" @click="gate_click">
      <path
        class="xor-gate-path"
        d="m5 0a1 1.75 1 010 100 1 1 0 010-5A1 2 0 005 5a1 1 0 010-5m10 0a1 1.75 1 010 100h40c20 0 40-20 45-50C95 20 75 0 55 0z"
      />
    </svg>
    <GateDialog class="detail-box" v-model:enabled="show_detail_box">
      <LogicWire
        class="wire front a-wire-a"
        :width="102"
        :height="77"
        :delay="25"
        :prop_in="a"
        v-model="wire_a"
      >
        <path d="m0 61h40" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m0 60h40')" />
      </LogicWire>
      <LogicWire
        class="wire front b-wire-b"
        :width="102"
        :height="77"
        :delay="25"
        :prop_in="b"
        v-model="wire_b"
      >
        <path d="m0 15h40" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m0 15h40')" />
      </LogicWire>
      <LogicWire
        class="wire front wire-a-not-a"
        :width="102"
        :height="77"
        :delay="25"
        :prop_in="wire_a"
        v-model="wire_a_not_a"
      >
        <path d="m40 61h55" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 60h55')" />
      </LogicWire>
      <LogicWire
        class="wire front wire-b-not-b"
        :width="102"
        :height="77"
        :delay="25"
        :prop_in="wire_b"
        v-model="wire_b_not_b"
      >
        <path d="m40 15h55" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 15h55')" />
      </LogicWire>
      <LogicWire
        class="wire front-mid not-a-or-a"
        :width="102"
        :height="77"
        :delay="50"
        :prop_in="not_a"
        v-model="not_a_or_a"
      >
        <path d="m20 61h60" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m20 60h60')" />
      </LogicWire>
      <LogicWire
        class="wire front-mid not-b-and-b"
        :width="102"
        :height="77"
        :delay="50"
        :prop_in="not_b"
        v-model="not_b_or_b"
      >
        <path d="m20 15h60" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m20 15h60')" />
      </LogicWire>
      <LogicWire
        class="wire front-mid a-or-b"
        :width="205"
        :height="230"
        :delay="75"
        :prop_in="wire_a"
        v-model="wire_a_or_b"
      >
        <path d="m40 61l85 155h55" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 61l85 155h55')" />
      </LogicWire>
      <LogicWire
        class="wire front-mid b-or-a"
        :width="205"
        :height="230"
        :delay="75"
        :prop_in="wire_b"
        v-model="wire_b_or_a"
      >
        <path d="m40 170l85-155h55" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 152h55')" />
      </LogicWire>
      <LogicWire
        class="wire back-mid or-a-nand"
        :width="102"
        :height="153"
        :delay="50"
        :prop_in="or_a"
        v-model="or_a_nand"
      >
        <path d="m20 75h30v60h30" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m20 75h30v60h30')" />
      </LogicWire>
      <LogicWire
        class="wire back-mid or-b-nand"
        :width="102"
        :height="153"
        :delay="50"
        :prop_in="or_b"
        v-model="or_b_nand"
      >
        <path d="m20 75h30v-60h30" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m20 75h30v-60h30')" />
      </LogicWire>
      <LogicWire class="wire back" :width="102" :height="307" :delay="50" :prop_in="nand">
        <path d="m63 152h40" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m63 152h40')" />
      </LogicWire>
      <NotGate class="gate not a" size="11.67%" :a="wire_a_not_a" v-model="not_a" />
      <NotGate class="gate not b" size="11.67%" :a="wire_b_not_b" v-model="not_b" />
      <OrGate class="gate or a" size="20%" :a="not_a_or_a" :b="wire_b_or_a" v-model="or_a" />
      <OrGate class="gate or b" size="20%" :a="not_b_or_b" :b="wire_a_or_b" v-model="or_b" />
      <NandGate class="gate nand" size="28.33%" :a="or_a_nand" :b="or_b_nand" v-model="nand" />
    </GateDialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import GateDialog from './GateDialog.vue'
import LogicWire from './LogicWire.vue'
import NotGate from './NotGate.vue'
import OrGate from './OrGate.vue'
import NandGate from './NandGate.vue'

const props = defineProps({
  size: {
    type: String,
  },
  a: {
    type: Boolean,
    default: false,
  },
  b: {
    type: Boolean,
    default: false,
  },
})

const wire_a = ref(false)
const wire_b = ref(false)
const wire_a_not_a = ref(false)
const wire_b_not_b = ref(false)
const not_a = ref(true)
const not_b = ref(true)
const not_a_or_a = ref(true)
const not_b_or_b = ref(true)
const wire_a_or_b = ref(false)
const wire_b_or_a = ref(false)
const or_a = ref(true)
const or_b = ref(true)
const or_a_nand = ref(true)
const or_b_nand = ref(true)
const nand = ref(false)

const y = defineModel({ default: false })

const show_detail_box = ref(false)

const gate_click = () => {
  show_detail_box.value = !show_detail_box.value
}

const input_changed = () => {
  y.value = props.a !== props.b
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.xor-gate-box {
  position: relative;
  font-size: 0;
  aspect-ratio: 1;
  cursor: pointer;

  .hover-box {
    position: absolute;
    top: -20%;
    left: -20%;
    width: 140%;
    height: 140%;
    border-radius: 20%;
    background-color: transparent;
    transition: all 0.3s;
    z-index: 1;
  }

  &:hover {
    .hover-box {
      background-color: var(--background-color);
      box-shadow: var(--box-shadow);
    }
  }

  &.active {
    .xor-gate-path {
      fill: var(--border-color);
    }
  }

  > svg {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .xor-gate-path {
    fill: var(--text-solid-color);
    stroke: transparent;
  }

  .detail-box {
    position: absolute;
    top: -100%;
    left: -150%;
    width: 400%;
    height: 300%;
    z-index: 3;

    .wire,
    .gate {
      position: absolute;
    }

    .gate {
      transform: translate(-50%, -50%);
      z-index: 2;

      &.not {
        left: 26%;

        &.a {
          top: 20%;
        }
        &.b {
          top: 80%;
        }
      }
      &.or {
        left: 47.5%;

        &.a {
          top: 25%;
        }
        &.b {
          top: 75%;
        }
      }
      &.nand {
        top: 50%;
        left: 80%;
      }
    }

    .wire {
      &.front {
        left: 0;
        width: 25%;
        height: 25%;

        &.a-wire-a {
          top: 0;
        }
        &.b-wire-b {
          bottom: 0;
        }
        &.wire-a-not-a {
          top: 0;
        }
        &.wire-b-not-b {
          bottom: 0;
        }
      }

      &.front-mid {
        &.not-a-or-a {
          top: 0;
          left: 25%;
          width: 25%;
          height: 25%;
        }
        &.not-b-and-b {
          bottom: 0;
          left: 25%;
          width: 25%;
          height: 25%;
        }
        &.a-or-b {
          top: 0;
          left: 0;
          width: 50%;
          height: 75%;
        }
        &.b-or-a {
          bottom: 0;
          left: 0;
          width: 50%;
          height: 75%;
        }
      }

      &.back-mid {
        left: 50%;
        width: 25%;
        height: 50%;

        &.or-a-nand {
          top: 0;
        }
        &.or-b-nand {
          bottom: 0;
        }
      }

      &.back {
        top: 0;
        right: 0;
        width: 25%;
        height: 100%;
      }
    }
  }
}
</style>
