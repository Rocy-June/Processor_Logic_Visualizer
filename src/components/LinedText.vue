<template>
  <div class="lined">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.lined {
  display: flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background-color: var(--primary-dark-blue);
  }

  &::before {
    left: 0;
    margin-right: 2rem;
  }

  &::after {
    right: 0;
    margin-left: 2rem;
  }
}
</style>
