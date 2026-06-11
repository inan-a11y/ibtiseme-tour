import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cases',
  description: 'Bekijk ons werk. B2B websites, dashboards en rebranding projecten voor ambitieuze bedrijven.',
}

const cases = [
  {
    category: 'B2B Website',
    client: 'Visio Group',
    sector: 'Consultancy',
    description:
      'Complete corporate website voor een B2B consultancybedrijf. Focus op geloofwaardigheid, expertisepresentatie en lead nurturing.',
    result: '+40% gekwalificeerde leads in Q1',
    tags: ['Next.js', 'Sanity CMS', 'SEO'],
    gradient: 'from-cobalt/20 to-violet/10',
  },
  {
    category: 'Analytics Dashboard',
    client: 'DataFirst',
    sector: 'Fintech',
    description:
      'Intern analytics dashboard dat real-time data inzichtelijk maakt voor vijf business units. Rolgebaseerde toegang en exportfuncties.',
    result: '60% minder rapportage tijd',
    tags: ['React', 'TypeScript', 'Data visualisatie'],
    gradient: 'from-violet/20 to-cobalt/10',
  },
  {
    category: 'Branding & Website',
    client: 'NordBrand',
    sector: 'Retail B2B',
    description:
      'Volledige rebranding inclusief nieuw logo, visueel systeem en corporate website. Van legacy uitstraling naar modern B2B merk.',
    result: 'Nieuw marktsegment bereikt',
    tags: ['Brand Identity', 'Webdesign', 'Strategie'],
    gradient: 'from-cobalt/15 to-violet/15',
  },
  {
    category: 'Klantportaal',
    client: 'Apex Solutions',
    sector: 'SaaS',
    description:
      'Klantportaal met inlog-omgeving voor het beheren van contracten, facturen en supporttickets. 200+ actieve gebruikers op dag één.',
    result: '200+ actieve gebruikers dag 1',
    tags: ['Next.js', 'Auth', 'Portal'],
    gradient: 'from-violet/20 to-cobalt/10',
  },
  {
    category: 'Marketing & Website',
    client: 'Meridian Group',
    sector: 'B2B Dienstverlening',
    description:
      'Nieuwe marketingstrategie gecombineerd met een complete website rebuild. Sterke focus op demo-aanvragen en sales pipeline.',
    result: '3× meer demo aanvragen',
    tags: ['Marketing', 'Webdesign', 'Conversie'],
    gradient: 'from-cobalt/10 to-violet/20',
  },
  {
    category: 'Intern Dashboard',
    client: 'Cortex Analytics',
    sector: 'Tech',
    description:
      'Intern operationeel dashboard dat vijf teams real-time inzicht geeft in KPIs, projectstatus en resource-gebruik.',
    result: 'Real-time inzicht voor 5 teams',
    tags: ['Dashboard', 'Real-time', 'TypeScript'],
    gradient: 'from-violet/15 to-cobalt/15',
  },
]

export default function CasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block" />
            Ons werk
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight text-slate-100 max-w-3xl leading-[1.05]">
            Projecten die{' '}
            <span className="gradient-text">voor zichzelf spreken.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            Een selectie van recente projecten voor bedrijven in verschillende sectoren.
            Van website tot dashboard, van startup tot gevestigde onderneming.
          </p>
        </div>
      </section>

      {/* Cases grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.map((c) => (
              <div
                key={c.client}
                className="group bg-surface border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300"
              >
                {/* Gradient thumbnail */}
                <div className={`h-44 bg-gradient-to-br ${c.gradient} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-bold text-3xl text-white/10">
                      {c.client[0]}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-cobalt font-medium">{c.category}</span>
                    <span className="text-xs text-slate-500">{c.sector}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-100 mb-3">
                    {c.client}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{c.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-400 border border-white/[0.08] px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Result */}
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

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="gradient-border rounded-2xl p-px glow-violet">
            <div className="bg-surface rounded-2xl px-8 md:px-16 py-14 text-center">
              <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight mb-3">
                Jouw project hier?
              </h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                Laten we samen iets bouwen dat resultaten oplevert. Plan een intake en we
                kijken of er een match is.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-oros text-white px-8 py-3.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Start een gesprek
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
