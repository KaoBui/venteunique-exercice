# Exercice Vente-unique — Guide du process de travail

> Poste : UI/UX Designer confirmé · Délai : 48 h · Méthode : Double Diamond (avec boucles de test)

---

## 1. Rappel du brief

**Problématique**
Comment, par le product design, l'UX et l'UI, améliorer l'expérience de navigation d'un jeune qui se meuble pour la première fois sur Vente-unique ?

**Ce qui est évalué**
- Le sens critique
- Une solution intégrée au design system existant
- Une expérience pertinente sur deux axes : **utilisateur** et **business**

**Livrables demandés**
1. Une présentation détaillée de l'idée et des choix justifiés
2. Une maquette haute fidélité d'un écran, dans Figma (imposé)
3. Un composant documenté et prêt pour le design system, en Vue.js (vibe code recommandé)

---

## 2. Principes de travail

- **Une idée forte plutôt que plusieurs idées moyennes.** Le jury juge la qualité des arbitrages, pas le volume.
- **Chaque phase doit produire une décision.** Si un livrable ne change rien à la suite, on le supprime.
- **Des faits avant des opinions.** Quelques entretiens réels valent mieux que vingt hypothèses.
- **Annoncer ses hypothèses.** Je n'ai ni les données ni les utilisateurs de Vente-unique : je le dis, et j'explique comment je validerais.
- **S'intégrer au design system, ne pas le réinventer.** Le nouveau composant doit avoir l'air d'avoir toujours été là.
- **Toujours relier l'utilisateur et le business.** Chaque choix de design doit dire ce qu'il apporte à l'un et à l'autre.

---

## 3. Vue d'ensemble

```
Phase 0      Phase 1     Phase 2      Phase 3      Phase 4     Phase 5
Cadrage  →  Découvrir → Définir  →  Développer → Livrer  →  Mesurer
            (diverger)  (converger)  (diverger)   (converger)
            └──── Espace problème ────┘└──── Espace solution ────┘
                                  ▲
                               Insight
```

| Phase | Objectif | Livrables |
|---|---|---|
| 0 · Cadrage | Poser le cadre avant de chercher des solutions | Problématique reformulée, objectifs, contraintes, hypothèses |
| 1 · Découvrir | Comprendre à partir de faits | Audit annoté, benchmark, synthèse des entretiens |
| 2 · Définir | Obtenir un problème précis et priorisé | Persona, JTBD, journey map, insight, HMW, priorisation |
| 3 · Développer | Explorer, puis choisir et justifier | Pistes, grille de décision, user flow, wireframes testés |
| 4 · Livrer | Une solution haute fidélité prête pour les devs | Design system reconstitué, maquette, composant Figma et Vue |
| 5 · Mesurer | Montrer que le design continue après la livraison | KPI, plan d'A/B test, roadmap, limites |

---

## 4. Les phases en détail

### Phase 0 — Cadrage

**Objectif** : reformuler le problème et poser le cadre.

**Activités**
- Reformuler la problématique en une phrase. Exemple : *« Aider un primo-accédant à s'équiper entièrement, dans son budget et avant sa date d'emménagement, sans se perdre dans le catalogue. »* Le primo-accédant reste le cas principal ; la solution est ouverte à tous les projets d'aménagement.
- Fixer un objectif utilisateur et un objectif business, avec un indicateur de succès pour chacun.
- Lister les contraintes : design system existant, mobile-first, Figma, Vue.js.
- Écrire les hypothèses de départ, à valider en phase 1.

**Livrable** : une slide de cadrage.

**C'est terminé quand** : je peux expliquer le problème, pour qui je le résous et comment je saurai que ça marche, en 30 secondes.

---

### Phase 1 — Découvrir (diverger)

**Objectif** : comprendre l'utilisateur, le site actuel et le marché à partir de faits.

**Activités**
1. **Desk research** : le positionnement de Vente-unique (prix, marketplace, promos à seuil, paiement en plusieurs fois) et les données sur le premier logement des jeunes (budget, surface, mobilité).
2. **Audit heuristique** du parcours mobile home → catégorie → liste produits → fiche produit → panier, selon les heuristiques de Nielsen. Captures annotées, frictions classées par gravité.
3. **Benchmark** de 4 ou 5 acteurs : IKEA, Maisons du Monde, La Redoute Intérieurs, Conforama, plus un pure player. Question directrice : *comment chacun accompagne-t-il quelqu'un qui part de zéro ?*
4. **Entretiens** : 3 à 5 entretiens de 15 minutes avec des jeunes qui ont emménagé récemment ou vont le faire (voir le guide en annexe).

**Livrables**
- l'audit annoté, avec 3 ou 4 frictions majeures mises en avant ;
- un tableau de benchmark avec les bonnes pratiques et les manques ;
- la synthèse des entretiens : verbatims et patterns récurrents.

**C'est terminé quand** : j'ai au moins trois frictions étayées par des preuves (captures, verbatims, comparaisons).

> Lancer les demandes d'entretien **dès le début du jour 1**.

---

### Phase 2 — Définir (converger)

**Objectif** : transformer la recherche en un problème précis et priorisé.

**Activités**
- **Proto-persona** fondé sur les entretiens. Exemple : 23 ans, premier CDI, studio de 25 m², 1 500 € de budget, emménage dans 3 semaines, sans voiture.
- **Jobs To Be Done** : *« Quand j'emménage pour la première fois, je veux savoir quoi acheter en priorité, pour être vite installé sans exploser mon budget. »*
- **Journey map** du parcours actuel : étapes, actions, émotions, frictions, et à chaque étape les opportunités business.
- **Insight principal**, en une phrase. Hypothèse actuelle : *le problème n'est pas de trouver un meuble, mais de savoir quoi acheter, dans quel ordre et pour combien au total.*
- **How Might We** : 3 à 5 questions du type « Comment pourrions-nous… ? ».
- **Priorisation** sur une matrice valeur utilisateur × valeur business, avec l'effort en regard.

**Livrables** : persona, JTBD, journey map, insight, HMW, matrice de priorisation.

**C'est terminé quand** : j'ai choisi un HMW et je sais expliquer pourquoi lui plutôt que les autres.

---

### Phase 3 — Développer (diverger)

**Objectif** : explorer plusieurs solutions, puis en retenir une et la justifier.

**Activités**
- **Idéation** (Crazy 8 ou 3 à 5 pistes). Pistes envisagées :
  - « Mon projet d'aménagement » : un parcours guidé, ouvert à tous mais pensé pour le primo-accédant (3 questions, checklist priorisée avec budget repère par poste, sélections filtrées, jauge de budget) — **piste retenue** ;
  - des packs par pièce ;
  - l'AR ou un plan 3D ;
  - un quiz de style ;
  - une wishlist partagée avec les proches.
- **Grille de décision** : impact utilisateur, impact business, faisabilité, cohérence avec le design system. Je justifie aussi les rejets.
- **Points d'entrée** : une entrée transversale dans le menu, une carte insérée dans les listes produits, un article SEO dans « Inspirations & conseils », une tuile sur la home (pas de bannière), le tracker compact comme point de retour ; en V2, une entrée selon le comportement.
- **User flow** de la piste retenue : point d'entrée → 3 questions (quoi, déjà possédé, budget + date facultative) → checklist → sélection filtrée → fiche produit → retour checklist → panier.
- **Wireframes basse fidélité** des écrans clés.
- **Test des wireframes** avec 2 ou 3 personnes : ce qu'elles comprennent, où elles bloquent.

**Livrables** : pistes, grille de décision, user flow, wireframes et enseignements du test.

**C'est terminé quand** : la solution est choisie, justifiée, et ses flux sont validés par au moins un test.

---

### Phase 4 — Livrer (converger)

**Objectif** : produire une solution haute fidélité, intégrée au design system et prête pour les devs.

**Activités**
1. **Reconstituer le design system** depuis le site (inspecteur) : couleurs, typographies, espacements, rayons, boutons, carte produit, header. Le monter en styles et variables Figma. → Fait : [design-system/vente-unique-design-system.md](design-system/vente-unique-design-system.md) et [tokens.json](design-system/tokens.json).
2. **Maquette haute fidélité** de l'écran clé en mobile (la checklist avec la jauge de budget), en réutilisant au maximum les composants existants.
3. **Composant `BudgetTracker`**
   - **Figma** : variants (états, tailles), auto-layout, tokens.
   - **Vue 3** (Composition API) :
     - props : `budget`, `spent`, `completed`, `total`, `promoThreshold`, `promoEligibleAmount`, `installments`, `size` (complet ou compact), `href` ;
     - états : vide, en cours, seuil promo atteint, budget dépassé, garde-fou (seuil masqué s'il dépasse le budget) ;
     - la version compacte, fixée en bas, sert aussi de point de retour vers l'outil ;
     - uniquement des tokens, aucune valeur en dur ;
     - accessibilité : `role="meter"`, `aria-valuenow`, contrastes AA, l'état n'est pas porté par la couleur seule ; en compact, un lien dont le nom résume l'état.
   - **Documentation** : rôle, anatomie, props, états, do/don't, accessibilité, cas limites.
   - Pour aller plus loin : Storybook ou démo en ligne.
4. **Test sur la maquette** avec 2 personnes : la jauge et la checklist sont-elles comprises ?

**Livrables** : design system reconstitué, maquette Figma, composant Figma et Vue documenté (lien Git ou démo), résultat du test.

**C'est terminé quand** : un dev pourrait intégrer le composant sans me poser de question.

---

### Phase 5 — Mesurer et itérer

**Objectif** : montrer que le design continue après la livraison.

**Activités**
- **KPI**
  - côté utilisateur : taux de complétion de la checklist, temps jusqu'au premier ajout au panier ;
  - côté business : conversion du segment, panier moyen, nombre de catégories par commande, taux d'atteinte du seuil promo, taux de retour.
- **Plan d'A/B test** : le parcours guidé face à la navigation classique, sur le segment premier logement.
- **Roadmap**
  - MVP : les 3 questions, la checklist, la jauge et les points d'entrée statiques ;
  - V2 : l'entrée selon le comportement, la jauge dans le panier, les e-mails de relance ;
  - V3 : la wishlist partagée, les packs par pièce.
- **Limites** : ce qui n'a pas pu être validé, et pourquoi.

**Livrables** : slide KPI et A/B test, roadmap, limites.

---

## 5. Planning sur 48 h

| Moment | Travail |
|---|---|
| Jour 1, matin | Phase 0, envoi des demandes d'entretien, desk research |
| Jour 1, après-midi | Audit, benchmark, entretiens |
| Jour 1, soir | Phase 2 : persona, journey map, **insight verrouillé** |
| Jour 2, matin | Phase 3 (idéation, flow, wireframes, test), reconstitution du design system |
| Jour 2, après-midi | Maquette haute fidélité, composant Vue et documentation |
| Jour 2, fin | Phase 5, assemblage de la présentation, relecture, envoi |

---

## 6. Structure de la présentation (15 à 20 slides)

1. La problématique et ma lecture du sujet
2. La méthode (schéma du Double Diamond)
3. Le cadrage : objectifs, contraintes, hypothèses
4. Découvrir : l'audit (3 ou 4 frictions)
5. Découvrir : le benchmark
6. Découvrir : les enseignements des entretiens
7. Définir : le persona et le JTBD
8. Définir : la journey map
9. **L'insight**
10. Définir : les HMW et la priorisation
11. Développer : les pistes et la grille de décision
12. Développer : le user flow et les wireframes
13. Livrer : la maquette haute fidélité
14. Livrer : le composant (specs, états, lien vers le code)
15. Mesurer : KPI et A/B test
16. La roadmap et les limites
17. En annexe : l'audit complet, les verbatims, le lien Figma, le dépôt Git

> Au début de chaque section, rappeler la phase en cours et la décision qui en sort.

---

## 7. Checklist avant envoi

- [ ] Chaque choix est relié à une preuve (audit, verbatim, benchmark)
- [ ] Chaque choix dit ce qu'il apporte à l'utilisateur **et** au business
- [ ] Les hypothèses sont annoncées clairement
- [ ] La maquette réutilise les composants et styles de Vente-unique
- [ ] Le composant utilise des tokens, couvre tous ses états et est accessible
- [ ] La documentation du composant est complète
- [ ] Les liens Figma et Git sont ouverts en lecture et testés en navigation privée
- [ ] La présentation est relue (orthographe, cohérence des chiffres)
- [ ] Le rendu est envoyé avant la fin des 48 h

---

## 8. Pièges à éviter

- Inventer un nouveau style visuel au lieu de suivre celui de Vente-unique.
- Trop de pistes et aucune creusée à fond.
- Une méthode affichée mais pas suivie : un schéma joli, sans résultats derrière.
- Un composant trop ambitieux et à moitié fini.
- Oublier l'axe business, ou ne le traiter qu'avec des promos.
- Un persona inventé, présenté comme s'il venait de vraies données.

---

## Annexe — Guide d'entretien (15 minutes)

**Introduction (1 min)**
« Je travaille sur l'achat de meubles pour un premier logement. Il n'y a pas de bonne ou de mauvaise réponse, je cherche à comprendre ton expérience. »

**Contexte (2 min)**
- Quand as-tu emménagé, ou quand vas-tu emménager ? Dans quel type de logement ?
- Avec quel budget à peu près ? Qui a payé ?

**Le parcours (8 min)**
- Par quoi as-tu commencé ? Comment as-tu décidé quoi acheter en premier ?
- Où as-tu cherché ? Sur quels sites, magasins ou applis ? Pourquoi ceux-là ?
- Raconte-moi un achat en particulier, du début jusqu'à la livraison.
- Qu'est-ce qui a été le plus difficile ou le plus frustrant ?
- Comment as-tu suivi ton budget ?
- Comment s'est passée la livraison ou le transport ?

**Le recul (3 min)**
- Si c'était à refaire, que ferais-tu différemment ?
- Qu'est-ce qui t'aurait vraiment aidé ?

**Clôture (1 min)**
- Est-ce que je peux te recontacter pour tester une maquette ?

> Demander des histoires concrètes (« la dernière fois que… ») plutôt que des opinions (« est-ce que tu aimerais… »).
