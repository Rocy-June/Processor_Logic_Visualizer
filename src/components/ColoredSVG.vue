<template>
  <div
    class="colored-svg-box"
    :style="{
      'mask-image': `url(${src})`,
      'background-color': color,
      'background-image': colorImage,
    }"
  ></div>
</template>

<script setup>
defineProps({
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
</script>

<style lang="less" scoped>
.colored-svg-box {
  width: 100%;
  height: 100%;
  mask-repeat: no-repeat;
  mask-size: 100%;
}
</style>
