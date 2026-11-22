<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
})
const emit = defineEmits(['close'])
const el = ref(null)

function sync() {
  if (!el.value) return
  if (props.open && !el.value.open) el.value.showModal()
  if (!props.open && el.value.open) el.value.close()
}
watch(() => props.open, sync)
onMounted(sync)

function onBackdrop(e) {
  if (e.target === el.value) emit('close')
}
</script>

<template>
  <dialog ref="el" class="dialog" :aria-label="title" @close="emit('close')" @click="onBackdrop">
    <div class="dialog__inner">
      <div class="dialog__head">
        <h2 class="t-display-s">{{ title }}</h2>
        <button type="button" class="dialog__close" aria-label="Fermer" @click="emit('close')">×</button>
      </div>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
.dialog {
  width: min(520px, calc(100vw - 32px));
  padding: 0;
  border: 0;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-raised);
  color: var(--text-default);
}
.dialog::backdrop {
  background: var(--surface-overlay);
}
.dialog__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-8);
}
.dialog__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
}
.dialog__close {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border: 1px solid var(--border-default);
  border-radius: 18px;
  font-size: 20px;
  line-height: 1;
  color: var(--text-strong);
}
</style>
