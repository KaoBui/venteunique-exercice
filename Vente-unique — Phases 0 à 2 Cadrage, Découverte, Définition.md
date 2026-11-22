# Vente-unique — Phases 0 à 2 : Cadrage, Découverte, Définition

Nov 21, 2026 · @Kao

## Phase 0 — Cadrage

**Problématique reformulée** : aider un jeune qui s'installe pour la première fois à s'équiper entièrement sur Vente-unique, dans son budget et avant sa date d'emménagement, sans se perdre dans le catalogue.

**Périmètre** : le primo-accédant est le cas principal, celui qui guide chaque arbitrage. La solution reste ouverte à tous, car le besoin (savoir quoi acheter, dans quel ordre, pour combien) est le même pour tout projet d'aménagement ; seul le point de départ change.

| Axe | Objectif | Indicateur de succès |
| --- | --- | --- |
| Utilisateur | Savoir quoi acheter, dans quel ordre et pour combien, sans effort de planification | Taux de complétion du parcours, temps jusqu'au premier ajout au panier |
| Business | Transformer une visite exploratoire en un panier complet et multi-catégories | Conversion du segment, panier moyen, nombre de catégories par commande |

**Contraintes**

- S'intégrer au design system existant de vente-unique.com, sans en inventer un nouveau.
- Concevoir d'abord pour le mobile, support principal de la cible.
- Maquette dans Figma, composant en Vue.js.
- Pas d'accès aux données ni aux utilisateurs de Vente-unique : la recherche s'appuie sur le site public et des sources externes, et les hypothèses sont annoncées comme telles.

**Hypothèses de départ** (à confirmer ou infirmer en phase 1)

1. Le blocage principal n'est pas de trouver un meuble, mais de savoir quoi acheter en premier.
2. Le budget est pensé globalement (« j'ai X € pour tout »), alors que le site le traite produit par produit.
3. La date d'emménagement rend les délais de livraison critiques.
4. Un petit logement rend les dimensions et le multi-usage décisifs.
5. La navigation par catégorie de produit ne correspond pas au raisonnement par besoin (« dormir », « ranger », « manger »).
6. Les proches (parents) participent souvent au financement.

## Phase 1 — Desk research

Vente-unique a déjà tous les leviers qui comptent pour un primo-accédant (prix bas, paiement fractionné, livraison variée), et même une gamme pensée pour le premier logement. Ce qui lui manque, c'est un parcours qui les assemble autour de son besoin.

### Vente-unique en bref

| Donnée | Valeur | Source |
| --- | --- | --- |
| Chiffre d'affaires, exercice 2025-2026 (oct. 2025 – sept. 2026) | 243,1 M€, +21 % | [Communiqué T4](https://www.abcbourse.com/marches/vente-unique-accelere-une-nouvelle-fois-au-dernier-trimestre-2025-2026-et-boucle_705980) |
| Dont France | 109,2 M€, +9 % | Idem |
| Présence | 20 pays pour Vente-unique et la marketplace | [Option Finance](https://www.optionfinance.fr/info-financiere-en-continu/d/2026-11-12-vente-unique-20e-exercice-consecutif-de-croissance-rentable-et-expansion-reussie-a-linternational.html) |
| Clients livrés | Plus de 3,7 millions | [Qui sommes-nous](https://www.vente-unique.com/s/qui-sommes-nous) |
| Positionnement | Pure player, prix compétitifs, logistique intégrée ; montée en gamme avec Habitat | Idem |

### Les leviers déjà en place

- **Paiement fractionné** : Alma en 3 ou 4 fois de 150 à 4 000 € ; Cafineo en 5, 10 ou 12 fois de 300 à 10 000 €, et jusqu'à 60 fois au-delà ([moyens de paiement](https://www.vente-unique.com/s/moyens-de-paiement)).
- **Promos à seuil** : un code de réduction s'applique à partir d'un montant de panier, sur les seuls produits Vente-unique (-11 % dès 500 € avec le code VUBF11 le 21 novembre 2026).
- **Une gamme pour le premier logement** : [« Les Essentiels — Tout pour bien commencer »](https://www.vente-unique.com/c/les-essentiels), 410 produits, présentée ainsi : « Parce qu'aménager son premier chez-soi doit rester simple et accessible […] pensés pour équiper chaque pièce sans dépasser votre budget. » Vente-unique a donc déjà identifié ce segment. Mais la gamme est une liste à plat : une baignoire îlot et un salon de jardin y côtoient les lits, sans ordre de priorité ni suivi du budget.
- **Fidélité** : un bon d'achat de 4 % pour chaque commande.
- **Livraison** : au pied du camion, dans la pièce sur rendez-vous, en point relais ou en retrait. Une commande de plusieurs articles peut arriver en plusieurs livraisons par des transporteurs différents ([livraison](https://www.vente-unique.com/s/livraison)).
- **Retours** : 30 jours satisfait ou remboursé, sauf pour la marketplace.

### Le primo-accédant en chiffres

- Pour s'installer en 2026, il faut prévoir **1 200 à 3 000 € au total**, tous postes confondus (loyer, dépôt de garantie, assurance, équipement) ([ImmoJeune](https://www.immojeune.com/actualites/locataire/combien-prevoir-pour-emmenager.html)).
- Dans un logement vide, il faut souvent tout acheter. Les essentiels cités sont le lit, le matelas, la table, les chaises, la vaisselle et le réfrigérateur (idem).
- Une fois le loyer payé, 52 % des étudiants ont moins de 200 € par mois pour le reste ([ImmoJeune, d'après la FAGE](https://www.immojeune.com/actualites/locataire/cout-rentree-etudiante.html)).
- Des aides existent pour l'installation, comme le Fonds de solidarité pour le logement, qui finance le mobilier de première nécessité ([CAF](https://caf.fr/allocataires/vies-de-famille/articles/equiper-son-premier-logement-en-toute-serenite)).

**Ce que ça implique** : le budget meubles est pris dans une enveloppe globale déjà tendue. Le paiement fractionné et le seuil promo sont donc des arguments forts, à condition d'être visibles au bon moment du parcours.

## Phase 1 — Audit heuristique du parcours actuel

Le site est très bon pour quelqu'un qui sait déjà ce qu'il cherche. Il n'aide pas quelqu'un qui part de zéro : on ne peut ni partir de sa situation, ni suivre un budget global, ni savoir si tout arrivera avant la date d'emménagement.

Parcours audité : page d'accueil → menu → liste produits → fiche produit ([lit coffre Mirsio](https://www.vente-unique.com/p/mirsio-lit-coffre-160-x-200-cm-tissu-taupe-mirsio)). Gravité sur l'échelle de Nielsen, de 1 (cosmétique) à 4 (bloquant).

| # | Friction constatée | Heuristique | Gravité | Impact business |
| --- | --- | --- | --- | --- |
| 1 | Aucune entrée par situation (« je m'installe », « petit espace »). Le menu est organisé par pièce et par style. | Correspondance avec le monde réel | 3 | Le visiteur repart chercher une checklist ailleurs, et peut-être acheter ailleurs. |
| 2 | Rien n'aide à savoir quoi acheter en premier. Les inspirations parlent de style, pas d'essentiels. | Reconnaissance plutôt que rappel | 3 | Paralysie du choix, visites sans achat. |
| 3 | Le budget se raisonne produit par produit (filtre prix par tranches). Aucun suivi du total. Le seuil promo (-11 % dès 500 €) est affiché sans dire combien il reste. | Visibilité de l'état du système | 3 | Le seuil promo et le paiement fractionné ne poussent pas à compléter le panier. |
| 4 | Le délai est affiché en durée et produit par produit (« Livré sous 5 à 6 semaines » pour le lit, « sous 3 à 7 jours » pour le matelas), jamais en date. Une commande de plusieurs articles peut arriver en plusieurs fois. C'est à l'utilisateur de calculer si tout arrivera avant son emménagement. | Visibilité de l'état du système | 3 | Risque d'abandon quand l'utilisateur a une date fixe. |
| 5 | Les frais de livraison ne s'additionnent qu'au panier : « à partir de 113,99 € » pour le lit audité à 699,99 €, soit environ 16 % de plus. | Visibilité de l'état du système | 3 | Le budget calculé de tête est faux ; mauvaise surprise au moment de payer, abandon. |
| 6 | La garantie de retour de 30 jours ne s'applique pas aux produits de la marketplace. Un novice ne fait pas la différence. | Prévention des erreurs | 2 | Mauvaise surprise après achat, appels au service client. |
| 7 | Produit à monter soi-même : aucune aide au montage n'est visible sur la fiche. | Aide et documentation | 2 | Frein pour un jeune sans outils. À vérifier. |

**Points forts à garder** : des filtres riches (dimensions, disponibilité sous 2 ou 4 semaines, vendeur), le paiement fractionné affiché sur la fiche (de 3 à 36 fois), beaucoup d'avis (4,5 sur 723 pour le lit audité), une réassurance claire, et **une vraie vente complémentaire** : la fiche du lit propose « Avec ou sans matelas » et « Compléter votre produit » (couette, oreiller), et l'ajout au panier ouvre un panneau « Produits complémentaires » qui suggère un matelas 160 × 200.

**Captures** : le parcours a été relevé en mobile le 21 novembre 2026 (voir [design-system/captures](design-system/captures/)). Les frictions 1, 3, 4 et 5 sont à annoter sur ces captures pour la présentation. La friction 7 reste à vérifier.

*Correction* : une première version de l'audit indiquait que la fiche du lit ne proposait pas de matelas. Le relevé en mobile montre le contraire ; la friction a été retirée.

## Phase 1 — Benchmark

Aucun acteur ne relie la checklist, le budget et l'achat dans un même parcours. Les guides « premier logement » restent des articles éditoriaux, à côté du tunnel d'achat. C'est l'espace que Vente-unique peut prendre.

| Acteur | Ce qu'il propose à un primo-accédant | Ce qui marche | Ce qui manque |
| --- | --- | --- | --- |
| [IKEA](https://www.ikea.com/ph/en/ideas/first-apartment-essentials-for-settling-into-your-own-place-pub0372c200) | Un guide des essentiels en 6 sections (chambre, salle de bain, salon, cuisine, ménage, outils) avec des liens vers les produits | L'entrée par situation ; l'ordre implicite (le matelas avant le cadre de lit) | Ni prix, ni ajout au panier depuis la liste, ni budget chiffré |
| [Maisons du Monde](https://corporate.maisonsdumonde.com/en/node/1810) | Une app 3D pour visualiser plus de 600 produits chez soi ; un atelier déco en magasin pour un déménagement | Aide à se projeter dans l'espace | Aide au style, pas aux priorités ni au budget ; l'atelier n'existe que dans quelques magasins |
| [Conforama](https://www.conforama.fr/boutique/offre-du-moment-002/NW-4259-categorie~gros-electromenager/NW-4080-rayon~lavage) | « Rentrée à prix coûtant » du 1er juillet au 30 septembre 2026, avec 50 € de remise étudiante ; [location de camionnette](https://www.conforama.fr/services/faq/Retrait_Livraison/Comment-louer-une-camionnette-dans-l-un-de-nos-magasins) à 20 € la première heure | Cible explicite, levier prix, aide au transport | Une promotion, pas un accompagnement ; la camionnette exige le permis depuis plus d'un an |
| [La Redoute Intérieurs](https://www.laredoute.fr/pplp/cat-389944.aspx) | Une wishlist, une offre seconde vie, un financement Sofinco | La wishlist permet de préparer ses achats dans le temps | Rien de dédié au premier logement |
| Hors secteur ([C&A](https://www.c-and-a.com/fr/fr/shop/guide-pour-son-premier-logement), [123loger](https://123loger.com/blog/comment-emmenager-petit-budget-equipements-indispensables-astuces-recup-achats-malins)) | Des checklists téléchargeables, avec priorités (dormir d'abord) et conseils budget | Répondent exactement au besoin « par quoi commencer » | Déconnectées de tout achat |

**Bonnes pratiques à reprendre** : partir de la situation (IKEA), prioriser les besoins (123loger), permettre de préparer ses achats dans le temps (wishlist de La Redoute), traiter le transport comme une partie du problème (Conforama).

**Manque commun** : personne ne transforme la checklist en panier, avec un budget suivi et une date de livraison garantie.

**Et chez Vente-unique** : la gamme « Les Essentiels » répond à la même intention que le guide d'IKEA, mais sous la forme d'une liste produits. L'intention est là ; le parcours manque.

## Phase 1 — Entretiens (prévus dans la méthode, non menés)

Dans une vraie mission, je mènerais 3 à 5 entretiens de 15 minutes avec des 20-28 ans qui ont emménagé seuls récemment. Pour cet exercice, je ne les mène pas : je pars d'hypothèses annoncées, appuyées sur la recherche documentaire, l'audit et le benchmark. Chacune a un niveau de confiance et un moyen de la valider.

**Ce que les entretiens auraient cherché à savoir**

1. Par quoi l'utilisateur a commencé, et comment il a décidé quoi acheter en premier.
2. Comment il a suivi son budget.
3. Le récit d'un achat précis, du début jusqu'à la livraison.

**Hypothèses retenues**

| # | Hypothèse | Sur quoi elle s'appuie | Confiance | Comment la valider |
| --- | --- | --- | --- | --- |
| H1 | Le blocage principal est de savoir quoi acheter en premier. | Audit (frictions 1 et 2) ; des checklists existent hors secteur, signe d'un besoin non couvert | Moyenne à haute | Test non modéré de la maquette ; recherches internes sur « premier appartement » |
| H2 | Le budget est pensé globalement, pas produit par produit. | Budget d'installation de 1 200 à 3 000 € à répartir ; 52 % des étudiants ont moins de 200 € par mois après le loyer | Haute | Usage du filtre prix ; abandons de panier par montant |
| H3 | Les délais de livraison sont critiques, car la date d'emménagement est fixe. | Délais affichés en durée, différents d'un produit à l'autre (de 3 jours à 6 semaines) ; livraisons multiples | Moyenne | Abandons après affichage de la date ; contacts au service client sur les délais |
| H4 | Les dimensions et le multi-usage sont décisifs dans un petit logement. | IKEA et Maisons du Monde investissent dans la visualisation de l'espace | Moyenne | Motifs de retour « ne rentre pas » |
| H5 | On raisonne par besoin (dormir, ranger, manger), pas par catégorie. | Les guides d'IKEA et de 123loger sont structurés par besoin | Moyenne | Tri de cartes ; taux d'usage du parcours guidé face à la navigation classique |
| H6 | Les proches participent au financement. | Aucune donnée directe | Faible | Sondage court à la commande |

**Conséquence** : je construis la solution sur H1, H2 et H3, les mieux étayées. H4 et H6 restent dans la roadmap. Le plan de validation est détaillé en phase 5.

## Phase 2 — Proto-persona et Jobs To Be Done

La persona représente quelqu'un qui doit tout acheter, avec un budget fixe et une date imposée. C'est un proto-persona : il s'appuie sur la recherche documentaire et sur les hypothèses H1 à H6.

### Léa, 23 ans, premier CDI

|  |  |
| --- | --- |
| Situation | Quitte la colocation pour un studio vide de 25 m² dans une grande ville |
| Date | Emménage dans 3 semaines, date du bail fixée |
| Budget meubles | Environ 1 500 €, dont une partie avancée par ses parents (hypothèse H6) |
| Mobilité | Pas de voiture, 3e étage sans ascenseur |
| Outils | Achète sur mobile, compare beaucoup, lit les avis |
| Ce qu'elle veut | Dormir correctement dès le premier soir, puis avoir un chez-soi qui lui ressemble |
| Ce qui l'inquiète | Oublier un essentiel, dépasser son budget, recevoir le lit après son arrivée, que les meubles ne rentrent pas |

### Jobs To Be Done

**Job principal**

> Quand j'emménage pour la première fois dans un logement vide, je veux savoir quoi acheter en priorité pour mon budget, afin d'être installée dès le premier jour sans mauvaise surprise.

**Jobs associés**

- **Fonctionnel** : vérifier que tout rentre dans 25 m² et passe par l'escalier.
- **Fonctionnel** : recevoir les essentiels avant la date d'emménagement.
- **Financier** : répartir la dépense sans dépasser l'enveloppe globale.
- **Émotionnel** : se sentir capable de s'installer seule, sans dépendre des autres.
- **Social** : montrer à ses proches (qui financent en partie) qu'elle gère bien son budget.

## Phase 2 — Journey map du parcours actuel

Le parcours de Léa décroche aux étapes 2 et 5 : elle doit faire sa liste ailleurs, puis composer son panier sans voir son total ni ses dates de livraison. Ce sont aussi les deux moments où Vente-unique peut gagner le panier entier.

| Étape | Ce que fait Léa | Ce qu'elle ressent | Friction (n° de l'audit) | Opportunité business |
| --- | --- | --- | --- | --- |
| 1. Le déclic | Signe son bail, se rend compte que le studio est vide | Enthousiaste, vite dépassée | — | Être trouvé sur « meubler son premier appartement » |
| 2. Lister ses besoins | Cherche une checklist sur Google ou demande à ses proches | Perdue : par quoi commencer ? | 1, 2 | Capter le visiteur avec sa liste, avant les concurrents |
| 3. Explorer | Navigue par catégorie, une pièce après l'autre | Submergée par le choix | 1, 2 | Proposer une sélection courte adaptée au budget et à l'espace |
| 4. Comparer et choisir | Ouvre des fiches, vérifie les dimensions, les avis et les délais | Rassurée par les avis, inquiète pour la taille et les délais | 4, 7 | Les compléments existent déjà (matelas proposé avec le lit) : les relier au projet |
| 5. Composer et payer | Additionne de tête, découvre les frais de livraison au panier, hésite | Stressée : ça fait combien, ça arrive quand ? | 3, 4, 5, 6 | Seuil promo et paiement fractionné au bon moment ; panier multi-catégories |
| 6. Livraison et montage | Reçoit plusieurs colis, à des dates différentes, et monte seule | Soulagée ou frustrée selon le timing | 4, 7 | Proposer la livraison dans la pièce ; limiter les appels au service client |
| 7. Installée | Complète ensuite avec de la déco et du rangement | Fière | — | Deuxième commande, fidélité avec le bon d'achat de 4 % |

**À noter** : les émotions et l'étape 2 sont des hypothèses, à valider par la recherche utilisateur.

## Phase 2 — Insight, How Might We et priorisation

**Insight**

> Un primo-accédant ne cherche pas un meuble : il cherche à savoir quoi acheter, dans quel ordre et pour combien au total. Vente-unique lui vend des produits un par un, alors qu'il raisonne en « kit pour s'installer » avec une enveloppe et une date.

Cet insight s'appuie sur l'audit (frictions 1 à 5), le benchmark (aucun acteur ne relie checklist, budget et achat), la recherche documentaire (budget global tendu) et la gamme « Les Essentiels » : Vente-unique a identifié le besoin, mais y répond encore produit par produit. Il reste une hypothèse à valider (voir la phase 5).

**How Might We**

1. Comment pourrions-nous aider un primo-accédant à savoir quoi acheter en premier, selon son budget et son espace ?
2. Comment pourrions-nous rendre le total du budget et le seuil promo visibles pendant toute la composition du panier ?
3. Comment pourrions-nous garantir que les essentiels arrivent avant la date d'emménagement ?
4. Comment pourrions-nous l'aider à vérifier que tout rentre dans un petit logement ?
5. Comment pourrions-nous permettre à ses proches de contribuer à son équipement ?

**Décision** : je retiens les HMW 1 et 2, traités ensemble dans un parcours guidé avec une jauge de budget. Le HMW 3 s'y intègre à moindre coût, en réutilisant le filtre de disponibilité qui existe déjà. Les HMW 4 et 5 vont dans la roadmap.

&#91;embedded content: Matrice de priorisation · 5 HMW, valeur utilisateur × valeur business\]

Les HMW 1 et 2 sont les seuls à cumuler une forte valeur pour Léa et pour Vente-unique, avec un effort moyen ou faible. Le HMW 3 apporte beaucoup à l'utilisateur pour peu d'effort : il est intégré au parcours retenu.

## Passage à la phase 3

L'insight et le choix des HMW 1 et 2 sont posés. Ils reposent sur des hypothèses annoncées, pas sur des entretiens : je le dis dans la présentation, et la phase 5 explique comment les valider en production.
