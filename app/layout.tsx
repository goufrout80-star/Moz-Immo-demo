import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header, Footer, CookieConsent } from '@/components/layout'
import { ThemeProvider } from '@/components/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'Moz Immo | Luxury Concierge Marrakech',
    template: '%s | Moz Immo',
  },
  description: 'Your trusted partner for luxury villa management, rentals, and concierge services in Marrakech, Morocco. Buy your peace of mind.',
  keywords: ['luxury concierge Marrakech', 'villa rental Morocco', 'luxury villa management', 'Marrakech concierge', 'luxury travel Morocco'],
  authors: [{ name: 'Moz Immo' }],
  creator: 'Moz Immo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mozimmo.com',
    siteName: 'Moz Immo',
    title: 'Moz Immo | Luxury Concierge Marrakech',
    description: 'Your trusted partner for luxury villa management, rentals, and concierge services in Marrakech, Morocco.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Moz Immo - Luxury Concierge Marrakech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moz Immo | Luxury Concierge Marrakech',
    description: 'Your trusted partner for luxury villa management, rentals, and concierge services in Marrakech, Morocco.',
    images: ['https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
