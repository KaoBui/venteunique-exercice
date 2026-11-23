<script setup>
/**
 * listPosteItem — one poste in the project panel (Figma: listPosteItem).
 * States: todo (« À choisir »), active (« Actif »: its products are shown in the main area),
 * chosen (« Choisi »: lists the chosen items with their price), owned (« J'ai déjà », also used for a skipped poste).
 */
defineProps({
  label: { type: String, required: true },
  /** 'todo' | 'active' | 'chosen' | 'owned' */
  status: { type: String, default: 'todo' },
  /** Chosen items: [{ name, price }] (price already formatted) */
  items: { type: Array, default: () => [] },
  /** Owned state: short explanation (« Vous l'avez déjà », « Passé pour le moment ») */
  detail: { type: String, default: '' },
})
defineEmits(['select'])

const srStatus = { chosen: '(réglé)', owned: '(réglé)', active: '(affiché)', todo: '(à choisir)' }
</script>

<template>
  <button
    type="button"
    class="row"
    :class="`row--${status}`"
    :aria-current="status === 'active' ? 'true' : undefined"
    @click="$emit('select')"
  >
    <span class="row__status" aria-hidden="true">
      <img v-if="status === 'chosen'" src="/icons/check-inverse.svg" width="14" height="14" alt="" />
      <img v-else-if="status === 'owned'" src="/icons/check-muted.svg" width="14" height="14" alt="" />
      <img v-else-if="status === 'active'" src="/icons/status-active.svg" width="20" height="20" alt="" />
    </span>
    <span class="row__text">
      <span class="row__label">{{ label }}</span>
      <span v-if="status === 'chosen' && items.length" class="row__items">
        <span v-for="(it, i) in items" :key="i" class="row__item">
          <span class="row__item-name">{{ it.name }}</span>
          <span class="row__item-price">{{ it.price }}</span>
        </span>
      </span>
      <span v-else-if="status === 'owned' && detail" class="row__detail">{{ detail }}</span>
    </span>
    <span class="sr-only">{{ srStatus[status] }}</span>
  </button>
</template>

<style scoped>
.row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-m);
  text-align: left;
}
.row:hover:not(.row--active) {
  background: var(--surface-subtle);
}
.row--active {
  background: var(--surface-subtle);
  border-left: 2px solid var(--border-selected);
  padding-left: calc(var(--space-3) - 2px);
}
.row__status {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.row--todo .row__status {
  border: 1.5px solid var(--border-default);
}
.row--chosen .row__status {
  background: var(--feedback-success);
}
.row--owned .row__status {
  background: var(--surface-muted);
}
.row__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.row__label {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-strong);
}
.row--active .row__label {
  font-weight: 500;
}
.row--owned .row__label {
  color: var(--text-muted);
}
.row__items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.row__item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  line-height: 16px;
}
.row__item-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-default);
}
.row__item-price {
  flex-shrink: 0;
  font-weight: 500;
  color: var(--text-muted);
}
.row__detail {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-muted);
}
</style>
