<script setup>
import chipOption from './chipOption.vue'
import cardProductBox from './cardProductBox.vue'
import { ESSENTIALS_LISTING, ESSENTIALS_COUNT } from '../data/catalog.js'
import { useProject } from '../composables/useProject.js'

const { state, productById, deliveryDate, toggleFavorite } = useProject()
const products = ESSENTIALS_LISTING.map(productById)
const filters = ['Catégorie', 'Couleur', 'Matière', 'Prix']
</script>

<template>
  <main class="main">
    <p class="breadcrumb">Accueil &nbsp;/&nbsp; Planifier mes meubles</p>

    <h2 class="t-display-m">Les Essentiels</h2>

    <div class="filters">
      <chipOption v-for="f in filters" :key="f" chevron>{{ f }}</chipOption>
      <span class="spacer" />
      <chipOption chevron>Trier par : pertinence</chipOption>
    </div>

    <p class="t-caption">{{ ESSENTIALS_COUNT }} produits</p>

    <div class="grid">
      <cardProductBox
        v-for="p in products"
        :key="p.id"
        :product="p"
        :delivery="deliveryDate(p)"
        :favorite="state.favorites.includes(p.id)"
        @toggle-favorite="toggleFavorite(p.id)"
      />
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
.filters {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.spacer {
  flex: 1;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 40px 24px;
}
</style>
