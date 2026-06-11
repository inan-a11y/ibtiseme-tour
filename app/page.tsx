import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pro's Agency — Digitale Infrastructuur voor Ambitieuze Bedrijven",
}

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'B2B Websites',
    description:
      'Corporate websites die vertrouwen wekken en leads genereren. Van een informatieve company site tot een volledige marketing hub.',
    href: '/diensten#websites',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Dashboards & Portalen',
    description:
      'Interne tools en klantportalen die complexe data inzichtelijk maken. Gebouwd voor efficiency en dagelijks gebruik.',
    href: '/diensten#dashboards',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Marketing & Branding',
    description:
      'Een merkidentiteit die aantrekt. Van visueel systeem tot contentstrategie — alles wat je nodig hebt om op te vallen.',
    href: '/diensten#marketing',
  },
]

const steps = [
  {
    number: '01',
    title: 'Strategie & Intake',
    description: 'We beginnen met diepgaand begrip van jouw business, doelen en doelgroep.',
  },
  {
    number: '02',
    title: 'Ontwerp & Bouw',
    description: 'Snelle iteraties met directe feedback. Jij ziet het proces, niet alleen het resultaat.',
  },
  {
    number: '03',
    title: 'Lancering & Groei',
    description: 'Live zetten, meten en doorontwikkelen. Het werk stopt niet bij de oplevering.',
  },
]

const cases = [
  {
    category: 'B2B Website',
    title: 'Visio Group',
    description: 'Complete corporate website voor een B2B consultancybedrijf met leadgeneratie focus.',
    result: '+40% gekwalificeerde leads',
    color: 'from-cobalt/10 to-violet/10',
  },
  {
    category: 'Dashboard',
    title: 'DataFirst',
    description: 'Intern analytics dashboard dat real-time data inzichtelijk maakt voor vijf business units.',
    result: '60% minder rapportage tijd',
    color: 'from-violet/10 to-cobalt/10',
  },
  {
    category: 'Branding & Website',
    title: 'NordBrand',
    description: 'Volledige rebranding inclusief nieuw visueel systeem en corporate website.',
    result: 'Nieuw marktsegment bereikt',
    color: 'from-cobalt/10 to-violet/10',
  },
]

const stats = [
  { value: '20+', label: 'Projecten afgerond' },
  { value: '3×', label: 'Sneller dan traditioneel' },
  { value: '100%', label: 'Op tijd geleverd' },
  { value: '5', label: 'Sectoren bediend' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block" />
            B2B Digital Agency
          </div>

          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-slate-100 max-w-4xl">
            Digitale infrastructuur voor{' '}
            <span className="gradient-text">ambitieuze bedrijven.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            Wij bouwen websites, dashboards en digitale strategieën die jouw bedrijf laten groeien.
            Modern, snel en volledig op maat.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-oros text-white px-7 py-3.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Start een project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center justify-center gap-2 border border-white/[0.1] text-slate-300 px-7 py-3.5 rounded-md font-medium text-sm hover:border-white/[0.2] hover:text-slate-100 transition-all"
            >
              Bekijk ons werk
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
              Wat wij bouwen
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-100 tracking-tight">
              Drie diensten, één doel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group block bg-surface border border-white/[0.07] rounded-xl p-6 hover:border-white/[0.14] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-cobalt mb-5">
                  {service.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-100 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs text-cobalt font-medium group-hover:gap-2.5 transition-all">
                  Meer informatie
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Werkwijze teaser */}
      <section className="section-padding px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Hoe wij werken
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-100 tracking-tight mb-5">
                Transparant proces,{' '}
                <span className="gradient-text">voorspelbaar resultaat.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Geen verrassingen, geen eindeloze back-and-forth. Wij werken in heldere fases
                met vaste contactmomenten, zodat jij altijd weet waar je staat.
              </p>
              <Link
                href="/werkwijze"
                className="inline-flex items-center gap-2 text-sm text-slate-300 border border-white/[0.1] px-5 py-2.5 rounded-md hover:border-white/[0.2] hover:text-slate-100 transition-all"
              >
                Bekijk onze werkwijze
              </Link>
            </div>

            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={step.number} className="flex gap-5 items-start bg-surface border border-white/[0.07] rounded-xl p-5">
                  <span className="font-display font-bold text-2xl gradient-text leading-none mt-0.5 w-8 shrink-0">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-slate-100 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="section-padding px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Recent werk
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-100 tracking-tight">
                Resultaten die spreken
              </h2>
            </div>
            <Link
              href="/cases"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-100 transition-colors"
            >
              Alle cases
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cases.map((c) => (
              <div
                key={c.title}
                className="bg-surface border border-white/[0.07] rounded-xl overflow-hidden"
              >
                <div className={`h-36 bg-gradient-to-br ${c.color}`} />
                <div className="p-6">
                  <span className="text-xs text-cobalt font-medium">{c.category}</span>
                  <h3 className="font-display font-semibold text-lg text-slate-100 mt-1 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{c.description}</p>
                  <div className="pt-4 border-t border-white/[0.07]">
                    <p className="text-xs text-slate-500 mb-0.5">Resultaat</p>
                    <p className="text-sm font-semibold text-slate-200">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-surface px-8 py-10 text-center">
                <p className="font-display font-bold text-4xl gradient-text mb-2">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-6">
        <div className="max-w-6xl mx-auto">
          <div className="gradient-border rounded-2xl p-px glow-violet">
            <div className="bg-surface rounded-2xl px-8 md:px-16 py-14 text-center">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-100 tracking-tight mb-4">
                Klaar om te bouwen?
              </h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                Start een gesprek en ontdek wat Pro&apos;s Agency voor jouw bedrijf kan
                betekenen. Geen vrijblijvende offerte, maar een eerlijk intake gesprek.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-oros text-white px-8 py-3.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Plan een intake
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
