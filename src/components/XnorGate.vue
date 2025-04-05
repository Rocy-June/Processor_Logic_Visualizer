<template>
  <div
    :class="{ 'xnor-gate-box': true, active: y }"
    :style="{ width: size }"
    :title="$t('word.xnor_gate_full_name')"
  >
    <div class="hover-box" @click="gate_click"></div>
    <svg width="100" height="100" viewBox="0 0 100 100" @click="gate_click">
      <path
        class="xnor-gate-path"
        d="m5 0a1 1.75 1 010 100 1 1 0 010-5A1 2 0 005 5a1 1 0 010-5m10 0a1 1.75 1 010 100h35c25 0 30-21 35-50C80 20 75 0 50 0zm70 50a1 1 0 0014 0 1 1 0 00-14 0zm4 0a1 1 0 017 0 1 1 0 01-7 0z"
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
        class="wire front-mid not-a-and-a"
        :width="102"
        :height="77"
        :delay="50"
        :prop_in="not_a"
        v-model="not_a_and_a"
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
        v-model="not_b_and_b"
      >
        <path d="m20 15h60" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m20 15h60')" />
      </LogicWire>
      <LogicWire
        class="wire front-mid a-and-b"
        :width="205"
        :height="230"
        :delay="75"
        :prop_in="wire_a"
        v-model="wire_a_and_b"
      >
        <path d="m40 61l85 155h55" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 61l85 155h55')" />
      </LogicWire>
      <LogicWire
        class="wire front-mid b-and-a"
        :width="205"
        :height="230"
        :delay="75"
        :prop_in="wire_b"
        v-model="wire_b_and_a"
      >
        <path d="m40 170l85-155h55" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 152h55')" />
      </LogicWire>
      <LogicWire
        class="wire back-mid and-a-nor"
        :width="102"
        :height="153"
        :delay="50"
        :prop_in="and_a"
        v-model="and_a_nor"
      >
        <path d="m20 75h40v60h50" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m20 75h30v60h30')" />
      </LogicWire>
      <LogicWire
        class="wire back-mid and-b-nor"
        :width="102"
        :height="153"
        :delay="50"
        :prop_in="and_b"
        v-model="and_b_nor"
      >
        <path d="m20 75h40v-60h50" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m20 75h30v-60h30')" />
      </LogicWire>
      <LogicWire class="wire back" :width="102" :height="307" :delay="50" :prop_in="nor">
        <path d="m63 152h40" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m63 152h40')" />
      </LogicWire>
      <NotGate class="gate not a" :size="'3.5cqw'" :a="wire_a_not_a" v-model="not_a" />
      <NotGate class="gate not b" :size="'3.5cqw'" :a="wire_b_not_b" v-model="not_b" />
      <AndGate
        class="gate or a"
        :size="'6cqw'"
        :a="not_a_and_a"
        :b="wire_b_and_a"
        v-model="and_a"
      />
      <AndGate
        class="gate or b"
        :size="'6cqw'"
        :a="not_b_and_b"
        :b="wire_a_and_b"
        v-model="and_b"
      />
      <NorGate class="gate nor" :size="'8.5cqw'" :a="and_a_nor" :b="and_b_nor" v-model="nor" />
    </GateDialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import GateDialog from './GateDialog.vue'
import LogicWire from './LogicWire.vue'
import NotGate from './NotGate.vue'
import AndGate from './AndGate.vue'
import NorGate from './NorGate.vue'

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

const wire_a = ref(true)
const wire_b = ref(false)
const wire_a_not_a = ref(true)
const wire_b_not_b = ref(false)
const not_a = ref(false)
const not_b = ref(true)
const not_a_and_a = ref(false)
const not_b_and_b = ref(true)
const wire_a_and_b = ref(true)
const wire_b_and_a = ref(false)
const and_a = ref(false)
const and_b = ref(true)
const and_a_nor = ref(false)
const and_b_nor = ref(true)
const nor = ref(false)

const y = defineModel({ default: false })

const show_detail_box = ref(false)

const gate_click = () => {
  show_detail_box.value = !show_detail_box.value
}

const input_changed = () => {
  y.value = props.a === props.b
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.xnor-gate-box {
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
    .xnor-gate-path {
      fill: var(--border-color);
    }
  }

  > svg {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .xnor-gate-path {
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
      &.nor {
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
        &.not-a-and-a {
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
        &.a-and-b {
          top: 0;
          left: 0;
          width: 50%;
          height: 75%;
        }
        &.b-and-a {
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

        &.and-a-nor {
          top: 0;
        }
        &.and-b-nor {
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
