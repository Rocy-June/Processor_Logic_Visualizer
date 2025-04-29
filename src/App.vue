<template>
  <div :class="{ 'page-transition': true, [locale]: true }">
    <RecommendAspectRatioDialog />
    <SettingButton @page-debug="set_page_debug" />
    <div :class="{ 'test-page-changer-box': true, active: page_debug }">
      <div class="title">step1:</div>
      <div class="input"><input type="number" v-model="steps[0]" /></div>
      <div class="title">step2:</div>
      <div class="input"><input type="number" v-model="steps[1]" /></div>
      <div class="title">step3:</div>
      <div class="input"><input type="number" v-model="steps[2]" /></div>
    </div>

    <transition name="slide-to-left" appear>
      <HomePage
        :key="1"
        v-if="steps[0] === 0"
        @next-page="set_page({ step1: 1 })"
        style="z-index: 89"
      />
      <MenuPage
        :key="2"
        v-else-if="steps[0] === 1"
        @prev-page="set_page({ step1: 0 })"
        @page-changed="menu_page_select_page"
        style="z-index: 88"
      />
      <SwitchesPage
        :key="3"
        v-else-if="steps[0] === 2 && steps[1] === 0 && steps[2] === 0"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 0, step3: 1 })"
        style="z-index: 79"
      />
      <ClaudeShannonPage
        :key="4"
        v-else-if="steps[0] === 2 && steps[1] === 0 && steps[2] === 1"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 1, step3: 0 })"
        style="z-index: 78"
      />
      <AndGatePage
        :key="5"
        v-else-if="steps[0] === 2 && steps[1] === 1 && steps[2] === 0"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 1, step3: 1 })"
        style="z-index: 77"
      />
      <OrGatePage
        :key="6"
        v-else-if="steps[0] === 2 && steps[1] === 1 && steps[2] === 1"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 1, step3: 2 })"
        style="z-index: 76"
      />
      <NotGatePage
        :key="7"
        v-else-if="steps[0] === 2 && steps[1] === 1 && steps[2] === 2"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 1, step3: 3 })"
        style="z-index: 75"
      />
      <LogicGatesBaseSummary
        :key="8"
        v-else-if="steps[0] === 2 && steps[1] === 1 && steps[2] === 3"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 2, step3: 0 })"
        style="z-index: 74"
      />
      <NandGatePage
        :key="9"
        v-else-if="steps[0] === 2 && steps[1] === 2 && steps[2] === 0"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 2, step3: 1 })"
        style="z-index: 69"
      />
      <NorGatePage
        :key="10"
        v-else-if="steps[0] === 2 && steps[1] === 2 && steps[2] === 1"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 2, step3: 2 })"
        style="z-index: 68"
      />
      <XorGatePage
        :key="11"
        v-else-if="steps[0] === 2 && steps[1] === 2 && steps[2] === 2"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 2, step3: 3 })"
        style="z-index: 67"
      />
      <XnorGatePage
        :key="12"
        v-else-if="steps[0] === 2 && steps[1] === 2 && steps[2] === 3"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 2, step3: 4 })"
        style="z-index: 66"
      />
      <LogicGatesAdvancedSummary
        :key="13"
        v-else-if="steps[0] === 2 && steps[1] === 2 && steps[2] === 4"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 3, step3: 0 })"
        style="z-index: 65"
      />
      <HalfAdderPage
        :key="15"
        v-else-if="steps[0] === 2 && steps[1] === 3 && steps[2] === 1"
        @menu-page="set_page({ step1: 1 })"
        @next-page="set_page({ step1: 2, step2: 3, step3: 0 })"
        style="z-index: 58"
      />
    </transition>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import RecommendAspectRatioDialog from './components/RecommendAspectRatioDialog.vue'
import SettingButton from './components/SettingButton.vue'

import HomePage from './pages/HomePage.vue'
import MenuPage from './pages/MenuPage.vue'
import SwitchesPage from './pages/SwitchesPage.vue'
import ClaudeShannonPage from './pages/ClaudeShannonPage.vue'
import AndGatePage from './pages/AndGatePage.vue'
import OrGatePage from './pages/OrGatePage.vue'
import NotGatePage from './pages/NotGatePage.vue'
import LogicGatesBaseSummary from './pages/LogicGatesBaseSummary.vue'
import NandGatePage from './pages/NandGatePage.vue'
import NorGatePage from './pages/NorGatePage.vue'
import XorGatePage from './pages/XorGatePage.vue'
import XnorGatePage from './pages/XnorGatePage.vue'
import LogicGatesAdvancedSummary from './pages/LogicGatesAdvancedSummary.vue'
import HalfAdderPage from './pages/HalfAdderPage.vue'

const { locale } = useI18n()

const steps = reactive([2, 3, 0])

watch(
  () => steps,
  () => {
    localStorage.setItem('last_steps', JSON.stringify(steps))
  },
  { deep: true },
)

const page_debug = ref(false)
const set_page_debug = () => {
  page_debug.value = !page_debug.value
}

const set_page = (option) => {
  option.scroll_to_top ?? (option.scroll_to_top = true)

  steps[0] = option.step1 ?? steps[0]
  steps[1] = option.step2 ?? steps[1]
  steps[2] = option.step3 ?? steps[2]

  if (option.scroll_to_top)
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
}

const menu_page_select_page = (e) => {
  console.log(`direct to: [2, ${e.main}, ${e.sub}]`)
  set_page({ step1: 2, step2: e.main, step3: e.sub })
}

onMounted(() => {
  let local_language = localStorage.getItem('local_language')
  local_language ??= locale.value

  locale.value = local_language

  //// Disabled on developing
  // let last_steps = JSON.parse(localStorage.getItem('last_steps') ?? '[0,0,0]')
  // for (let i = 0; i < last_steps.length; ++i) {
  //   steps[i] = last_steps[i]
  // }
})
</script>

<style lang="less" scoped>
.page-transition {
  position: relative;
  aspect-ratio: 4 / 3;
  width: auto;
  height: auto;
  // margin: auto;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  container-type: size;

  > * {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden overlay;
    background-color: var(--background-color);
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 98;
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

<style lang="less">
.page-transition {
  font-family: 'SarasaMonoSlab-SC';

  * {
    font-family: 'SarasaMonoSlab-SC';
  }

  .test-page-changer-box {
    position: fixed;
    display: flex;
    top: -100px;
    left: 50%;
    height: 50px;
    width: auto;
    opacity: 0;
    transform: translateX(-50%);
    padding: 0.55em 1em;
    border-radius: 0.72cqw;
    transition: all 0.3s;
    background-color: var(--background-color);
    box-shadow: var(--box-shadow);
    z-index: 99;

    &.active {
      top: 0.5em;
      opacity: 1;
      z-index: 99;
    }

    .title {
      font-size: 1.44cqw;
      line-height: 30px;
    }

    .input {
      flex: 1;

      input {
        width: 3em;
        font-size: 1.44cqw;
        background-image: var(--input-background-image);
        border: 0.1cqw solid var(--border-color);
        border-radius: 0.75em;
        transition: border 0.3s;
        outline: 0;
        padding: 0.2em 0.5em;
        color: var(--text-color);
      }

      &:not(:last-child) {
        margin-right: 0.5em;
      }
    }
  }

  // smallest font size
  @font-face {
    font-family: 'SarasaMonoSlab-SC';
    src: url(@/assets/fonts/woff2/SarasaMonoSlabSC-Regular.woff2);
  }

  &.chinese_traditional {
    font-family: 'SarasaMonoSlab-CL';

    * {
      font-family: 'SarasaMonoSlab-CL';
    }

    @font-face {
      font-family: 'SarasaMonoSlab-CL';
      src: url(@/assets/fonts/woff2/SarasaMonoSlabCL-Regular.woff2);
    }
  }

  &.korean {
    font-family: 'SarasaMonoSlab-K';

    * {
      font-family: 'SarasaMonoSlab-K';
    }

    @font-face {
      font-family: 'SarasaMonoSlab-K';
      src: url(@/assets/fonts/woff2/SarasaMonoSlabK-Regular.woff2);
    }
  }

  &.japanese {
    font-family: 'SarasaMonoSlab-J';

    * {
      font-family: 'SarasaMonoSlab-J';
    }

    @font-face {
      font-family: 'SarasaMonoSlab-J';
      src: url(@/assets/fonts/woff2/SarasaMonoSlabJ-Regular.woff2);
    }
  }
}
</style>
