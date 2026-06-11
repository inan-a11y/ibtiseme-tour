import Link from 'next/link'

const services = [
  { href: '/diensten#websites', label: 'B2B Websites' },
  { href: '/diensten#dashboards', label: 'Dashboards & Portalen' },
  { href: '/diensten#marketing', label: 'Marketing & Branding' },
]

const company = [
  { href: '/werkwijze', label: 'Werkwijze' },
  { href: '/cases', label: 'Cases' },
  { href: '/over', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display font-bold text-xl tracking-tight">
              Pro&apos;s<span className="gradient-text">Agency</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400 max-w-xs leading-relaxed">
              Digitale infrastructuur voor bedrijven die willen groeien. B2B websites, dashboards en merkstrategie.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Diensten
            </p>
            <ul className="space-y-2">
              {services.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Bedrijf
            </p>
            <ul className="space-y-2">
              {company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Pro&apos;s Agency. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-slate-500">
            Gebouwd voor ambitieuze bedrijven.
          </p>
        </div>
      </div>
    </footer>
  )
}
