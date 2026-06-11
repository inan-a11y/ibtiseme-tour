import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Neem contact op met Pro's Agency. Plan een intake of stel je vraag.",
}

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'E-mail',
    value: 'info@prosagency.nl',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Telefoon',
    value: '+31 (0)6 00 000 000',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Locatie',
    value: 'Nederland (remote werkend)',
  },
]

const faqs = [
  {
    q: 'Hoe snel kan jullie starten?',
    a: 'Afhankelijk van onze capaciteit kunnen we doorgaans binnen 2–3 weken na intakegesprek starten.',
  },
  {
    q: 'Werken jullie ook met vaste prijzen?',
    a: 'Ja. Na de intake stellen we een vaste offerte op. Geen uurprijzen, geen verrassingen achteraf.',
  },
  {
    q: 'Kan ik na oplevering nog wijzigingen laten doen?',
    a: 'Ja. We bieden optioneel doorlopend onderhoud en doorontwikkeling aan na elke oplevering.',
  },
  {
    q: 'Werken jullie met bedrijven buiten Nederland?',
    a: 'Absoluut. We werken remote en bedienen klanten door heel Europa.',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block" />
            Contact
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight text-slate-100 max-w-2xl leading-[1.05]">
            Laten we{' '}
            <span className="gradient-text">kennis maken.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-lg leading-relaxed">
            Vertel ons over jouw project. We reageren binnen één werkdag en plannen een
            vrijblijvend intakegesprek.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-surface border border-white/[0.07] rounded-2xl p-8">
                <h2 className="font-display font-semibold text-xl text-slate-100 mb-6">
                  Stuur ons een bericht
                </h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm text-slate-400 mb-2">
                        Naam *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Jan de Vries"
                        className="w-full bg-background border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cobalt/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm text-slate-400 mb-2">
                        Bedrijf *
                      </label>
                      <input
                        id="company"
                        type="text"
                        required
                        placeholder="Jouw Bedrijf B.V."
                        className="w-full bg-background border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cobalt/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-slate-400 mb-2">
                      E-mailadres *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jan@jouwbedrijf.nl"
                      className="w-full bg-background border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cobalt/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm text-slate-400 mb-2">
                      Dienst
                    </label>
                    <select
                      id="service"
                      className="w-full bg-background border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cobalt/60 transition-colors appearance-none"
                    >
                      <option value="">Selecteer een dienst</option>
                      <option value="website">B2B Website</option>
                      <option value="dashboard">Dashboard / Portaal</option>
                      <option value="marketing">Marketing & Branding</option>
                      <option value="anders">Anders / Combinatie</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-slate-400 mb-2">
                      Jouw project *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Vertel ons over jouw project, doelen en eventuele deadline..."
                      className="w-full bg-background border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cobalt/60 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-oros text-white py-3.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Verstuur bericht
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    We reageren binnen één werkdag.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact info */}
              <div className="bg-surface border border-white/[0.07] rounded-2xl p-6">
                <h3 className="font-display font-semibold text-slate-100 mb-5">
                  Direct contact
                </h3>
                <div className="space-y-4">
                  {contactInfo.map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-background border border-white/[0.07] flex items-center justify-center text-cobalt shrink-0">
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                        <p className="text-sm text-slate-200">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="bg-surface border border-white/[0.07] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium text-slate-100">Beschikbaar voor nieuwe projecten</span>
                </div>
                <p className="text-sm text-slate-400">
                  We nemen momenteel nieuwe klanten aan. Gemiddelde responstijd: &lt; 4 uur op
                  werkdagen.
                </p>
              </div>

              {/* FAQ */}
              <div className="bg-surface border border-white/[0.07] rounded-2xl p-6">
                <h3 className="font-display font-semibold text-slate-100 mb-5">
                  Veelgestelde vragen
                </h3>
                <div className="space-y-4">
                  {faqs.map(({ q, a }) => (
                    <div key={q}>
                      <p className="text-sm font-medium text-slate-200 mb-1">{q}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
