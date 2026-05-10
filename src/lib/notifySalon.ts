/** Envoi gratuit vers votre boîte mail via https://web3forms.com (sans backend). */

import { SALON_ADDRESS_ONE_LINE, SALON_INSTAGRAM, SALON_NAME } from '../config/salon'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export type NotifyResult =
  | { ok: true }
  | { ok: false; reason: 'no_key' | 'network'; detail?: string }

function buildEmailBody(params: {
  clientName: string
  phone: string
  email: string
  practitionerName: string
  service: string
  dateLabel: string
  time: string
  notes: string
}): string {
  const lines = [
    '══════════════════════════════════════',
    `  NOUVELLE DEMANDE DE RENDEZ-VOUS`,
    `  ${SALON_NAME} (@${SALON_INSTAGRAM})`,
    '══════════════════════════════════════',
    '',
    'ADRESSE DU SALON',
    SALON_ADDRESS_ONE_LINE,
    '',
    'PRATICIENNE',
    params.practitionerName,
    '',
    'PRESTATION',
    params.service,
    '',
    'DATE',
    params.dateLabel,
    '',
    'HEURE',
    params.time,
    '',
    'COORDONNÉES CLIENT',
    `Nom : ${params.clientName}`,
    `Téléphone : ${params.phone}`,
    params.email.trim() ? `E-mail : ${params.email.trim()}` : 'E-mail : (non renseigné)',
    '',
    params.notes.trim() ? `MESSAGE\n${params.notes.trim()}` : 'MESSAGE\n—',
    '',
    '— — —',
    `Répondez à la cliente pour confirmer ou ajuster le créneau.`,
    `Demande envoyée depuis le formulaire du site ${SALON_NAME} (@${SALON_INSTAGRAM}).`,
  ]
  return lines.join('\n')
}

export async function notifySalonBooking(params: {
  clientName: string
  phone: string
  email: string
  practitionerName: string
  service: string
  dateLabel: string
  time: string
  notes: string
}): Promise<NotifyResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  if (!accessKey) return { ok: false, reason: 'no_key' }

  const message = buildEmailBody(params)

  const payload: Record<string, string> = {
    access_key: accessKey,
    subject: `[${SALON_NAME}] Nouveau RDV — ${params.service} · ${params.practitionerName} · ${params.dateLabel}`,
    name: params.clientName,
    message,
    botcheck: '',
    telephone_client: params.phone,
    praticienne: params.practitionerName,
    prestation: params.service,
    date_rdv: params.dateLabel,
    heure_rdv: params.time,
  }

  if (params.email.trim()) {
    payload.email = params.email.trim()
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = (await res.json()) as { success?: boolean; message?: string }

    if (!res.ok || !data.success) {
      return {
        ok: false,
        reason: 'network',
        detail: data.message ?? res.statusText,
      }
    }

    return { ok: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { ok: false, reason: 'network', detail: msg }
  }
}
