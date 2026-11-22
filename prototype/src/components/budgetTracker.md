# budgetTracker

**Figma:** `budgetTracker` (page Composants) · **Vue:** `budgetTracker.vue` · same name, same tokens.

## Role
Shows what the project costs against the user's maximum budget, delivery included. It also shows how many essentials are settled and how far the user is from the site-wide promo threshold. In compact size, it brings the user back to the project.

## Anatomy
1. **Headline**: `463 € sur 1 500 €` (or `463 € dépensés` when no budget is set). Progress on the right: `1 sur 8 réglé`.
2. **Delivery line**: `dont 63 € de livraison estimée`.
3. **Gauge** (`role="meter"`):
   - dark segment = products (`--meter-fill`);
   - grey segment = estimated delivery (`--meter-fill-secondary`);
   - vertical mark = promo threshold (`--meter-marker`).
4. **Message slot**, which shows one of:
   - the distance to the promo (`--feedback-promo-*`);
   - promo reached (`--feedback-success` + icon);
   - over budget (`--feedback-danger` + icon).

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
| `label` | `String` | `'Budget du projet'` | Accessible name. |

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
