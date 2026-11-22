import { reactive, computed } from 'vue'
import { HOUSINGS, GROUPS, POSTES, PRODUCTS } from '../data/catalog.js'
import { addDays } from './format.js'

// Single shared store for the prototype (no account: lives in memory only).
const state = reactive({
  screen: 'setup', // 'setup' (A) | 'project' (C)
  housing: 'studio',
  budgetPreset: null, // 800 | 1500 | 2500 | null
  customBudget: '', // free amount typed by the user
  activeId: null,
  openGroups: [],
  statuses: {}, // posteId → { state: 'chosen' | 'owned' | 'skipped', productId? }
  favorites: [],
  moveInDate: '', // 'YYYY-MM-DD' or ''
  priceCap: true, // « ≤ repère » filter
  smallSpace: true, // « Petit espace » filter (illustrative)
  panelCollapsed: false,
})

const roundTo10 = (n) => Math.max(10, Math.round(n / 10) * 10)

const budget = computed(() => {
  const custom = Number(String(state.customBudget).replace(/\s/g, '').replace(',', '.'))
  if (custom > 0) return Math.round(custom)
  return state.budgetPreset
})

const housingLabel = computed(() => HOUSINGS.find((h) => h.id === state.housing)?.label)

// The list depends on the housing type; the repères are computed here, « in the back ».
const postes = computed(() => {
  const list = POSTES.filter((p) => p.housings.includes(state.housing))
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
const completed = computed(() => postes.value.filter((p) => isResolved(p.id)).length)

const moveIn = computed(() => (state.moveInDate ? new Date(`${state.moveInDate}T00:00:00`) : null))

function deliveryDate(product) {
  return addDays(product.days)
}

function productsFor(posteId) {
  const poste = postes.value.find((p) => p.id === posteId)
  let list = PRODUCTS.filter((p) => p.poste === posteId)
  if (state.priceCap && poste) list = list.filter((p) => p.price <= poste.repere)
  if (moveIn.value) list = list.filter((p) => deliveryDate(p) <= moveIn.value)
  return list
}

function groupOf(posteId) {
  return postes.value.find((p) => p.id === posteId)?.group
}

function openGroup(groupId) {
  if (groupId && !state.openGroups.includes(groupId)) state.openGroups.push(groupId)
}

function setActive(posteId) {
  state.activeId = posteId
  openGroup(groupOf(posteId))
  state.priceCap = true
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
  // Keep progress when the user only edits the housing or budget, but drop
  // postes that no longer exist for the new housing.
  const ids = postes.value.map((p) => p.id)
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

function markOwned() {
  resolveActive({ state: 'owned' })
}

function skip() {
  resolveActive({ state: 'skipped' })
}

function reopen(posteId) {
  delete state.statuses[posteId]
  setActive(posteId)
}

function toggleGroup(groupId) {
  const i = state.openGroups.indexOf(groupId)
  if (i === -1) state.openGroups.push(groupId)
  else state.openGroups.splice(i, 1)
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
    completed,
    moveIn,
    statusOf,
    productById,
    productsFor,
    deliveryDate,
    start,
    edit,
    choose,
    markOwned,
    skip,
    reopen,
    setActive,
    toggleGroup,
    toggleFavorite,
  }
}
