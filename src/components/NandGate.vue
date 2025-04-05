<template>
  <div :class="{ 'nand-gate-box': true, active: y }" :title="$t('word.nand_gate_full_name')">
    <div class="hover-box" @click="gate_click"></div>
    <svg :width="size" :height="size" viewBox="0 0 100 100" @click="gate_click">
      <path
        class="nand-gate-path"
        d="m0 0v100h35a1 1 0 000-100zm85 50a1 1 0 0015 0 1 1 0 00-15 0zm4 0a1 1 0 017 0 1 1 0 01-7 0z"
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
        <path d="m0 128h96" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m0 128h96')" />
      </LogicWire>
      <LogicWire
        class="wire front b"
        :width="136"
        :height="153"
        :delay="67"
        :prop_in="b"
        v-model="wire_front_b"
      >
        <path d="m0 25h96" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m0 25h96')" />
      </LogicWire>
      <AndGate
        class="gate and"
        :size="'8.5cqw'"
        :a="wire_front_a"
        :b="wire_front_b"
        v-model="wire_font_and"
      />
      <LogicWire
        class="wire mid"
        :width="136"
        :height="307"
        :delay="67"
        :prop_in="wire_font_and"
        v-model="wire_mid_not"
      >
        <path d="m40 152h55" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 152h55')" />
      </LogicWire>
      <NotGate class="gate not" :size="'8.5cqw'" :a="wire_mid_not" v-model="wire_y" />
      <LogicWire class="wire back" :width="136" :height="307" :delay="67" :prop_in="wire_y">
        <path d="m40 153h96" />
        <circle r="6" fill="var(--border-color)" style="offset-path: path('m40 153h96')" />
      </LogicWire>
    </GateDialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import GateDialog from './GateDialog.vue'
import LogicWire from './LogicWire.vue'
import AndGate from './AndGate.vue'
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
const wire_font_and = ref(true)
const wire_mid_not = ref(true)
const wire_y = ref(false)

const y = defineModel({ default: false })

const show_detail_box = ref(false)

const gate_click = () => {
  show_detail_box.value = !show_detail_box.value
}

const input_changed = () => {
  y.value = !(props.a && props.b)
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="less" scoped>
.nand-gate-box {
  position: relative;
  font-size: 0;
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
    .nand-gate-path {
      fill: var(--border-color);
    }
  }

  > svg {
    position: relative;
    z-index: 2;
  }

  .nand-gate-path {
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

      &.and {
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
