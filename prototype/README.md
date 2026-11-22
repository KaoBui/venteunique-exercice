# Mon projet d'aménagement — interactive prototype

Desktop prototype (1440) of the « Mon projet d'aménagement » flow for the Vente-unique UX/UI exercise.
Screens come from the Figma page « Écrans »: **A — Première visite** and **C — Projet en cours, groupes par besoin**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run check:ds # design-system rules
npm run build    # rules check + static build in dist/
```

## What you can try

- **A**: pick a housing type and a max budget (or « Autre montant », or « Je ne sais pas encore »). The list size changes with the housing (studio 8, T2 9, colocation 5).
- **C**: click a poste in the side panel to filter the product list. « Choisir pour ce poste » adds to the cart, settles the poste and moves to the next one. « J'ai déjà » and « Je passe » settle it without buying; « Changer d'avis » reopens it.
- The `budgetTracker` updates live: products + estimated delivery, promo threshold (-11% from 500 €, hidden if above the budget), over-budget warning.
- Filters: price ≤ repère, move-in date (hides products delivered too late).
- Collapse the panel: the compact `budgetTracker` stays on screen and reopens it.

## Structure

Component names follow Minos, Vente-unique's design system: the same camelCase name in Figma and in Vue (`budgetTracker`, `cardProductBox`, `listPosteItem`).

- `src/components/budgetTracker.vue` + [budgetTracker.md](src/components/budgetTracker.md): the design-system component and its documentation.
- `src/styles/tokens/primitives.css` → `semantic.css`: two token layers. Components read semantic roles only.
- [DESIGN-RULES.md](DESIGN-RULES.md): the rules, for people and AI agents. `npm run check:ds` enforces them, and it runs before every build.
- `src/composables/useProject.js`: the single store (housing, budget, repères, poste statuses).
- `src/data/catalog.js`: postes and products. The 11 « Les Essentiels » products are real (name, price, photo and link from vente-unique.com, listed on 2026-11-22). The others fill gaps in the list and are illustrative, with no photo. Delivery costs and lead times are estimates.

## Deploy

The repo root has a `vercel.json` that builds this folder: import the GitHub repo in Vercel and deploy, no settings needed.
