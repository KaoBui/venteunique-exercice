<script setup>
import { ref, computed } from 'vue'
import UiChip from './UiChip.vue'
import UiButton from './UiButton.vue'
import { HOUSINGS, BUDGET_PRESETS } from '../data/catalog.js'
import { euros } from '../composables/format.js'
import { useProject } from '../composables/useProject.js'

const { state, postes, budget, start } = useProject()

const unknown = ref(false)
const isReturning = computed(() => Object.keys(state.statuses).length > 0)

function pickPreset(amount) {
  state.budgetPreset = state.budgetPreset === amount ? null : amount
  state.customBudget = ''
  unknown.value = false
}
function onCustomInput(e) {
  state.customBudget = e.target.value.replace(/[^\d\s]/g, '')
  if (state.customBudget) state.budgetPreset = null
  unknown.value = false
}
function noBudget() {
  state.budgetPreset = null
  state.customBudget = ''
  unknown.value = true
}
</script>

<template>
  <aside class="panel" aria-label="Mon projet d'aménagement — configuration">
    <div class="intro">
      <p class="eyebrow">NOUVEAU</p>
      <h1 class="t-display-s">Mon projet d'aménagement</h1>
      <p class="t-body-m">Deux questions, et on prépare votre liste d'essentiels, avec votre budget suivi en direct.</p>
    </div>

    <fieldset class="question">
      <legend class="t-label-l">Que meublez-vous ?</legend>
      <div class="choices">
        <UiChip
          v-for="h in HOUSINGS"
          :key="h.id"
          :selected="state.housing === h.id"
          @click="state.housing = h.id"
        >
          {{ h.label }}
        </UiChip>
      </div>
    </fieldset>

    <fieldset class="question">
      <legend class="question__title">
        <span class="t-label-l">Votre budget maximum ?</span>
        <span class="t-caption">Facultatif</span>
      </legend>
      <div class="choices">
        <UiChip
          v-for="amount in BUDGET_PRESETS"
          :key="amount"
          :selected="state.budgetPreset === amount"
          @click="pickPreset(amount)"
        >
          {{ euros(amount) }}
        </UiChip>
      </div>
      <label class="field" :class="{ 'field--filled': state.customBudget }">
        <span class="sr-only">Autre montant, en euros</span>
        <input
          :value="state.customBudget"
          inputmode="numeric"
          placeholder="Autre montant"
          class="field__input"
          @input="onCustomInput"
        />
        <span class="field__unit" aria-hidden="true">€</span>
      </label>
      <button
        type="button"
        class="link link--s unknown"
        :class="{ 'unknown--on': unknown }"
        :aria-pressed="unknown"
        @click="noBudget"
      >
        <img v-if="unknown" src="/icons/check.svg" width="14" height="14" alt="" />
        Je ne sais pas encore
      </button>
      <p v-if="unknown" class="t-caption">Pas de souci : on vous montre des prix conseillés, vous fixerez un budget plus tard.</p>
    </fieldset>

    <div class="validation">
      <UiButton block @click="start">
        {{ isReturning ? 'Mettre à jour ma liste' : 'Je découvre ma liste' }} ({{ postes.length }})
      </UiButton>
      <p class="reassurance t-caption">
        <img src="/icons/check.svg" width="14" height="14" alt="" />
        Sans compte · modifiable à tout moment
      </p>
      <p v-if="budget" class="sr-only" aria-live="polite">Budget retenu : {{ euros(budget) }}</p>
    </div>
  </aside>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-8) var(--space-6);
}
.intro {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.eyebrow {
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 0.96px;
  color: var(--color-brand-default);
}
.question {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}
.question legend {
  padding: 0;
  margin-bottom: var(--space-3);
  width: 100%;
}
.question__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.choices {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.field {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: 48px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-m);
  border: 2px solid transparent;
  background: var(--color-surface-subtle);
  font-size: 14px;
  line-height: 20px;
}
.field:focus-within,
.field--filled {
  border-color: var(--color-border-selected);
}
.field__input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-text-strong);
}
.field__input::placeholder {
  color: var(--color-text-muted);
}
.field__unit {
  font-weight: 500;
  color: var(--color-text-default);
}
.unknown {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.validation {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.reassurance {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
</style>
