<script setup>
/**
 * budgetTracker — budget gauge for « Mon projet d'aménagement » (Figma: budgetTracker, same props).
 * Dark segment = products, grey segment = estimated delivery, vertical mark = promo threshold
 * (computed on Vente-unique products only). The promo message sits above the gauge, centred on the mark.
 * States (computed, not a prop): empty, inProgress, promoReached, over, guardrail
 * (threshold above the budget → mark and promo message hidden).
 * The state is never carried by colour alone (icon + text).
 */
import { ref, computed, onMounted, onUpdated, onBeforeUnmount } from 'vue'
import { euros } from '../composables/format.js'

const props = defineProps({
  /** Max budget in €. null/0 = no budget set: total only, no gauge. */
  budget: { type: Number, default: null },
  /** Products amount in € (delivery excluded). */
  spent: { type: Number, required: true },
  /** Estimated delivery in €, added to the total and shown apart. */
  shippingEstimate: { type: Number, default: 0 },
  /** Number of essentials settled (chosen, already owned or skipped). */
  completed: { type: Number, default: null },
  total: { type: Number, default: null },
  promoThreshold: { type: Number, default: null },
  promoLabel: { type: String, default: '' },
  /** Amount counted for the promo (Vente-unique products, no marketplace). Defaults to `spent`. */
  promoEligibleAmount: { type: Number, default: null },
  size: { type: String, default: 'default', validator: (v) => ['default', 'compact'].includes(v) },
  href: { type: String, default: null },
  /** Visible title (« Mon budget », or « Mon projet » in compact) and accessible name. */
  label: { type: String, default: 'Mon budget' },
})
const emit = defineEmits(['open'])

const hasBudget = computed(() => props.budget > 0)
const grandTotal = computed(() => props.spent + props.shippingEstimate)
const over = computed(() => hasBudget.value && grandTotal.value > props.budget)
const overBy = computed(() => grandTotal.value - props.budget)
const eligible = computed(() => props.promoEligibleAmount ?? props.spent)

// Guardrail: a promo is only pushed when it stays inside the budget.
const showPromo = computed(
  () => !!props.promoThreshold && !over.value && (!hasBudget.value || props.promoThreshold <= props.budget),
)
const promoReached = computed(() => showPromo.value && eligible.value >= props.promoThreshold)
const promoGap = computed(() => Math.max(1, Math.round(props.promoThreshold - eligible.value)))
const promoText = computed(() => {
  if (promoReached.value) return `${props.promoLabel} débloqués`
  if (props.spent > 0) return `Plus que ${euros(promoGap.value)} pour ${props.promoLabel}`
  return `${props.promoLabel} dès ${euros(props.promoThreshold)}`
})

const ratio = (n) => Math.min(1, Math.max(0, n / props.budget))
const pct = (n) => `${ratio(n) * 100}%`
const productsWidth = computed(() => (over.value ? '100%' : pct(props.spent)))
const shippingLeft = computed(() => pct(props.spent))
const shippingWidth = computed(() => {
  const left = Math.min(props.spent, props.budget)
  return pct(Math.min(props.shippingEstimate, props.budget - left))
})
const thresholdLeft = computed(() => pct(props.promoThreshold))
const miniWidth = computed(() => (over.value ? '100%' : pct(grandTotal.value)))

const progress = computed(() =>
  props.total ? `${props.completed ?? 0} sur ${props.total} réglé${props.completed > 1 ? 's' : ''}` : '',
)
const amounts = computed(() =>
  hasBudget.value
    ? `${euros(grandTotal.value).replace(' €', '')} / ${euros(props.budget)}`
    : euros(grandTotal.value),
)
const valueText = computed(() => {
  const parts = [
    hasBudget.value ? `${euros(grandTotal.value)} sur ${euros(props.budget)}` : `${euros(grandTotal.value)} dépensés`,
  ]
  if (props.shippingEstimate) parts.push(`dont ${euros(props.shippingEstimate)} de livraison estimée`)
  if (over.value) parts.push(`budget dépassé de ${euros(overBy.value)}`)
  return parts.join(', ')
})
const compactName = computed(() =>
  [props.label, valueText.value, progress.value].filter(Boolean).join(' · '),
)

// The promo pill is centred on the threshold mark, kept inside the component.
const promoRow = ref(null)
const promoPill = ref(null)
const pillOffset = ref(0)
function placePill() {
  if (!promoRow.value || !promoPill.value) return
  const w = promoRow.value.clientWidth
  const pw = promoPill.value.offsetWidth
  const x = hasBudget.value ? w * ratio(props.promoThreshold) : 0
  pillOffset.value = Math.round(Math.min(Math.max(0, x - pw / 2), Math.max(0, w - pw)))
}
let observer
onMounted(() => {
  placePill()
  observer = new ResizeObserver(placePill)
  if (promoRow.value) observer.observe(promoRow.value)
})
onUpdated(() => {
  placePill()
  if (observer && promoRow.value) observer.observe(promoRow.value)
})
onBeforeUnmount(() => observer?.disconnect())

function onCompactClick(e) {
  if (!props.href) e.preventDefault()
  emit('open')
}
</script>

<template>
  <!-- Compact: a link back to the project, the gauge is decorative -->
  <component
    :is="href ? 'a' : 'button'"
    v-if="size === 'compact'"
    :href="href || undefined"
    :type="href ? undefined : 'button'"
    class="bt-compact"
    :class="{ 'bt--over': over }"
    :aria-label="compactName"
    @click="onCompactClick"
  >
    <img v-if="over" src="/icons/warning-danger.svg" width="16" height="16" alt="" />
    <span class="bt-compact__label">{{ label }}</span>
    <span class="bt-compact__amount">· {{ amounts }}</span>
    <span v-if="total" class="bt__caption">· {{ completed ?? 0 }}/{{ total }}</span>
    <span class="bt__spacer" />
    <span v-if="hasBudget" class="bt-compact__rail" aria-hidden="true">
      <span class="bt-compact__fill" :style="{ width: miniWidth }" />
    </span>
    <img src="/icons/chevron-right.svg" width="20" height="20" alt="" />
  </component>

  <section v-else class="bt" :class="{ 'bt--over': over }" :aria-label="label">
    <div class="bt__line">
      <p class="bt__label">{{ label }}</p>
      <span class="bt__spacer" />
      <p v-if="progress" class="bt__caption">{{ progress }}</p>
    </div>

    <!-- Promo message, centred on the threshold mark -->
    <div v-if="showPromo" ref="promoRow" class="bt__promo-row">
      <p
        ref="promoPill"
        class="bt__pill"
        :class="promoReached ? 'bt__pill--success' : 'bt__pill--promo'"
        :style="{ marginLeft: `${pillOffset}px` }"
        :role="promoReached ? 'status' : undefined"
      >
        <slot name="message" :over="false" :over-by="0" :promo-reached="promoReached" :promo-gap="promoGap">
          <img v-if="promoReached" src="/icons/check-success.svg" width="16" height="16" alt="" />
          {{ promoText }}
        </slot>
      </p>
    </div>

    <div
      v-if="hasBudget"
      class="bt__gauge"
      role="meter"
      aria-valuemin="0"
      :aria-valuemax="budget"
      :aria-valuenow="Math.min(Math.round(grandTotal), budget)"
      :aria-valuetext="valueText"
      :aria-label="label"
    >
      <span class="bt__rail">
        <span class="bt__products" :style="{ width: productsWidth }" />
        <span v-if="!over" class="bt__shipping" :style="{ left: shippingLeft, width: shippingWidth }" />
      </span>
      <span v-if="showPromo" class="bt__threshold" :style="{ left: thresholdLeft }" aria-hidden="true" />
    </div>

    <div class="bt__line">
      <p class="bt__total">{{ hasBudget ? euros(grandTotal) : `${euros(grandTotal)} dépensés` }}</p>
      <span class="bt__spacer" />
      <p v-if="hasBudget" class="bt__caption">{{ euros(budget) }}</p>
    </div>

    <p v-if="shippingEstimate" class="bt__caption">dont {{ euros(shippingEstimate) }} de livraison estimée</p>
    <p v-else-if="spent === 0" class="bt__caption">Ajoutez un essentiel pour suivre votre budget.</p>

    <p v-if="over" class="bt__danger" role="status">
      <slot name="message" :over="true" :over-by="overBy" :promo-reached="false" :promo-gap="0">
        <img src="/icons/warning-danger.svg" width="16" height="16" alt="" />
        Budget dépassé de {{ euros(overBy) }}
      </slot>
    </p>
  </section>
</template>

<style scoped>
.bt {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.bt__line {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.bt__spacer {
  flex: 1;
}
.bt__label {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: var(--text-strong);
  white-space: nowrap;
}
.bt__caption {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-muted);
  white-space: nowrap;
}
.bt__total {
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--text-strong);
  white-space: nowrap;
}
.bt--over .bt__total {
  color: var(--feedback-danger);
}

/* Promo pill */
.bt__promo-row {
  display: flex;
}
.bt__pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  white-space: nowrap;
  transition: margin-left 0.4s ease;
}
.bt__pill--promo {
  background: var(--feedback-promo-background);
  color: var(--feedback-promo-text);
}
.bt__pill--success {
  background: var(--surface-muted);
  color: var(--feedback-success);
}

/* Gauge */
.bt__gauge {
  position: relative;
  height: 16px;
}
.bt__rail {
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  height: 8px;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--meter-track);
}
.bt__products,
.bt__shipping {
  position: absolute;
  top: 0;
  height: 8px;
  transition: width 0.4s ease, left 0.4s ease;
}
.bt__products {
  left: 0;
  background: var(--meter-fill);
}
.bt__shipping {
  background: var(--meter-fill-secondary);
}
.bt--over .bt__products {
  background: var(--meter-fill-danger);
}
.bt__threshold {
  position: absolute;
  top: 0;
  width: 2px;
  height: 16px;
  margin-left: -1px;
  background: var(--meter-marker);
  transition: left 0.4s ease;
}
.bt__danger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--feedback-danger);
}

/* Compact: one line, brings the user back to the project */
.bt-compact {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  height: 44px;
  padding: 0 var(--space-3) 0 var(--space-4);
  border-radius: var(--radius-m);
  border: 1px solid var(--border-subtle);
  background: var(--surface-default);
  box-shadow: var(--shadow-raised);
  text-decoration: none;
  text-align: left;
}
.bt-compact__label,
.bt-compact__amount {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  white-space: nowrap;
}
.bt-compact__label {
  color: var(--text-strong);
}
.bt-compact__amount {
  color: var(--text-default);
}
.bt--over .bt-compact__amount {
  color: var(--feedback-danger);
}
.bt-compact__rail {
  position: relative;
  flex-shrink: 0;
  width: 48px;
  height: 4px;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--surface-muted);
}
.bt-compact__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--interactive-primary-background);
  transition: width 0.4s ease;
}
.bt--over .bt-compact__fill {
  background: var(--feedback-danger);
}
</style>
