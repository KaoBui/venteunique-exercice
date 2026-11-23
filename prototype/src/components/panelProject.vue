<script setup>
import chipOption from './chipOption.vue'
import buttonMain from './buttonMain.vue'
import listPosteItem from './listPosteItem.vue'
import budgetTracker from './budgetTracker.vue'
import { PROMO } from '../data/catalog.js'
import { euros, price } from '../composables/format.js'
import { useProject } from '../composables/useProject.js'

const emit = defineEmits(['open-cart', 'explain', 'collapse', 'notice'])

const {
  state,
  budget,
  housingLabel,
  postes,
  groups,
  spent,
  shippingEstimate,
  spentIn,
  repereOf,
  statusOf,
  productById,
  setActive,
  toggleGroup,
  edit,
} = useProject()

function rowStatus(poste) {
  if (poste.id === state.activeId) return 'active'
  return statusOf(poste.id) ? 'chosen' : 'todo'
}

function itemsFor(poste) {
  const s = statusOf(poste.id)
  if (!s) return []
  const product = productById(s.productId)
  return [{ name: product.short, price: price(product.price) }]
}
</script>

<template>
  <aside class="panel" aria-label="Planifier mes meubles">
    <!-- Scrolls on its own; the budget and the cart button stay pinned below -->
    <div class="panel__scroll">
    <div class="panel__head">
      <h1 class="t-display-s">Planifier mes meubles</h1>
      <button type="button" class="icon-btn" aria-label="Réduire le panneau" @click="emit('collapse')">
        <img src="/icons/chevron-left.svg" width="18" height="18" alt="" />
      </button>
    </div>

    <div class="recap">
      <chipOption as="span">{{ housingLabel }}</chipOption>
      <chipOption as="span">{{ budget ? `${euros(budget)} max` : 'Budget libre' }}</chipOption>
      <button type="button" class="link link--s" @click="edit">Modifier</button>
      <button type="button" class="link link--s" @click="emit('explain')">Comment est réparti votre budget ?</button>
    </div>

    <hr class="sep" />

    <nav class="groups" aria-label="Postes du projet">
      <div v-for="g in groups" :key="g.id" class="group">
        <button
          type="button"
          class="group__head"
          :aria-expanded="state.openGroups.includes(g.id)"
          @click="toggleGroup(g.id)"
        >
          <span class="group__title">
            <span class="t-label-l">{{ g.label }}</span>
            <span class="t-caption">Budget conseillé : {{ euros(spentIn(g)).replace(' €', '') }} / {{ euros(repereOf(g)) }}</span>
          </span>
          <img
            src="/icons/chevron-down.svg"
            width="20"
            height="20"
            alt=""
            class="chevron"
            :class="{ 'chevron--open': state.openGroups.includes(g.id) }"
          />
        </button>
        <div v-show="state.openGroups.includes(g.id)" class="group__rows">
          <listPosteItem
            v-for="p in g.postes"
            :key="p.id"
            :label="p.label"
            :status="rowStatus(p)"
            :items="itemsFor(p)"
            @select="setActive(p.id)"
          />
        </div>
      </div>
    </nav>

    <button type="button" class="add" @click="emit('notice', 'Ajouter un poste : hors périmètre du prototype.')">
      <img src="/icons/plus.svg" width="18" height="18" alt="" />
      <span class="t-label-m">Ajouter un poste</span>
    </button>
    </div>

    <div class="panel__foot">
      <hr class="sep" />

      <budgetTracker
        :budget="budget"
        :spent="spent"
        :shipping-estimate="shippingEstimate"
        :promo-threshold="PROMO.threshold"
        :promo-label="PROMO.label"
      />

      <buttonMain block @click="emit('open-cart')">Voir mon panier</buttonMain>
    </div>
  </aside>
</template>

<style scoped>
/* The panel never grows past the visible height (set on its parent in App.vue):
   the list scrolls, the budget and « Voir mon panier » stay on screen. */
.panel {
  display: flex;
  flex-direction: column;
  max-height: inherit;
}
.panel__scroll {
  flex: 0 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6) var(--space-6) var(--space-5);
}
.panel__foot {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: 0 var(--space-6) var(--space-8);
  background: var(--surface-default);
}
.panel__head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.panel__head h1 {
  flex: 1;
}
.icon-btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-default);
  border-radius: 18px;
}
.icon-btn:hover {
  border-color: var(--text-strong);
}
.recap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}
.sep {
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;
  background: var(--border-subtle);
}
.groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.group__head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: 0 var(--space-1) var(--space-1);
  text-align: left;
}
.group__title {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.chevron {
  transition: transform 0.2s;
}
.chevron--open {
  transform: rotate(180deg);
}
.group__rows {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.add {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding-left: var(--space-1);
}

/* Short laptop screens (1280 × 800 and below): tighter spacing, same type sizes */
@media (max-height: 820px) {
  .panel__scroll {
    gap: var(--space-4);
    padding: var(--space-5) var(--space-6) var(--space-4);
  }
  .panel__foot {
    gap: var(--space-4);
    padding-bottom: var(--space-5);
  }
  .groups {
    gap: var(--space-3);
  }
}
</style>
