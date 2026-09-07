import type { ReactNode } from "react";

export function Screen({
  eyebrow,
  title,
  subtitle,
  action,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-8 pb-28 md:max-w-5xl md:px-6 md:pt-24">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
          <h1 className="text-3xl leading-tight font-semibold md:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </main>
  );
}
