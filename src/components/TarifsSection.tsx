import type { BlocTarifs, ExtensionsCheveuxCol, LigneTarif } from '../data/tarifs'
import {
  apercuPrestations,
  extensionsCheveux,
  tousLesBlocs,
} from '../data/tarifs'
import { SALON_INSTAGRAM, SALON_PHONE_DISPLAY, SALON_PHONE_HREF } from '../config/salon'

function formatLigne(l: LigneTarif): string {
  if (l.prixLabel) return l.prixLabel
  if (l.prix === undefined) return '—'
  if (l.supplement) return `+${l.prix} €`
  return `${l.prix} €`
}

function ColonneCarte({ col }: { col: BlocTarifs['colonnes'][number] }) {
  return (
    <div className="flex flex-col rounded-2xl border border-rose/25 bg-gradient-to-b from-white to-cream/40 shadow-card ring-1 ring-rose/10">
      <div className="rounded-t-2xl bg-gradient-to-r from-[#c9a9a4]/35 to-peach/50 px-4 py-3 text-center">
        <h4 className="font-display text-lg font-semibold text-ink">{col.titre}</h4>
        {col.sousTitre && (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-ink/55">{col.sousTitre}</p>
        )}
      </div>
      <ul className="flex flex-1 flex-col gap-0 divide-y divide-rose/10 bg-[#9c847c]/95 px-3 py-2 text-sm text-white">
        {col.lignes.map((ligne) => (
          <li key={ligne.label} className="flex items-start justify-between gap-3 py-2.5">
            <span className="leading-snug opacity-95">{ligne.label}</span>
            <span className="shrink-0 font-semibold tabular-nums">{formatLigne(ligne)}</span>
          </li>
        ))}
      </ul>
      {col.notes && col.notes.length > 0 && (
        <div className="rounded-b-2xl border-t border-rose/15 bg-white px-4 py-3 text-[11px] leading-relaxed text-ink/65">
          {col.notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      )}
    </div>
  )
}

function BlocTarifsDesktop({ bloc }: { bloc: BlocTarifs }) {
  return (
    <section
      id={bloc.id}
      className="scroll-mt-28 border-t border-rose/15 bg-white/90 py-14 first:border-t-0 first:pt-4 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{bloc.titrePage}</h3>
        {bloc.intro && <p className="mt-3 max-w-3xl text-ink/65">{bloc.intro}</p>}
        <div
          className={`mt-10 grid gap-5 ${
            bloc.colonnes.length === 4
              ? 'lg:grid-cols-4'
              : bloc.colonnes.length === 3
                ? 'md:grid-cols-3'
                : 'sm:grid-cols-2'
          }`}
        >
          {bloc.colonnes.map((col) => (
            <ColonneCarte key={col.titre} col={col} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExtensionsCheveuxSection() {
  return (
    <section id="extensions-cheveux" className="scroll-mt-28 border-t border-rose/15 bg-cream/50 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Extensions de cheveux
        </h3>
        <p className="mt-3 max-w-3xl text-ink/65">
          Tarifs selon nuance (noir/brun, blond, coloré), nombre de mèches, volume et longueur. Pose à la kératine :
          comptez environ 2 h à 2 h 30, tenue 3 à 6 mois selon la repousse — dépose professionnelle obligatoire.
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {extensionsCheveux.map((col: ExtensionsCheveuxCol) => (
            <div
              key={col.titre}
              className="rounded-2xl border border-rose/25 bg-white/90 p-5 shadow-card md:p-6"
            >
              <h4 className="border-b border-rose/15 pb-3 font-display text-xl font-semibold text-ink">{col.titre}</h4>
              <div className="mt-4 space-y-6">
                {col.groupes.map((g) => (
                  <div key={g.meches}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-rosedeep">{g.meches}</p>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {g.lignes.map((li) => (
                        <li key={li.label} className="flex justify-between gap-3 border-b border-rose/10 py-1.5 text-ink/85">
                          <span>{li.label}</span>
                          <span className="font-semibold tabular-nums text-ink">{li.prix} €</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const QUICK = [
  { href: '#manucure', label: 'Manucure' },
  { href: '#pedicure', label: 'Pédicure' },
  { href: '#spa-pieds', label: 'Spa pieds' },
  { href: '#extensions-cils', label: 'Cils' },
  { href: '#microblading', label: 'Sourcils' },
  { href: '#blanchiment', label: 'Blanchiment' },
  { href: '#extensions-cheveux', label: 'Cheveux' },
] as const

export function TarifsSection() {
  return (
    <>
      <section id="tarifs" className="scroll-mt-24 bg-gradient-to-b from-white via-peach/15 to-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center font-script text-3xl text-rosedeep md:text-4xl">Nos prestations</p>
          <h2 className="mt-2 text-center font-display text-4xl font-semibold text-ink md:text-5xl">
            Prestations & tarifs
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-ink/70">
            Grilles alignées sur vos supports — prix en euros. Pour toute question ou devis personnalisé :{' '}
            <a href={SALON_PHONE_HREF} className="font-semibold text-rosedeep underline-offset-2 hover:underline">
              {SALON_PHONE_DISPLAY}
            </a>
            {' · '}
            <a
              href={`https://www.instagram.com/${encodeURIComponent(SALON_INSTAGRAM)}/`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-rosedeep underline-offset-2 hover:underline"
            >
              @{SALON_INSTAGRAM}
            </a>
          </p>

          <div className="mx-auto mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {apercuPrestations.map((p) => (
              <article
                key={p.titre}
                className="rounded-2xl border border-rose/20 bg-white/85 p-5 shadow-sm transition hover:border-rose/35 hover:shadow-card"
              >
                <h3 className="font-display text-lg font-semibold text-ink">{p.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.texte}</p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink/55">
            Épilation : prestations sur mesure — nous consulter pour durée et tarif.
          </p>

          <nav
            className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2"
            aria-label="Accès rapide aux tarifs"
          >
            {QUICK.map((q) => (
              <a
                key={q.href}
                href={q.href}
                className="rounded-full border border-rose/35 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink/75 shadow-sm transition hover:border-rose hover:bg-peach/30 hover:text-ink"
              >
                {q.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {tousLesBlocs.map((bloc) => (
        <BlocTarifsDesktop key={bloc.id} bloc={bloc} />
      ))}

      <ExtensionsCheveuxSection />

      <section className="border-t border-rose/15 bg-white/80 py-10">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-ink/55">
          Tarifs indicatifs susceptibles d’évolution — une erreur de saisie ? Dites-le nous pour ajuster le site.
        </div>
      </section>
    </>
  )
}
