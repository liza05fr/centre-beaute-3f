/**
 * Photos : URLs des fichiers + secours Pexels si une image externe ne charge pas.
 */
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
    main: 'https://i.ibb.co/ds03XJCP/image-viber-2026-05-10-22-15-02-265.jpg',
    mainFallback: p('939836', 1200),
    mainAlt: 'Centre de beauté 3F — votre institut',
    accent: 'https://i.ibb.co/rKDXfDBz/image-viber-2026-05-10-22-11-40-396.jpg',
    accentFallback: p('939836', 600),
    accentAlt: 'Photo institut Centre de beauté 3F',
  },
  /** Nos univers — visuels alignés avec chaque carte */
  soins: [
    {
      src: 'https://www.centre-europeen-formation.fr/wp-content/uploads/2023/08/nail-art.jpeg',
      fallback: p('939836', 900),
      alt: 'Manucure et nail art — pose ongles et créativité',
    },
    {
      src: 'https://hair-extension.fr/wp-content/uploads/2025/07/gros-plan-sur-une-pose-d-extensions-keratine-tendance-beaute.jpg',
      fallback: p('3065209', 900),
      alt: 'Gros plan pose d’extensions kératine, tendance beauté cheveux',
    },
    {
      src: 'https://gaelleb.com/wp-content/uploads/2025/05/regard-naturel-extension-cil-a-cil.jpg',
      fallback: p('3065209', 900),
      alt: 'Regard naturel, extension cil à cil et mise en beauté des yeux',
    },
  ] as const satisfies readonly BeautyPhoto[],
  gallery: [
    {
      src: 'https://coeuroline.fr/wp-content/uploads/2019/09/manucure-mains-et-pieds.jpg',
      fallback: p('4465825', 800),
      alt: 'Manucure mains et pieds, pose et soin des ongles',
    },
    {
      src: 'https://www.campus-des-ecoles.fr/uploads/2022/07/shutterstock_1080595649-300x200.jpg',
      fallback: p('3997987', 800),
      alt: 'Ambiance soins, institut de beauté et bien-être',
    },
    {
      src: 'https://m.media-amazon.com/images/I/61oFwo2WkWL._AC_UF1000,1000_QL80_.jpg',
      fallback: p('939836', 800),
      alt: 'Vernis à ongles, matériel manucure et soin des ongles',
    },
    {
      src: 'https://www.murielt.com/wp-content/uploads/2019/01/Extension-de-cils-dernie%CC%80re-version.jpg',
      fallback: p('6621464', 800),
      alt: 'Extensions de cils et mise en beauté du regard',
    },
  ] as const satisfies readonly BeautyPhoto[],
} as const
