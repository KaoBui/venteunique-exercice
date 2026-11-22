<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary
  size: { type: String, default: 'default' }, // default | small
  block: { type: Boolean, default: false },
})
</script>

<template>
  <button type="button" class="btn" :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-xl);
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.15s, border-color 0.15s;
}
.btn--block {
  width: 100%;
}
.btn--default {
  height: var(--size-control);
  padding: var(--space-3) var(--space-6);
  font-size: 16px;
  line-height: 24px;
}
.btn--small {
  height: var(--size-control-small);
  padding: var(--space-2) var(--space-4);
  font-size: 14px;
  line-height: 20px;
}
.btn--primary {
  background: var(--color-action-primary);
  color: var(--color-action-on-primary);
}
.btn--primary:hover {
  background: #3a3030;
}
.btn--secondary {
  border: 1px solid var(--color-border-default);
  color: var(--color-text-strong);
  background: var(--color-surface-default);
}
.btn--secondary:hover {
  border-color: var(--color-text-strong);
}
</style>
