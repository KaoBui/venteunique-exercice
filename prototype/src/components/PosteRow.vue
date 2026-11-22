<script setup>
defineProps({
  label: { type: String, required: true },
  detail: { type: String, default: '' },
  /** 'todo' | 'active' | 'done' */
  status: { type: String, default: 'todo' },
})
defineEmits(['select'])

const srStatus = { done: '(réglé)', active: '(affiché)', todo: '(à choisir)' }
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
      <img v-if="status === 'done'" src="/icons/check-inverse.svg" width="14" height="14" alt="" />
      <img v-else-if="status === 'active'" src="/icons/status-active.svg" width="20" height="20" alt="" />
    </span>
    <span class="row__text">
      <span class="row__label">{{ label }}</span>
      <span class="row__detail">{{ detail }}</span>
    </span>
    <img v-if="status === 'active'" src="/icons/chevron-right.svg" width="16" height="16" alt="" />
    <span class="sr-only">{{ srStatus[status] }}</span>
  </button>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  height: 56px;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-m);
  text-align: left;
}
.row:hover:not(.row--active) {
  background: var(--color-surface-subtle);
}
.row--active {
  background: var(--color-surface-subtle);
  border-left: 2px solid var(--color-border-selected);
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
  border: 1.5px solid var(--color-border-default);
}
.row--done .row__status {
  background: var(--color-status-success);
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
  color: var(--color-text-strong);
}
.row--active .row__label {
  font-weight: 500;
}
.row__detail {
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row--done .row__detail {
  color: var(--color-text-default);
}
</style>
