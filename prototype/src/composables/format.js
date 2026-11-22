const priceFmt = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const euroFmt = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })
const dateFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' })

/** 399.99 → « 399,99 € » */
export const price = (n) => `${priceFmt.format(n)} €`

/** 1500 → « 1 500 € » (rounded, for budgets and totals) */
export const euros = (n) => `${euroFmt.format(Math.round(n))} €`

/** Date → « 5 déc. » */
export const shortDate = (d) => dateFmt.format(d)

export const addDays = (days, from = new Date()) => {
  const d = new Date(from)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + days)
  return d
}
