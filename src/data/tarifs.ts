/** Tarifs issus de vos supports (€). */

export type LigneTarif = {
  label: string
  /** Prix affiché tel quel si chaîne (ex. GRATUITE*, Devis) */
  prix?: number
  prixLabel?: string
  supplement?: boolean
}

export type ColonneTarifs = {
  titre: string
  sousTitre?: string
  lignes: LigneTarif[]
  notes?: string[]
}

export type BlocTarifs = {
  id: string
  titrePage: string
  intro?: string
  colonnes: ColonneTarifs[]
}

export const apercuPrestations = [
  {
    titre: 'Manucure',
    texte:
      'Sublimer vos ongles avec des poses naturelles, complètes, capsules ou poses américaines.',
  },
  {
    titre: 'Pédicure',
    texte: 'Soins des pieds sur ongles naturels ou avec rallongement pour une ligne impeccable.',
  },
  {
    titre: 'Spa pieds',
    texte: 'Bain relaxant, soin pour adoucir la peau et nettoyage en profondeur.',
  },
  {
    titre: 'Extension de cils',
    texte: 'Intensité et regard structuré avec des extensions posées sur vos cils naturels.',
  },
  {
    titre: 'Microblading / Microshading',
    texte: 'Structurer la ligne des sourcils pour harmoniser le visage.',
  },
  {
    titre: 'Blanchiment dentaire',
    texte: 'Éclaircir l’émail pour un sourire plus lumineux.',
  },
  {
    titre: 'Épilation',
    texte: 'Peau lisse grâce aux épilations à la cire, du maillot aux jambes.',
  },
] as const

export const tarifManucure: BlocTarifs = {
  id: 'manucure',
  titrePage: 'Manucure',
  intro: 'Tarifs manucure — vernis semi-permanent, gainage, pose américaine et pose complète.',
  colonnes: [
    {
      titre: 'Ongles naturels',
      sousTitre: 'Vernis semi-permanent',
      lignes: [
        { label: '1 couleur', prix: 25 },
        { label: 'Plusieurs couleurs', prix: 30 },
        { label: 'French blanche', prix: 35 },
        { label: 'French coloré', prix: 40 },
      ],
      notes: [
        'Dépose : 15 €',
        'Dépose externe : 20 €',
        'Pas de remplissage — pose complète à prévoir.',
      ],
    },
    {
      titre: 'Gainage ongles',
      sousTitre: 'Gel sur ongles naturels',
      lignes: [
        { label: 'Gel', prix: 30 },
        { label: 'Gel + couleur unie', prix: 30 },
        { label: 'Gel + plusieurs couleurs', prix: 35 },
        { label: 'French blanche', prix: 35 },
        { label: 'French colorée', prix: 40 },
        { label: 'Babyboomer', prix: 40 },
      ],
      notes: [
        'Dépose : 15 € · Dépose externe : 20 €',
        'Remplissage sous 3 semaines : −5 €',
        'Au-delà de 3 semaines : pose complète à prévoir.',
        'Devis de pose en DM.',
      ],
    },
    {
      titre: 'Pose capsule américaine',
      sousTitre: 'Pose capsule gel',
      lignes: [
        { label: 'Capsule moyenne ou longue', prix: 35 },
        { label: 'Capsule moyenne ou longue + french', prix: 40 },
        { label: 'Capsule moyenne ou longue + babyboomer', prix: 50 },
        { label: 'French coloré', prix: 45 },
        { label: 'Strass / paillettes', prix: 5, supplement: true },
        { label: 'Nail art', prix: 10, supplement: true },
      ],
      notes: [
        'Dépose : 15 € · Dépose externe : 20 €',
        'Remplissage sous 3 semaines : −5 €',
        'Au-delà de 3 semaines : pose complète.',
        'Si pose externe : prévoir une dépose.',
      ],
    },
    {
      titre: 'Pose complète',
      sousTitre: 'Pose capsule gel',
      lignes: [
        { label: 'Capsule + gel', prix: 35 },
        { label: 'Capsule + gel + couleur unie', prix: 35 },
        { label: 'Gel + plusieurs couleurs', prix: 40 },
        { label: 'French blanche', prix: 40 },
        { label: 'French coloré', prix: 45 },
        { label: 'Babyboomer', prix: 45 },
      ],
      notes: [
        'Dépose : 15 € · Dépose externe : 20 €',
        'Remplissage sous 3 semaines : −5 €',
        'Au-delà de 3 semaines : pose complète.',
        'Devis de pose en DM.',
      ],
    },
  ],
}

export const tarifPedicure: BlocTarifs = {
  id: 'pedicure',
  titrePage: 'Pédicure',
  intro: 'Tarifs pieds — naturel, gainage et pose complète.',
  colonnes: [
    {
      titre: 'Ongles naturel',
      sousTitre: 'Vernis semi-permanent',
      lignes: [
        { label: '1 couleur', prix: 20 },
        { label: 'Plusieurs couleurs', prix: 25 },
        { label: 'French blanche', prix: 30 },
        { label: 'French coloré', prix: 35 },
      ],
      notes: ['Dépose : 15 € · Dépose externe : 20 €', 'Pas de remplissage — pose complète à prévoir.'],
    },
    {
      titre: 'Gainage ongles',
      sousTitre: 'Gel sur ongles naturels',
      lignes: [
        { label: 'Gel', prix: 25 },
        { label: 'Gel + couleur unie', prix: 25 },
        { label: 'Gel + plusieurs couleurs', prix: 30 },
        { label: 'French blanche', prix: 30 },
        { label: 'French coloré', prix: 35 },
      ],
      notes: ['Dépose : 15 € · Dépose externe : 20 €', 'Pas de remplissage — pose complète à prévoir.'],
    },
    {
      titre: 'Pose complète',
      sousTitre: 'Pose capsule gel',
      lignes: [
        { label: 'Capsule + gel', prix: 30 },
        { label: 'Capsule + gel + couleur unie', prix: 30 },
        { label: 'Gel + plusieurs couleurs', prix: 35 },
        { label: 'French blanche', prix: 35 },
        { label: 'French coloré', prix: 40 },
      ],
      notes: ['Dépose : 15 € · Dépose externe : 20 €', 'Pas de remplissage — pose complète à prévoir.'],
    },
  ],
}

export const tarifSpaPieds: BlocTarifs = {
  id: 'spa-pieds',
  titrePage: 'Spa pieds',
  intro: 'Bains et formules spa avec options soins, pose et dépose.',
  colonnes: [
    {
      titre: 'Bain simple',
      sousTitre: 'Bain des pieds à l’eau froide ou tiède',
      lignes: [
        { label: 'Bain 10 min', prix: 25 },
        { label: '+ dépose', prix: 30 },
        { label: 'Bain 20 min', prix: 30 },
        { label: '+ dépose', prix: 35 },
        { label: 'Bain 30 min', prix: 35 },
        { label: '+ dépose', prix: 40 },
      ],
    },
    {
      titre: 'Bain et soins',
      sousTitre: 'Bain des pieds avec soins',
      lignes: [
        { label: 'Bain 10 min', prix: 25 },
        { label: '+ soins', prix: 30 },
        { label: '+ dépose', prix: 35 },
        { label: 'Bain 20 min', prix: 30 },
        { label: '+ soins', prix: 35 },
        { label: '+ dépose', prix: 40 },
        { label: 'Bain 30 min', prix: 35 },
        { label: '+ dépose', prix: 40 },
      ],
    },
    {
      titre: 'Bain · soins · pose',
      sousTitre: 'Bain avec soins et pédicure',
      lignes: [
        { label: 'Bain + soins + pose semi-permanent', prix: 40 },
        { label: '+ dépose', prix: 45 },
        { label: 'Bain + soins + pose gainage', prix: 45 },
        { label: '+ dépose', prix: 50 },
        { label: 'Bain + soins + pose capsule gel', prix: 50 },
        { label: '+ dépose', prix: 55 },
      ],
      notes: [
        'French blanche ou coloré : +5 €',
        'Pas de remplissage — pose complète à prévoir.',
      ],
    },
  ],
}

export const tarifExtensionsCils: BlocTarifs = {
  id: 'extensions-cils',
  titrePage: 'Extensions de cils',
  intro: 'Pose naturelle, complète ou volume — dépose et remplissage.',
  colonnes: [
    {
      titre: 'Pose naturelle',
      lignes: [
        { label: 'Pose cils à cils simple', prix: 35 },
        { label: 'Pose cils à cils complète', prix: 40 },
        { label: 'Pose cils à cils œil de biche', prix: 45 },
        { label: 'Pose cils à cils fournis', prix: 50 },
      ],
      notes: ['Dépose : 15 € · Dépose externe : 20 €', 'Remplissage : −5 € sous 3 semaines'],
    },
    {
      titre: 'Pose complète',
      lignes: [
        { label: 'Pose complète simple', prix: 45 },
        { label: 'Pose complète open eyes', prix: 50 },
        { label: 'Pose complète cat eyes', prix: 55 },
        { label: 'Pose complète open eyes (densité +)', prix: 60 },
      ],
      notes: ['Dépose : 15 € · Dépose externe : 20 €', 'Remplissage : −5 € sous 3 semaines'],
    },
    {
      titre: 'Pose volume',
      lignes: [
        { label: 'Pose volume léger', prix: 60 },
        { label: 'Pose volume léger œil de biche', prix: 65 },
        { label: 'Pose wispy', prix: 65 },
        { label: 'Pose volume russe', prix: 70 },
        { label: 'Pose volume russe œil de biche', prix: 75 },
      ],
      notes: ['Dépose : 15 € · Dépose externe : 20 €', 'Remplissage : −5 € sous 3 semaines'],
    },
  ],
}

export const tarifMicroblading: BlocTarifs = {
  id: 'microblading',
  titrePage: 'Microblading & microshading',
  intro: 'Première séance, retouches et entretien dans le temps.',
  colonnes: [
    {
      titre: 'Microblading',
      lignes: [
        { label: 'Première séance', prix: 150 },
        { label: 'Deuxième séance', prixLabel: 'GRATUITE *' },
        { label: 'Séance après 3 mois', prix: 60 },
        { label: 'Séance après 6 mois', prix: 90 },
        { label: 'Séance après 12 mois', prix: 140 },
        { label: 'Au-delà', prix: 150 },
      ],
      notes: [
        'Possibilité de refaire un microblading après une séance chez une autre praticienne.',
        '* Séance à réaliser obligatoirement 4 semaines après la première.',
      ],
    },
    {
      titre: 'Microshading',
      lignes: [
        { label: 'Première séance', prix: 190 },
        { label: 'Deuxième séance', prixLabel: 'GRATUITE *' },
        { label: 'Séance après 3 mois', prix: 80 },
        { label: 'Séance après 6 mois', prix: 100 },
        { label: 'Séance après 12 mois', prix: 160 },
        { label: 'Au-delà', prix: 190 },
      ],
      notes: [
        'Possibilité de refaire après une séance chez une autre praticienne.',
        '* Séance à réaliser obligatoirement 4 semaines après la première.',
      ],
    },
    {
      titre: 'Combo blading / shading',
      lignes: [
        { label: 'Première séance', prix: 210 },
        { label: 'Deuxième séance', prixLabel: 'GRATUITE *' },
        { label: 'Séance après 3 mois', prix: 100 },
        { label: 'Séance après 6 mois', prix: 140 },
        { label: 'Séance après 12 mois', prix: 190 },
        { label: 'Au-delà', prix: 210 },
      ],
      notes: [
        'Possibilité de refaire après une séance chez une autre praticienne.',
        '* Séance à réaliser obligatoirement 4 semaines après la première.',
      ],
    },
  ],
}

export const tarifBlanchiment: BlocTarifs = {
  id: 'blanchiment',
  titrePage: 'Blanchiment dentaire & strass',
  intro: 'Séances blanchiment, strass dentaires et formules combinées.',
  colonnes: [
    {
      titre: 'Blanchiment',
      lignes: [
        { label: 'Séance White (30 min)', prix: 50 },
        { label: 'Séance Ultra White (60 min)', prix: 90 },
        { label: 'Forfait 2 séances White', prix: 80 },
        { label: 'Forfait 2 séances Ultra White', prix: 150 },
      ],
    },
    {
      titre: 'Strass dentaire',
      lignes: [
        { label: 'Un strass', prix: 15 },
        { label: 'Deux strass', prix: 25 },
        { label: 'Un trait strass linéaire', prix: 40 },
        { label: 'Un contour de dent', prix: 50 },
        { label: 'Deux contours de dent', prix: 90 },
        { label: 'Une dent remplie', prix: 100 },
        { label: 'Autre modèle', prixLabel: 'Sur devis' },
      ],
      notes: ['Retouche (gratuite avant 7 jours) : 10 €'],
    },
    {
      titre: 'Combo blanchiment / strass',
      lignes: [
        { label: 'Séance White + 1 strass', prix: 60 },
        { label: 'Séance White + 2 strass', prix: 80 },
        { label: 'Séance White + trait linéaire', prix: 100 },
        { label: 'Séance White + autre modèle', prixLabel: 'Devis' },
        { label: 'Séance Ultra + 1 strass', prix: 105 },
        { label: 'Séance Ultra + 2 strass', prix: 110 },
        { label: 'Séance Ultra + trait linéaire', prix: 120 },
        { label: 'Séance Ultra + autre modèle', prixLabel: 'Devis' },
      ],
      notes: ['Retouche (gratuite avant 7 jours) : 10 €'],
    },
  ],
}

export type MechGroup = { meches: string; lignes: { label: string; prix: number }[] }

export type ExtensionsCheveuxCol = {
  titre: string
  groupes: MechGroup[]
}

export const extensionsCheveux: ExtensionsCheveuxCol[] = [
  {
    titre: 'Extensions noir / brun',
    groupes: [
      {
        meches: '100 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 220 },
          { label: 'Volume 120 g · 46 cm', prix: 250 },
          { label: 'Volume 80 g · 56 cm', prix: 270 },
          { label: 'Volume 120 g · 56 cm', prix: 310 },
        ],
      },
      {
        meches: '150 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 350 },
          { label: 'Volume 80 g · 56 cm', prix: 380 },
          { label: 'Volume 120 g · 46 cm', prix: 400 },
          { label: 'Volume 120 g · 56 cm', prix: 430 },
        ],
      },
      {
        meches: '200 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 460 },
          { label: 'Volume 80 g · 56 cm', prix: 490 },
          { label: 'Volume 120 g · 46 cm', prix: 520 },
          { label: 'Volume 120 g · 56 cm', prix: 550 },
        ],
      },
    ],
  },
  {
    titre: 'Extensions blond',
    groupes: [
      {
        meches: '100 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 240 },
          { label: 'Volume 120 g · 46 cm', prix: 270 },
          { label: 'Volume 80 g · 56 cm', prix: 300 },
          { label: 'Volume 120 g · 56 cm', prix: 320 },
        ],
      },
      {
        meches: '150 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 360 },
          { label: 'Volume 80 g · 56 cm', prix: 390 },
          { label: 'Volume 120 g · 46 cm', prix: 420 },
          { label: 'Volume 120 g · 56 cm', prix: 430 },
        ],
      },
      {
        meches: '200 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 490 },
          { label: 'Volume 80 g · 56 cm', prix: 510 },
          { label: 'Volume 120 g · 46 cm', prix: 540 },
          { label: 'Volume 120 g · 56 cm', prix: 580 },
        ],
      },
    ],
  },
  {
    titre: 'Extensions coloré',
    groupes: [
      {
        meches: '100 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 270 },
          { label: 'Volume 120 g · 46 cm', prix: 300 },
          { label: 'Volume 80 g · 56 cm', prix: 320 },
          { label: 'Volume 120 g · 56 cm', prix: 350 },
        ],
      },
      {
        meches: '150 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 390 },
          { label: 'Volume 80 g · 56 cm', prix: 400 },
          { label: 'Volume 120 g · 46 cm', prix: 430 },
          { label: 'Volume 120 g · 56 cm', prix: 460 },
        ],
      },
      {
        meches: '200 mèches',
        lignes: [
          { label: 'Volume 80 g · 46 cm', prix: 500 },
          { label: 'Volume 80 g · 56 cm', prix: 530 },
          { label: 'Volume 120 g · 46 cm', prix: 570 },
          { label: 'Volume 120 g · 56 cm', prix: 600 },
        ],
      },
    ],
  },
]

export const tousLesBlocs: BlocTarifs[] = [
  tarifManucure,
  tarifPedicure,
  tarifSpaPieds,
  tarifExtensionsCils,
  tarifMicroblading,
  tarifBlanchiment,
]
