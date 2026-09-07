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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#050505] text-white antialiased">
        {/* Top Minimal Dispatch Strip */}
        <div className="w-full bg-[#000000] py-2 text-center text-[9px] uppercase tracking-[0.35em] text-zinc-400 border-b border-white/[0.06]">
          By Appointment · Private Doorstep Home Trials · Bengaluru
        </div>

        {/* The Centered Maison Navigation */}
        <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/[0.08]">
          <div className="mx-auto flex flex-col items-center justify-center pt-5 pb-4 px-6 max-w-7xl">
            {/* Centered Brand Title */}
            <Link
              href="/"
              className="font-couture text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.35em] text-white hover:text-zinc-300 transition-colors"
            >
              PETIKARA
            </Link>
            <span className="text-[8px] uppercase tracking-[0.5em] text-zinc-500 mt-1">
              HAUTE COUTURE DOORSTEP ATELIER
            </span>

            {/* Clear, Structured Category Navigation */}
            <nav className="flex items-center gap-6 sm:gap-10 mt-5 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-zinc-300 font-light">
              <a href="/#women" className="hover:text-white transition-colors">Women</a>
              <a href="/#men" className="hover:text-white transition-colors">Men</a>
              <a href="/#junior" className="hover:text-white transition-colors">Junior</a>
              <a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <Link href="/studio" className="hover:text-white transition-colors">3D Studio</Link>
              <Link
                href="/trunk"
                className="border border-white/40 bg-white/10 px-4 py-1.5 text-white hover:bg-white hover:text-black transition-all"
              >
                View Trunk
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Canvas Body */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
