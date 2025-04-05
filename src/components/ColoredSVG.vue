<template>
  <div class="colored-svg-box" :style="style_object"></div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  color: {
    type: String,
  },
  colorImage: {
    type: String,
  },
  src: {
    type: String,
  },
})

const style_object = ref({
  'mask-image': `url("${props.src}")`,
  'background-color': props.color,
  'background-image': props.colorImage,
})

watch(
  () => props.src,
  (newSrc) => {
    style_object.value['mask-image'] = `url("${newSrc}")`
  },
)
watch(
  () => props.color,
  (newColor) => {
    style_object.value['background-color'] = newColor
  },
)
watch(
  () => props.colorImage,
  (newColorImage) => {
    style_object.value['background-image'] = newColorImage
  },
)
</script>

<style lang="less" scoped>
.colored-svg-box {
  width: 100%;
  height: 100%;
  mask-repeat: no-repeat;
  mask-size: 100%;
}
</style>
