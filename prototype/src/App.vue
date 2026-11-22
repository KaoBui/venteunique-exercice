<script setup>
import { ref, computed } from 'vue'
import bannerPromo from './components/bannerPromo.vue'
import headerDesktop from './components/headerDesktop.vue'
import panelProjectSetup from './components/panelProjectSetup.vue'
import mainEssentials from './components/mainEssentials.vue'
import panelProject from './components/panelProject.vue'
import mainPoste from './components/mainPoste.vue'
import budgetTracker from './components/budgetTracker.vue'
import dialogMain from './components/dialogMain.vue'
import buttonMain from './components/buttonMain.vue'
import { PROMO } from './data/catalog.js'
import { euros, price } from './composables/format.js'
import { useProject } from './composables/useProject.js'

const { state, budget, postes, chosenProducts, spent, shippingEstimate, completed } = useProject()

const cartOpen = ref(false)
const explainOpen = ref(false)

// Toast
const notice = ref('')
let noticeTimer
function showNotice(msg) {
  notice.value = msg
  clearTimeout(noticeTimer)
  noticeTimer = setTimeout(() => (notice.value = ''), 3200)
}

const promoApplied = computed(() => spent.value >= PROMO.threshold)
const discount = computed(() => (promoApplied.value ? spent.value * 0.11 : 0))
const cartTotal = computed(() => spent.value - discount.value + shippingEstimate.value)

function openProject() {
  state.panelCollapsed = false
}
</script>

<template>
  <bannerPromo />
  <headerDesktop :cart-count="chosenProducts.length" @open-project="openProject" @open-cart="cartOpen = true" />

  <div class="body">
    <div v-if="!state.panelCollapsed" class="side">
      <div class="side__inner">
        <panelProjectSetup v-if="state.screen === 'setup'" />
        <panelProject
          v-else
          @open-cart="cartOpen = true"
          @explain="explainOpen = true"
          @collapse="state.panelCollapsed = true"
          @notice="showNotice"
        />
      </div>
    </div>

    <mainEssentials v-if="state.screen === 'setup'" />
    <mainPoste v-else @notice="showNotice" />
  </div>

  <!-- Collapsed panel: the compact budgetTracker brings the user back to the project -->
  <div v-if="state.panelCollapsed && state.screen === 'project'" class="floating">
    <budgetTracker
      size="compact"
      label="Ouvrir mon projet"
      :budget="budget"
      :spent="spent"
      :shipping-estimate="shippingEstimate"
      :completed="completed"
      :total="postes.length"
      @open="openProject"
    />
  </div>

  <div class="toast" role="status" aria-live="polite">
    <Transition name="toast">
      <p v-if="notice" class="toast__msg">{{ notice }}</p>
    </Transition>
  </div>

  <dialogMain :open="cartOpen" title="Mon panier" @close="cartOpen = false">
    <p v-if="!chosenProducts.length" class="t-body-m">
      Votre panier est vide. Choisissez un produit pour un poste de votre liste.
    </p>
    <template v-else>
      <ul class="cart">
        <li v-for="p in chosenProducts" :key="p.id" class="cart__line">
          <span class="t-body-m">{{ p.name }}</span>
          <span class="t-label-m">{{ price(p.price) }}</span>
        </li>
      </ul>
      <dl class="totals">
        <div><dt>Produits</dt><dd>{{ price(spent) }}</dd></div>
        <div v-if="promoApplied" class="totals__promo">
          <dt>Code {{ PROMO.code }} ({{ PROMO.label }})</dt><dd>− {{ price(discount) }}</dd>
        </div>
        <div><dt>Livraison estimée</dt><dd>{{ price(shippingEstimate) }}</dd></div>
        <div class="totals__grand"><dt>Total</dt><dd>{{ price(cartTotal) }}</dd></div>
      </dl>
      <p v-if="budget" class="t-caption">
        Budget de votre projet : {{ euros(budget) }} · {{ completed }} sur {{ postes.length }} postes réglés
      </p>
      <buttonMain block @click="cartOpen = false; showNotice('Fin du prototype : le paiement n\'est pas simulé.')">
        Valider mon panier
      </buttonMain>
    </template>
  </dialogMain>

  <dialogMain :open="explainOpen" title="Comment sont calculés les repères ?" @close="explainOpen = false">
    <p class="t-body-m">
      On part du prix moyen des produits « Les Essentiels » pour chaque poste, puis on répartit votre budget maximum
      au prorata. Les repères sont arrondis à 10 €.
    </p>
    <p class="t-body-m">
      La liste dépend de votre logement : une chambre en colocation n'a pas besoin de canapé ni de table, un T2 ajoute
      un fauteuil. Vous pouvez régler un poste sans acheter (« J'ai déjà ») ou le passer.
    </p>
    <p class="t-caption">Prototype : les produits, prix et délais sont illustratifs.</p>
  </dialogMain>
</template>

<style scoped>
.body {
  display: flex;
  align-items: flex-start;
  min-width: 1200px;
}
.side {
  flex-shrink: 0;
  width: 360px;
  align-self: stretch;
  border-right: 1px solid var(--border-subtle);
  background: var(--surface-default);
}
.side__inner {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
}
.floating {
  position: fixed;
  left: 24px;
  bottom: 24px;
  width: 300px;
  z-index: 10;
}
.toast {
  position: fixed;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  z-index: 20;
  pointer-events: none;
}
.toast__msg {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-pill);
  background: var(--interactive-primary-background);
  color: var(--text-inverse);
  font-size: 14px;
  line-height: 20px;
  box-shadow: var(--shadow-raised);
  white-space: nowrap;
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.cart {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.cart__line {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
}
.totals {
  margin: 0;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.totals div {
  display: flex;
  justify-content: space-between;
}
.totals dt,
.totals dd {
  margin: 0;
  font-size: 14px;
}
.totals__promo {
  color: var(--feedback-promo-text);
}
.totals__grand dt,
.totals__grand dd {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-strong);
}
</style>
