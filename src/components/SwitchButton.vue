<template>
  <button
    class="switch-button-box"
    :style="{ '--size': size }"
    :disabled="disabled"
    @click="button_click"
  >
    <input type="checkbox" v-model="enabled" />
  </button>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: '9.03cqw',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const enabled = defineModel({
  value: {
    type: Boolean,
    default: false,
  },
})

const button_click = () => {
  enabled.value = !enabled.value
}
</script>

<style lang="less" scoped>
.switch-button-box {
  --border-size: calc(var(--size) * 0.066);
  --padding-size: var(--border-size);
  --thumb-size: calc(var(--size) - var(--border-size) * 4);
  --thumb-text-size: calc(var(--size) * 0.4);

  position: relative;
  border: calc(var(--border-size) + 0.5px) solid var(--text-dark);
  border-radius: calc(var(--size) * 9);
  background-color: var(--background-dark);
  padding: var(--padding-size);
  width: calc(var(--size) * 2);
  height: var(--size);

  &::before,
  &::after {
    content: '';
    position: absolute;
    transition: all 0.2s;
  }

  &::before {
    top: var(--padding-size);
    left: var(--padding-size);
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: var(--text-dark);
    border-radius: calc(var(--size) * 9);
  }

  &::after {
    top: 0;
    bottom: 0;
    left: calc(var(--border-size) + var(--thumb-size) / 2 - var(--thumb-text-size) / 2);
    width: var(--thumb-text-size);
    height: var(--thumb-text-size);
    margin: auto;
    border: calc(var(--border-size) + 0.5px) solid var(--background-dark);
    border-radius: 99px;
  }

  input {
    display: none;
  }

  &:disabled {
    filter: brightness(0.85);
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    &::before {
      width: calc(var(--thumb-size) * 1.5);
    }

    &::after {
      left: calc(
        var(--border-size) + var(--thumb-size) / 2 - var(--thumb-text-size) / 2 + var(--thumb-size) *
          0.25
      );
    }

    &:has(input:checked) {
      &::before {
        left: calc(100% - var(--thumb-size) * 1.5 - var(--padding-size));
        width: calc(var(--thumb-size) * 1.5);
      }

      &::after {
        left: calc(100% - var(--thumb-size) * 0.75 - var(--border-size) * 1.25);
      }
    }
  }

  &:has(input:checked) {
    border: calc(var(--border-size) + 0.5px) solid var(--background-dark);
    background-color: var(--background-light);

    &::before {
      left: calc(100% - var(--thumb-size) - var(--padding-size));
      background: var(--background-dark);
    }

    &::after {
      left: calc(100% - var(--thumb-size) / 2 - var(--border-size) * 1.25);
      width: 0;
      border: calc((var(--border-size) + 0.5px) / 2) solid var(--background-light);
    }
  }
}
</style>
