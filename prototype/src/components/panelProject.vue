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
  completed,
  statusOf,
  productById,
  productsFor,
  setActive,
  toggleGroup,
  edit,
} = useProject()

const repereLabel = (p) => `${budget.value ? 'Repère' : 'Prix conseillé'} : ${euros(p.repere)}`

function detailFor(poste) {
  const s = statusOf(poste.id)
  if (s?.state === 'chosen') {
    const product = productById(s.productId)
    return `${product.short} · ${price(product.price)}`
  }
  if (s?.state === 'owned') return "Vous l'avez déjà"
  if (s?.state === 'skipped') return 'Passé pour le moment'
  if (poste.id === state.activeId) return `${repereLabel(poste)} · ${productsFor(poste.id).length} produits`
  return repereLabel(poste)
}

function rowStatus(poste) {
  if (poste.id === state.activeId) return 'active'
  return statusOf(poste.id) ? 'done' : 'todo'
}

const resolvedIn = (group) => group.postes.filter((p) => statusOf(p.id)).length
</script>

<template>
  <aside class="panel" aria-label="Mon projet d'aménagement">
    <div class="panel__head">
      <h1 class="t-display-s">Mon projet d'aménagement</h1>
      <button type="button" class="icon-btn" aria-label="Réduire le panneau" @click="emit('collapse')">
        <img src="/icons/chevron-left.svg" width="18" height="18" alt="" />
      </button>
    </div>

    <div class="recap">
      <chipOption as="span">{{ housingLabel }}</chipOption>
      <chipOption as="span">{{ budget ? `${euros(budget)} max` : 'Budget libre' }}</chipOption>
      <button type="button" class="link link--s" @click="edit">Modifier</button>
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
          <span class="t-label-l group__label">{{ g.label }}</span>
          <span class="t-caption">{{ resolvedIn(g) }} sur {{ g.postes.length }}</span>
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
            :detail="detailFor(p)"
            :status="rowStatus(p)"
            @select="setActive(p.id)"
          />
        </div>
      </div>
    </nav>

    <button type="button" class="add" @click="emit('notice', 'Ajouter un poste : hors périmètre du prototype.')">
      <img src="/icons/plus.svg" width="18" height="18" alt="" />
      <span class="t-label-m">Ajouter un poste</span>
    </button>

    <hr class="sep" />

    <budgetTracker
      :budget="budget"
      :spent="spent"
      :shipping-estimate="shippingEstimate"
      :completed="completed"
      :total="postes.length"
      :promo-threshold="PROMO.threshold"
      :promo-label="PROMO.label"
    />

    <div class="foot">
      <buttonMain block @click="emit('open-cart')">Voir mon panier</buttonMain>
      <button type="button" class="link link--s" @click="emit('explain')">Comment sont calculés les repères ?</button>
    </div>
  </aside>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6) var(--space-6) var(--space-8);
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
.group__label {
  flex: 1;
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
.foot {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
</style>
