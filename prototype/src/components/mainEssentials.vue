<script setup>
import chipOption from './chipOption.vue'
import cardProductBox from './cardProductBox.vue'
import { ESSENTIALS_LISTING, ESSENTIALS_COUNT } from '../data/catalog.js'
import { useProject } from '../composables/useProject.js'

const { state, productById, toggleFavorite } = useProject()
const products = ESSENTIALS_LISTING.map(productById)
const filters = ['Catégorie', 'Couleur', 'Matière', 'Prix', 'Tous les filtres']
</script>

<template>
  <main class="main">
    <p class="breadcrumb">Accueil &nbsp;/&nbsp; Inspirations &amp; conseils &nbsp;/&nbsp; Nos gammes &nbsp;/&nbsp; Les Essentiels</p>

    <section class="banner">
      <div class="banner__text">
        <h2 class="t-display-l">Les Essentiels</h2>
        <p class="t-title-s">Tout pour bien commencer</p>
        <p class="t-body-m">
          Des meubles fonctionnels, faciles à associer et pensés pour un premier chez-soi, sans dépasser son budget.
        </p>
      </div>
      <img
        class="banner__photo"
        src="/products/tg_catalog_banner_6a608c1c8e744857533338.webp"
        alt=""
        width="420"
        height="180"
      />
    </section>

    <div class="filters">
      <chipOption v-for="f in filters" :key="f">{{ f }}</chipOption>
      <span class="spacer" />
      <chipOption>Trier par : pertinence</chipOption>
    </div>

    <p class="t-caption">{{ ESSENTIALS_COUNT }} produits</p>

    <div class="grid">
      <cardProductBox
        v-for="p in products"
        :key="p.id"
        :product="p"
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
.banner {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: var(--space-2) var(--space-2) var(--space-2) var(--space-8);
  border-radius: var(--radius-xl);
  background: var(--surface-editorial);
}
.banner__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.banner__photo {
  width: 420px;
  height: 180px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: var(--radius-l);
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
