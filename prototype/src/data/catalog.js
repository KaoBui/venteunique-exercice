// Illustrative data for the prototype. Names, prices and delivery times are made up
// in the style of the Vente-unique catalogue; they are not real products.

export const HOUSINGS = [
  { id: 'studio', label: 'Studio ou T1' },
  { id: 't2', label: 'Appartement T2 et +' },
  { id: 'coloc', label: 'Chambre en colocation' },
]

export const BUDGET_PRESETS = [800, 1500, 2500]

// Site-wide promo (same as the promo bar): -11% from 500 € of Vente-unique products.
export const PROMO = { threshold: 500, label: '-11%', code: 'VUBF11' }

export const GROUPS = [
  { id: 'dormir', label: 'Dormir' },
  { id: 'ranger', label: 'Ranger' },
  { id: 'manger', label: 'Manger' },
  { id: 'detendre', label: 'Se détendre' },
  { id: 'travailler', label: 'Travailler' },
]

// `base` = reference amount for a 1 500 € budget. Repères scale with the budget.
export const POSTES = [
  { id: 'lit', group: 'dormir', label: 'Lit et matelas', base: 400, housings: ['studio', 't2', 'coloc'] },
  { id: 'chevet', group: 'dormir', label: 'Table de chevet', base: 50, housings: ['studio', 't2', 'coloc'] },
  { id: 'vetements', group: 'ranger', label: 'Rangement des vêtements', base: 200, housings: ['studio', 't2', 'coloc'] },
  { id: 'appoint', group: 'ranger', label: "Rangement d'appoint", base: 60, housings: ['studio', 't2', 'coloc'] },
  { id: 'table', group: 'manger', label: 'Table et chaises', base: 200, housings: ['studio', 't2'] },
  { id: 'canape', group: 'detendre', label: 'Canapé', base: 350, housings: ['studio', 't2'] },
  { id: 'meubletv', group: 'detendre', label: 'Meuble TV', base: 120, housings: ['studio', 't2'] },
  { id: 'fauteuil', group: 'detendre', label: "Fauteuil d'appoint", base: 150, housings: ['t2'] },
  { id: 'bureau', group: 'travailler', label: 'Bureau', base: 100, housings: ['studio', 't2', 'coloc'] },
]

const P = (id, poste, name, short, price, shipping, days, image) => ({
  id, poste, name, short, price, shipping, days, image,
})

export const PRODUCTS = [
  // Dormir
  P('prestige', 'lit', 'Ensemble sommier coffre + matelas 90 x 190 cm — PRESTIGE', 'PRESTIGE 90 x 190', 399.99, 63, 12, '/products/prestige-ensemble.png'),
  P('oden', 'lit', 'Lit 90 x 190 cm + matelas ODEN — blanc', 'ODEN 90 x 190', 279.99, 49, 9),
  P('noah', 'lit', 'Lit mezzanine 90 x 190 cm NOAH — pin', 'NOAH mezzanine', 319.99, 49, 14),
  P('somnia', 'lit', 'Matelas mousse 140 x 190 cm SOMNIA', 'SOMNIA 140 x 190', 229.99, 29, 6),
  P('liam', 'lit', 'Lit coffre 140 x 190 cm LIAM + matelas', 'LIAM 140 x 190', 549.99, 69, 16),
  P('niko', 'chevet', 'Table de chevet 1 tiroir NIKO — blanc', 'NIKO', 39.99, 9.9, 7),
  P('alba', 'chevet', 'Chevet suspendu ALBA — chêne clair', 'ALBA', 49.99, 9.9, 10),
  P('timeo', 'chevet', 'Table de chevet ronde TIMEO — noir', 'TIMEO', 59.99, 9.9, 8),
  P('pia', 'chevet', 'Lot de 2 chevets PIA — blanc et bois', 'PIA (lot de 2)', 69.99, 14.9, 11),

  // Ranger
  P('oslo', 'vetements', 'Penderie 2 portes OSLO — L. 80 cm', 'OSLO', 159.99, 29, 13),
  P('linea', 'vetements', 'Commode 4 tiroirs LINEA — blanc', 'LINEA', 189.99, 29, 17),
  P('mika', 'vetements', 'Portant à vêtements avec étagère MIKA', 'MIKA', 69.99, 14.9, 11),
  P('elio', 'vetements', 'Armoire 2 portes ELIO — L. 90 cm', 'ELIO', 199.99, 39, 18),
  P('sola', 'vetements', 'Commode 3 tiroirs SOLA — chêne clair', 'SOLA', 129.99, 19.9, 16),
  P('kano', 'vetements', 'Dressing ouvert KANO — L. 120 cm', 'KANO', 179.99, 29, 19),
  P('flex', 'vetements', 'Penderie en tissu FLEX — gris', 'FLEX', 39.99, 9.9, 6),
  P('berg', 'vetements', 'Armoire 3 portes BERG — L. 135 cm', 'BERG', 289.99, 49, 20),
  P('kubo', 'appoint', 'Meuble de rangement 3 cubes KUBO — blanc', 'KUBO', 34.99, 9.9, 7),
  P('tom', 'appoint', 'Étagère 5 niveaux TOM — métal noir', 'TOM', 49.99, 9.9, 9),
  P('lena', 'appoint', 'Banc à chaussures LENA — bambou', 'LENA', 59.99, 9.9, 10),
  P('roll', 'appoint', 'Desserte à roulettes ROLL — 3 niveaux', 'ROLL', 44.99, 9.9, 8),
  P('ladder', 'appoint', 'Bibliothèque échelle LADDER — chêne', 'LADDER', 79.99, 14.9, 12),

  // Manger
  P('loft', 'table', 'Table + 4 chaises LOFT — noir et bois', 'LOFT', 199.99, 39, 15),
  P('duo', 'table', 'Table pliante + 2 chaises DUO — blanc', 'DUO', 129.99, 19.9, 9),
  P('bar', 'table', 'Table haute + 2 tabourets BAR — chêne', 'BAR', 169.99, 29, 12),
  P('elia', 'table', 'Table extensible ÉLIA + 4 chaises', 'ÉLIA', 329.99, 49, 18),

  // Se détendre
  P('luna', 'canape', 'Canapé convertible 3 places LUNA — gris', 'LUNA', 349.99, 59, 17),
  P('nola', 'canape', 'Canapé 2 places NOLA — velours vert', 'NOLA', 279.99, 49, 14),
  P('leo', 'canape', 'Banquette BZ LÉO — tissu chiné', 'LÉO', 299.99, 49, 13),
  P('milo', 'canape', "Canapé d'angle convertible MILO — beige", 'MILO', 549.99, 69, 21),
  P('kira', 'meubletv', 'Meuble TV 2 portes KIRA — chêne clair', 'KIRA', 119.99, 19.9, 12),
  P('sky', 'meubletv', 'Meuble TV bas SKY — blanc', 'SKY', 79.99, 14.9, 8),
  P('zen', 'meubletv', 'Meuble TV suspendu ZEN — noyer', 'ZEN', 99.99, 14.9, 10),
  P('nord', 'meubletv', 'Meuble TV 160 cm NORD — chêne', 'NORD', 189.99, 29, 15),
  P('romy', 'fauteuil', 'Fauteuil ROMY — bouclette écrue', 'ROMY', 149.99, 29, 12),
  P('fjord', 'fauteuil', 'Fauteuil scandinave FJORD — gris', 'FJORD', 129.99, 29, 11),
  P('cloud', 'fauteuil', 'Pouf XXL CLOUD — terracotta', 'CLOUD', 69.99, 14.9, 7),

  // Travailler
  P('naomi', 'bureau', 'Bureau 1 tiroir NAOMI — blanc', 'NAOMI', 99.99, 19.9, 9),
  P('fold', 'bureau', 'Bureau mural rabattable FOLD — chêne', 'FOLD', 89.99, 14.9, 11),
  P('corner', 'bureau', "Bureau d'angle CORNER — noir", 'CORNER', 129.99, 29, 13),
  P('study', 'bureau', 'Bureau + chaise STUDY — blanc et bois', 'STUDY', 149.99, 29, 14),
]

// Products shown on the « Les Essentiels » listing behind the set-up panel (screen A).
export const ESSENTIALS_LISTING = ['prestige', 'luna', 'naomi', 'kira', 'loft', 'linea']
export const ESSENTIALS_COUNT = 410
