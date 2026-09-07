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
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-gold/30 selection:text-gold">
        {/* LUXURY NAVIGATION HEADER */}
        <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="font-serif text-2xl font-bold tracking-widest text-gold-gradient uppercase"
            >
              Petikara
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 text-xs font-medium uppercase tracking-wider">
              <Link
                href="/"
                className="text-foreground/80 hover:text-gold transition-colors"
              >
                Home
              </Link>
              <Link
                href="/studio"
                className="text-foreground/80 hover:text-gold transition-colors"
              >
                Try-On Studio
              </Link>
              <Link
                href="/trunk"
                className="rounded-full border border-gold/60 bg-gold/10 px-4 py-1.5 text-gold hover:bg-gold hover:text-black transition-all"
              >
                Doorstep Trunk
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
