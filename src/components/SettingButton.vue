<template>
  <div class="setting-box" ref="setting">
    <button class="gear-button" type="button" @click="gear_click">
      <ColoredSVG :src="gear_logo" color="var(--background-color)" />
    </button>
    <transition name="slide-to-left">
      <div class="setting-dialog" v-if="show_dialog">
        <ImageText :src="translate_logo" size="2.26cqw" spacing="1cqw">
          <DropList
            class="translate-drop-list"
            v-model="language_value"
            v-model:label="language_label"
            v-model:obj="language_obj"
            v-model:filter="language_filter"
            @change="language_changed"
            @blur="language_blur"
          >
            <DropListOption
              v-for="(item, index) in language_list"
              :key="index"
              :value="item.pack_name"
              :label="item.local_name"
              :obj="item"
              :active="item.pack_name == language_value"
            >
              {{ item.local_name }}
            </DropListOption>
          </DropList>
        </ImageText>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import ColoredSVG from './ColoredSVG.vue'
import ImageText from './ImageText.vue'
import DropList from './DropList.vue'
import DropListOption from './DropListOption.vue'

import gear_logo from '@/assets/gear.svg'
import translate_logo from '@/assets/translate_logo.svg'

import languages from '@/i18n/languages.json'

const { locale } = useI18n()

const show_dialog = ref(false)
const setting = ref(null)
const language_label = ref()
const language_value = ref()
const language_obj = ref()
const language_filter = defineModel('language_filter')

const gear_click = () => {
  show_dialog.value = !show_dialog.value
}

const handle_click_outside = (event) => {
  if (setting.value && !setting.value.contains(event.target)) {
    show_dialog.value = false
  }
}

const language_list = computed(() => {
  return languages.filter(
    (item) => item.local_name.toLowerCase().indexOf(language_filter.value.toLowerCase()) >= 0,
  )
})

const language_changed = () => {
  locale.value = language_value.value

  document.documentElement.lang = language_obj.value.html_lang

  localStorage.setItem('local_language', language_value.value)
}

const language_blur = () => {
  let current_lang = languages.find((item) => item.pack_name == locale.value)
  language_label.value = current_lang.local_name
}

onMounted(() => {
  document.addEventListener('mousedown', handle_click_outside)

  let local_language = localStorage.getItem('local_language')
  local_language ??= locale.value

  let current_lang = languages.find((item) => item.pack_name == local_language)
  language_value.value = current_lang.pack_name
  language_label.value = current_lang.local_name
  language_obj.value = current_lang

  locale.value = language_value.value

  document.documentElement.lang = language_obj.value.html_lang
})

onBeforeUnmount(() => {
  document.emoveEventListener('mousedown', handle_click_outside)
})
</script>

<style lang="less" scoped>
#app .setting-box {
  position: fixed;
  top: 2em;
  right: 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: unset;
  height: unset;
  background-color: unset;
  overflow: unset;
  z-index: 100;

  .gear-button {
    position: relative;
    width: 4.51cqw;
    height: 4.51cqw;
    padding: 0.9cqw;
    background-color: var(--reverse-background-color);
    border: 0.2cqw solid var(--background-color);
    border-radius: 9cqw;
    opacity: 0.95;
    z-index: 2;
  }

  .setting-dialog {
    position: relative;
    margin-top: 0.9cqw;
    padding: 0.25em;
    border-radius: 0.72cqw;
    font-size: 1.44cqw;
    background-color: var(--background-color);
    box-shadow: var(--box-shadow);
    transition: all 0.3s;
    z-index: 1;

    > * {
      padding: 0.3em 0.75em;
    }
  }

  .translate-drop-list {
    width: 18.05cqw;
  }
}

.slide-to-left-enter-active,
.slide-to-left-leave-active {
  transition: all 0.3s;
}
.slide-to-left-enter-from {
  transform: translate(calc(50% - 2.26cqw), calc(-50% - 2.26cqw)) scale(0.25);
  opacity: 0;
}
.slide-to-left-enter-to {
  transform: translate(0, 0) scale(1);
  opacity: 1;
}
.slide-to-left-leave-from {
  transform: translate(0, 0) scale(1);
  opacity: 1;
}
.slide-to-left-leave-to {
  transform: translate(calc(50% - 2.26cqw), calc(-50% - 2.26cqw)) scale(0.25);
  opacity: 0;
}
</style>
