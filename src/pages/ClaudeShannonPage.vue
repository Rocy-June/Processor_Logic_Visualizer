<template>
  <div class="claude-shannon-box">
    <h1>
      <button type="button" class="menu-button" @click="emit('menu-page')">
        <ColoredSVG :src="list_logo" :color="'var(--text-light)'" />
      </button>
      {{ $t('claude_shannon_page.title') }}
    </h1>

    <div class="who-am-i-box">
      <div>
        <div class="who-am-i-pic-box">
          <transition name="fade">
            <div class="unknown" v-if="!handled"></div>
            <div class="known" v-else keep-alive></div>
          </transition>
        </div>
        <transition name="fade">
          <div class="source-tip" v-if="handled">{{ $t('claude_shannon_page.source_tip') }}</div>
        </transition>
      </div>
      <div class="detail-box">
        <transition name="fade">
          <div class="unknown" v-if="!handled">
            <div class="question">? ? ? ?</div>
            <div class="who-am-i">{{ $t('claude_shannon_page.who_am_i') }}</div>
          </div>
          <div class="known" v-else>
            <h2 class="name">{{ $t('claude_shannon_page.claude_shannon') }}</h2>
            <div class="introduce">{{ $t('claude_shannon_page.introduce') }}</div>
          </div>
        </transition>
      </div>
    </div>

    <transition name="scale-in" appear>
      <MainHandleButton class="next" v-if="!handled" @click="who_am_i_clicked">
        {{ $t('claude_shannon_page.reveal') }}
      </MainHandleButton>
      <MainHandleButton class="next" v-else @click="emit('next-page')">
        {{ $t('claude_shannon_page.next_section') }}
      </MainHandleButton>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import list_logo from '@/assets/list.svg'
import shannon_img from '@/assets/C.E.Shannon.jpg'

const emit = defineEmits(['menu-page', 'next-page'])

const handled = ref(false)

onMounted(() => {
  const img = new Image()
  img.src = shannon_img
})

const who_am_i_clicked = () => {
  handled.value = true
}
</script>

<style lang="less" scoped>
.claude-shannon-box {
  padding: 2rem;

  .who-am-i-box {
    display: flex;
    padding: 3vw 7vw;

    .who-am-i-pic-box {
      position: relative;
      width: 33vw;
      height: 40.49vw;
      border: 1.5vw solid var(--border-light);
      margin-right: 2rem;

      .unknown,
      .known {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-position: 50%;
        background-repeat: no-repeat;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .unknown {
        background-color: #fff;
        background-image: url(@/assets/C.E.Shannon_outline.svg);
        z-index: 2;
      }

      .known {
        background-image: url(@/assets/C.E.Shannon.jpg);
        z-index: 1;
      }
    }

    .source-tip {
      width: 33vw;
      text-align: center;
      color: var(--sub-text-color);
      font-size: 1.23vw;
      margin-top: 1rem;
    }

    .detail-box {
      position: relative;
      flex: 1;

      .unknown,
      .known {
        width: 100%;
      }

      .unknown {
        text-align: center;
        font-size: 6vw;

        .question {
          margin: 1em 0;
        }
      }

      .known {
        .name {
          text-align: center;
          font-size: 2.5vw;
        }
        .introduce {
          font-size: 1.57vw;
        }
      }
    }
  }

  .next {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: all 0.3s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>
