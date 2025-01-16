<template>
  <div class="recommend-aspect-ratio-box unexpected">
    <div class="dialog-box">
      <div class="title">{{ $t('recommend_aspect_ratio_dialog.title') }}</div>
      <div class="content" v-html="$t('recommend_aspect_ratio_dialog.content')"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" setup>
#app .recommend-aspect-ratio-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-size: 2.2vw;
  background-color: transparent;
  backdrop-filter: blur(0);
  z-index: 100;
  pointer-events: none;

  .title {
    position: sticky;
    top: 0;
    background-color: var(--background-color);
    font-size: 2.5em;
    margin-bottom: 1em;
    padding-top: 5vw;
    text-align: center;
    font-weight: bold;
  }

  .content {
    span.b {
      font-weight: bold;
    }
  }
}

.dialog-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80vw;
  height: 80vh;
  margin: auto;
  padding: 0 5vw 5vw 5vw;
  overflow: hidden overlay;
  background-color: var(--background-color);
  border: 2px solid var(--border-color);
  opacity: 0;
  transform: translateY(-50%);
  transition: all 0.3s;
}
</style>
