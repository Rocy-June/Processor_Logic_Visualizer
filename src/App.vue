<template>
  <transition @click="step[0] = step[0] ? 0 : 1">
    <HomePage v-if="step[0] === 0"></HomePage>
    <MenuPage v-else-if="step[0] === 1"></MenuPage>
  </transition>
</template>

<script setup>
import { reactive } from 'vue'

import HomePage from './pages/HomePage.vue'
import MenuPage from './pages/MenuPage.vue'

// Controls the pages step, now here have 3 levels of step
const step = reactive([0, 0, 0])
</script>

<style lang="less" scoped></style>
