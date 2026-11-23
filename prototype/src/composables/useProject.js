import { reactive, computed } from 'vue'
import { HOUSINGS, GROUPS, POSTES, PRODUCTS, BUDGET_RANGES } from '../data/catalog.js'
import { addDays } from './format.js'

// Single shared store for the prototype (no account: lives in memory only).
const state = reactive({
  screen: 'setup', // 'setup' (A) | 'project' (C)
  housing: 'studio',
  budgetValue: BUDGET_RANGES.studio.start, // set with budgetSlider (field or handle)
  budgetTouched: false, // until the user moves it, the budget follows the housing's suggested range
  budgetUnknown: false, // « Je ne sais pas encore »
  activeId: null,
  openGroups: [],
  statuses: {}, // posteId → { state: 'chosen', productId }
  favorites: [],
  moveInDate: '', // 'YYYY-MM-DD' or ''
  priceCap: false, // « ≤ repère » filter: optional, off by default (no dead ends at small budgets)
  smallSpace: true, // « Petit espace » filter (illustrative)
  panelCollapsed: false,
})

const roundTo10 = (n) => Math.max(10, Math.round(n / 10) * 10)

const budget = computed(() =>
  state.budgetUnknown || !(state.budgetValue > 0) ? null : Math.round(state.budgetValue),
)

function setHousing(id) {
  state.housing = id
  if (!state.budgetTouched) state.budgetValue = BUDGET_RANGES[id].start
}

const housingLabel = computed(() => HOUSINGS.find((h) => h.id === state.housing)?.label)

// The list depends on the housing type and the budget (more budget, more postes);
// the repères are computed here, « in the back ».
const postes = computed(() => {
  const ref = budget.value ?? BUDGET_RANGES[state.housing].start
  const list = POSTES.filter((p) => p.housings.includes(state.housing) && p.minBudget <= ref)
  const baseSum = list.reduce((s, p) => s + p.base, 0)
  const factor = budget.value ? budget.value / baseSum : 1
  return list.map((p) => ({ ...p, repere: roundTo10(p.base * factor) }))
})

const groups = computed(() =>
  GROUPS.map((g) => ({ ...g, postes: postes.value.filter((p) => p.group === g.id) })).filter(
    (g) => g.postes.length,
  ),
)

const productById = (id) => PRODUCTS.find((p) => p.id === id)
const statusOf = (posteId) => state.statuses[posteId] || null
const isResolved = (posteId) => !!state.statuses[posteId]

const activePoste = computed(() => postes.value.find((p) => p.id === state.activeId) || null)

const chosenProducts = computed(() =>
  postes.value
    .map((p) => statusOf(p.id))
    .filter((s) => s?.state === 'chosen')
    .map((s) => productById(s.productId)),
)

const spent = computed(() => chosenProducts.value.reduce((s, p) => s + p.price, 0))
const shippingEstimate = computed(() => chosenProducts.value.reduce((s, p) => s + p.shipping, 0))

/** Amount chosen in a need group, and the sum of its postes' repères (« Budget conseillé : 60 / 260 € ») */
function spentIn(group) {
  return group.postes.reduce((sum, p) => {
    const s = statusOf(p.id)
    return s?.state === 'chosen' ? sum + productById(s.productId).price : sum
  }, 0)
}
const repereOf = (group) => group.postes.reduce((sum, p) => sum + p.repere, 0)

const moveIn = computed(() => (state.moveInDate ? new Date(`${state.moveInDate}T00:00:00`) : null))

function deliveryDate(product) {
  return addDays(product.days)
}

function productsFor(posteId) {
  const poste = postes.value.find((p) => p.id === posteId)
  let list = PRODUCTS.filter((p) => p.poste === posteId)
  if (state.priceCap && poste) list = list.filter((p) => p.price <= poste.repere)
  if (moveIn.value) list = list.filter((p) => deliveryDate(p) <= moveIn.value)
  // Every product stays visible, cheapest first; the repère is a guide (« Dans votre budget »), not a cap.
  return [...list].sort((a, b) => a.price - b.price)
}

function groupOf(posteId) {
  return postes.value.find((p) => p.id === posteId)?.group
}

// Accordion: one need group open at a time (keeps the panel short on laptop screens).
function openGroup(groupId) {
  if (groupId) state.openGroups = [groupId]
}

function setActive(posteId) {
  state.activeId = posteId
  openGroup(groupOf(posteId))
}

function nextTodoAfter(posteId) {
  const list = postes.value
  const start = list.findIndex((p) => p.id === posteId)
  for (let i = 1; i <= list.length; i++) {
    const p = list[(start + i) % list.length]
    if (!isResolved(p.id)) return p.id
  }
  return null
}

function resolveActive(status) {
  const id = state.activeId
  state.statuses[id] = status
  const next = nextTodoAfter(id)
  if (next) setActive(next)
}

function start() {
  // Keep progress when the user edits the housing or budget, but drop postes that no longer
  // exist for the new housing. Postes hidden by a lower budget keep their status: they come
  // back as they were if the budget goes up again.
  const ids = POSTES.filter((p) => p.housings.includes(state.housing)).map((p) => p.id)
  for (const key of Object.keys(state.statuses)) if (!ids.includes(key)) delete state.statuses[key]
  state.openGroups = []
  state.screen = 'project'
  const first = postes.value.find((p) => !isResolved(p.id)) || postes.value[0]
  setActive(first.id)
}

function edit() {
  state.screen = 'setup'
}

function choose(product) {
  resolveActive({ state: 'chosen', productId: product.id })
}

function reopen(posteId) {
  delete state.statuses[posteId]
  setActive(posteId)
}

function toggleGroup(groupId) {
  state.openGroups = state.openGroups.includes(groupId) ? [] : [groupId]
}

function toggleFavorite(productId) {
  const i = state.favorites.indexOf(productId)
  if (i === -1) state.favorites.push(productId)
  else state.favorites.splice(i, 1)
}

export function useProject() {
  return {
    state,
    budget,
    housingLabel,
    postes,
    groups,
    activePoste,
    chosenProducts,
    spent,
    shippingEstimate,
    spentIn,
    repereOf,
    setHousing,
    moveIn,
    statusOf,
    productById,
    productsFor,
    deliveryDate,
    start,
    edit,
    choose,
    reopen,
    setActive,
    toggleGroup,
    toggleFavorite,
  }
}
