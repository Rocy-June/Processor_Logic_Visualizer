<template>
  <div ref="observerTarget"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['onvisible', 'onhidden'])

const observerTarget = ref(null) // 用于观测的 DOM 元素

// 事件触发函数
function handleVisibilityChange(entry) {
  entry.isIntersecting ? emit('onvisible') : emit('onhidden')
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(handleVisibilityChange)
  })

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }
})

onBeforeUnmount(() => {
  if (observer && observerTarget.value) {
    observer.unobserve(observerTarget.value)
  }
})
</script>

<style scoped></style>
