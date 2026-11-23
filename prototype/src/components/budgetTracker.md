# budgetTracker

**Figma:** `budgetTracker` (page Composants) · **Vue:** `budgetTracker.vue` · same name, same tokens.

## Role
Shows what the project costs against the user's maximum budget, delivery included. It also shows how many essentials are settled and how far the user is from the site-wide promo threshold. In compact size, it brings the user back to the project.

## Anatomy
1. **Title**: `Mon budget` (the `label` prop). Progress on the right when `total` is set: `1 sur 8 réglé`.
2. **Promo message**, above the gauge and centred on the threshold mark:
   - distance to the promo, or `-11% dès 500 €` before the first product (`--feedback-promo-*`);
   - promo reached: check icon + `-11% débloqués` (`--feedback-success` on `--surface-muted`).
3. **Gauge** (`role="meter"`):
   - dark segment = products (`--meter-fill`), full red when over budget (`--meter-fill-danger`);
   - grey segment = estimated delivery (`--meter-fill-secondary`);
   - vertical mark = promo threshold (`--meter-marker`).
4. **Values**: total on the left (`523 €`, red when over), budget on the right (`1 500 €`).
5. **Delivery line**: `dont 63 € de livraison estimée`, or `Ajoutez un essentiel pour suivre votre budget.` when empty.
6. **Over budget**: warning icon + `Budget dépassé de X €` (`--feedback-danger`).

The `#message` slot replaces the text of the promo message (2) or of the over-budget line (6).

**Compact**: one line, `Mon projet · 463 / 1 500 € · 1/8`, a 48 px mini gauge and a chevron. Warning icon and red amount when over budget.

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `budget` | `Number \| null` | `null` | Max budget in €. Leave it empty to show the total only, with no gauge. |
| `spent` | `Number` | required | Products, delivery excluded. |
| `shippingEstimate` | `Number` | `0` | Added to the total and shown apart. |
| `completed` / `total` | `Number` | `null` | Settled essentials (chosen, already owned, or skipped) / all essentials. A count only: the component does not need to know the list. |
| `promoThreshold` | `Number` | `null` | E.g. `500`. |
| `promoLabel` | `String` | `''` | E.g. `-11%`. |
| `promoEligibleAmount` | `Number` | `spent` | Vente-unique products only (marketplace items excluded). |
| `size` | `'default' \| 'compact'` | `'default'` | Compact = a link or button back to the project. |
| `href` | `String` | `null` | Compact: renders an `<a>`. Without it, renders a `<button>` that emits `open`. |
| `label` | `String` | `'Mon budget'` | Visible title and accessible name (`'Mon projet'` in compact). |

**Event:** `open`, fired when the compact version is clicked.

## States
| State | When | What changes |
|-------|------|--------------|
| Empty | `spent = 0` | Empty gauge, no message. |
| In progress | below the threshold | Promo message `Plus que 100 € pour -11%`. |
| Threshold reached | eligible amount ≥ threshold | Success message with icon. |
| Over budget | total > budget | Danger fill, `Budget dépassé de X €` with icon, promo hidden. |
| Guardrail | threshold > budget | Threshold mark and promo message hidden: the component helps the user stay within budget and never pushes them over it. |
| No budget | `budget` empty | Total only, no meter. |

## Rules
- Reads semantic tokens only, so it works in any brand mode (Vente-unique, Habitat) without code changes.
- Text is never smaller than 12px. The state is never shown by colour alone.
- One instance per screen in default size. Compact size only when the project panel is closed.

## Accessibility
- Default size: the gauge is `role="meter"`, with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and an `aria-valuetext` that reads the whole sentence (total, delivery, overrun).
- Compact size: a link or button whose accessible name sums up the state. The gauge is `aria-hidden`.
- Messages use `role="status"`, so the change is announced when the user picks a product.

## Do / Don't
- **Do** pass `promoEligibleAmount` when the cart contains marketplace products.
- **Don't** show a monthly payment amount without the legal credit notice on the same page.
- **Don't** use it as a cart: it summarises, while « Voir mon panier » lists.
