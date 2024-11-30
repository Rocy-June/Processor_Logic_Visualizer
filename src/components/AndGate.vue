<template>
  <div>
    <div>A: {{ a }}</div>
    <div>B: {{ b }}</div>
    <div>Y: {{ y }}</div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  a: {
    type: Boolean,
    default: false,
  },
  b: {
    type: Boolean,
    default: false,
  },
})

const y = defineModel({ default: false })

const input_changed = () => {
  y.value = props.a && props.b
  console.log(`changed! A: ${props.a}, B: ${props.b}, Y: ${y.value}`)
}

watch(() => props.a, input_changed)
watch(() => props.b, input_changed)
</script>

<style lang="scss" scoped></style>
