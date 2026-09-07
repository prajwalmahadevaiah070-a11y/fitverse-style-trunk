import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Petikara · Luxury Indian Couture & Doorstep Home Trials',
  description:
    'Experience curated Banarasi, Kanchipuram, Velvet Bandhgalas, and Kids festive couture delivered to your doorstep for a 1-hour private fitting.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0b0f14] text-[#f5f5f5] antialiased">
        {/* HAUTE COUTURE TOP NAVIGATION */}
        <header className="sticky top-0 z-50 w-full border-b border-[#222a35] bg-[#0b0f14]/90 backdrop-blur-md">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#d4af37] uppercase font-serif"
            >
              Petikara
            </Link>

            <nav className="flex items-center gap-6 sm:gap-8 text-[11px] font-semibold uppercase tracking-[0.18em]">
              <Link
                href="/"
                className="text-gray-300 hover:text-[#d4af37] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/studio"
                className="text-gray-300 hover:text-[#d4af37] transition-colors"
              >
                Try-On Studio
              </Link>
              <Link
                href="/trunk"
                className="rounded-full border border-[#d4af37] bg-[#d4af37]/10 px-5 py-2 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
              >
                Doorstep Trunk
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
