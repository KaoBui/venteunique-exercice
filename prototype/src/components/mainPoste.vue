<script setup>
import { computed } from 'vue'
import chipOption from './chipOption.vue'
import buttonMain from './buttonMain.vue'
import cardProductBox from './cardProductBox.vue'
import { GROUPS } from '../data/catalog.js'
import { euros } from '../composables/format.js'
import { useProject } from '../composables/useProject.js'

const emit = defineEmits(['notice'])

const {
  state,
  activePoste,
  statusOf,
  productById,
  productsFor,
  deliveryDate,
  choose,
  reopen,
  toggleFavorite,
} = useProject()

const poste = activePoste
const groupLabel = computed(() => GROUPS.find((g) => g.id === poste.value.group)?.label)
const status = computed(() => statusOf(poste.value.id))
const products = computed(() => productsFor(poste.value.id))
const smallHousing = computed(() => state.housing !== 't2')
// Pre-applied filters: price capped at the poste's repère, small-space dimensions (studio, coloc)
const priceLabel = computed(() => (state.priceCap ? `Prix : jusqu'à ${euros(poste.value.repere)}` : 'Prix'))

const statusText = computed(() => (status.value ? `Choisi : ${productById(status.value.productId).name}` : ''))

function onChoose(product) {
  choose(product)
  emit('notice', `${product.short} ajouté au panier`)
}
function resetFilters() {
  state.priceCap = false
  state.smallSpace = false
}
</script>

<template>
  <main v-if="poste" class="main">
    <p class="breadcrumb">
      Accueil &nbsp;/&nbsp; Planifier mes meubles &nbsp;/&nbsp; {{ poste.label }}
    </p>

    <div class="head">
      <div class="head__title">
        <p class="eyebrow">{{ groupLabel }}</p>
        <h2 class="t-display-m">{{ poste.label }}</h2>
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
      <div class="filters__list">
        <chipOption chevron>Sous-catégorie</chipOption>
        <chipOption chevron>Largeur</chipOption>
        <chipOption chevron>Couleur</chipOption>
        <chipOption chevron :selected="state.priceCap" @click="state.priceCap = !state.priceCap">
          {{ priceLabel }}
        </chipOption>
        <chipOption
          v-if="smallHousing"
          chevron
          :selected="state.smallSpace"
          @click="state.smallSpace = !state.smallSpace"
        >
          {{ state.smallSpace ? 'Dimensions : petit espace' : 'Dimensions' }}
        </chipOption>
      </div>
      <chipOption chevron>Trier par : prix croissant</chipOption>
    </div>

    <p class="t-caption">{{ products.length }} produit{{ products.length > 1 ? 's' : '' }}</p>

    <div v-if="products.length" class="grid">
      <cardProductBox
        v-for="p in products"
        :key="p.id"
        :product="p"
        project-mode
        :delivery="deliveryDate(p)"
        :chosen="status?.state === 'chosen' && status.productId === p.id"
        :in-budget="p.price <= poste.repere"
        :favorite="state.favorites.includes(p.id)"
        @choose="onChoose(p)"
        @toggle-favorite="toggleFavorite(p.id)"
      />
    </div>
    <div v-else class="empty">
      <p class="t-label-l">Aucun produit ne correspond à ces filtres.</p>
      <p class="t-body-m">Élargissez le prix ou les dimensions pour voir plus de choix.</p>
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
  align-items: flex-start;
  gap: var(--space-2) var(--space-16);
}
.filters__list {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
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
