<script setup>
import { ref, computed, nextTick } from 'vue'
import chipOption from './chipOption.vue'
import buttonMain from './buttonMain.vue'
import cardProductBox from './cardProductBox.vue'
import { GROUPS } from '../data/catalog.js'
import { euros, shortDate } from '../composables/format.js'
import { useProject } from '../composables/useProject.js'

const emit = defineEmits(['notice'])

const {
  state,
  budget,
  postes,
  activePoste,
  statusOf,
  productById,
  productsFor,
  deliveryDate,
  moveIn,
  choose,
  markOwned,
  skip,
  reopen,
  toggleFavorite,
} = useProject()

const poste = activePoste
const index = computed(() => postes.value.findIndex((p) => p.id === poste.value.id) + 1)
const groupLabel = computed(() => GROUPS.find((g) => g.id === poste.value.group)?.label)
const status = computed(() => statusOf(poste.value.id))
const products = computed(() => productsFor(poste.value.id))
const smallHousing = computed(() => state.housing !== 't2')

const statusText = computed(() => {
  const s = status.value
  if (!s) return ''
  if (s.state === 'chosen') return `Réglé : ${productById(s.productId).name}`
  if (s.state === 'owned') return "Réglé : vous l'avez déjà"
  return 'Passé pour le moment'
})

// Move-in date (optional filter)
const editingDate = ref(false)
const dateInput = ref(null)
const today = new Date().toISOString().slice(0, 10)
async function editDate() {
  editingDate.value = true
  await nextTick()
  dateInput.value?.focus()
  dateInput.value?.showPicker?.()
}
function onDate(e) {
  state.moveInDate = e.target.value
  editingDate.value = false
}

function onChoose(product) {
  const label = poste.value.label
  choose(product)
  emit('notice', `${product.short} ajouté au panier · « ${label} » réglé`)
}
function onOwned() {
  const label = poste.value.label
  markOwned()
  emit('notice', `« ${label} » réglé : vous l'avez déjà`)
}
function onSkip() {
  const label = poste.value.label
  skip()
  emit('notice', `« ${label} » passé, vous pourrez y revenir`)
}
function resetFilters() {
  state.priceCap = false
  state.moveInDate = ''
}
</script>

<template>
  <main v-if="poste" class="main">
    <p class="breadcrumb">
      Accueil &nbsp;/&nbsp; Les Essentiels &nbsp;/&nbsp; Mon projet d'aménagement &nbsp;/&nbsp; {{ poste.label }}
    </p>

    <div class="head">
      <div class="head__title">
        <p class="eyebrow">{{ groupLabel }} · poste {{ index }} sur {{ postes.length }}</p>
        <h2 class="t-display-m">{{ poste.label }}</h2>
        <p class="repere">
          <span class="t-body-m">
            <template v-if="budget">
              Repère : {{ euros(poste.repere) }} pour ce poste, dans votre budget de {{ euros(budget) }}.
            </template>
            <template v-else>Prix conseillé : {{ euros(poste.repere) }} pour ce poste.</template>
          </span>
          <button
            type="button"
            class="link link--s"
            @click="emit('notice', 'Modifier le repère : hors périmètre du prototype.')"
          >
            Modifier le repère
          </button>
        </p>
      </div>
      <div v-if="!status" class="head__actions">
        <buttonMain variant="secondary" size="small" @click="onOwned">J'ai déjà</buttonMain>
        <button type="button" class="link link--m" @click="onSkip">Je passe</button>
      </div>
    </div>

    <div v-if="status" class="settled" role="status">
      <span class="settled__icon" aria-hidden="true">
        <img src="/icons/check-inverse.svg" width="14" height="14" alt="" />
      </span>
      <span class="t-label-m settled__text">{{ statusText }}</span>
      <button type="button" class="link link--s" @click="reopen(poste.id)">Changer d'avis</button>
    </div>

    <div class="filters">
      <chipOption v-if="state.priceCap" selected removable @click="state.priceCap = false">
        ≤ {{ euros(poste.repere) }}<span class="sr-only">, retirer le filtre</span>
      </chipOption>
      <chipOption v-else @click="state.priceCap = true">+ ≤ {{ euros(poste.repere) }}</chipOption>

      <chipOption v-if="smallHousing && state.smallSpace" selected removable @click="state.smallSpace = false">
        Petit espace<span class="sr-only">, retirer le filtre</span>
      </chipOption>

      <chipOption v-if="moveIn && !editingDate" selected removable @click="state.moveInDate = ''">
        Livré avant le {{ shortDate(moveIn) }}<span class="sr-only">, retirer le filtre</span>
      </chipOption>
      <label v-else-if="editingDate" class="date-chip">
        <span class="sr-only">Date d'emménagement</span>
        <input
          ref="dateInput"
          type="date"
          :min="today"
          :value="state.moveInDate"
          @change="onDate"
          @blur="editingDate = false"
        />
      </label>
      <chipOption v-else @click="editDate">+ Date d'emménagement</chipOption>

      <chipOption>Tous les filtres</chipOption>
      <span class="spacer" />
      <chipOption>Trier par : pertinence</chipOption>
    </div>

    <p class="t-caption">{{ products.length }} produits · sélection « Les Essentiels » pour ce poste</p>

    <div v-if="products.length" class="grid">
      <cardProductBox
        v-for="p in products"
        :key="p.id"
        :product="p"
        project-mode
        :delivery="deliveryDate(p)"
        :chosen="status?.state === 'chosen' && status.productId === p.id"
        :favorite="state.favorites.includes(p.id)"
        @choose="onChoose(p)"
        @toggle-favorite="toggleFavorite(p.id)"
      />
    </div>
    <div v-else class="empty">
      <p class="t-label-l">Aucun produit ne correspond à ces filtres.</p>
      <p class="t-body-m">Élargissez le prix ou la date de livraison pour voir plus de choix.</p>
      <buttonMain variant="secondary" size="small" @click="resetFilters">Retirer les filtres</buttonMain>
    </div>
  </main>
</template>

<style scoped>
.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-8) var(--space-16);
}
.breadcrumb {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-default);
}
.head {
  display: flex;
  align-items: flex-end;
  gap: 24px;
}
.head__title {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.eyebrow {
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--text-muted);
}
.repere {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.head__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.settled {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-m);
  background: var(--surface-subtle);
}
.settled__icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--feedback-success);
}
.settled__text {
  flex: 1;
}
.filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.spacer {
  flex: 1;
}
.date-chip input {
  height: 40px;
  padding: 0 var(--space-3);
  border: 2px solid var(--border-selected);
  border-radius: var(--radius-pill);
  font-size: 13px;
  color: var(--text-strong);
  background: var(--surface-default);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 40px 24px;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-8);
  border-radius: var(--radius-l);
  background: var(--surface-subtle);
}
</style>
