<script setup>
import { computed } from 'vue'
import { price, shortDate } from '../composables/format.js'

const props = defineProps({
  product: { type: Object, required: true },
  /** Project mode: adds « Choisir pour ce poste » (Figma boolean « Bouton Choisir pour ce poste ») */
  projectMode: { type: Boolean, default: false },
  delivery: { type: Date, default: null },
  chosen: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
})
defineEmits(['choose', 'toggle-favorite'])

const deliveryLabel = computed(() => (props.delivery ? `Livré le ${shortDate(props.delivery)}` : ''))
const stars = computed(() => {
  const r = props.product.rating || 0
  return [1, 2, 3, 4, 5].map((i) => (r >= i ? 'full' : r >= i - 0.5 ? 'half' : 'empty'))
})
const swatchNames = {
  white: 'Blanc',
  natural: 'Naturel',
  sand: 'Beige',
  beech: 'Hêtre',
  oak: 'Chêne',
  walnut: 'Noyer',
  gold: 'Doré',
  anthracite: 'Anthracite',
  black: 'Noir',
}
</script>

<template>
  <article class="card">
    <div class="card__image">
      <img v-if="product.image" :src="product.image" alt="" class="card__photo" />
      <span v-else class="t-caption">Photo produit</span>
      <span v-if="product.badge" class="card__badge">{{ product.badge }}</span>
      <button
        type="button"
        class="card__fav"
        :aria-pressed="favorite"
        :aria-label="favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        @click="$emit('toggle-favorite')"
      >
        <svg v-if="favorite" class="card__fav-on" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 20.5s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linejoin="round"
          />
        </svg>
        <img v-else src="/icons/heart.svg" width="20" height="20" alt="" />
      </button>
    </div>
    <div class="card__infos">
      <a v-if="product.url" :href="product.url" target="_blank" rel="noopener" class="card__name card__name--link">
        {{ product.name }}<span class="sr-only"> (fiche produit sur vente-unique.com, nouvel onglet)</span>
      </a>
      <p v-else class="card__name">{{ product.name }}</p>
      <p v-if="product.rating" class="card__rating">
        <img
          v-for="(s, i) in stars"
          :key="i"
          :src="s === 'full' ? '/icons/star.svg' : '/icons/star-half.svg'"
          width="14"
          height="14"
          alt=""
          :class="{ 'card__star--empty': s === 'empty' }"
        />
        <span class="sr-only">Note : {{ String(product.rating).replace('.', ',') }} sur 5</span>
      </p>
      <p class="card__price">{{ price(product.price) }}</p>
      <p v-if="delivery" class="card__delivery">
        <img src="/icons/check-success.svg" width="16" height="16" alt="" />
        {{ deliveryLabel }}
      </p>
      <ul v-if="product.colors?.length" class="card__swatches" aria-label="Couleurs disponibles">
        <li v-for="c in product.colors" :key="c" class="swatch" :class="`swatch--${c}`">
          <span class="sr-only">{{ swatchNames[c] }}</span>
        </li>
      </ul>
    </div>
    <button
      v-if="projectMode"
      type="button"
      class="card__choose"
      :class="{ 'card__choose--chosen': chosen }"
      :disabled="chosen"
      @click="$emit('choose')"
    >
      <template v-if="chosen">
        <img src="/icons/check-inverse.svg" width="14" height="14" alt="" /> Choisi pour ce poste
      </template>
      <template v-else>Choisir pour ce poste</template>
    </button>
  </article>
</template>

<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}
.card__image {
  position: relative;
  aspect-ratio: 317 / 260;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-l);
  background: var(--surface-subtle);
  overflow: hidden;
}
.card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--surface-default);
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--text-strong);
}
.card__fav-on {
  color: var(--interactive-favorite-active);
}
.card__fav {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: var(--surface-default);
}
.card__infos {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 var(--space-1);
}
.card__name {
  min-height: 40px;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-default);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card__name--link {
  text-decoration: none;
}
.card__name--link:hover {
  text-decoration: underline;
}
.card__rating {
  display: flex;
  gap: 2px;
}
.card__star--empty {
  opacity: 0.3;
}
.card__price {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--text-strong);
}
.card__delivery {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--feedback-success);
}
.card__swatches {
  display: flex;
  gap: 8px;
  margin: 0;
  padding: 2px 0;
  list-style: none;
}
.swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);
}
.swatch--white { background: var(--swatch-white); }
.swatch--natural { background: var(--swatch-natural); }
.swatch--sand { background: var(--swatch-sand); }
.swatch--beech { background: var(--swatch-beech); }
.swatch--oak { background: var(--swatch-oak); }
.swatch--walnut { background: var(--swatch-walnut); }
.swatch--gold { background: var(--swatch-gold); }
.swatch--anthracite { background: var(--swatch-anthracite); }
.swatch--black { background: var(--swatch-black); }
.card__choose {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: var(--size-control-small);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--text-strong);
  background: var(--surface-default);
}
.card__choose:hover:not(:disabled) {
  border-color: var(--text-strong);
}
.card__choose--chosen {
  border-color: var(--feedback-success);
  background: var(--feedback-success);
  color: var(--text-inverse);
  cursor: default;
}
</style>
