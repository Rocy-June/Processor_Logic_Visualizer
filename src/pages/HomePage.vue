<template>
  <div class="home-box">
    <transition name="appear-1" appear>
      <div>
        <img alt="logo" class="logo" src="../assets/logo.svg" />

        <h1 class="title">{{ $t('home_page.title', { product_name: $t('product_name') }) }}</h1>
      </div>
    </transition>

    <transition name="appear-2" appear>
      <LinedText class="lined">{{ $t('home_page.you_can_learn') }}</LinedText>
    </transition>

    <transition name="appear-3" appear>
      <div class="learn-list">
        <ImageText :src="gate_logo" size="9.03cqw" spacing="2.5em" image-mode="round">
          <div class="introduce_box">
            <div class="intro_title">
              {{ $t('home_page.gate.title') }} -
              <span class="intro_subtitle">{{ $t('home_page.gate.subtitle') }}</span>
            </div>
            <div class="intro_content">{{ $t('home_page.gate.content') }}</div>
          </div>
        </ImageText>
        <ImageText :src="flip_flop_logo" size="9.03cqw" spacing="2.5em" image-mode="round">
          <div class="introduce_box">
            <div class="intro_title">
              {{ $t('home_page.flip_flop.title') }} -
              <span class="intro_subtitle">{{ $t('home_page.flip_flop.subtitle') }}</span>
            </div>
            <div class="intro_content">{{ $t('home_page.flip_flop.content') }}</div>
          </div>
        </ImageText>
        <ImageText :src="digital_circuit_logo" size="9.03cqw" spacing="2.5em" image-mode="round">
          <div class="introduce_box">
            <div class="intro_title">
              {{ $t('home_page.digital_circuit.title') }} -
              <span class="intro_subtitle">{{ $t('home_page.digital_circuit.subtitle') }}</span>
            </div>
            <div class="intro_content">{{ $t('home_page.digital_circuit.content') }}</div>
          </div>
        </ImageText>
        <ImageText :src="cpu_logo" size="9.03cqw" spacing="2.5em" image-mode="round">
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

    <div class="main-right-button">
      <transition name="slide-in-left" appear>
        <MainHandleButton
          :class="{ next: true, 'center-bottom': is_scroll_to_end }"
          @click="emit('next-page')"
        >
          {{ $t('home_page.next_page') }}
        </MainHandleButton>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import LinedText from '@/components/LinedText.vue'
import ImageText from '@/components/ImageText.vue'
import VisibleObserver from '@/components/VisibleObserver.vue'
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
  padding: 2.89cqw;
  font-size: 2.17cqw;
  text-align: center;

  .logo {
    width: 18.1cqw;
    margin: 0 auto 1em 0;
  }

  .title {
    font-size: 4.33cqw;
    margin-bottom: 1.33em;
    word-break: keep-all;
  }

  .lined {
    margin-bottom: 1.33em;
  }

  .learn-list {
    max-width: 72.2cqw;
    margin: 0 auto 36.1cqh auto;

    > div:not(:last-child) {
      margin-bottom: 1.33em;
    }

    .introduce_box {
      .intro_title {
        margin-bottom: 0.67em;
        line-height: 0.67em;
      }
      .intro_subtitle {
        font-size: 1.45cqw;
        color: var(--sub-text-color);
      }
      .intro_content {
        font-size: 1.45cqw;
      }
    }
  }

  .disclaimer {
    font-size: 1.45cqw;
    color: var(--sub-text-color);
  }

  .main-right-button {
    position: sticky;
    bottom: 0;
    text-align: right;

    .next {
      position: absolute;
      right: 0;
      bottom: 0;
      transition: all 0.3s;

      &.center-bottom {
        bottom: 16cqh;
        right: 50%;
        transform: translate(50%, 0);
      }
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
