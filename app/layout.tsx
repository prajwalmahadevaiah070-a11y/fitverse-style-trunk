import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'PETIKARA | Indian Haute Couture & Doorstep Trunk Atelier',
  description: 'Handcrafted luxury Indian couture. Private 1-hour doorstep home trials across Bengaluru.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white antialiased">
        {/* Top Minimal Dispatch Strip */}
        <div className="w-full bg-[#0d0d0d] py-2 text-center text-[9px] uppercase tracking-[0.35em] text-zinc-400 border-b border-white/[0.05]">
          Complimentary Doorstep Home Trial Atelier · Bengaluru
        </div>

        {/* The Centered Maison Header */}
        <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-white/[0.08]">
          <div className="mx-auto flex flex-col items-center justify-center pt-5 pb-3 px-6">
            {/* Centered Brand Title */}
            <Link
              href="/"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.35em] uppercase text-white hover:text-zinc-300 transition-colors"
            >
              PETIKARA
            </Link>

            {/* Sub-Navigation Categories */}
            <nav className="flex items-center gap-8 sm:gap-12 mt-4 text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-light">
              <Link href="/#women" className="hover:text-white transition-colors">Women</Link>
              <Link href="/#men" className="hover:text-white transition-colors">Men</Link>
              <Link href="/#kids" className="hover:text-white transition-colors">Junior Atelier</Link>
              <Link href="/studio" className="hover:text-white transition-colors">Digital Atelier</Link>
              <Link href="/trunk" className="text-white hover:text-zinc-300 transition-colors">Doorstep Trunk</Link>
            </nav>
          </div>
        </header>

        {/* Content Container */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
