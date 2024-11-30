<template>
  <button class="main-handle-button" type="button" @click="emit('click')">
    <slot />
  </button>
</template>

<script setup>
const emit = defineEmits(['click'])
</script>

<style lang="less" scoped>
.main-handle-button {
  padding: 1rem 2rem;
  font-size: 24px;
  border: 0;
  border-radius: 9rem;
  background-image: linear-gradient(20deg, var(--red-orange), var(--light-yellow));
  color: var(--text-light);
}
</style>
