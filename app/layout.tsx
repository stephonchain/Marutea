import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://marutea.fr'),
  title: {
    default: 'Marutea — Spa bien-être à Arcachon',
    template: '%s | Marutea',
  },
  description:
    'Spa bien-être à Arcachon : massages, soins du visage et rituels 100% bio. Cartes cadeaux et réservation en ligne.',
  openGraph: {
    locale: 'fr_FR',
    siteName: 'Marutea',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
