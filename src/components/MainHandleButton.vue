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
  padding: 0.67em 1.33em;
  font-size: 2.17cqw;
  border: 0;
  border-radius: 9em;
  background-image: linear-gradient(to top, var(--orange), var(--light-orange));
  color: var(--text-light);
}
</style>
