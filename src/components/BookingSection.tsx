import { useMemo, useState } from 'react'
import {
  DAY_LABELS,
  type DayOfWeek,
  dayOfWeekFromDate,
  practitioners,
  type Practitioner,
} from '../data/practitioners'
import {
  SALON_ADDRESS_LINE1,
  SALON_ADDRESS_LINE2,
  SALON_MAPS_URL,
  SALON_NAME,
  STORAGE_KEY_RDV,
} from '../config/salon'
import { notifySalonBooking } from '../lib/notifySalon'

const STORAGE_KEY = STORAGE_KEY_RDV

export interface StoredAppointment {
  id: string
  practitionerId: string
  practitionerName: string
  service: string
  dateISO: string
  time: string
  clientName: string
  phone: string
  email: string
  notes: string
  createdAt: string
  /** État d’envoi e-mail salon (Web3Forms) */
  salonEmailStatus?: 'sent' | 'skipped_no_key' | 'failed'
}

const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
]

function loadAppointments(): StoredAppointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredAppointment[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveAppointment(a: StoredAppointment) {
  const all = loadAppointments()
  all.push(a)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

function nextAvailableDates(workingDays: DayOfWeek[], count: number): Date[] {
  const out: Date[] = []
  const cur = new Date()
  cur.setHours(12, 0, 0, 0)
  let daysAhead = 0
  while (out.length < count && daysAhead < 365) {
    const d = new Date(cur)
    d.setDate(cur.getDate() + daysAhead)
    const dow = dayOfWeekFromDate(d)
    if (workingDays.includes(dow)) {
      out.push(new Date(d))
    }
    daysAhead++
  }
  return out
}

function formatDateFr(d: Date): string {
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function accentRing(accent: Practitioner['accent']): string {
  switch (accent) {
    case 'rose':
      return 'ring-rose/40 bg-white'
    case 'peach':
      return 'ring-peach bg-white'
    case 'blush':
      return 'ring-blush bg-white'
    default:
      return 'ring-rose/30 bg-white'
  }
}

export function BookingSection() {
  const [practitionerId, setPractitionerId] = useState<string>(practitioners[0]?.id ?? '')
  const [service, setService] = useState(() => practitioners[0]?.services[0] ?? '')
  const [dateIdx, setDateIdx] = useState(0)
  const [time, setTime] = useState('')
  const [clientName, setClientName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState<StoredAppointment | null>(null)
  const [listOpen, setListOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const hasWeb3Key = Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim())

  const practitioner = practitioners.find((p) => p.id === practitionerId)
  const dates = useMemo(
    () => (practitioner ? nextAvailableDates(practitioner.workingDays, 28) : []),
    [practitioner]
  )

  const selectedDate = dates[dateIdx]

  const resetFormForPractitioner = (p: Practitioner) => {
    setPractitionerId(p.id)
    setService(p.services[0] ?? '')
    setDateIdx(0)
    setTime('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!practitioner || !selectedDate || !time || !clientName.trim() || !phone.trim()) return

    setSubmitError(null)
    setSubmitting(true)

    const dateLabel = formatDateFr(selectedDate)

    const notify = await notifySalonBooking({
      clientName: clientName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      practitionerName: practitioner.name,
      service,
      dateLabel,
      time,
      notes: notes.trim(),
    })

    let salonEmailStatus: StoredAppointment['salonEmailStatus']
    if (notify.ok) {
      salonEmailStatus = 'sent'
    } else if (notify.reason === 'no_key') {
      salonEmailStatus = 'skipped_no_key'
    } else {
      setSubmitError(
        notify.detail
          ? `L’envoi a échoué : ${notify.detail}`
          : 'Impossible d’envoyer l’e-mail pour le moment. Vérifiez votre connexion ou réessayez plus tard.'
      )
      setSubmitting(false)
      return
    }

    const apt: StoredAppointment = {
      id: crypto.randomUUID(),
      practitionerId: practitioner.id,
      practitionerName: practitioner.name,
      service,
      dateISO: selectedDate.toISOString(),
      time,
      clientName: clientName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      salonEmailStatus,
    }
    saveAppointment(apt)
    setSubmitted(apt)
    setTime('')
    setNotes('')
    setSubmitting(false)
  }

  const myAppointments = useMemo(() => loadAppointments(), [submitted, listOpen])

  return (
    <section id="rdv" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-peach/30 to-cream" />
      <div className="relative mx-auto max-w-6xl px-4">
        <header className="mb-12 text-center">
          <p className="font-script text-3xl text-rosedeep md:text-4xl">Réservez</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Prendre rendez-vous
          </h2>
          <p className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base text-ink/75">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 shrink-0 text-rosedeep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>
                {SALON_ADDRESS_LINE1}, {SALON_ADDRESS_LINE2}
              </span>
            </span>
            <span className="text-ink/35" aria-hidden>
              ·
            </span>
            <a href={SALON_MAPS_URL} target="_blank" rel="noreferrer" className="font-medium text-rosedeep underline-offset-2 hover:underline">
              Itinéraire
            </a>
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
            Choisissez votre praticienne et un créneau souhaité. Après validation,{' '}
            <strong className="font-semibold text-ink/85">une demande est envoyée au salon par e-mail</strong> — ce n’est pas
            encore une réservation fermée :{' '}
            <strong className="font-semibold text-ink/85">le salon vous confirme</strong> (ou propose un autre horaire).
          </p>
          <p className="mx-auto mt-4 max-w-2xl rounded-2xl border border-rose/20 bg-white/80 px-4 py-3 text-left text-sm leading-relaxed text-ink/75">
            <strong className="text-ink">Disponibilité des créneaux :</strong> ce site ne bloque pas automatiquement les places.
            Chaque visiteuse voit les mêmes horaires possibles ; si deux personnes demandent la même plage, vous le voyez dans
            vos e-mails et vous tranchez (agenda papier, Google Agenda, téléphone). Pour que le site masque tout seul les
            créneaux pris, il faudrait une base de données ou un outil type Cal.com / logiciel métier — on peut l’ajouter plus
            tard.
          </p>
          {import.meta.env.DEV && !hasWeb3Key && (
            <p className="mx-auto mt-4 max-w-xl rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-left text-sm text-amber-950/90">
              <strong className="font-semibold">Développement :</strong> pour recevoir les demandes dans votre boîte mail, créez{' '}
              <code className="rounded bg-white/80 px-1">.env</code> avec{' '}
              <code className="rounded bg-white/80 px-1">VITE_WEB3FORMS_ACCESS_KEY=votre_clé</code> (gratuit sur web3forms.com).
              Sinon seul le navigateur enregistre la demande.
            </p>
          )}
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-wider text-rosedeep/80">
              Nos praticiennes
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {practitioners.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => resetFormForPractitioner(p)}
                  className={`rounded-2xl border-2 p-5 text-left shadow-card transition hover:shadow-soft ${
                    practitionerId === p.id
                      ? 'border-rose bg-white ring-2 ring-rose/30'
                      : 'border-transparent bg-white/80 hover:border-rose/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-xl font-semibold text-white ${accentRing(p.accent)} ring-2`}
                      style={{
                        background:
                          p.accent === 'rose'
                            ? 'linear-gradient(135deg, #e8a4b8, #c9788e)'
                            : p.accent === 'peach'
                              ? 'linear-gradient(135deg, #fde8e0, #e8a4b8)'
                              : 'linear-gradient(135deg, #f5d0d8, #e8a4b8)',
                      }}
                    >
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="font-display text-xl font-semibold text-ink">{p.name}</p>
                      <p className="text-sm text-rose">@{p.handle}</p>
                      <p className="mt-1 text-sm text-ink/70">{p.tagline}</p>
                      <ul className="mt-2 space-y-1 text-sm text-ink/65">
                        {p.services.map((s) => (
                          <li key={s}>• {s}</li>
                        ))}
                      </ul>
                      <p className="mt-3 text-xs text-ink/55">
                        Présente :{' '}
                        {p.workingDays.map((d) => DAY_LABELS[d]).join(', ')}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setListOpen(!listOpen)}
              className="w-full rounded-xl border border-rose/40 bg-white/90 px-4 py-3 text-left text-sm font-medium text-ink shadow-card transition hover:bg-peach/40"
            >
              {listOpen ? 'Masquer' : 'Voir'} mes réservations enregistrées sur cet appareil ({myAppointments.length})
            </button>

            {listOpen && (
              <ul className="max-h-64 space-y-3 overflow-y-auto rounded-xl border border-rose/20 bg-white p-4 text-sm shadow-card">
                {myAppointments.length === 0 && (
                  <li className="text-ink/55">Aucune réservation pour le moment.</li>
                )}
                {[...myAppointments].reverse().map((a) => (
                  <li key={a.id} className="rounded-lg bg-cream/80 px-3 py-2">
                    <span className="font-medium text-ink">{a.service}</span>
                    {' — '}
                    <span className="text-rosedeep">{a.practitionerName}</span>
                    <br />
                    <span className="text-ink/65">
                      {formatDateFr(new Date(a.dateISO))} à {a.time}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-3xl border border-rose/25 bg-white p-6 shadow-soft md:p-10">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-peach text-3xl">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink">
                  Demande envoyée
                </h3>
                <p className="mt-3 text-ink/70">
                  {submitted.service} avec {submitted.practitionerName}
                  <br />
                  {formatDateFr(new Date(submitted.dateISO))} à {submitted.time}
                </p>
                <p className="mt-4 text-sm text-ink/60">
                  Le créneau est une <strong className="font-medium text-ink/75">demande</strong>. Il devient définitif lorsque
                  le salon vous confirme (réponse à l’e-mail ou appel/SMS).
                </p>
                {submitted.salonEmailStatus === 'sent' && (
                  <p className="mt-4 text-sm font-medium text-emerald-800/90">
                    {SALON_NAME} a reçu votre demande par e-mail.
                  </p>
                )}
                {submitted.salonEmailStatus === 'skipped_no_key' && (
                  <p className="mt-4 text-sm text-amber-900/85">
                    Demande enregistrée sur cet appareil uniquement — {SALON_NAME} ne reçoit pas encore d’e-mail tant que la clé
                    Web3Forms n’est pas configurée sur le site.
                  </p>
                )}
                <button
                  type="button"
                  className="mt-8 rounded-full bg-rose px-8 py-3 font-medium text-white shadow-soft transition hover:bg-rosedeep"
                  onClick={() => setSubmitted(null)}
                >
                  Nouvelle réservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
                    role="alert"
                  >
                    {submitError}
                  </div>
                )}
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">Prestation</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-rose/30 bg-cream/50 px-4 py-3 text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/25"
                    required
                  >
                    {practitioner?.services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">Date</label>
                  <div className="flex flex-wrap gap-2">
                    {dates.slice(0, 14).map((d, i) => (
                      <button
                        key={d.toISOString()}
                        type="button"
                        onClick={() => {
                          setDateIdx(i)
                          setTime('')
                        }}
                        className={`rounded-xl px-3 py-2 text-sm transition ${
                          dateIdx === i
                            ? 'bg-rose text-white shadow-soft'
                            : 'bg-peach/50 text-ink hover:bg-peach'
                        }`}
                      >
                        {d.toLocaleDateString('fr-FR', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </button>
                    ))}
                  </div>
                  {selectedDate && (
                    <p className="mt-2 text-xs text-ink/55">{formatDateFr(selectedDate)}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">Heure</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-rose/30 bg-cream/50 px-4 py-3 text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/25"
                    required
                  >
                    <option value="">Choisir une heure</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-ink">Nom complet</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full rounded-xl border border-rose/30 bg-cream/50 px-4 py-3 text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/25"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">Téléphone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-rose/30 bg-cream/50 px-4 py-3 text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/25"
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">E-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-rose/30 bg-cream/50 px-4 py-3 text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/25"
                      autoComplete="email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-ink">Message (optionnel)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-rose/30 bg-cream/50 px-4 py-3 text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/25"
                      placeholder="Allergies, préférences…"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-rose py-4 text-center font-semibold text-white shadow-soft transition hover:bg-rosedeep disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? 'Envoi en cours…' : 'Envoyer ma demande de rendez-vous'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
