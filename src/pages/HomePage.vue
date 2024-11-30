<template>
  <div class="home-box">
    <transition name="appear-1" appear>
      <div>
        <img alt="logo" class="logo" src="../assets/logo.svg" />

        <h1 class="title">{{ $t('home_page.title', { product_name: $t('product_name') }) }}</h1>
      </div>
    </transition>

    <SettingButton />

    <transition name="appear-2" appear>
      <LinedText class="lined">{{ $t('home_page.you_can_learn') }}</LinedText>
    </transition>

    <transition name="appear-3" appear>
      <div class="learn-list">
        <ImageText :src="gate_logo" :size="100" spacing="2.5rem" image-mode="round">
          <div class="introduce_box">
            <div class="intro_title">
              {{ $t('home_page.gate.title') }} -
              <span class="intro_subtitle">{{ $t('home_page.gate.subtitle') }}</span>
            </div>
            <div class="intro_content">{{ $t('home_page.gate.content') }}</div>
          </div>
        </ImageText>
        <ImageText :src="flip_flop_logo" :size="100" spacing="2.5rem" image-mode="round">
          <div class="introduce_box">
            <div class="intro_title">
              {{ $t('home_page.flip_flop.title') }} -
              <span class="intro_subtitle">{{ $t('home_page.flip_flop.subtitle') }}</span>
            </div>
            <div class="intro_content">{{ $t('home_page.flip_flop.content') }}</div>
          </div>
        </ImageText>
        <ImageText :src="digital_circuit_logo" :size="100" spacing="2.5rem" image-mode="round">
          <div class="introduce_box">
            <div class="intro_title">
              {{ $t('home_page.digital_circuit.title') }} -
              <span class="intro_subtitle">{{ $t('home_page.digital_circuit.subtitle') }}</span>
            </div>
            <div class="intro_content">{{ $t('home_page.digital_circuit.content') }}</div>
          </div>
        </ImageText>
        <ImageText :src="cpu_logo" :size="100" spacing="2.5rem" image-mode="round">
          <div class="introduce_box">
            <div class="intro_title">
              {{ $t('home_page.cpu.title') }} -
              <span class="intro_subtitle">{{ $t('home_page.cpu.subtitle') }}</span>
            </div>
            <div class="intro_content">{{ $t('home_page.cpu.content') }}</div>
          </div>
        </ImageText>
      </div>
    </transition>

    <VisibleObserver @onvisible="scroll_to_end" @onhidden="scroll_not_at_end" />

    <div class="disclaimer">{{ $t('home_page.disclaimer') }}</div>

    <transition name="slide-in-left" appear>
      <MainHandleButton
        :class="{ next: true, 'center-bottom': is_scroll_to_end }"
        @click="emit('next-page')"
      >
        {{ $t('home_page.next_page') }}
      </MainHandleButton>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import LinedText from '@/components/LinedText.vue'
import ImageText from '@/components/ImageText.vue'
import VisibleObserver from '@/components/VisibleObserver.vue'
import SettingButton from '@/components/SettingButton.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import gate_logo from '@/assets/gate_logo.webp'
import flip_flop_logo from '@/assets/flip_flop_logo.webp'
import digital_circuit_logo from '@/assets/digital_circuit_logo.webp'
import cpu_logo from '@/assets/cpu_logo.webp'

const emit = defineEmits(['next-page'])

const is_scroll_to_end = ref(false)

const scroll_to_end = () => {
  is_scroll_to_end.value = true
}
const scroll_not_at_end = () => {
  is_scroll_to_end.value = false
}
</script>

<style lang="less" scoped>
.home-box {
  padding: 2rem;
  font-size: 24px;
  text-align: center;

  .logo {
    width: 20vw;
    min-width: 100px;
    max-width: 200px;
    margin: 0 auto 1rem 0;
  }

  .title {
    font-size: clamp(12px, calc((100vw - 4rem) / 27 * 2), 2em);
    margin-bottom: 4rem;
    word-break: keep-all;
  }

  .lined {
    margin-bottom: 2rem;
  }

  .learn-list {
    max-width: 800px;
    margin: 0 auto 300px auto;

    > div:not(:last-child) {
      margin-bottom: 2rem;
    }

    .introduce_box {
      .intro_title {
        margin-bottom: 1rem;
        line-height: 1em;
      }
      .intro_subtitle {
        font-size: 16px;
        color: var(--sub-text-color);
      }
      .intro_content {
        font-size: 16px;
      }
    }
  }

  .disclaimer {
    font-size: 16px;
    color: var(--sub-text-color);
  }

  .next {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    transition: all 0.3s;

    &.center-bottom {
      right: 50%;
      bottom: 12rem;
      transform: translateX(50%);
    }
  }
}

.appear-1-enter-active,
.appear-1-leave-active,
.appear-2-enter-active,
.appear-2-leave-active,
.appear-3-enter-active,
.appear-3-leave-active {
  transition:
    transform 1s,
    opacity 1s;
}
.appear-1-enter-from,
.appear-2-enter-from,
.appear-3-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}
.appear-1-enter-to,
.appear-2-enter-to,
.appear-3-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.appear-2-enter-active,
.appear-2-leave-active {
  transition-delay: 250ms;
}

.appear-3-enter-active,
.appear-3-leave-active {
  transition-delay: 500ms;
}

.slide-in-left-enter-active,
.slide-in-left-leave-active {
  transition-delay: 1s !important;
}
.slide-in-left-enter-from {
  transform: translateX(120%);
}
.slide-in-left-enter-to {
  transform: translateX(0);
}
</style>
