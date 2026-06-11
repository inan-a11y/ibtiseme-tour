import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Pro's Agency — Digitale Infrastructuur voor Ambitieuze Bedrijven",
    template: "%s | Pro's Agency",
  },
  description:
    'B2B websites, dashboards en marketing voor bedrijven die willen groeien. Modern, snel en op maat.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: "Pro's Agency",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-background text-slate-100 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
