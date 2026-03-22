import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Marutea — Spa & Bien-être à Arcachon',
    template: '%s | Marutea',
  },
  description:
    'Découvrez Marutea, votre spa bien-être à Arcachon. Massages, soins du visage, cartes cadeaux et réservation en ligne.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://marutea.fr'),
  openGraph: {
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Marutea',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col font-body bg-cream text-dark">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
