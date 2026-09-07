import type { ReactNode } from 'react'

export function Screen({
  eyebrow,
  title,
  subtitle,
  action,
  children,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <main className="px-4 pt-6">
      <header className="mb-5 flex items-end justify-between gap-3">
        <div>
          {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
          <h1 className="text-2xl leading-tight">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </main>
  )
}
