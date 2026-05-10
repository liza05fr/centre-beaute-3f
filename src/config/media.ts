/**
 * Photos HD : source principale + secours (si Unsplash est bloqué, Pexels prend le relais).
 */
const u = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`
const p = (id: string, w: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&dpr=2`

export type BeautyPhoto = {
  src: string
  fallback: string
  alt: string
}

export const media = {
  /** Grande photo + vignette : URL principale + secours si Unsplash est bloqué ou indisponible */
  hero: {
    main: u('photo-1516975080664-ed2fc6a32937', 1200),
    mainFallback: p('939836', 1200),
    mainAlt: 'Institut de beauté — espace manucure et soins',
    accent: u('photo-1522337360788-8b13dee8a37e', 600),
    accentFallback: p('939836', 600),
    accentAlt: 'Détail manucure et pose vernis',
  },
  /** Nos univers — visuels alignés avec chaque carte */
  soins: [
    {
      src: u('photo-1604654894610-df63bc536371', 900),
      fallback: p('939836', 900),
      alt: 'Manucure et pédicure — pose ongles et soin des pieds',
    },
    {
      src: u('photo-1560869713-92d9e42246ec', 900),
      fallback: p('3065209', 900),
      alt: 'Extensions cheveux et regard — salon coiffure et beauté',
    },
    {
      src: u('photo-1596178060819-8fddb7036453', 900),
      fallback: p('4465825', 900),
      alt: 'Soins des pieds spa et beauté des ongles',
    },
  ] as const satisfies readonly BeautyPhoto[],
  gallery: [
    {
      src: u('photo-1544161515-4ab6ce6db874', 800),
      fallback: p('3771069', 800),
      alt: 'Ambiance spa, pierres chaudes et détente',
    },
    {
      src: u('photo-1570172619644-dfd03ed5d881', 800),
      fallback: p('3785687', 800),
      alt: 'Produits beauté et soins professionnels',
    },
    {
      src: u('photo-1487412947147-5cebf100ffc2', 800),
      fallback: p('4464631', 800),
      alt: 'Institut de beauté et bien-être',
    },
    {
      src: u('photo-1620916566398-39f1143ab7be', 800),
      fallback: p('6621464', 800),
      alt: 'Univers beauté : produits professionnels et cadre soigné',
    },
  ] as const satisfies readonly BeautyPhoto[],
} as const
