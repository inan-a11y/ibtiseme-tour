import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over ons',
  description: "Wie is Pro's Agency? Onze missie, visie en aanpak voor B2B digitale projecten.",
}

const values = [
  {
    title: 'Resultaatgericht',
    description:
      "We meten succes niet in uren gewerkt of pagina's gebouwd, maar in de impact die het heeft op jouw business.",
  },
  {
    title: 'Transparant',
    description:
      'Geen vaagtaal, geen verborgen kosten. Alles wat we doen en waarom we het doen, communiceren we helder.',
  },
  {
    title: 'Kwaliteit boven kwantiteit',
    description:
      'We nemen beperkt aantal projecten aan, zodat elk project de aandacht krijgt die het verdient.',
  },
  {
    title: 'Eerlijk advies',
    description:
      'Als iets een beter alternatief heeft, zeggen we dat. Ook als dat voor ons minder werk betekent.',
  },
  {
    title: 'Modern bouwen',
    description:
      'We werken met de meest efficiënte methoden en tools. Dat vertaalt zich in snellere oplevering en scherpere prijs.',
  },
  {
    title: 'Langetermijnrelaties',
    description:
      'We willen geen eenmalige klanten. We willen partners die met ons meegroeien naarmate hun bedrijf groeit.',
  },
]

const focus = [
  { label: 'Sectoren', value: 'B2B dienstverlening, Tech, SaaS, Consultancy' },
  { label: 'Projectgrootte', value: 'Middelgroot MKB tot enterprise' },
  { label: 'Locatie', value: 'Nederland & internationaal (remote)' },
  { label: 'Talen', value: 'Nederlands, Engels' },
]

export default function OverPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block" />
            Over Pro&apos;s Agency
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight text-slate-100 max-w-3xl leading-[1.05]">
            Gebouwd voor bedrijven{' '}
            <span className="gradient-text">die willen groeien.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            Pro&apos;s Agency is een B2B digital agency gespecialiseerd in websites, dashboards
            en merkstrategie voor ambitieuze bedrijven.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight mb-6">
                Waarom Pro&apos;s Agency?
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Veel B2B bedrijven hebben digitale ambities maar missen de technische
                  partner die die ambities omzet in werkende producten. Traditionele bureaus zijn
                  te traag, te duur of te generiek.
                </p>
                <p>
                  Pro&apos;s Agency vult die leemte. We combineren de kwaliteit van een groot
                  bureau met de snelheid en betrokkenheid van een dedicated team. Geen account
                  managers tussen jou en de mensen die bouwen — directe samenwerking, korte
                  lijnen.
                </p>
                <p>
                  Onze werkwijze stelt ons in staat sneller te leveren dan de concurrentie,
                  zonder in te leveren op kwaliteit. Dat vertaalt zich in scherpere prijzen en
                  kortere doorlooptijden voor jou.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {focus.map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-surface border border-white/[0.07] rounded-xl px-6 py-4 flex items-center justify-between gap-6"
                >
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm text-slate-200 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="gradient-border rounded-2xl p-px">
            <div className="bg-surface rounded-2xl px-8 md:px-14 py-12">
              <p className="text-xs font-semibold text-cobalt uppercase tracking-widest mb-4">
                Onze missie
              </p>
              <blockquote className="font-display font-bold text-2xl md:text-3xl text-slate-100 leading-tight tracking-tight max-w-2xl">
                &ldquo;Elk ambitieus bedrijf verdient digitale infrastructuur die bij zijn
                ambitie past — betaalbaar, snel en gebouwd om te groeien.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
              Onze waarden
            </p>
            <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight">
              Wat ons drijft
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-surface border border-white/[0.07] rounded-xl p-6"
              >
                <h3 className="font-display font-semibold text-slate-100 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight mb-4">
            Klinkt dit als een match?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Neem contact op en laten we kijken wat we voor elkaar kunnen betekenen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-oros text-white px-8 py-3.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Neem contact op
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center justify-center gap-2 border border-white/[0.1] text-slate-300 px-8 py-3.5 rounded-md font-medium text-sm hover:border-white/[0.2] hover:text-slate-100 transition-all"
            >
              Bekijk ons werk
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
