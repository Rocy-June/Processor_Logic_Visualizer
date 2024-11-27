<template>
  <div class="home-box">
    <img alt="logo" class="logo" src="../assets/logo.svg" />

    <h1 class="title">{{ $t('home_page.title', { product_name: $t('product_name') }) }}</h1>

    <LinedText class="lined">{{ $t('home_page.you_can_learn') }}</LinedText>

    <div class="learn-list">
      <ImageText :src="gate_logo" :size="100" image-mode="round">
        <div class="introduce_box">
          <div class="intro_title">
            {{ $t('home_page.gate.title') }} -
            <span class="intro_subtitle">{{ $t('home_page.gate.subtitle') }}</span>
          </div>
          <div class="intro_content">{{ $t('home_page.gate.content') }}</div>
        </div>
      </ImageText>
      <ImageText :src="flip_flop_logo" :size="100" image-mode="round">
        <div class="introduce_box">
          <div class="intro_title">
            {{ $t('home_page.flip_flop.title') }} -
            <span class="intro_subtitle">{{ $t('home_page.flip_flop.subtitle') }}</span>
          </div>
          <div class="intro_content">{{ $t('home_page.flip_flop.content') }}</div>
        </div>
      </ImageText>
      <ImageText :src="digital_circuit_logo" :size="100" image-mode="round">
        <div class="introduce_box">
          <div class="intro_title">
            {{ $t('home_page.digital_circuit.title') }} -
            <span class="intro_subtitle">{{ $t('home_page.digital_circuit.subtitle') }}</span>
          </div>
          <div class="intro_content">{{ $t('home_page.digital_circuit.content') }}</div>
        </div>
      </ImageText>
      <ImageText :src="cpu_logo" :size="100" image-mode="round">
        <div class="introduce_box">
          <div class="intro_title">
            {{ $t('home_page.cpu.title') }} -
            <span class="intro_subtitle">{{ $t('home_page.cpu.subtitle') }}</span>
          </div>
          <div class="intro_content">{{ $t('home_page.cpu.content') }}</div>
        </div>
      </ImageText>
    </div>
  </div>
</template>

<script setup>
import LinedText from '@/components/LinedText.vue'
import ImageText from '@/components/ImageText.vue'

import gate_logo from '@/assets/gate_logo.webp'
import flip_flop_logo from '@/assets/flip_flop_logo.webp'
import digital_circuit_logo from '@/assets/digital_circuit_logo.webp'
import cpu_logo from '@/assets/cpu_logo.webp'
</script>

<style lang="less" scoped>
.home-box {
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
        color: var(--color-sub-text);
      }
      .intro_content {
        font-size: 16px;
      }
    }
  }
}
</style>
