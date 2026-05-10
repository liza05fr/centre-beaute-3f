import { useEffect, useState } from 'react'
import { media } from './config/media'
import {
  SALON_ADDRESS_LINE1,
  SALON_ADDRESS_LINE2,
  SALON_HANDLE,
  SALON_MAPS_URL,
  SALON_NAME,
  SALON_PHONE_DISPLAY,
  SALON_PHONE_HREF,
  SALON_TAGLINE,
} from './config/salon'
import { BeautyImage } from './components/BeautyImage'
import { BookingSection } from './components/BookingSection'
import { TarifsSection } from './components/TarifsSection'

const NAV_LINKS = [
  { href: '#soins', label: 'Soins' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#equipe', label: 'L’équipe' },
  { href: '#rdv', label: 'Rendez-vous' },
  { href: '#services-plus', label: 'Services +' },
] as const

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const navLinkClass =
    'relative py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink/55 transition-colors duration-200 hover:text-ink after:pointer-events-none after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-rose after:to-rosedeep after:transition-[width] after:duration-300 hover:after:w-full'

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="border-b border-rose/10 bg-cream/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-cream/[0.55]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:py-4">
          <a
            href="#"
            className="group flex min-w-0 max-w-[calc(100%-8rem)] items-center gap-3 rounded-2xl py-1 outline-none transition-colors hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-rose/40 md:max-w-none"
          >
            <span className="relative flex h-11 min-w-[2.75rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#fbcfe4] via-rose to-rosedeep px-1 text-sm font-display font-semibold leading-none text-white shadow-[0_12px_40px_-8px_rgba(232,164,184,0.85)] ring-[3px] ring-white/90 md:h-12 md:min-w-[3rem] md:text-base">
              <span
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.45),transparent_52%)]"
                aria-hidden
              />
              3F
            </span>
            <span className="min-w-0">
              <span className="block bg-gradient-to-r from-ink via-ink to-rosedeep bg-clip-text font-display text-[1.15rem] font-semibold leading-tight tracking-tight text-transparent md:text-2xl">
                {SALON_NAME}
              </span>
              <span className="mt-1 inline-flex max-w-full items-center gap-1 rounded-full border border-rose/30 bg-white/75 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-rosedeep shadow-sm backdrop-blur-md md:text-[11px]">
                <span className="text-rose/55" aria-hidden>
                  @
                </span>
                <span className="truncate">{SALON_HANDLE}</span>
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className={navLinkClass}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#rdv"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-rose via-[#e89eb5] to-rosedeep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_36px_-10px_rgba(201,120,142,0.65)] ring-1 ring-white/50 transition hover:brightness-[1.06] active:scale-[0.98] sm:inline-flex"
            >
              Réserver
              <svg className="h-4 w-4 opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-rose/25 bg-white/80 text-ink shadow-sm backdrop-blur-md transition hover:bg-white md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-5 w-5">
                <span
                  className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${menuOpen ? 'top-[9px] rotate-45' : ''}`}
                />
                <span
                  className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-ink transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute left-0 top-[17px] h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${menuOpen ? 'top-[9px] -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 md:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Fermer le menu"
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col bg-white/95 px-6 pb-10 pt-[5.25rem] shadow-[-12px_0_48px_-12px_rgba(61,44,51,0.18)] backdrop-blur-2xl transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-label="Navigation mobile"
        >
          <div className="mb-8 rounded-2xl border border-rose/15 bg-gradient-to-br from-peach/40 to-cream p-4">
            <p className="font-display text-lg font-semibold text-ink">{SALON_NAME}</p>
            <p className="mt-1 font-mono text-xs tracking-[0.12em] text-rosedeep">@{SALON_HANDLE}</p>
          </div>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-xl px-4 py-3.5 text-base font-semibold text-ink/85 transition hover:bg-rose/10 hover:text-ink"
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#rdv"
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-rosedeep py-4 text-center font-semibold text-white shadow-lg shadow-rose/25"
            onClick={closeMenu}
          >
            Réserver
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const handleDisplay = `@${SALON_HANDLE}`

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blush/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-72 w-72 rounded-full bg-peach/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-rose/30 blur-2xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-white/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-rosedeep shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-rose to-rosedeep ring-2 ring-rose/25" aria-hidden />
              {handleDisplay}
            </span>
          </div>
          <p className="font-script text-4xl text-rosedeep md:text-5xl">{SALON_TAGLINE}</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight tracking-tight text-ink md:text-6xl lg:text-7xl">
            Votre écrin de douceur
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            Un univers pastel et professionnel pour prendre soin de vos mains, vos pieds et votre regard.
            Réservez en ligne en quelques clics avec la praticienne qui vous correspond.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#rdv"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose via-[#e89eb5] to-rosedeep px-8 py-4 font-semibold text-white shadow-[0_14px_44px_-12px_rgba(201,120,142,0.55)] ring-1 ring-white/45 transition hover:brightness-[1.05] active:scale-[0.99]"
            >
              Prendre rendez-vous
              <svg className="h-5 w-5 opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#equipe"
              className="inline-flex items-center justify-center rounded-full border border-rose/35 bg-white/90 px-8 py-4 font-semibold text-ink shadow-sm backdrop-blur-sm transition hover:border-rose/60 hover:bg-white hover:shadow-md"
            >
              Découvrir l’équipe
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] border border-rose/20 bg-peach/30 shadow-[0_24px_80px_-24px_rgba(201,120,142,0.45)] ring-1 ring-white/60">
              <BeautyImage
                src={media.hero.main}
                fallback={media.hero.mainFallback}
                alt={media.hero.mainAlt}
                reveal={false}
                width={1200}
                height={1500}
                loading="eager"
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 z-10 w-[42%] max-w-[200px] md:-bottom-8 md:-left-6 md:max-w-[240px]">
              <div className="overflow-hidden rounded-2xl border-4 border-white shadow-xl ring-1 ring-rose/15">
                <BeautyImage
                  src={media.hero.accent}
                  fallback={media.hero.accentFallback}
                  alt={media.hero.accentAlt}
                  reveal={false}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute -right-6 top-8 hidden rounded-3xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm md:block">
              <p className="font-script text-xl text-rosedeep">Douceur & précision</p>
              <p className="text-xs font-medium text-ink/55">Soins sur mesure</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SoinsStrip() {
  const cards = [
    {
      title: 'Manucure & pédicure',
      text: 'Pose, entretien, soins des ongles mains et pieds.',
      image: media.soins[0],
    },
    {
      title: 'Regard & extensions',
      text: 'Extensions capillaires ; extensions de cils prochainement.',
      image: media.soins[1],
    },
    {
      title: 'Sourcils & pieds',
      text: 'Microblading, microshading, pédicure et épilation.',
      image: media.soins[2],
    },
  ] as const

  return (
    <section id="soins" className="border-y border-rose/15 bg-white/70 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center font-script text-3xl text-rosedeep">Nos univers</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-2xl border border-rose/20 bg-cream/60 shadow-card transition hover:shadow-soft"
            >
              <div className="relative h-48 overflow-hidden">
                <BeautyImage
                  src={c.image.src}
                  fallback={c.image.fallback}
                  alt={c.image.alt}
                  frameClassName="h-full"
                  reveal
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamIntro() {
  return (
    <section id="equipe" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="font-script text-3xl text-rosedeep md:text-4xl">Trois talents</p>
        <h2 className="mt-2 font-display text-4xl font-semibold text-ink md:text-5xl">
          Une équipe, trois expertises
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">
          Chaque praticienne accueille ses clientes selon un planning dédié — votre réservation respecte automatiquement ses jours de présence.
        </p>
      </div>
    </section>
  )
}

function GalleryStrip() {
  return (
    <section className="border-y border-rose/10 bg-gradient-to-b from-cream via-peach/25 to-cream py-12 md:py-16" aria-label="Galerie">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center font-script text-2xl text-rosedeep md:text-3xl">Ambiance & savoir-faire</p>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink/60">
          Un cadre calme et des prestations réalisées avec exigence.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {media.gallery.map((item) => (
            <figure key={item.src} className="group relative overflow-hidden rounded-2xl shadow-card">
              <BeautyImage
                src={item.src}
                fallback={item.fallback}
                alt={item.alt}
                reveal
                parallax
                className="aspect-square w-full object-cover md:aspect-[5/4]"
              />
              <figcaption className="sr-only">{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesPlus() {
  return (
    <section id="services-plus" className="scroll-mt-24 border-t border-rose/15 bg-white/80 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-12 text-center">
          <p className="font-script text-3xl text-rosedeep">Pour aller plus loin</p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            Ce que l’on peut brancher ensuite
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/65">
            Prochaines évolutions possibles pour {SALON_NAME} : SMS automatiques, dossier client et carte de fidélité — cette
            base est déjà pensée pour une API, une base de données et des envois transactionnels.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'SMS automatiques',
              desc: 'Confirmation, rappels et annulations par SMS selon vos règles.',
            },
            {
              title: 'Dossier client',
              desc: 'Historique des rendez-vous et paiements pour un suivi professionnel.',
            },
            {
              title: 'Carte de fidélité',
              desc: 'Points ou tampons en ligne, visible par la cliente sur son compte.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-dashed border-rose/40 bg-peach/20 p-6 text-center"
            >
              <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/65">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-rose/20 bg-ink py-12 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <span className="flex h-12 min-w-[3rem] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbcfe4] via-rose to-rosedeep px-1.5 text-sm font-display font-semibold leading-none text-white shadow-lg shadow-rose/25 ring-2 ring-white/15 md:text-base">
            3F
          </span>
          <div>
            <p className="font-display text-xl font-semibold">{SALON_NAME}</p>
            <p className="mt-1 font-mono text-xs tracking-[0.14em] text-cream/85">@{SALON_HANDLE}</p>
            <p className="mt-2 text-sm text-cream/65">{SALON_TAGLINE}</p>
          </div>
        </div>
        <div className="max-w-md text-center text-sm text-cream/60 md:text-left">
          <p className="text-cream/85">
            <span className="block font-medium text-cream/95">{SALON_ADDRESS_LINE1}</span>
            <span className="block">{SALON_ADDRESS_LINE2}</span>
          </p>
          <p className="mt-2">
            <a href={SALON_MAPS_URL} target="_blank" rel="noreferrer" className="text-rose-200/95 underline-offset-2 hover:text-white hover:underline">
              Voir sur la carte
            </a>
          </p>
          <p className="mt-4">Réservation en ligne — confirmation par vous après réception du mail.</p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start">
            <a href={SALON_PHONE_HREF} className="text-cream/90 hover:text-white">
              Tél. {SALON_PHONE_DISPLAY}
            </a>
            <a
              href={`https://www.instagram.com/${encodeURIComponent(SALON_HANDLE)}/`}
              target="_blank"
              rel="noreferrer"
              className="text-cream/90 hover:text-white"
            >
              @{SALON_HANDLE}
            </a>
          </p>
        </div>
        <div className="text-2xl" aria-hidden>
          ♥
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SoinsStrip />
        <TeamIntro />
        <GalleryStrip />
        <TarifsSection />
        <BookingSection />
        <ServicesPlus />
      </main>
      <Footer />
    </>
  )
}
