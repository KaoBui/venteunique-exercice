# Mon projet d'aménagement — interactive prototype

Desktop prototype (1440) of the « Mon projet d'aménagement » flow for the Vente-unique UX/UI exercise.
Screens come from the Figma page « Écrans »: **A — Première visite** and **C — Projet en cours, groupes par besoin**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static build in dist/
```

## What you can try

- **A**: pick a housing type and a max budget (or « Autre montant », or « Je ne sais pas encore »). The list size changes with the housing (studio 8, T2 9, colocation 5).
- **C**: click a poste in the side panel to filter the product list. « Choisir pour ce poste » adds to the cart, settles the poste and moves to the next one. « J'ai déjà » and « Je passe » settle it without buying; « Changer d'avis » reopens it.
- The `BudgetTracker` updates live: products + estimated delivery, promo threshold (-11% from 500 €, hidden if above the budget), over-budget warning.
- Filters: price ≤ repère, move-in date (hides products delivered too late).
- Collapse the panel: the compact `BudgetTracker` stays on screen and reopens it.

## Structure

- `src/composables/useProject.js`: the single store (housing, budget, repères, poste statuses).
- `src/data/catalog.js`: illustrative postes and products (not real catalogue data).
- `src/components/BudgetTracker.vue`: the design-system component (props `budget`, `spent`, `shippingEstimate`, `completed`, `total`, `promoThreshold`, `promoLabel`, `promoEligibleAmount`, `size`, `href`, `label`; event `open`).
- `src/styles/tokens.css`: Vente-unique tokens (see `../design-system/tokens.json`). Recoleta is replaced by Fraunces.

## Deploy

The repo root has a `vercel.json` that builds this folder: import the GitHub repo in Vercel and deploy, no settings needed.
