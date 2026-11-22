# Design-system rules

These rules follow the conventions of **Minos**, Vente-unique's design system, as described in its public case study (florianfaure.com/work/minos). They are written for two readers: designers and developers, and AI agents that generate or review code. `scripts/check-ds.mjs` enforces the rules marked ✓ on every `npm run build`. A build that breaks one of them fails.

## Naming

| # | Rule | Check |
|---|------|-------|
| R1 | A component has **the same camelCase name in Figma and in Vue**, and the file is named after it: `budgetTracker` → `budgetTracker.vue`. The pattern is `<family><Name>`: `buttonMain`, `cardProductBox`, `listPosteItem`. | ✓ |
| — | Before creating a component, look for an existing one. A need that is close to an existing component becomes a **variant**, not a new component. Example: the project card is `cardProductBox` with `projectMode`. | review |

## Tokens

The tokens have two layers:

```
styles/tokens/primitives.css   --primitive-squid-opacity-950: #130c0c      raw value, no meaning
styles/tokens/semantic.css     --interactive-primary-background: var(--primitive-squid-opacity-950)   role
components/buttonMain.vue      background: var(--interactive-primary-background)                       reads the role only
```

| # | Rule | Check |
|---|------|-------|
| R2 | No raw colour (`#hex`, `rgb()`, `hsl()`) outside `styles/tokens/`. | ✓ |
| R3 | Components never read `--primitive-*`. They read semantic roles only. | ✓ |
| R4 | Every `var(--…)` must exist in `semantic.css`. This catches typos and stale names. | ✓ |
| — | Semantic names follow `--<domain>-<role>-<property>`. The domains are `text`, `surface`, `border`, `interactive`, `feedback`, `meter`, `badge`. Only `--interactive-primary-background` is confirmed by the case study; the other names extend its pattern. | review |
| — | **Brands**: a brand (e.g. Habitat) is a mode that overrides `semantic.css` only. If a component needs a code change to switch brand, it is reading the wrong layer. | review |

## Usage

| # | Rule | Check |
|---|------|-------|
| R5 | **12px is the smallest text size.** | ✓ |
| R6 | **A single primary button per context**, counted per component file. Use `variant="secondary"` for the others. | ✓ |
| — | A state is never carried by colour alone: always add an icon and text (over budget, settled item, promo reached). | review |

## For AI agents

- Read `semantic.css` before writing styles, and use an existing role. If none fits, propose a new role in `semantic.css` that points at a primitive. Never write a raw value in a component.
- Run `npm run check:ds` after every change, and fix any error before you report the work as done.
- Prefer a slot over a new variant when only the content changes, for example the message under the `budgetTracker` gauge.
