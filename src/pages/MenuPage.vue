<template>
  <div class="menu-box">
    <div class="scroll-box">
      <div class="center-menu">
        <transition name="appear-0" appear>
          <h1 class="main-title menu-title">
            <button type="button" class="prev-button" @click="emit('prev-page')">
              <ColoredSVG :src="arrow_left" color="var(--text-color)" />
            </button>
            <span class="title-content">{{ $t('menu_page.menu') }}</span>
          </h1>
        </transition>

        <div class="selection" :style="selection_rect"></div>

        <transition name="appear-1" appear>
          <div class="menu-section">
            <div
              :class="{ 'menu-text': true, animating: !animation_end }"
              @mouseover="menu_hover"
              @click="emit('page-changed', { main: 0, sub: 0 })"
            >
              <span>{{ $t(`menu_page.${menus[0].text}`) }}</span>
            </div>
            <div class="menu-child">
              <div
                class="menu-line"
                v-for="(sub_item, sub_index) in menus[0].children"
                :key="sub_index"
              >
                <div
                  :class="{ 'menu-text': true, animating: !animation_end }"
                  @mouseover="menu_hover"
                  @click="emit('page-changed', { main: 0, sub: sub_index })"
                >
                  <span>{{ $t(`menu_page.${sub_item.text}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <transition name="appear-2" appear>
          <div class="menu-section">
            <div
              :class="{ 'menu-text': true, animating: !animation_end }"
              @mouseover="menu_hover"
              @click="emit('page-changed', { main: 1, sub: 0 })"
            >
              <span>{{ $t(`menu_page.${menus[1].text}`) }}</span>
            </div>
            <div class="menu-child">
              <div
                class="menu-line"
                v-for="(sub_item, sub_index) in menus[1].children"
                :key="sub_index"
              >
                <div
                  :class="{ 'menu-text': true, animating: !animation_end }"
                  @mouseover="menu_hover"
                  @click="emit('page-changed', { main: 1, sub: sub_index })"
                >
                  <span>{{ $t(`menu_page.${sub_item.text}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <transition name="appear-3" appear @after-enter="can_be_handle">
          <div class="menu-section">
            <div
              :class="{ 'menu-text': true, animating: !animation_end }"
              @mouseover="menu_hover"
              @click="emit('page-changed', { main: 2, sub: 0 })"
            >
              <span>{{ $t(`menu_page.${menus[2].text}`) }}</span>
            </div>
            <div class="menu-child">
              <div
                class="menu-line"
                v-for="(sub_item, sub_index) in menus[2].children"
                :key="sub_index"
              >
                <div
                  :class="{ 'menu-text': true, animating: !animation_end }"
                  @mouseover="menu_hover"
                  @click="emit('page-changed', { main: 2, sub: sub_index })"
                >
                  <span>{{ $t(`menu_page.${sub_item.text}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <transition name="appear-4" appear>
          <div class="menu-section">
            <div
              :class="{ 'menu-text': true, animating: !animation_end }"
              @mouseover="menu_hover"
              @click="emit('page-changed', { main: 3, sub: 0 })"
            >
              <span>{{ $t(`menu_page.${menus[3].text}`) }}</span>
            </div>
            <div class="menu-child">
              <div
                class="menu-line"
                v-for="(sub_item, sub_index) in menus[3].children"
                :key="sub_index"
              >
                <div
                  :class="{ 'menu-text': true, animating: !animation_end }"
                  @mouseover="menu_hover"
                  @click="emit('page-changed', { main: 3, sub: sub_index })"
                >
                  <span>{{ $t(`menu_page.${sub_item.text}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <transition name="appear-5" appear>
          <div class="menu-section">
            <div
              :class="{ 'menu-text': true, animating: !animation_end }"
              @mouseover="menu_hover"
              @click="emit('page-changed', { main: 4, sub: 0 })"
            >
              <span>{{ $t(`menu_page.${menus[4].text}`) }}</span>
            </div>
            <div class="menu-child">
              <div
                class="menu-line"
                v-for="(sub_item, sub_index) in menus[4].children"
                :key="sub_index"
              >
                <div
                  :class="{ 'menu-text': true, animating: !animation_end }"
                  @mouseover="menu_hover"
                  @click="emit('page-changed', { main: 4, sub: sub_index })"
                >
                  <span>{{ $t(`menu_page.${sub_item.text}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <transition name="appear-6" appear>
          <div class="menu-section">
            <div
              :class="{ 'menu-text': true, animating: !animation_end }"
              @mouseover="menu_hover"
              @click="emit('page-changed', { main: 5, sub: 0 })"
            >
              <span>{{ $t(`menu_page.${menus[5].text}`) }}</span>
            </div>
            <div class="menu-child">
              <div
                class="menu-line"
                v-for="(sub_item, sub_index) in menus[5].children"
                :key="sub_index"
              >
                <div
                  :class="{ 'menu-text': true, animating: !animation_end }"
                  @mouseover="menu_hover"
                  @click="emit('page-changed', { main: 5, sub: sub_index })"
                >
                  <span>{{ $t(`menu_page.${sub_item.text}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <transition name="appear-7" appear>
          <div class="menu-section">
            <div
              :class="{ 'menu-text': true, animating: !animation_end }"
              @mouseover="menu_hover"
              @click="emit('page-changed', { main: 6, sub: 0 })"
            >
              <span>{{ $t(`menu_page.${menus[6].text}`) }}</span>
            </div>
            <div class="menu-child">
              <div
                class="menu-line"
                v-for="(sub_item, sub_index) in menus[6].children"
                :key="sub_index"
              >
                <div
                  :class="{ 'menu-text': true, animating: !animation_end }"
                  @mouseover="menu_hover"
                  @click="emit('page-changed', { main: 6, sub: sub_index })"
                >
                  <span>{{ $t(`menu_page.${sub_item.text}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'

import arrow_left from '@/assets/arrow-left.svg'

const emit = defineEmits(['prev-page', 'page-changed'])

const menus = [
  {
    text: 'menu_beginning.title',
    children: [{ text: 'menu_beginning.switches' }, { text: 'menu_beginning.claude_shannon' }],
  },
  {
    text: 'menu_logic_gates_base.title',
    children: [
      { text: 'menu_logic_gates_base.and_gate' },
      { text: 'menu_logic_gates_base.or_gate' },
      { text: 'menu_logic_gates_base.not_gate' },
      { text: 'menu_logic_gates_base.summary' },
    ],
  },
  {
    text: 'menu_logic_gates_advance.title',
    children: [
      { text: 'menu_logic_gates_advance.nand_gate' },
      { text: 'menu_logic_gates_advance.nor_gate' },
      { text: 'menu_logic_gates_advance.xor_gate' },
      { text: 'menu_logic_gates_advance.xnor_gate' },
      { text: 'menu_logic_gates_advance.summary' },
    ],
  },
  {
    text: 'menu_digital_circuits_base.title',
    children: [
      { text: 'menu_digital_circuits_base.half_adder' },
      { text: 'menu_digital_circuits_base.full_adder' },
    ],
  },
  {
    text: 'menu_flip_flops.title',
    children: [
      { text: 'menu_flip_flops.rs_ff' },
      { text: 'menu_flip_flops.d_ff' },
      { text: 'menu_flip_flops.jk_ff' },
      { text: 'menu_flip_flops.t_ff' },
      { text: 'menu_flip_flops.et_ff' },
    ],
  },
  {
    text: 'menu_digital_circuits_advance.title',
    children: [
      { text: 'menu_digital_circuits_advance.latch' },
      { text: 'menu_digital_circuits_advance.rwm' },
      { text: 'menu_digital_circuits_advance.ram' },
      { text: 'menu_digital_circuits_advance.fd' },
      { text: 'menu_digital_circuits_advance.counter' },
    ],
  },
  {
    text: 'menu_cpu.title',
    children: [
      { text: 'menu_cpu.excution_components' },
      { text: 'menu_cpu.cpu_excution_simulation' },
    ],
  },
]

const selection_rect = reactive({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
})

const animation_end = ref(false)

const can_be_handle = () => {
  animation_end.value = true
}

const menu_hover = (e) => {
  if (!animation_end.value) return

  let target = e.target
  if (target.tagName.toLowerCase() == 'span') {
    target = e.target.parentElement
  }

  selection_rect.top = `${target.offsetTop}px`
  selection_rect.left = `${target.offsetLeft}px`
  selection_rect.width = `calc(1.5em + ${target.children[0].offsetWidth}px)`
  selection_rect.height = `${target.offsetHeight}px`
}
</script>

<style lang="less" scoped>
.menu-box {
  padding: 2em 2em 0 2em;
  font-size: 2.17cqw;

  .scroll-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .center-menu {
      position: relative;
      max-width: 800px;
      margin: 0 auto;

      .menu-title {
        position: sticky;
        top: 0;
        margin-bottom: 0.75em;
        background-color: var(--background-color);
        z-index: 3;

        .prev-button {
          width: 4.51cqw;
          height: 4.51cqw;
          padding: 0.9cqw;
          background-color: transparent;
          border: 0;
          border-radius: 9cqw;
          transition: all 0.2s;

          &:hover {
            background-color: var(--secondary-light-blue);
          }
        }
      }

      .selection {
        position: absolute;
        border-radius: 0.4em;
        background-color: var(--secondary-light-blue);
        transition: all 0.2s;
        z-index: 1;
        pointer-events: none;
      }

      .menu-section {
        margin-bottom: 2em;

        .menu-text {
          position: relative;
          padding: 0.3em 0.75em;
          line-height: 1.5em;
          cursor: pointer;
          z-index: 2;

          &.animating {
            cursor: default;
            pointer-events: none;
          }
        }
        .menu-child {
          padding-left: 2em;
        }
      }
    }
  }
}

.appear-0-enter-active,
.appear-0-leave-active,
.appear-1-enter-active,
.appear-1-leave-active,
.appear-2-enter-active,
.appear-2-leave-active,
.appear-3-enter-active,
.appear-3-leave-active,
.appear-4-enter-active,
.appear-4-leave-active,
.appear-5-enter-active,
.appear-5-leave-active,
.appear-6-enter-active,
.appear-6-leave-active,
.appear-7-enter-active,
.appear-7-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.appear-0-enter-from,
.appear-1-enter-from,
.appear-2-enter-from,
.appear-3-enter-from,
.appear-4-enter-from,
.appear-5-enter-from,
.appear-6-enter-from,
.appear-7-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}
.appear-0-enter-to,
.appear-1-enter-to,
.appear-2-enter-to,
.appear-3-enter-to,
.appear-4-enter-to,
.appear-5-enter-to,
.appear-6-enter-to,
.appear-7-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.appear-0-enter-active,
.appear-0-leave-active {
  transition-delay: 150ms;
}

.appear-1-enter-active,
.appear-1-leave-active {
  transition-delay: 300ms;
}

.appear-2-enter-active,
.appear-2-leave-active {
  transition-delay: 450ms;
}

.appear-3-enter-active,
.appear-3-leave-active {
  transition-delay: 600ms;
}

.appear-4-enter-active,
.appear-4-leave-active {
  transition-delay: 750ms;
}

.appear-5-enter-active,
.appear-5-leave-active {
  transition-delay: 900ms;
}

.appear-6-enter-active,
.appear-6-leave-active {
  transition-delay: 1050ms;
}

.appear-7-enter-active,
.appear-7-leave-active {
  transition-delay: 1200ms;
}
</style>
