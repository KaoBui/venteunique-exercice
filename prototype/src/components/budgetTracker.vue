<script setup>
/**
 * budgetTracker — budget gauge for « Mon projet d'aménagement ».
 * Dark segment = products, grey segment = estimated delivery, vertical mark = promo threshold
 * (computed on Vente-unique products only). States: empty, in progress, threshold reached,
 * over budget, guardrail (threshold above the budget → mark and promo message hidden).
 * The state is never carried by colour alone (icon + text).
 */
import { computed } from 'vue'
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
  label: { type: String, default: 'Budget du projet' },
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

const pct = (n) => `${Math.min(100, Math.max(0, (n / props.budget) * 100))}%`
const productsWidth = computed(() => pct(props.spent))
const shippingLeft = computed(() => productsWidth.value)
const shippingWidth = computed(() => {
  const left = Math.min(props.spent, props.budget)
  return pct(Math.min(props.shippingEstimate, props.budget - left))
})
const thresholdLeft = computed(() => pct(props.promoThreshold))

const headline = computed(() =>
  hasBudget.value ? `${euros(grandTotal.value)} sur ${euros(props.budget)}` : `${euros(grandTotal.value)} dépensés`,
)
const progress = computed(() =>
  props.total ? `${props.completed ?? 0} sur ${props.total} réglé${props.completed > 1 ? 's' : ''}` : '',
)
const valueText = computed(() => {
  const parts = [headline.value]
  if (props.shippingEstimate) parts.push(`dont ${euros(props.shippingEstimate)} de livraison estimée`)
  if (over.value) parts.push(`budget dépassé de ${euros(overBy.value)}`)
  return parts.join(', ')
})
const compactName = computed(() => [props.label, valueText.value, progress.value].filter(Boolean).join(' · '))

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
    class="bt bt--compact"
    :class="{ 'bt--over': over }"
    :aria-label="compactName"
    @click="onCompactClick"
  >
    <span class="bt__line">
      <span class="bt__headline">{{ headline }}</span>
      <span v-if="progress" class="bt__caption">{{ progress }}</span>
    </span>
    <span v-if="hasBudget" class="bt__rail" aria-hidden="true">
      <span class="bt__products" :style="{ width: productsWidth }" />
      <span class="bt__shipping" :style="{ left: shippingLeft, width: shippingWidth }" />
    </span>
  </component>

  <section v-else class="bt" :class="{ 'bt--over': over }" :aria-label="label">
    <div class="bt__line">
      <p class="bt__headline">{{ headline }}</p>
      <p v-if="progress" class="bt__caption">{{ progress }}</p>
    </div>
    <p v-if="shippingEstimate" class="bt__caption">dont {{ euros(shippingEstimate) }} de livraison estimée</p>

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
        <span class="bt__shipping" :style="{ left: shippingLeft, width: shippingWidth }" />
      </span>
      <span v-if="showPromo" class="bt__threshold" :style="{ left: thresholdLeft }" aria-hidden="true" />
    </div>

    <!-- Message slot: a brand or context can replace the wording without a new variant -->
    <slot name="message" :over="over" :over-by="overBy" :promo-reached="promoReached" :promo-gap="promoGap">
      <p v-if="over" class="bt__msg bt__msg--danger" role="status">
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill="currentColor" />
          <path d="M8 4.2v4.6M8 11.1v.4" class="bt__icon-mark" stroke-width="1.75" stroke-linecap="round" />
        </svg>
        Budget dépassé de {{ euros(overBy) }}
      </p>
      <p v-else-if="promoReached" class="bt__msg bt__msg--success" role="status">
        <img src="/icons/check-success.svg" width="14" height="14" alt="" />
        {{ promoLabel }} débloqués sur vos produits
      </p>
      <p v-else-if="showPromo && spent > 0" class="bt__msg bt__msg--promo">
        Plus que {{ euros(promoGap) }} pour {{ promoLabel }}
      </p>
    </slot>
  </section>
</template>

<style scoped>
.bt {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
}
.bt__line {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  justify-content: space-between;
}
.bt__headline {
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
.bt__msg {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
}
.bt__msg--promo {
  background: var(--feedback-promo-background);
  color: var(--feedback-promo-text);
}
.bt__msg--success {
  padding-left: 0;
  color: var(--feedback-success);
}
.bt__icon-mark {
  stroke: var(--text-inverse);
}
.bt__msg--danger {
  padding-left: 0;
  color: var(--feedback-danger);
}

/* Compact */
.bt--compact {
  gap: 6px;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-m);
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  text-align: left;
  background: var(--surface-default);
  box-shadow: var(--shadow-raised);
}
.bt--compact .bt__rail {
  position: relative;
  top: 0;
  display: block;
  height: 4px;
}
.bt--compact .bt__products,
.bt--compact .bt__shipping {
  height: 4px;
}
</style>
