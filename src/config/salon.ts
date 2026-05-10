/** Identité du salon — utilisée partout (site + e-mails Web3Forms). */

export const SALON_NAME = 'Centre de beauté 3F'

/** Praticiennes / Instagram (handle sans @) */
export type InstagramPraticienne = { prenom: string; handle: string }

export const SALON_INSTAGRAM_ACCOUNTS: readonly InstagramPraticienne[] = [
  { prenom: 'Liza', handle: 'la_.beautyroom' },
  { prenom: 'Elsa', handle: 'elsassnails' },
  { prenom: 'mimi', handle: 'microblading_saint_louis' },
] as const

/** Compte principal (e-mails, rétrocompat) */
export const SALON_INSTAGRAM = SALON_INSTAGRAM_ACCOUNTS[0].handle

/** Alias navigation / badge */
export const SALON_HANDLE = SALON_INSTAGRAM

export function instagramProfileUrl(handle: string): string {
  return `https://www.instagram.com/${encodeURIComponent(handle)}/`
}

export const SALON_TAGLINE = 'Manucure · Pédicure · Microblading'

export const SALON_PHONE_DISPLAY = '07 67 12 67 11'

/** Pour liens tel: */
export const SALON_PHONE_HREF = 'tel:+33767126711'

export const SALON_ADDRESS_LINE1 = '50b Rue de Michelfelden'
export const SALON_ADDRESS_LINE2 = '68300 Saint-Louis'

/** Une ligne lisible (fil d’Ariane, méta, e-mails) */
export const SALON_ADDRESS_ONE_LINE = `${SALON_ADDRESS_LINE1}, ${SALON_ADDRESS_LINE2}`

/** Lien « Voir sur la carte » (Google Maps) */
export const SALON_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`${SALON_ADDRESS_LINE1}, ${SALON_ADDRESS_LINE2}, France`)

/** Stockage navigateur des RDV démo */
export const STORAGE_KEY_RDV = 'centre-beaute-3f-rdv'
