<template>
  <div
    :class="{ 'nor-gate-box': true, active: y }"
    :style="{ width: size }"
    :title="$t('word.nor_gate_full_name')"
  >
    <div class="hover-box" @click="gate_click"></div>
    <svg width="100" height="100" viewBox="0 0 100 100" @click="gate_click">
      <path
        class="nor-gate-path"
        d="m0 0a1 1.75 1 010 100h45c25 0 35-20 40-50C80 20 60 0 45 0zm85 50a1 1 0 0015 0 1 1 0 00-15 0zm4 0a1 1 0 017 0 1 1 0 01-7 0z"
      />
    </svg>
    <GateDialog class="detail-box" v-model:enabled="show_detail_box">
      <LogicWire
        class="wire front a"
        :width="136"
        :height="153"
        :delay="67"
        :prop_in="a"
        v-model="wire_front_a"
      >
        <path d="m0 128h115" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m0 128h115')" />
      </LogicWire>
      <LogicWire
        class="wire front b"
        :width="136"
        :height="153"
        :delay="67"
        :prop_in="b"
        v-model="wire_front_b"
      >
        <path d="m0 25h115" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m0 25h115')" />
      </LogicWire>
      <LogicWire
        class="wire mid"
        :width="136"
        :height="307"
        :delay="67"
        :prop_in="wire_font_or"
        v-model="wire_mid_not"
      >
        <path d="m40 152h55" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 152h55')" />
      </LogicWire>
      <LogicWire class="wire back" :width="136" :height="307" :delay="67" :prop_in="wire_y">
        <path d="m40 153h96" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 153h96')" />
      </LogicWire>
      <OrGate
        class="gate or"
        size="21.5%"
        :a="wire_front_a"
        :b="wire_front_b"
        v-model="wire_font_or"
      />
      <NotGate class="gate not" size="21.5%" :a="wire_mid_not" v-model="wire_y" />
    </GateDialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import GateDialog from './GateDialog.vue'
import LogicWire from './LogicWire.vue'
import OrGate from './OrGate.vue'
import NotGate from './NotGate.vue'

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

const wire_front_a = ref(true)
const wire_front_b = ref(true)
const wire_font_or = ref(true)
const wire_mid_not = ref(true)
const wire_y = ref(false)

const y = defineModel({ default: false })

const show_detail_box = ref(false)

const gate_click = () => {
  show_detail_box.value = !show_detail_box.value
}

const input_changed = () => {
  y.value = !(props.a || props.b)
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.nor-gate-box {
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
    .nor-gate-path {
      fill: var(--border-color);
    }
  }

  > svg {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .nor-gate-path {
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
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;

      &.or {
        left: 33.33%;
      }
      &.not {
        left: 66.67%;
      }
    }

    .wire {
      &.front,
      &.mid,
      &.back {
        width: 33.33%;
      }

      &.front {
        left: 0;
        height: 50%;

        &.a {
          top: 0;
        }
        &.b {
          bottom: 0;
        }
      }

      &.mid {
        top: 0;
        left: 33.33%;
        height: 100%;
      }

      &.back {
        top: 0;
        left: 66.67%;
        height: 100%;
      }
    }
  }
}
</style>
