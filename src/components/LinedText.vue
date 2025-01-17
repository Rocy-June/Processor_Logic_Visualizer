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
    height: 0.2cqw;
    background-color: var(--primary-dark-blue);
  }

  &::before {
    margin-right: 1.33em;
  }

  &::after {
    margin-left: 1.33em;
  }
}
</style>
