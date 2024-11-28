<template>
  <div class="transition">
    <transition name="slide-to-left" appear>
      <HomePage v-if="steps[0] === 0" @next-page="home_page_next_page" style="z-index: 9" />
      <MenuPage v-else-if="steps[0] === 1" style="z-index: 8" />
    </transition>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import HomePage from './pages/HomePage.vue'
import MenuPage from './pages/MenuPage.vue'

const steps = reactive([0, 0, 0])

const home_page_next_page = () => {
  steps[0] = 1
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style lang="less" scoped>
.transition {
  position: relative;

  > * {
    position: absolute;
    width: 100%;
    background-color: var(--background-color);
    min-height: 100vh;
  }
}

.slide-to-left-enter-active,
.slide-to-left-leave-active {
  position: absolute;
  top: 0;
  transition: all 1s;
}
.slide-to-left-enter-from {
  left: 0;
}
.slide-to-left-leave-from {
  left: 0;
  opacity: 1;
}
.slide-to-left-leave-to {
  left: -100%;
  opacity: 0;
}
</style>
