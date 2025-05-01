<template>
  <div class="digital-circuit-base-intro-box">
    <h1 class="main-title">
      <button type="button" class="menu-button" @click="emit('menu-page')">
        <ColoredSVG :src="list_logo" :color="'var(--text-light)'" />
      </button>
      <span class="title-content">{{ $t('digital_circuit_base_intro_page.title') }}</span>
    </h1>

    <div class="decimal-calculate-box">
      <transition name="fade" appear>
        <div class="decimal-input-box" v-if="steps[0] == 0">
          <div class="decimal-input-text-guide">
            {{ $t('digital_circuit_base_intro_page.input_decimal_text_guide') }}
          </div>
          <div class="decimal-input-control-box">
            <div class="dice">
              <button type="button" class="dice-button" @click="dice_click">
                <ColoredSVG :src="dice_logo" :color="'var(--text-light)'" />
              </button>
            </div>
            <div class="input">
              <input type="number" v-model="decimal_1" @change="decimal_changed(0)" />
            </div>
            <div class="input">
              <input type="number" v-model="decimal_2" @change="decimal_changed(1)" />
            </div>
          </div>
        </div>
        <div class="decimal-calculate-animate-box" v-else-if="steps[0] == 1">
          <transition name="slide-to-bottom" appear>
            <div class="step-text-guide" v-if="steps[1] == 0">
              {{
                $t('digital_circuit_base_intro_page.decimal_calc_step_0', { decimal_1, decimal_2 })
              }}
            </div>
            <div class="step-text-guide" v-else-if="steps[1] == 1">
              {{
                $t('digital_circuit_base_intro_page.decimal_calc_step_1', { decimal_1, decimal_2 })
              }}
            </div>
            <div
              class="step-text-guide"
              v-else-if="
                steps[1] == 2 && Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) <= 9
              "
            >
              {{
                $t('digital_circuit_base_intro_page.decimal_calc_step_2', {
                  units_result: Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)),
                })
              }}
            </div>
            <div
              class="step-text-guide"
              v-else-if="
                steps[1] == 2 && Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) > 9
              "
            >
              {{
                $t('digital_circuit_base_intro_page.decimal_calc_step_2_with_carry', {
                  units_result: Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)),
                })
              }}
            </div>
            <div
              class="step-text-guide"
              v-else-if="
                steps[1] == 3 &&
                Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) <= 9 &&
                Number(decimal_1.charAt(0)) + Number(decimal_2.charAt(0)) <= 9
              "
            >
              {{
                $t('digital_circuit_base_intro_page.decimal_calc_step_3', {
                  tens_result: Number(decimal_1.charAt(0)) + Number(decimal_2.charAt(0)),
                  result: Number(decimal_1) + Number(decimal_2),
                })
              }}
            </div>
            <div
              class="step-text-guide"
              v-else-if="
                steps[1] == 3 &&
                Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) <= 9 &&
                Number(decimal_1.charAt(0)) + Number(decimal_2.charAt(0)) > 9
              "
            >
              {{
                $t('digital_circuit_base_intro_page.decimal_calc_step_3_with_tens_carry', {
                  tens_result: Number(decimal_1.charAt(0)) + Number(decimal_2.charAt(0)),
                  result: Number(decimal_1) + Number(decimal_2),
                })
              }}
            </div>
            <div
              class="step-text-guide"
              v-else-if="
                steps[1] == 3 &&
                Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) > 9 &&
                Number(decimal_1.charAt(0)) + Number(decimal_2.charAt(0)) <= 9
              "
            >
              {{
                $t('digital_circuit_base_intro_page.decimal_calc_step_3_with_units_carry', {
                  tens_result: Number(decimal_1.charAt(0)) + Number(decimal_2.charAt(0)) + 1,
                  result: Number(decimal_1) + Number(decimal_2),
                })
              }}
            </div>
            <div
              class="step-text-guide"
              v-else-if="
                steps[1] == 3 &&
                Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) > 9 &&
                Number(decimal_1.charAt(0)) + Number(decimal_2.charAt(0)) > 9
              "
            >
              {{
                $t(
                  'digital_circuit_base_intro_page.decimal_calc_step_3_with_units_and_tens_carry',
                  {
                    tens_result: Number(decimal_1.charAt(0)) + Number(decimal_2.charAt(0)) + 1,
                    result: Number(decimal_1) + Number(decimal_2),
                  },
                )
              }}
            </div>
            <div class="step-text-guide" v-else-if="steps[1] == 4">
              {{ $t('digital_circuit_base_intro_page.decimal_calc_step_4') }}
            </div>
          </transition>
          <div :class="{ 'decimal-calc-step-box': true, 'step-4': steps[1] == 4 }">
            <div :class="['decimal-1-units', ...second_step]">{{ decimal_1.charAt(1) }}</div>
            <div :class="['decimal-1-tens', ...second_step]">{{ decimal_1.charAt(0) }}</div>
            <div :class="['decimal-2-units', ...second_step]">{{ decimal_2.charAt(1) }}</div>
            <div :class="['decimal-2-tens', ...second_step]">{{ decimal_2.charAt(0) }}</div>
            <div
              :class="[
                'units-carry',
                Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) > 9 ? 'active' : '',
                ...second_step,
              ]"
            >
              {{ Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) > 9 ? 1 : 0 }}
            </div>
            <div
              :class="[
                'tens-carry',
                Number(decimal_1.charAt(0)) +
                  Number(decimal_2.charAt(0)) +
                  (Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) > 9 ? 1 : 0) >
                9
                  ? 'active'
                  : '',
                ...second_step,
              ]"
            >
              {{
                Number(decimal_1.charAt(0)) +
                  Number(decimal_2.charAt(0)) +
                  (Number(decimal_1.charAt(1)) + Number(decimal_2.charAt(1)) > 9 ? 1 : 0) >
                9
                  ? 1
                  : 0
              }}
            </div>
            <div :class="['symbol-plus', ...second_step]">+</div>
            <div :class="['calc-line', ...second_step]"></div>
            <div :class="['result-units', ...second_step]">
              {{ (Number(decimal_1) + Number(decimal_2)) % 10 }}
            </div>
            <div :class="['result-tens', ...second_step]">
              {{ parseInt((Number(decimal_1) + Number(decimal_2)) / 10) % 10 }}
            </div>
          </div>
          <ColoredSVG
            :class="['computer-and-tablet-logo', ...second_step]"
            :src="computer_and_tablet_logo"
            :color="'var(--text-color)'"
          />
          <div :class="['question-mark', ...second_step]">?</div>
        </div>
        <div class="decimal-to-binary-box" v-else-if="steps[0] == 2">
          <div class="decimal-to-binary-text-guide" v-if="steps[1] == 0">
            {{ $t('digital_circuit_base_intro_page.decimal_to_binary') }}
          </div>
        </div>
      </transition>
    </div>

    <transition name="slide-to-left" appear>
      <MainHandleButton
        class="next"
        v-if="steps[0] == 0 && is_decimals_valid"
        @click="confirm_decimals"
      >
        {{ $t('digital_circuit_base_intro_page.confirm_decimals') }}
      </MainHandleButton>
      <div class="step-1-control-box" v-else-if="steps[0] == 1">
        <MainHandleButton class="prev-step" @click="step_1_prev_click">
          {{ $t('digital_circuit_base_intro_page.step_1_prev') }}
        </MainHandleButton>
        <div class="relative-box">
          <transition name="fade" appear>
            <MainHandleButton class="auto-play pause" v-if="auto_play" @click="switch_auto_play">
              <ColoredSVG :src="pause_logo" :color="'var(--text-light)'" />
            </MainHandleButton>
            <MainHandleButton class="auto-play play" v-else @click="switch_auto_play">
              <ColoredSVG :src="play_logo" :color="'var(--text-light)'" />
            </MainHandleButton>
          </transition>
        </div>
        <MainHandleButton class="next-step" @click="step_1_next_click">
          {{ $t('digital_circuit_base_intro_page.step_1_next') }}
        </MainHandleButton>
      </div>
      <div class="step-2-control-box" v-else-if="steps[0] == 2">
        <MainHandleButton class="prev-step" @click="step_2_prev_click">
          {{ $t('digital_circuit_base_intro_page.step_2_prev') }}
        </MainHandleButton>
        <MainHandleButton class="next-step" @click="step_2_next_click">
          {{ $t('digital_circuit_base_intro_page.step_2_next') }}
        </MainHandleButton>
      </div>
      <MainHandleButton class="next" v-else-if="false" @click="emit('next-page')">
        {{ $t('digital_circuit_base_intro_page.next_section') }}
      </MainHandleButton>
    </transition>
  </div>
</template>

<script setup>
import { nextTick, ref, watch, computed } from 'vue'

import ColoredSVG from '@/components/ColoredSVG.vue'
import MainHandleButton from '@/components/MainHandleButton.vue'

import list_logo from '@/assets/list.svg'
import dice_logo from '@/assets/dice.svg'
import computer_and_tablet_logo from '@/assets/computer_and_tablet.svg'
import pause_logo from '@/assets/pause.svg'
import play_logo from '@/assets/play.svg'

const emit = defineEmits(['menu-page', 'next-page'])

const steps = ref([0, 0])
const decimal_1 = ref('')
const decimal_2 = ref('')
const auto_play = ref(false)
const auto_play_interval = ref(null)

const is_decimals_valid = computed(() => {
  return (
    decimal_1.value.length == 2 &&
    decimal_2.value.length == 2 &&
    !isNaN(Number(decimal_1.value)) &&
    !isNaN(Number(decimal_2.value))
  )
})
const second_step = computed(() => {
  return Array.from({ length: steps.value[1] + 1 }, (_, i) => `step-${i}`)
})

const dice_click = () => {
  decimal_1.value = parseInt(Math.random() * 80 + 10)
  decimal_2.value = parseInt(Math.random() * 80 + 10)
}

watch(decimal_1, (value) => {
  decimal_1.value = value.toString().substring(0, 2)
})
watch(decimal_2, (value) => {
  decimal_2.value = value.toString().substring(0, 2)
})

const decimal_changed = (index) => {
  let ref_value = index == 0 ? decimal_1 : decimal_2
  if (ref_value.value.length == 0) return

  const number_value = Number(ref_value.value)
  if (number_value < 10) {
    ref_value.value = '10'
  } else if (number_value > 99) {
    ref_value.value = '99'
  }
}

const confirm_decimals = () => {
  if (!is_decimals_valid.value) return

  steps.value[0] = 1
  steps.value[1] = 0

  auto_play.value = true

  start_auto_play()
}
const start_auto_play = () => {
  if (!auto_play.value) return

  stop_auto_play()
  auto_play_interval.value = setInterval(() => {
    const has_next_step = next_step()
    if (!has_next_step) {
      switch_auto_play(false)
      stop_auto_play()
      return
    }
  }, 2000)
}
const stop_auto_play = () => {
  if (auto_play_interval.value) {
    clearInterval(auto_play_interval.value)
    auto_play_interval.value = null
  }
}
const switch_auto_play = (value) => {
  if (typeof value !== 'boolean') value = !auto_play.value

  auto_play.value = value

  if (auto_play.value) {
    start_auto_play()
  } else {
    stop_auto_play()
  }
}
const prev_step = () => {
  steps.value[1]--

  if (steps.value[1] < 0) {
    steps.value[0] = 0
    steps.value[1] = 0
    return false
  }

  return true
}
const next_step = () => {
  steps.value[1]++

  const total_sub_steps = 4
  if (steps.value[1] == total_sub_steps) {
    return false
  } else if (steps.value[1] > total_sub_steps) {
    steps.value[0] = 2
    steps.value[1] = 0
    return false
  }

  return true
}
const step_1_prev_click = () => {
  switch_auto_play(false)

  prev_step()
}
const step_1_next_click = () => {
  switch_auto_play(false)

  next_step()
}
const step_2_prev_click = () => {
  steps.value[0] = 1
  steps.value[1] = 4
}
const step_2_next_click = () => {
  steps.value[0] = 2
  steps.value[1] = 0
}
</script>

<style lang="less" scoped>
.digital-circuit-base-intro-box {
  display: flex;
  flex-direction: column;
  padding: 2em;
  font-size: 2.17cqw;

  .decimal-calculate-box {
    position: relative;
    flex: 1;

    .decimal-input-box {
      position: absolute;
      width: 100%;

      .decimal-input-text-guide {
        font-size: 2cqw;
      }
      .decimal-input-control-box {
        position: absolute;
        display: flex;
        top: 32cqh;
        left: 50%;
        transform: translateX(-50%);

        .dice {
          padding: 2cqw;
          padding-right: 0;
          margin-right: 2em;

          .dice-button {
            width: 9.365cqw;
            height: 9.365cqw;
            padding: 1.5cqw;
            background-color: transparent;
            border: 0;
            border-radius: 9cqw;
            transition: all 0.2s;

            &:hover {
              background-color: var(--secondary-light-blue);
            }
          }
        }

        .input {
          &:not(:last-child) {
            margin-right: 2em;
          }

          input {
            width: 2.525em;
            font-size: 8cqw;
            background-image: var(--input-background-image);
            border: 0.1cqw solid var(--border-color);
            border-radius: 9em;
            transition: border 0.3s;
            outline: 0;
            padding: 0.2em 0.75em;
            color: var(--text-color);
            appearance: textfield;

            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
        }
      }
    }

    .decimal-calculate-animate-box {
      position: absolute;
      width: 100%;
      height: 100%;

      .step-text-guide {
        font-size: 2cqw;
      }

      .decimal-1-units,
      .decimal-1-tens,
      .decimal-2-units,
      .decimal-2-tens,
      .units-carry,
      .tens-carry,
      .symbol-plus,
      .calc-line,
      .result-units,
      .result-tens,
      .computer-and-tablet-logo,
      .question-mark {
        position: absolute;
        font-size: 8cqw;
        transition: all 0.5s;
      }

      .decimal-calc-step-box {
        position: absolute;
        top: 0;
        left: 25%;
        width: 100%;
        height: 100%;
        transition: all 0.5s;

        &.step-4 {
          left: 0;
        }

        .decimal-1-units {
          top: 39.85%;
          left: 20.12%;

          &.step-1 {
            top: 18.85%;
            left: 33.12%;
          }
          &.step-2 {
            animation: decimal-1-units-step-2 2s;

            @keyframes decimal-1-units-step-2 {
              0% {
                top: 18.85%;
                left: 33.12%;
              }
              12.5% {
                opacity: 1;
              }
              25% {
                top: 36.85%;
                left: 33.12%;
                opacity: 0;
              }
              37.5% {
                top: 18.85%;
                left: 33.12%;
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 1;
              }
            }
          }
        }
        .decimal-1-tens {
          top: 39.85%;
          left: 15.75%;

          &.step-1 {
            top: 18.85%;
            left: 24.12%;
          }

          &.step-3 {
            animation: decimal-1-tens-step-3 2s;

            @keyframes decimal-1-tens-step-3 {
              0% {
                top: 18.85%;
                left: 24.12%;
                opacity: 1;
              }
              12.5% {
                opacity: 1;
              }
              25% {
                top: 36.85%;
                left: 24.12%;
                opacity: 0;
              }
              37.5% {
                top: 18.85%;
                left: 24.12%;
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 1;
              }
            }
          }
        }
        .decimal-2-units {
          top: 39.85%;
          left: 47%;

          &.step-1 {
            top: 36.85%;
            left: 33.12%;
          }
        }
        .decimal-2-tens {
          top: 39.85%;
          left: 42.62%;

          &.step-1 {
            top: 36.85%;
            left: 24.12%;
          }
        }
        .units-carry {
          opacity: 0;

          &.active.step-2 {
            animation: units-carry-step-2 2s forwards;

            @keyframes units-carry-step-2 {
              22.5% {
                top: 36.85%;
                left: 33.12%;
                opacity: 0;
              }
              37.5% {
                opacity: 1;
              }
              50% {
                top: 58.85%;
                left: 24.12%;
                opacity: 1;
              }
              62.5% {
                top: 58.85%;
                left: 24.12%;
              }
              75% {
                top: 0.85%;
                left: 24.12%;
                opacity: 1;
              }
              100% {
                top: 0.85%;
                left: 24.12%;
                opacity: 1;
              }
            }
          }
          &.active.step-3 {
            animation: units-carry-step-3 2s forwards;

            @keyframes units-carry-step-3 {
              0% {
                top: 0.85%;
                left: 24.12%;
                opacity: 1;
              }
              12.5% {
                opacity: 1;
              }
              25% {
                top: 36.85%;
                left: 24.12%;
                opacity: 0;
              }
              100% {
                opacity: 0;
              }
            }
          }
        }
        .tens-carry {
          opacity: 0;

          &.active.step-3 {
            animation: tens-carry-step-3 2s forwards;

            @keyframes tens-carry-step-3 {
              0% {
                opacity: 0;
              }
              22.5% {
                top: 36.85%;
                left: 24.12%;
                opacity: 0;
              }
              37.5% {
                opacity: 1;
              }
              50% {
                top: 58.85%;
                left: 15.12%;
                opacity: 1;
              }
              100% {
                top: 58.85%;
                left: 15.12%;
                opacity: 1;
              }
            }
          }
        }
        .symbol-plus {
          top: 39.85%;
          left: 31.5%;

          &.step-1 {
            top: 36.85%;
            left: 15.12%;
          }
        }
        .calc-line {
          width: 0;
          height: 0.85cqh;
          top: 57%;
          left: 7%;
          background-color: var(--text-color);
          opacity: 0;

          &.step-1 {
            width: 38cqw;
            opacity: 1;
            transition-delay: 0.5s;
          }
        }
        .result-units {
          opacity: 0;

          &.step-2 {
            animation: result-units-step-2 2s forwards;

            @keyframes result-units-step-2 {
              22.5% {
                top: 36.85%;
                left: 33.12%;
                opacity: 0;
              }
              37.5% {
                opacity: 1;
              }
              50% {
                top: 58.85%;
                left: 33.12%;
                opacity: 1;
              }
              100% {
                top: 58.85%;
                left: 33.12%;
                opacity: 1;
              }
            }
          }
        }
        .result-tens {
          opacity: 0;

          &.step-3 {
            animation: result-units-step-3 2s forwards;

            @keyframes result-units-step-3 {
              22.5% {
                top: 36.85%;
                left: 24.12%;
                opacity: 0;
              }
              37.5% {
                opacity: 1;
              }
              50% {
                top: 58.85%;
                left: 24.12%;
                opacity: 1;
              }
              100% {
                top: 58.85%;
                left: 24.12%;
                opacity: 1;
              }
            }
          }
        }
      }
      .computer-and-tablet-logo {
        width: 35cqw;
        height: 35cqw;
        top: -35cqw;
        left: 70%;
        transform: translateX(-50%);
        opacity: 0;

        &.step-4 {
          top: 20cqh;
          opacity: 1;
        }
      }
      .question-mark {
        opacity: 0;
        top: 12cqh;
        right: 6cqw;
        font-size: 20cqw;
        line-height: 1em;
        transform: rotate(-90deg);
        transform-origin: bottom center;

        &.step-4 {
          opacity: 1;
          transform: rotate(0deg);
          transition-delay: 0.3s;
        }
      }
    }

    .decimal-to-binary-box {
      .decimal-to-binary-text-guide {
      }
    }
  }

  .next {
    position: absolute;
    right: 2em;
    bottom: 2em;
  }

  .step-1-control-box {
    position: absolute;
    display: flex;
    left: 50%;
    bottom: 2em;
    transform: translateX(-50%);

    .relative-box {
      position: relative;
      text-align: center;

      button {
        position: absolute;
        width: 5.5cqw;
        height: 5.5cqw;
        transform: translateX(-50%);
        padding: 2cqw;
      }
    }

    > :not(:last-child) {
      margin-right: 5cqw;
    }
  }

  .step-2-control-box {
    position: relative;

    .prev-step {
    }
    .next-step {
      position: absolute;
      right: 0;
    }
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

.slide-to-bottom-enter-active,
.slide-to-bottom-leave-active {
  position: absolute;
  transition: all 0.3s;
}
.slide-to-bottom-enter-from {
  transform: translateY(-50%);
  opacity: 0;
}
.slide-to-bottom-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-to-bottom-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-to-bottom-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}

.slide-to-left-enter-active,
.slide-to-left-leave-active {
  transition: all 0.3s;
}
.slide-to-left-enter-from {
  transform: translateX(50%);
  opacity: 0;
}
.slide-to-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-to-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-to-left-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
</style>
