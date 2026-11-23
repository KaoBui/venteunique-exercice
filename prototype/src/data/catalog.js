// Catalogue data for the prototype.
// - Products with `real: true` come from the « Les Essentiels » range on vente-unique.com
//   (name, price, photo and URL as listed on 2026-11-22, see design-system/produits-les-essentiels.json).
// - The others fill gaps in the list (bedside tables, extra storage, armchairs…). They are
//   illustrative: made-up names, no photo.
// - Delivery costs and lead times are estimates for every product.

export const HOUSINGS = [
  { id: 'studio', label: 'Studio ou T1' },
  { id: 't2', label: 'Appartement T2 et +' },
  { id: 'coloc', label: 'Chambre en colocation' },
]

// budgetSlider: suggested range per housing (Figma « budgetSlider » variants). The handle starts
// in the middle of the range; the scale runs from 500 to 5 000 €.
export const BUDGET_SCALE = { min: 500, max: 5000 }
export const BUDGET_RANGES = {
  studio: { min: 800, max: 1200, start: 1000, label: 'un studio' },
  t2: { min: 1500, max: 2500, start: 2000, label: 'un appartement T2 et +' },
  coloc: { min: 500, max: 800, start: 650, label: 'une chambre en colocation' },
}

// Site-wide promo (same as the promo bar): -11% from 500 € of Vente-unique products.
export const PROMO = { threshold: 500, label: '-11%', code: 'VUBF11' }

export const GROUPS = [
  { id: 'dormir', label: 'Dormir' },
  { id: 'ranger', label: 'Ranger' },
  { id: 'manger', label: 'Manger' },
  { id: 'detendre', label: 'Se détendre' },
  { id: 'travailler', label: 'Travailler' },
]

// `base` = reference amount for a 1 500 € budget, set from the real « Les Essentiels » prices.
// The repères scale with the budget (see useProject.js).
export const POSTES = [
  { id: 'lit', group: 'dormir', label: 'Lit et matelas', base: 350, housings: ['studio', 't2', 'coloc'] },
  { id: 'chevet', group: 'dormir', label: 'Table de chevet', base: 50, housings: ['studio', 't2', 'coloc'] },
  { id: 'vetements', group: 'ranger', label: 'Rangement des vêtements', base: 200, housings: ['studio', 't2', 'coloc'] },
  { id: 'appoint', group: 'ranger', label: "Rangement d'appoint", base: 60, housings: ['studio', 't2', 'coloc'] },
  { id: 'table', group: 'manger', label: 'Table et chaises', base: 140, housings: ['studio', 't2'] },
  { id: 'canape', group: 'detendre', label: 'Canapé', base: 350, housings: ['studio', 't2'] },
  { id: 'meubletv', group: 'detendre', label: 'Meuble TV', base: 170, housings: ['studio', 't2'] },
  { id: 'fauteuil', group: 'detendre', label: "Fauteuil d'appoint", base: 150, housings: ['t2'] },
  { id: 'bureau', group: 'travailler', label: 'Bureau', base: 150, housings: ['studio', 't2', 'coloc'] },
]

const VU = 'https://www.vente-unique.com/p/'

/** Real product from vente-unique.com */
const R = (id, poste, name, short, price, shipping, days, slug) => ({
  id, poste, name, short, price, shipping, days, real: true,
  image: `/products/${id}.jpg`,
  url: VU + slug,
})
/** Illustrative product (no photo) */
const I = (id, poste, name, short, price, shipping, days) => ({
  id, poste, name, short, price, shipping, days, real: false, image: null, url: null,
})

export const PRODUCTS = [
  // Dormir
  R('kanani', 'lit', 'Ensemble 90 x 190 cm sommier coffre naturel clair + matelas mousse et coutil bambou ép.15cm - KANANI de NATUREA', 'KANANI 90 x 190', 349.99, 59, 12, 'ensemble-90-x-190-cm-sommier-coffre-blanc-matelas-mousse-et-coutil-bambou-ep-15cm-kanani-de-naturea'),
  I('oden', 'lit', 'Lit 90 x 190 cm + matelas ODEN - Blanc', 'ODEN 90 x 190', 279.99, 49, 9),
  I('somnia', 'lit', 'Matelas mousse 140 x 190 cm - SOMNIA', 'SOMNIA 140 x 190', 229.99, 29, 6),
  I('liam', 'lit', 'Lit coffre 140 x 190 cm + matelas - LIAM', 'LIAM 140 x 190', 549.99, 69, 16),
  I('niko', 'chevet', 'Table de chevet 1 tiroir - Blanc - NIKO', 'NIKO', 39.99, 9.9, 7),
  I('alba', 'chevet', 'Chevet suspendu - Chêne clair - ALBA', 'ALBA', 49.99, 9.9, 10),
  I('timeo', 'chevet', 'Table de chevet ronde - Noir - TIMEO', 'TIMEO', 59.99, 9.9, 8),

  // Ranger
  R('belvana', 'vetements', 'Dressing extensible - L110/140 cm - Blanc - BELVANA', 'BELVANA', 94.99, 19.9, 11, 'belvana-dressing-extensible-l110-140-cm-blanc-belvana'),
  R('listowel', 'vetements', 'Armoire 2 portes - L81 cm - Blanc - LISTOWEL', 'LISTOWEL', 159.99, 29, 13, 'armoire-2-portes-l81-cm-blanc-listowel'),
  R('grimori', 'vetements', 'Armoire 2 portes 2 tiroirs et 6 étagères - L100 cm - Blanc et doré - GRIMORI', 'GRIMORI', 199.99, 39, 16, 'grimori-armoire-2-portes-2-tiroirs-et-6-etageres-l100-cm-blanc-et-dore-grimori'),
  R('odilon', 'vetements', 'Armoire ODILON - 4 portes & 2 tiroirs - L.120 cm - Blanc', 'ODILON', 209.99, 39, 18, 'armoire-odilon-4-portes-2-tiroirs-l-120-cm-blanc'),
  R('vitorio', 'vetements', 'Commode 3 tiroirs avec armoire et miroir - Blanc et naturel - VITORIO', 'VITORIO', 219.99, 39, 17, 'commode-3-tiroirs-avec-armoire-et-miroir-blanc-vitorio'),
  I('kubo', 'appoint', 'Meuble de rangement 3 cubes - Blanc - KUBO', 'KUBO', 34.99, 9.9, 7),
  I('tom', 'appoint', 'Étagère 5 niveaux - Métal noir - TOM', 'TOM', 49.99, 9.9, 9),
  I('lena', 'appoint', 'Banc à chaussures - Bambou - LENA', 'LENA', 59.99, 9.9, 10),

  // Manger
  R('rolena', 'table', 'Table à manger 2 personnes en MDF et hêtre - Blanc - ROLENA', 'ROLENA', 69.99, 19.9, 10, 'table-a-manger-2-couverts-en-mdf-et-hetre-blanc-rolena'),
  R('jody', 'table', 'Lot de 2 chaises JODY - Polypropylène et Hêtre - Blanc', 'JODY (2 chaises)', 69.99, 14.9, 9, 'lot-de-2-chaises-jody-polypropylene-simili-et-hetre-noir'),
  I('duo', 'table', 'Table pliante + 2 chaises - Blanc - DUO', 'DUO', 129.99, 19.9, 9),

  // Se détendre
  R('inizor', 'canape', 'Canapé 3 places convertible en tissu INIZOR - Anthracite', 'INIZOR', 349.99, 59, 17, 'canape-3-places-convertible-en-tissu-inizor-turquoise'),
  I('nola', 'canape', 'Canapé 2 places - Velours vert - NOLA', 'NOLA', 279.99, 49, 14),
  I('leo', 'canape', 'Banquette BZ - Tissu chiné - LÉO', 'LÉO', 299.99, 49, 13),
  R('lotula', 'meubletv', 'Meuble TV avec 3 portes et 1 niche - Anthracite et naturel - LOTULA', 'LOTULA', 169.99, 29, 12, 'meuble-tv-avec-3-portes-et-1-niche-blanc-et-naturel-lotula'),
  I('sky', 'meubletv', 'Meuble TV bas - Blanc - SKY', 'SKY', 79.99, 14.9, 8),
  I('zen', 'meubletv', 'Meuble TV suspendu - Noyer - ZEN', 'ZEN', 99.99, 14.9, 10),
  I('romy', 'fauteuil', 'Fauteuil - Bouclette écrue - ROMY', 'ROMY', 149.99, 29, 12),
  I('fjord', 'fauteuil', 'Fauteuil scandinave - Gris - FJORD', 'FJORD', 129.99, 29, 11),
  I('cloud', 'fauteuil', 'Pouf XXL - Terracotta - CLOUD', 'CLOUD', 69.99, 14.9, 7),

  // Travailler
  R('loavia', 'bureau', 'Bureau console extensible avec 2 tiroirs - Noir et naturel - LOAVIA', 'LOAVIA', 149.99, 29, 11, 'bureau-console-extensible-avec-2-tiroirs-blanc-et-naturel-loavia'),
  I('fold', 'bureau', 'Bureau mural rabattable - Chêne - FOLD', 'FOLD', 89.99, 14.9, 11),
  I('corner', 'bureau', "Bureau d'angle - Noir - CORNER", 'CORNER', 129.99, 29, 13),
]

// Card details (Figma cardProductBox): colour swatches (names of the --swatch-* tokens),
// optional badge. Every product shows a 4.5 rating, as in the mock-ups.
const CARD_DETAILS = {
  kanani: { colors: ['natural', 'white'] },
  oden: { colors: ['white'] },
  somnia: { colors: ['white'] },
  liam: { colors: ['white', 'oak'] },
  niko: { colors: ['white'] },
  alba: { colors: ['oak'] },
  timeo: { colors: ['black'] },
  belvana: { colors: ['white'] },
  listowel: { colors: ['white', 'oak'] },
  grimori: { colors: ['white', 'gold'] },
  odilon: { colors: ['white'] },
  vitorio: { colors: ['white', 'natural'] },
  kubo: { colors: ['white'] },
  tom: { colors: ['black'] },
  lena: { colors: ['beech'] },
  rolena: { colors: ['white', 'beech'] },
  jody: { colors: ['white', 'beech'] },
  duo: { colors: ['white'] },
  inizor: { colors: ['anthracite', 'sand'], badge: 'Nouveauté' },
  nola: { colors: [] },
  leo: { colors: ['sand'] },
  lotula: { colors: ['anthracite', 'walnut'] },
  sky: { colors: ['white'] },
  zen: { colors: ['walnut'] },
  romy: { colors: ['white'] },
  fjord: { colors: ['anthracite'] },
  cloud: { colors: ['natural'] },
  loavia: { colors: ['black', 'oak'] },
  fold: { colors: ['oak'] },
  corner: { colors: ['black'] },
}
for (const p of PRODUCTS) Object.assign(p, { rating: 4.5, colors: [], badge: null }, CARD_DETAILS[p.id])

// Products shown on the « Les Essentiels » listing behind the set-up panel (screen A), as in Figma.
export const ESSENTIALS_LISTING = ['kanani', 'inizor', 'loavia', 'lotula', 'rolena', 'belvana']
export const ESSENTIALS_COUNT = 409
