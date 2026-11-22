<script setup>
import { computed } from 'vue'
import { price, shortDate } from '../composables/format.js'

const props = defineProps({
  product: { type: Object, required: true },
  /** Project mode: shows the delivery date and « Choisir pour ce poste » */
  projectMode: { type: Boolean, default: false },
  delivery: { type: Date, default: null },
  chosen: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
})
defineEmits(['choose', 'toggle-favorite'])

const deliveryLabel = computed(() => (props.delivery ? `Livré le ${shortDate(props.delivery)}` : ''))
</script>

<template>
  <article class="card">
    <div class="card__image">
      <img v-if="product.image" :src="product.image" alt="" class="card__photo" />
      <span v-else class="t-caption">Photo produit</span>
      <button
        type="button"
        class="card__fav"
        :aria-pressed="favorite"
        :aria-label="favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        @click="$emit('toggle-favorite')"
      >
        <svg v-if="favorite" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 20.5s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1Z"
            fill="#EC002E"
            stroke="#EC002E"
            stroke-width="1.75"
            stroke-linejoin="round"
          />
        </svg>
        <img v-else src="/icons/heart.svg" width="20" height="20" alt="" />
      </button>
    </div>
    <div class="card__infos">
      <p class="card__name">{{ product.name }}</p>
      <p class="card__price">{{ price(product.price) }}</p>
      <p v-if="projectMode && delivery" class="card__delivery">
        <img src="/icons/check-success.svg" width="16" height="16" alt="" />
        {{ deliveryLabel }}
      </p>
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
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}
.card__image {
  position: relative;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-l);
  background: var(--color-surface-subtle);
  overflow: hidden;
}
.card__photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: darken;
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
  background: var(--color-surface-default);
}
.card__infos {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 var(--space-1);
}
.card__name {
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-default);
}
.card__price {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--color-text-strong);
}
.card__delivery {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--color-status-success);
}
.card__choose {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: var(--size-control-small);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--color-text-strong);
  background: var(--color-surface-default);
}
.card__choose:hover:not(:disabled) {
  border-color: var(--color-text-strong);
}
.card__choose--chosen {
  border-color: var(--color-status-success);
  background: var(--color-status-success);
  color: var(--color-text-inverse);
  cursor: default;
}
</style>
