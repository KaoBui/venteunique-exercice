# Design system Vente-unique — reconstitution depuis le site public

> Relevé le 21 novembre 2026 sur vente-unique.com (mobile 360-375 px et desktop 1440 px), à partir des styles calculés du navigateur et de captures d'écran.
> Je n'ai pas accès au Figma ni au code source de Vente-unique : **les valeurs sont celles du site, les noms de tokens sont les miens.**
> Captures de référence : [captures/](captures/) · Logo : [assets/logo-vente-unique.svg](assets/logo-vente-unique.svg) · Tokens : [tokens.json](tokens.json)

**Attention, période Black Friday** : au moment du relevé, la home affiche un habillage saisonnier (bordeaux #2A0B16, vidéo, compte à rebours). Il est exclu du système ci-dessous.

---

## 1. Direction de design en 6 principes

1. **Fond blanc, beaucoup d'air.** Les pages sont blanches ; la couleur vient des photos, pas de l'interface.
2. **Le noir agit, le rouge signe.** Les boutons d'action sont noirs (#130C0C). Le rouge (#EC002E) est réservé à la marque, aux liens accentués et aux pastilles de notification. Il n'est jamais utilisé comme fond de bouton.
3. **Des formes très arrondies.** Boutons en pilule (28 px), cartes produit à 28 px, images à 20 px, champs à 14 px. Aucun angle vif dans l'interface.
4. **Deux voix typographiques.** Recoleta, une serif douce, pour l'émotion (titres éditoriaux, gammes) ; Poppins pour tout ce qui est fonctionnel.
5. **Des photos chaleureuses et lumineuses.** Lumière naturelle, tons beige, terracotta, bois et lin, intérieurs mis en scène. Packshots sur fond blanc pour les produits complémentaires.
6. **Une voix proche et active.** Vouvoiement, boutons à la première personne (« J'en profite », « Je découvre »), phrases courtes.

---

## 2. Couleurs

### Texte

| Token | Valeur | Équivalent opaque sur blanc | Usage relevé | Contraste sur blanc |
| --- | --- | --- | --- | --- |
| `color.text.strong` | #130C0C | — | Titres, prix, noms de produit | ≈ 19:1 |
| `color.text.default` | rgba(23, 13, 14, 0.8) | ≈ #453D3E | Texte courant, liens du menu, accordéons | ≈ 10:1 |
| `color.text.muted` | rgba(31, 20, 21, 0.61) | ≈ #766F70 | Vendeur, prix barré, nombre de produits, livraison | ≈ 4,8:1 (AA) |
| `color.text.inverse` | #FFFFFF | — | Sur photo, bouton principal, bandeau promo | — |

### Marque et accents

| Token | Valeur | Usage relevé | Remarque |
| --- | --- | --- | --- |
| `color.brand` | #EC002E | Liens accentués, mots-clés en gras dans les textes SEO, liens « Comparer » | ≈ 4,6:1 sur blanc : AA de justesse, à réserver au texte ≥ 14 px |
| `color.brand.badge` | #E5002D | Pastille du panier, point de notification du compte | |
| `color.brand.logo` | #FF0032 | Logo uniquement | Ne pas utiliser dans l'interface |
| `color.menu.promo` | #FF7800 | Lien « Promotions » du menu mobile | Spécifique au menu |
| `color.menu.new` | #1D70ED | Lien « Nouveautés » du menu mobile | Spécifique au menu |

### États (existants sur le site)

| Token | Valeur | Usage relevé | Contraste |
| --- | --- | --- | --- |
| `color.status.success` | #008554 | « En stock » (12 px) | ≈ 4,7:1 sur blanc (AA) |
| `color.promo.text` | #BD4800 | Pastille de remise « -11% », « -42% » | ≈ 6,6:1 sur son fond |
| `color.promo.surface` | #FFF1EB | Fond de la pastille de remise | |

Le site n'a pas de couleur d'erreur visible dans les pages relevées. Pour « budget dépassé », la proposition est d'utiliser `color.brand` doublé d'une icône et d'un texte (à valider avec l'équipe).

### Surfaces

| Token | Valeur | Usage relevé |
| --- | --- | --- |
| `color.surface.default` | #FFFFFF | Fond de page, cartes produit, en-tête, barres fixées, panneaux |
| `color.surface.subtle` | rgba(197, 185, 187, 0.14) | Champ de recherche, champs de saisie, encart newsletter, encart « bon d'achat » |
| `color.surface.muted` | #F5F5F5 | Rail du stepper du panier, fonds d'images en chargement |
| `color.surface.chip` | rgba(209, 199, 201, 0.2) | Liens de recherches associées (fiche produit) |
| `color.surface.filter` | rgba(230, 215, 220, 0.2) | Filtres appliqués |
| `color.surface.editorial` | #F3ECE2 | Bandeau éditorial beige de la page « Les Essentiels » |
| `color.surface.inverse` | #000000 | Bandeau promo en haut de page |
| `color.surface.skeleton` | #F4F4F4 | Placeholders de chargement (**pas** un fond de page) |

### Bordures et superpositions

| Token | Valeur | Usage relevé |
| --- | --- | --- |
| `color.border.strong` | rgba(31, 20, 21, 0.61) | Champs, select, recherche, boutons radio |
| `color.border.default` | rgba(86, 67, 69, 0.5) | Bouton secondaire, puces non sélectionnées, boutons de filtre |
| `color.border.selected` | rgba(23, 13, 14, 0.8), **2 px** | Puce d'option sélectionnée |
| `color.border.subtle` | rgba(184, 168, 171, 0.32) | Séparateurs, pied de page, pastilles de couleur |
| `color.border.bar` | rgba(209, 199, 201, 0.2) | Filet haut de la barre d'achat fixée |
| `color.overlay.glass` | rgba(86, 67, 69, 0.5) + bordure rgba(249, 250, 251, 0.3) | Bouton posé sur une photo (« J'en profite ») |
| `color.overlay.control` | rgba(31, 20, 21, 0.61) | Flèches de carrousel |

---

## 3. Typographie

**Familles** : Poppins (400, 500, 600, 700) et Recoleta (400 ; 500 et 700 déclarés). Le site charge aussi une police d'icônes nommée « venteunique ».

**Disponibilité** : Poppins est une Google Font, disponible dans Figma. Recoleta est une police payante (Latinotype), **non installée sur ce poste**. Fraunces, installée et gratuite, est le remplaçant le plus proche. Le substitut doit être signalé dans la présentation.

### Échelle Recoleta (éditorial)

| Style | Taille / interligne | Poids | Usage relevé |
| --- | --- | --- | --- |
| `display.xl` | 48 / 56 | 400 | H1 de page gamme (« Les Essentiels »), titre de campagne |
| `display.l` | 40 / 48 | 400 | Bannières de catégorie (« Je trouve mon matelas idéal ») |
| `display.m` | 32 / 40 | 400 | H1 de liste produits (« Lit »), titres de section de la home |
| `display.s` | 24 / 32 | 400 | Nom de gamme sur la fiche (« MIRSIO »), petits titres éditoriaux |

### Échelle Poppins (interface)

| Style | Taille / interligne | Poids | Usage relevé |
| --- | --- | --- | --- |
| `title.l` | 24 / 32 | 500 | Titre de bloc (« Récapitulatif ») |
| `title.m` | 20 / 24 | 600 | Titre de panneau (« Article ajouté au panier », « Menu »), prix sur la fiche |
| `title.s` | 20 / 24 | 500 | Libellé sur tuile photo (« Canapé »), sous-titre de gamme (« Tout pour bien commencer ») |
| `label.l` | 16 / 24 | 500 | Libellé de bouton, en-tête d'accordéon, « Total TTC » |
| `price.m` | 16 / 24 | 600 | Prix dans une carte produit |
| `body.l` | 16 / 24 | 400 | Texte de réassurance, introduction |
| `label.m` | 14 / 20 | 500 | Nom de produit, liens du menu, filtres, prix barré |
| `body.m` | 14 / 20 | 400 | Texte secondaire, avis |
| `body.base` | 13 / 22,3 | 400 | Corps par défaut du site, liens du menu mobile |
| `caption` | 12 / 16 | 400 · 500 · 700 | Vendeur, badges, bandeau promo (code en 700), stock |
| `legal` | 9 | 400 | Astérisques des mentions |

### Règles de mise en forme relevées

- Prix : « 1 429,99 € » (espace pour les milliers, virgule, espace avant €).
- Remise : « -11% », sans espace.
- Ponctuation française : espace avant « ! », « ? » et « : » (« Suivez-nous ! », « Plus que : »).

---

## 4. Formes, espacements, élévation

### Rayons

| Token | Valeur | Usage relevé |
| --- | --- | --- |
| `radius.xs` | 5–6 px | Petites vignettes, titres d'accordéon |
| `radius.s` | 10 px | Petits éléments graphiques |
| `radius.m` | 14 px | Champs, select, recherche, boutons de tri |
| `radius.l` | 20 px | Images produit, tuiles, carte « Récapitulatif », encarts |
| `radius.xl` | 28 px | Boutons, cartes produit, pop-ins, bandeau éditorial |
| `radius.pill` | 999 px | Puces, stepper, pastilles, icônes de l'en-tête |
| `radius.round` | 50 % | Pastilles de couleur, boutons-icônes |

### Espacements

Valeurs les plus fréquentes : **4, 8, 12, 16, 20, 24, 32, 64 px**. L'échelle suit un pas de 4 px.

| Token | Valeur |
| --- | --- |
| `space.1` | 4 |
| `space.2` | 8 |
| `space.3` | 12 |
| `space.4` | 16 |
| `space.5` | 20 |
| `space.6` | 24 |
| `space.8` | 32 |
| `space.16` | 64 |

**Mise en page** : en mobile, marges latérales d'environ 10 à 12 px ; les cartes produit occupent toute la largeur (340 px sur 360). En desktop, le contenu fait environ 1 330 px de large avec 48 px de marge intérieure.

### Élévation

| Token | Valeur | Usage relevé |
| --- | --- | --- |
| `shadow.soft` | 0 4px 12px rgba(197, 185, 187, 0.14) | Boutons sur photo, flèches de carrousel, étiquettes |
| `shadow.raised` | 0 10px 20px rgba(0, 0, 0, 0.12) | Carte « Récapitulatif », barre de total fixée du panier |

**Bordures** : 1 px partout (un relevé précédent indiquait 0,8 px : c'était un effet de la densité d'écran). 2 px pour l'état sélectionné.

### Icônes

Icônes au trait, environ 24 px, extrémités arrondies, en `text.strong`. Elles servent en navigation (menu, aide, compte, panier, recherche, appareil photo) et en réassurance (garantie, camion). Pastilles rouges pour les notifications.

---

## 5. Composants relevés

| Composant | Spécifications | Capture |
| --- | --- | --- |
| **Bandeau promo** | Fond #000, texte blanc 12/16 ; code en 700 ; compte à rebours | [mobile-home-0](captures/mobile-home-0.png) |
| **En-tête mobile** | Burger avec le libellé « Menu » dessous (12/500), logo, aide, compte (point rouge), panier (pastille rouge avec chiffre) ; recherche pleine largeur en dessous | [mobile-home-0](captures/mobile-home-0.png) |
| **Champ de recherche** | Hauteur 48, rayon 14, bordure 1 px `border.strong`, fond `surface.subtle`, icône loupe à gauche, appareil photo à droite | idem |
| **Bouton principal** | Fond #130C0C, libellé blanc 16/24 w500, hauteur 48, padding 12, rayon 28 | [mobile-cart-full](captures/mobile-cart-full.png) |
| **Bouton secondaire** | Fond transparent, bordure 1 px `border.default`, rayon 28, libellé `text.strong` (« Continuer mes achats », « Ajouter ») | [mobile-added-to-cart-panel](captures/mobile-added-to-cart-panel.png) |
| **Bouton sur photo** | Fond `overlay.glass`, bordure blanche à 30 %, rayon 28, texte blanc | [mobile-home-0](captures/mobile-home-0.png) |
| **Lien d'action** | 14–16 w500, souligné épais, avec chevron (« Voir plus ») | [mobile-listing-top](captures/mobile-listing-top.png) |
| **Puce d'option** | Rayon 999, padding 8, 13 px ; bordure 1 px `border.default`, ou 2 px `border.selected` si sélectionnée | [mobile-product-options](captures/mobile-product-options.png) |
| **Carte produit (mobile)** | Fond blanc, rayon 28, padding 8 ; image rayon 20 avec badge pilule blanc (« Black Friday ») et cœur ; vendeur 12/500 muted ; nom 14/500 strong ; étoiles ; prix 16/600 + prix barré 14/500 muted + pastille remise ; « En stock » 12 vert ; pastilles de couleur 27 px | [mobile-listing-grid](captures/mobile-listing-grid.png) |
| **Tuile catégorie** | Photo pleine, rayon 20, libellé blanc 20/500 en bas à gauche | [mobile-home-rayons](captures/mobile-home-rayons.png) |
| **Stepper (panier)** | Rail `surface.muted`, rayon 999, padding 1 ; étape active en pilule blanche ; numéros cerclés ; libellés 13 px, inactifs en muted | [mobile-cart-full](captures/mobile-cart-full.png) |
| **Panneau latéral** | 324 px de large, plein écran en hauteur ; en-tête fixé (titre 20/600, bouton fermer rond) ; pied fixé avec bouton principal et bouton secondaire pleine largeur | [mobile-added-to-cart-panel](captures/mobile-added-to-cart-panel.png) |
| **Pop-in** | Fond blanc, rayon 28, bordure `surface.subtle`, padding 16, bouton fermer | [mobile-product-top](captures/mobile-product-top.png) |
| **Barre d'achat fixée (fiche)** | Fond blanc, padding 8, filet `border.bar` ; select quantité 72×48 rayon 14 ; bouton principal ; cœur ; « Payez en 3x, 4x… » 13 muted | [mobile-product-top](captures/mobile-product-top.png) |
| **Barre de total fixée (panier)** | Fond blanc, `shadow.raised`, padding 10 / 10 / 20 ; « Total TTC (x1 article) » 16/500 + montant ; bouton principal pleine largeur | [mobile-cart-full](captures/mobile-cart-full.png) |
| **Carte récapitulatif** | Rayon 20, padding 20, `shadow.raised`, gap 16 ; lignes libellé / montant séparées par un filet | idem |
| **Encart d'information** | Fond `surface.subtle`, rayon 20, icône + texte 14 avec montant en gras (« 28 € en bon d'achat après cette commande ») | [mobile-product-complete](captures/mobile-product-complete.png) |
| **Ajout complémentaire** | Carte à bordure `border.default`, rayon 20, « Ajouter : Couette » + icône « + » | idem |
| **Accordéon** | En-tête 16/24 w500 `text.default`, padding 8 / 24, chevron | [mobile-home-reassurance](captures/mobile-home-reassurance.png) |
| **Champ, select, radio** | Hauteur 48, rayon 14, bordure 1 px `border.strong` ; radio 20 px rond | [mobile-product-top](captures/mobile-product-top.png) |
| **Bandeau éditorial de gamme** | Fond `surface.editorial` (#F3ECE2), rayon 28, padding 8 ; photo rayon 20 ; titre Recoleta 48 blanc sur photo + sous-titre Poppins 20/500 ; texte d'intro 16/500 repliable | [desktop-les-essentiels](captures/desktop-les-essentiels.png) |

---

## 6. Voix et ton

| Règle | Exemples relevés |
| --- | --- |
| Vouvoiement | « Retrouvez vos produits consultés ! », « Vous êtes ? » |
| Boutons à la première personne | « J'en profite », « Je découvre », « Je trouve mon matelas idéal » |
| Boutons d'action simples et directs | « Ajouter au panier », « Voir mon panier », « Continuer mes achats », « Choisir une livraison » |
| Phrases courtes et chaleureuses | « Des produits choisis pour toutes vos envies. », « Tout pour bien commencer » |
| Chiffres concrets pour rassurer | « Plus de 3,7 millions de clients livrés depuis 20 ans », « 30 jours satisfait ou remboursé (hors marketplace) » |
| Délais en durée, pas en date | « Livré sous 5 à 6 semaines », « Livré sous 3 à 7 jours » |

**Conséquence pour nos libellés** : passer les appels à l'action en première personne (« Je crée mon projet », « Je choisis ») et garder les boutons d'action simples (« Voir mon panier »).

---

## 7. Ce que le site a déjà et que notre solution réutilise

| Besoin de « Mon projet d'aménagement » | Pattern existant à réutiliser |
| --- | --- |
| Les 3 questions de démarrage | **Stepper du panier** (rail en pilule, étapes numérotées) |
| La jauge de budget fixée en bas | **Barre de total fixée du panier** (blanc, `shadow.raised`, total + bouton principal) |
| La jauge compacte sur la fiche | **Barre d'achat fixée** de la fiche : la jauge se pose au-dessus |
| Distance au seuil promo | **Pastille de remise** (#BD4800 sur #FFF1EB) |
| « ✓ Livré avant le… », seuil atteint | **Vert « En stock »** (#008554) au lieu du #1E7B4A inventé |
| Compléments (matelas après le lit) | **Panneau « Produits complémentaires »** et bloc « Compléter votre produit » |
| Récap du projet (studio, date, budget) | **Puces d'option** |
| Budget repère, conseils | **Encart d'information** (fond subtle, rayon 20) |
| Identité éditoriale du projet | **Bandeau de gamme « Les Essentiels »** (beige #F3ECE2, Recoleta) |
| Sélection filtrée par poste | **La gamme « Les Essentiels »** (410 produits) comme source |

---

## 8. Constats qui corrigent nos documents de phase

1. **« Les Essentiels » existe et vise déjà notre persona.** Page `/c/les-essentiels`, 410 produits : « Parce qu'aménager son premier chez-soi doit rester simple et accessible […] pensés pour équiper chaque pièce sans dépasser votre budget. » Mais c'est une liste à plat : une baignoire îlot et un salon de jardin y côtoient les lits, sans ordre de priorité ni suivi du budget. **Notre solution devient « donner un parcours à une intention que Vente-unique a déjà ».** C'est un argument fort pour la présentation.
2. **La friction 5 de l'audit est fausse.** La fiche du lit propose « Avec ou sans matelas » et « Compléter votre produit » (couette, oreiller), et l'ajout au panier ouvre un panneau « Produits complémentaires » qui suggère un matelas 160 × 200. À retirer de l'audit, et à citer comme point fort.
3. **« Vos styles préférés » n'existe pas** dans le menu mobile ni dans le menu desktop. Entrées transversales réelles du menu : Promotions, Nouveautés, Inspirations & conseils, Corner Prestige, Espace Pro. Point d'entrée à redéfinir : dans « Inspirations & conseils », ou en tête de la page « Les Essentiels ».
4. **Les frais de livraison pèsent dans le budget.** Pour le lit Mirsio à 699,99 €, le panier estime « à partir de 113,99 € » de livraison (environ 16 %). La jauge doit les inclure ou les signaler, sinon le budget affiché est faux.
5. **Le site exprime les délais en durée** (« sous 5 à 6 semaines »), pas en date. Afficher « Livré avant le 12 déc. » suppose de calculer la date à partir de cette durée : à présenter comme une évolution.
6. **#F4F4F4 n'est pas le fond de page**, c'est la couleur des placeholders de chargement. Le fond est blanc.
7. **Le vert d'état existe déjà** : #008554. Il remplace notre #1E7B4A.
8. **Les bordures font 1 px**, pas 0,8 px.
9. **« Bienvenue dans nos rayons » est confirmé** comme section de la home (tuiles photo), en mobile et en desktop.

---

## 9. Index des captures

| Fichier | Contenu |
| --- | --- |
| [mobile-home-0.png](captures/mobile-home-0.png) | Home mobile, haut de page (habillage Black Friday) |
| [mobile-home-rayons.png](captures/mobile-home-rayons.png) | « Bienvenue dans nos rayons », tuile Canapé |
| [mobile-home-nouveautes.png](captures/mobile-home-nouveautes.png) | Carte produit en carrousel, bouton principal, titre Recoleta |
| [mobile-home-reassurance.png](captures/mobile-home-reassurance.png) | Réassurance, accordéons du pied de page, réseaux sociaux |
| [mobile-home-full.jpg](captures/mobile-home-full.jpg) | Home mobile complète |
| [mobile-menu.png](captures/mobile-menu.png) | Menu mobile |
| [mobile-inspirations.png](captures/mobile-inspirations.png) | Page « Inspirations & conseils » |
| [mobile-listing-top.png](captures/mobile-listing-top.png) | Liste « Lit » : titre, sous-catégories, filtres |
| [mobile-listing-grid.png](captures/mobile-listing-grid.png) | Carte produit en liste |
| [mobile-product-top.png](captures/mobile-product-top.png) | Fiche produit, pop-in, barre d'achat fixée |
| [mobile-product-options.png](captures/mobile-product-options.png) | Puces d'option (avec ou sans matelas) |
| [mobile-product-complete.png](captures/mobile-product-complete.png) | « Compléter votre produit », délai, encart bon d'achat |
| [mobile-added-to-cart-panel.png](captures/mobile-added-to-cart-panel.png) | Panneau « Article ajouté au panier » et produits complémentaires |
| [mobile-cart-full.png](captures/mobile-cart-full.png) | Panier : stepper, récapitulatif, barre de total fixée |
| [desktop-home-top.png](captures/desktop-home-top.png) | Home desktop : en-tête et menu |
| [desktop-les-essentiels.png](captures/desktop-les-essentiels.png) | Gamme « Les Essentiels » |
