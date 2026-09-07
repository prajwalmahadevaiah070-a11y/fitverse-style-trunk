import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Sparkles, Briefcase, Store } from "lucide-react";

import { useFitVerse } from "@/lib/fitverse-store";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/browse", label: "Browse", icon: Search },
  { to: "/studio", label: "Try-On", icon: Sparkles },
  { to: "/trunk", label: "Trunk", icon: Briefcase },
  { to: "/retailer", label: "Retailer", icon: Store },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { trunk } = useFitVerse();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:top-0 md:bottom-auto md:border-t-0 md:border-b"
    >
      <div className="mx-auto flex max-w-3xl items-stretch md:max-w-5xl md:items-center md:gap-1 md:px-6 md:py-2">
        <Link
          to="/"
          className="hidden items-center gap-2 pr-6 md:flex"
          aria-label="FitVerse home"
        >
          <span className="font-display text-2xl font-semibold tracking-tight text-gold-gradient">
            FitVerse
          </span>
        </Link>
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          const badge = to === "/trunk" ? trunk.length : 0;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.625rem] tracking-[0.14em] uppercase transition-colors md:flex-none md:flex-row md:gap-2 md:px-3 md:py-2 md:text-xs",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative">
                <Icon className="size-5 md:size-4" strokeWidth={active ? 2.1 : 1.6} />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 grid size-4 place-items-center rounded-full bg-gold-gradient text-[0.5625rem] font-semibold text-primary-foreground">
                    {badge}
                  </span>
                )}
              </span>
              {label}
              {active && (
                <span className="absolute top-0 h-px w-8 bg-gold-gradient md:hidden" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
