<script setup>
/**
 * budgetSlider — choice of the maximum budget (Figma: budgetSlider).
 * A free-amount field and a slider from 500 to 5 000 € on a log scale (more room for small budgets).
 * The suggested range for the housing type sits between two marks; the handle starts in its middle.
 * « Je ne sais pas encore » clears the budget: the project then shows suggested prices only.
 */
import { ref, computed, watch } from 'vue'
import { BUDGET_RANGES, BUDGET_SCALE } from '../data/catalog.js'
import { euros } from '../composables/format.js'

const props = defineProps({
  modelValue: { type: Number, default: null },
  unknown: { type: Boolean, default: false },
  /** Housing id: 'studio' | 't2' | 'coloc' */
  housing: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue', 'update:unknown'])

const STEPS = 1000
const { min, max } = BUDGET_SCALE
const range = computed(() => BUDGET_RANGES[props.housing])

const toPos = (v) => Math.min(1, Math.max(0, Math.log(v / min) / Math.log(max / min)))
const fromPos = (p) => Math.round((min * (max / min) ** p) / 50) * 50
const pct = (v) => `${(toPos(v) * 100).toFixed(2)}%`

const intFmt = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })
const numberFmt = { format: (n) => intFmt.format(n).replace(/ /g, ' ') }
const text = ref(props.modelValue ? numberFmt.format(props.modelValue) : '')
const editing = ref(false)
watch(
  () => props.modelValue,
  (v) => {
    if (!editing.value) text.value = v ? numberFmt.format(v) : ''
  },
)

function onField(e) {
  editing.value = true
  text.value = e.target.value.replace(/[^\d\s]/g, '')
  const v = Number(text.value.replace(/\s/g, ''))
  emit('update:modelValue', v > 0 ? v : null)
}
function onFieldBlur() {
  editing.value = false
  text.value = props.modelValue ? numberFmt.format(props.modelValue) : ''
}
function onSlide(e) {
  emit('update:modelValue', fromPos(Number(e.target.value) / STEPS))
}
const sliderValue = computed(() => Math.round(toPos(props.modelValue || range.value.start) * STEPS))
</script>

<template>
  <div class="bs" :class="{ 'bs--off': unknown }">
    <label class="field">
      <span class="sr-only">Budget maximum, en euros</span>
      <input
        :value="text"
        inputmode="numeric"
        class="field__input"
        :disabled="unknown"
        @input="onField"
        @blur="onFieldBlur"
      />
      <span class="field__unit" aria-hidden="true">€</span>
    </label>

    <p class="t-caption">
      Budget conseillé : {{ euros(range.min) }} - {{ euros(range.max) }}
    </p>

    <div class="slider">
      <span class="slider__tick-label" :style="{ left: pct(range.min) }" aria-hidden="true">{{ euros(range.min) }}</span>
      <span class="slider__tick-label" :style="{ left: pct(range.max) }" aria-hidden="true">{{ euros(range.max) }}</span>
      <span class="slider__rail" aria-hidden="true" />
      <span class="slider__fill" :style="{ width: unknown ? '0%' : pct(modelValue || min) }" aria-hidden="true" />
      <span class="slider__tick" :style="{ left: pct(range.min) }" aria-hidden="true" />
      <span class="slider__tick" :style="{ left: pct(range.max) }" aria-hidden="true" />
      <input
        type="range"
        class="slider__input"
        :min="0"
        :max="STEPS"
        :value="sliderValue"
        :disabled="unknown"
        aria-label="Budget maximum"
        :aria-valuetext="modelValue ? euros(modelValue) : 'Aucun budget'"
        @input="onSlide"
      />
    </div>

    <div class="scale t-caption" aria-hidden="true">
      <span>{{ euros(min) }}</span>
      <span>{{ euros(max) }}</span>
    </div>

    <label class="check">
      <input
        type="checkbox"
        class="check__box"
        :checked="unknown"
        @change="emit('update:unknown', $event.target.checked)"
      />
      <span class="t-body-m">Je ne sais pas encore</span>
    </label>
  </div>
</template>

<style scoped>
.bs {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.field {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: var(--size-control);
  padding: 0 var(--space-4);
  border-radius: var(--radius-m);
  border: 2px solid transparent;
  background: var(--surface-subtle);
}
.field:focus-within {
  border-color: var(--border-selected);
}
.field__input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: var(--text-strong);
}
.field__unit {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--text-default);
}

/* Slider: 46 px tall, labels on top, marks across the rail, native range input on top for a11y */
.slider {
  position: relative;
  height: 46px;
}
.slider__tick-label {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--text-strong);
  white-space: nowrap;
}
.slider__rail,
.slider__fill {
  position: absolute;
  top: 30px;
  left: 0;
  height: 4px;
  border-radius: 2px;
}
.slider__rail {
  right: 0;
  background: var(--meter-track);
}
.slider__fill {
  background: var(--meter-fill);
}
.slider__tick {
  position: absolute;
  top: 22px;
  width: 2px;
  height: 20px;
  margin-left: -1px;
  border-radius: 1px;
  background: var(--border-strong);
}
.slider__input {
  position: absolute;
  inset: 18px -11px 0;
  width: calc(100% + 22px);
  height: 28px;
  margin: 0;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
.slider__input::-webkit-slider-runnable-track {
  height: 28px;
  background: transparent;
}
.slider__input::-moz-range-track {
  height: 28px;
  background: transparent;
}
.slider__input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  margin-top: 3px;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  background: var(--surface-default);
  box-shadow: var(--shadow-soft);
}
.slider__input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  background: var(--surface-default);
  box-shadow: var(--shadow-soft);
}
.slider__input:focus-visible {
  outline: none;
}
.slider__input:focus-visible::-webkit-slider-thumb {
  outline: 2px solid var(--border-selected);
  outline-offset: 2px;
}
.slider__input:focus-visible::-moz-range-thumb {
  outline: 2px solid var(--border-selected);
  outline-offset: 2px;
}

.scale {
  display: flex;
  justify-content: space-between;
}
.check {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}
.check__box {
  appearance: none;
  -webkit-appearance: none;
  display: grid;
  place-content: center;
  width: 18px;
  height: 18px;
  margin: 0;
  border: 1.5px solid var(--border-strong);
  border-radius: 4px;
  background: var(--surface-default);
  cursor: pointer;
}
.check__box:checked {
  border-color: var(--interactive-primary-background);
  background: var(--interactive-primary-background) url('/icons/check-inverse.svg') center / 14px no-repeat;
}

/* « Je ne sais pas encore »: field and slider step back */
.bs--off .field,
.bs--off .slider,
.bs--off .scale {
  opacity: 0.4;
}
.bs--off .slider__input {
  cursor: default;
}
</style>
