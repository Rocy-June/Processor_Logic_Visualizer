<template>
  <div class="img-txt-box">
    <img :src="src" :style="{ width: size, height: size }" :class="imageMode" />
    <div class="txt-box" :style="{ 'padding-left': spacing }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
  },
  size: {
    type: String,
    default: '9.03cqw',
  },
  imageMode: {
    type: String,
    default: 'square',
  },
  spacing: {
    type: String,
    default: '3cqw',
  },
})
</script>

<style lang="less" scoped>
.img-txt-box {
  display: flex;
  align-items: center;

  img {
    &.round {
      border-radius: 100%;
    }
  }

  .txt-box {
    text-align: left;
  }
}
</style>
