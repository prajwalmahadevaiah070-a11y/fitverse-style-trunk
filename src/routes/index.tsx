import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Camera, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { ProductCard } from "@/components/ProductCard";
import { useFitVerse } from "@/lib/fitverse-store";
import { CATEGORY_TREE, GENDERS, TRUNK_CAP } from "@/lib/fitverse-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitVerse — Indian Fashion With Doorstep Home Try-On" },
      {
        name: "description",
        content:
          "Shop handwoven sarees, sherwanis and modern Indian labels, style them in the Digital Try-On Studio, then try four pieces at home before you pay.",
      },
      { property: "og:title", content: "FitVerse — Home Try-On for Indian Fashion" },
      {
        property: "og:description",
        content:
          "A stylist brings four pieces to your door. Keep what fits, return the rest, pay for nothing else.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { products, trunk } = useFitVerse();
  const featured = products.slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-10 pb-28 md:max-w-5xl md:px-6 md:pt-24">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-luxe md:p-10">
        <div
          className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <p className="eyebrow">Universal marketplace · Home try-on</p>
        <h1 className="mt-3 text-4xl leading-[1.08] font-semibold md:text-6xl">
          Try it on at home.
          <br />
          <span className="text-gold-gradient">Pay for what stays.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Handloom ateliers and modern Indian labels in one place. Pick up to {TRUNK_CAP} pieces, a
          stylist brings them to your door, and you decide in your own mirror.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            to="/browse"
            className="flex items-center gap-2 rounded-lg bg-gold-gradient px-5 py-3 text-sm font-semibold tracking-[0.1em] text-primary-foreground uppercase shadow-gold"
          >
            Start browsing <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/studio"
            className="flex items-center gap-2 rounded-lg border border-primary/45 px-5 py-3 text-sm tracking-[0.1em] text-primary uppercase"
          >
            <Sparkles className="size-4" /> Try-on studio
          </Link>
        </div>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-5 text-sm">
          {[
            ["18", "curated pieces"],
            ["60 min", "at-home trial"],
            ["₹0", "if nothing fits"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="text-lg font-semibold text-primary">{v}</dt>
              <dd className="eyebrow">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Camera, t: "Style it digitally", d: "Layer garments on your own photo or a mannequin." },
          { icon: Briefcase, t: `Pack ${TRUNK_CAP} pieces`, d: "One trunk, one visit, one decision." },
          { icon: Truck, t: "Doorstep fitting", d: "A stylist waits while you try everything on." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card p-4">
            <Icon className="size-5 text-primary" />
            <h2 className="mt-2.5 text-lg font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Shop by wardrobe</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {GENDERS.map((g) => (
            <Link
              key={g.id}
              to="/browse"
              className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/45"
            >
              <p className="eyebrow">{Object.keys(CATEGORY_TREE[g.id]).join(" · ")}</p>
              <p className="mt-2 flex items-center justify-between text-lg font-semibold">
                {g.label}
                <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">The featured edit</h2>
          <Link to="/browse" className="text-xs tracking-[0.12em] text-primary uppercase">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-10 flex items-start gap-3 rounded-xl border border-border bg-card p-5">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Every trunk is sanitised and sealed before dispatch, and the visit fee is adjusted against
          anything you keep.{" "}
          {trunk.length > 0 && (
            <Link to="/trunk" className="text-primary underline">
              You have {trunk.length} piece{trunk.length > 1 ? "s" : ""} waiting in your trunk.
            </Link>
          )}
        </p>
      </section>

      <footer className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
        FitVerse · Bengaluru · Demo experience with simulated try-on and payments.
      </footer>
    </main>
  );
}
