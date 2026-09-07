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
      <body className="min-h-screen bg-[#050505] text-white antialiased">
        {/* Top Whispered Banner */}
        <div className="w-full bg-[#000000] py-2 text-center text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-zinc-400 hairline-b">
          By Appointment · Private Doorstep Home Trials · Bengaluru
        </div>

        {/* The Centered Editorial Header */}
        <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md hairline-b">
          <div className="mx-auto flex flex-col items-center justify-center pt-6 pb-4 px-6">
            {/* Centered Brand Title */}
            <Link
              href="/"
              className="font-couture text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.4em] text-white hover:text-zinc-300 transition-colors"
            >
              PETIKARA
            </Link>
            <span className="text-[8px] uppercase tracking-[0.5em] text-zinc-500 mt-1">
              HAUTE COUTURE MAISON
            </span>

            {/* Symmetrical High-Fashion Navigation */}
            <nav className="flex items-center gap-6 sm:gap-10 mt-5 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-light">
              <Link href="/#women" className="hover:text-white transition-colors">Women</Link>
              <Link href="/#men" className="hover:text-white transition-colors">Men</Link>
              <Link href="/#junior" className="hover:text-white transition-colors">Junior Atelier</Link>
              <Link href="/#ritual" className="hover:text-white transition-colors">The Ritual</Link>
              <Link href="/studio" className="hover:text-white transition-colors">Digital Atelier</Link>
              <Link href="/trunk" className="text-white hover:text-zinc-300 transition-colors border-b border-white pb-0.5">
                The Trunk
              </Link>
            </nav>
          </div>
        </header>

        {/* Canvas Body */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
