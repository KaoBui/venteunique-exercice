<script setup>
import { computed } from 'vue'
import chipOption from './chipOption.vue'
import buttonMain from './buttonMain.vue'
import budgetSlider from './budgetSlider.vue'
import { HOUSINGS } from '../data/catalog.js'
import { euros } from '../composables/format.js'
import { useProject } from '../composables/useProject.js'

const { state, postes, budget, start, setHousing } = useProject()

const isReturning = computed(() => Object.keys(state.statuses).length > 0)

function setBudget(v) {
  state.budgetValue = v
  state.budgetTouched = true
}
</script>

<template>
  <aside class="panel" aria-label="Planifier mes meubles — configuration">
    <div class="intro">
      <p class="eyebrow">NOUVEAU</p>
      <h1 class="t-display-s">Planifier mes meubles</h1>
      <p class="t-body-m">On prépare votre liste d'essentiels, avec votre budget suivi en direct.</p>
    </div>

    <fieldset class="question">
      <legend class="t-label-l">Que meublez-vous ?</legend>
      <div class="choices">
        <chipOption
          v-for="h in HOUSINGS"
          :key="h.id"
          :selected="state.housing === h.id"
          @click="setHousing(h.id)"
        >
          {{ h.label }}
        </chipOption>
      </div>
    </fieldset>

    <fieldset class="question">
      <legend class="question__title">
        <span class="t-label-l">Votre budget maximum ?</span>
        <span class="t-caption">Facultatif</span>
      </legend>
      <budgetSlider
        :model-value="state.budgetValue"
        :unknown="state.budgetUnknown"
        :housing="state.housing"
        @update:model-value="setBudget"
        @update:unknown="state.budgetUnknown = $event"
      />
    </fieldset>

    <div class="validation">
      <buttonMain block @click="start">
        {{ isReturning ? `Mettre à jour mes ${postes.length} essentiels` : `Voir mes ${postes.length} essentiels` }}
      </buttonMain>
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
  color: var(--text-brand);
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
