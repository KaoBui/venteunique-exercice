<script setup>
defineProps({
  selected: { type: Boolean, default: false },
  removable: { type: Boolean, default: false },
  as: { type: String, default: 'button' },
})
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : undefined"
    class="chip"
    :class="{ 'chip--selected': selected }"
    :aria-pressed="as === 'button' && !removable ? selected : undefined"
  >
    <slot />
    <span v-if="removable" class="chip__x" aria-hidden="true">×</span>
  </component>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: var(--space-2) var(--space-3);
  border: var(--border-width-default) solid var(--border-default);
  border-radius: var(--radius-pill);
  font-size: 13px;
  line-height: 22px;
  color: var(--text-strong);
  background: var(--surface-default);
  white-space: nowrap;
}
.chip--selected {
  border: var(--border-width-selected) solid var(--border-selected);
  padding: calc(var(--space-2) - 1px) calc(var(--space-3) - 1px);
}
button.chip:hover:not(.chip--selected) {
  border-color: var(--border-strong);
}
</style>
