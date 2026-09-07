import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { Toaster } from 'sonner'

import { BottomNav } from '@/components/BottomNav'
import { FitVerseProvider } from '@/lib/fitverse-store'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Petikara — Indian Fashion With Doorstep Home Try-On',
  description:
    'Shop handwoven sarees, sherwanis and modern Indian labels, style them in the Digital Try-On Studio, then try four pieces at home before you pay a refundable ₹199 deposit.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#14181f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <FitVerseProvider>
          <div className="mx-auto min-h-dvh w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 md:pb-12">
            {children}
          </div>
          <BottomNav />
          <Toaster
            theme="dark"
            position="top-center"
            toastOptions={{
              style: {
                background: 'oklch(0.268 0.019 256)',
                border: '1px solid oklch(1 0 0 / 12%)',
                color: 'oklch(0.965 0.004 90)',
              },
            }}
          />
        </FitVerseProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
