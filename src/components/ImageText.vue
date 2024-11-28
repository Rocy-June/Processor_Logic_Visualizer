<template>
  <div class="img-txt-box">
    <img :src="src" :style="{ width: size + 'px', height: size + 'px' }" :class="imageMode" />
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
    type: Number,
    default: 65,
  },
  imageMode: {
    type: String,
    default: 'square',
  },
  spacing: {
    type: String,
    default: '1rem',
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
