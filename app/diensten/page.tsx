import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diensten',
  description: 'B2B websites, dashboards en marketing & branding — alles wat je nodig hebt om digitaal te groeien.',
}

const services = [
  {
    id: 'websites',
    tag: '01 — B2B Websites',
    title: 'Websites die deals sluiten',
    description:
      'Een B2B website is geen visitekaartje. Het is jouw belangrijkste salestool. Wij bouwen corporate sites die bezoekers converteren naar echte gesprekken.',
    features: [
      'Corporate company websites',
      'Lead-genererende landingspagina\'s',
      'Multi-pagina marketing sites',
      'CMS-integratie (Sanity, Contentful)',
      'SEO-geoptimaliseerd & razendsnel',
      'Volledige mobiele optimalisatie',
    ],
    cta: 'Vraag een offerte aan',
  },
  {
    id: 'dashboards',
    tag: '02 — Dashboards & Portalen',
    title: 'Data die werkt voor jou',
    description:
      'Complexe data ontsluiten voor de mensen die het nodig hebben. Of het nu gaat om een intern rapportage dashboard of een klantportaal — wij bouwen interfaces die dagelijks gebruikt worden.',
    features: [
      'Analytics & rapportage dashboards',
      'Klantportalen met login-omgeving',
      'Interne business tools',
      'Real-time data-integraties',
      'Rolgebaseerde toegangsbeheer',
      'Export en automatisering',
    ],
    cta: 'Bespreek jouw project',
  },
  {
    id: 'marketing',
    tag: '03 — Marketing & Branding',
    title: 'Een merk dat aantrekt',
    description:
      'Techniek is pas krachtig als de boodschap klopt. Wij helpen je een merkidentiteit op te bouwen die jouw doelgroep aanspreekt en jou onderscheidt van de concurrentie.',
    features: [
      'Merkidentiteit & brand guidelines',
      'Logo-ontwerp & visueel systeem',
      'Contentstrategie & messaging',
      'SEO & digitale strategie',
      'Social media setup & templates',
      'Positionering & tone of voice',
    ],
    cta: 'Start jouw rebranding',
  },
]

export default function DienstenPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block" />
            Onze diensten
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight text-slate-100 max-w-3xl leading-[1.05]">
            Alles onder één dak,{' '}
            <span className="gradient-text">niets half gedaan.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            Van eerste gesprek tot live product. Drie diensten, volledig op maat, gericht op
            meetbaar resultaat voor jouw bedrijf.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 pb-24 space-y-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-surface border border-white/[0.07] rounded-2xl p-8 md:p-12"
            >
              <p className="text-xs font-semibold text-cobalt uppercase tracking-widest mb-4">
                {service.tag}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div>
                  <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight mb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-8">{service.description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-oros text-white px-6 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    {service.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 bg-background rounded-lg px-4 py-3 border border-white/[0.06]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-cobalt mt-0.5 shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="gradient-border rounded-2xl p-px glow-violet">
            <div className="bg-surface rounded-2xl px-8 md:px-16 py-14 text-center">
              <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight mb-3">
                Niet zeker welke dienst bij je past?
              </h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                Vertel ons wat je nodig hebt. Wij denken met je mee en adviseren eerlijk.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-oros text-white px-8 py-3.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Neem contact op
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
