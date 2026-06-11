import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Werkwijze',
  description: 'Ons proces van intake tot oplevering. Transparant, voorspelbaar en gericht op resultaat.',
}

const steps = [
  {
    number: '01',
    title: 'Intake & Strategie',
    duration: 'Week 1',
    description:
      'We beginnen niet met bouwen, maar met begrijpen. In een gestructureerd intakegesprek brengen we jouw business, doelen, doelgroep en concurrentie in kaart.',
    deliverables: [
      'Projectbrief & scope definitie',
      'Doelgroepanalyse',
      'Technische specificaties',
      'Planning & mijlpalen',
    ],
  },
  {
    number: '02',
    title: 'Ontwerp & Prototype',
    duration: 'Week 2',
    description:
      'Op basis van de strategie ontwerpen we een werkend prototype. Geen statische mockups, maar klikbare flows die je meteen kunt testen en beoordelen.',
    deliverables: [
      'Wireframes & sitemap',
      'Visueel ontwerp in brand stijl',
      'Klikbaar prototype',
      'Feedback ronde & aanpassingen',
    ],
  },
  {
    number: '03',
    title: 'Development',
    duration: 'Week 3–5',
    description:
      'We bouwen in korte sprints van één week. Na elke sprint krijg jij toegang tot de live preview-omgeving. Geen verrassingen aan het einde — je volgt het proces.',
    deliverables: [
      'Live preview-omgeving',
      'Wekelijkse demo',
      'Iteratieve aanpassingen',
      'Technische documentatie',
    ],
  },
  {
    number: '04',
    title: 'Review & Testing',
    duration: 'Week 6',
    description:
      'Voordat we live gaan, testen we grondig. Performance, toegankelijkheid, mobiele weergave en alle functies worden gecontroleerd. Jij geeft de finale goedkeuring.',
    deliverables: [
      'Cross-browser & device testing',
      'Performance audit (Lighthouse 90+)',
      'Accessibility check',
      'Finale goedkeuringsronde',
    ],
  },
  {
    number: '05',
    title: 'Lancering & Groei',
    duration: 'Week 7+',
    description:
      'Live zetten is het begin, niet het einde. We monitoren de lancering, lossen eventuele issues direct op en bespreken de eerste resultaten. Daarna bepalen we samen de volgende stap.',
    deliverables: [
      'Gecontroleerde lancering',
      'Analytics setup',
      'Kennisoverdracht & training',
      'Optioneel: doorlopend onderhoud',
    ],
  },
]

const principles = [
  {
    title: 'Geen verrassingen',
    description: 'Vaste prijs, vaste planning. Wat we afspreken, leveren we op.',
  },
  {
    title: 'Jij zit aan het stuur',
    description: 'Wekelijkse updates en directe toegang tot de preview-omgeving.',
  },
  {
    title: 'Resultaat staat voorop',
    description: 'We meten succes in conversies, gebruik en tevredenheid — niet in uren.',
  },
  {
    title: 'Eerlijk advies',
    description: 'Als iets niet werkt, zeggen we dat. Ook als het voor ons minder werk betekent.',
  },
]

export default function WerkwijzePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block" />
            Onze werkwijze
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight text-slate-100 max-w-3xl leading-[1.05]">
            Transparant proces,{' '}
            <span className="gradient-text">voorspelbaar resultaat.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            Van eerste gesprek tot live product in 6–7 weken. Elke stap is helder, elke
            beslissing is besproken.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-7 top-8 bottom-8 w-px bg-white/[0.07] hidden md:block" />

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative bg-surface border border-white/[0.07] rounded-2xl p-8 md:pl-20"
                >
                  {/* Step number circle */}
                  <div className="absolute left-0 top-8 md:left-0 w-14 h-14 hidden md:flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-background border border-white/[0.1] flex items-center justify-center">
                      <span className="text-xs font-bold gradient-text">{step.number}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-display font-bold text-xl gradient-text md:hidden">
                          {step.number}
                        </span>
                        <h2 className="font-display font-bold text-xl text-slate-100">
                          {step.title}
                        </h2>
                        <span className="text-xs text-slate-500 border border-white/[0.08] px-2 py-0.5 rounded">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{step.description}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        Deliverables
                      </p>
                      <ul className="space-y-2">
                        {step.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="text-cobalt mt-0.5 shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="text-sm text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
              Onze principes
            </p>
            <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight">
              Waarom klanten bij ons blijven
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p) => (
              <div
                key={p.title}
                className="bg-surface border border-white/[0.07] rounded-xl p-6"
              >
                <h3 className="font-display font-semibold text-slate-100 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight mb-4">
            Zin om samen te werken?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Plan een vrijblijvend intakegesprek. We bespreken jouw project en kijken of er een
            match is.
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
      </section>
    </>
  )
}
