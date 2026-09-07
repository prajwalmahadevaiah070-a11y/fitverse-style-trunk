import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Petikara · Haute Couture Doorstep Maison',
  description:
    'Private doorstep trials for heirloom Indian couture. Banarasi silks, royal bandhgalas, and hypoallergenic junior festive wear.',
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0a0d12] text-[#f5f5f5] antialiased selection:bg-[#d4af37]/30 selection:text-[#d4af37]">
        {/* TOP EDITORIAL ANNOUNCEMENT */}
        <div className="w-full border-b border-white/[0.06] bg-black/40 py-2 text-center text-[9px] uppercase tracking-[0.35em] text-[#d4af37]">
          Private Doorstep Trial Maison · Bengaluru
        </div>

        {/* CENTERED LUXURY MASTHEAD NAVIGATION */}
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0a0d12]/95 backdrop-blur-md">
          <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-12">
            {/* Left Symmetrical Navigation */}
            <nav className="flex items-center gap-8 text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400">
              <Link href="/#wardrobe" className="hover:text-white transition-colors">
                Collections
              </Link>
              <Link href="/studio" className="hover:text-white transition-colors">
                Atelier Studio
              </Link>
            </nav>

            {/* Centered Brand Masthead */}
            <Link
              href="/"
              className="font-serif text-3xl sm:text-4xl tracking-[0.35em] text-white uppercase hover:text-[#d4af37] transition-colors"
            >
              Petikara
            </Link>

            {/* Right Symmetrical Navigation */}
            <nav className="flex items-center gap-8 text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400">
              <Link href="/#ritual" className="hover:text-white transition-colors">
                The Ritual
              </Link>
              <Link
                href="/trunk"
                className="border border-[#d4af37]/60 bg-[#d4af37]/10 px-5 py-2 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
              >
                Trunk (4)
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
