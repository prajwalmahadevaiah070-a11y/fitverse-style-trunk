import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Banknote,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  MapPin,
  Smartphone,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { GarmentSwatch } from "@/components/GarmentSwatch";
import { Screen } from "@/components/Screen";
import { useFitVerse } from "@/lib/fitverse-store";
import { TRIAL_VISIT_FEE, TRUNK_CAP, formatINR } from "@/lib/fitverse-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trunk")({
  head: () => ({
    meta: [
      { title: "Trial Trunk — Book a Doorstep Home Try-On | FitVerse" },
      {
        name: "description",
        content:
          "Pack up to four pieces into your Trial Trunk, choose a slot, pay the refundable visit fee and try everything on at home.",
      },
      { property: "og:title", content: "Trial Trunk | FitVerse" },
      {
        property: "og:description",
        content: "Four pieces, one doorstep visit, sixty minutes to decide. Keep only what fits.",
      },
    ],
  }),
  component: TrunkPage,
});

const SLOTS = [
  "Today · 6–8 PM",
  "Tomorrow · 10 AM–12 PM",
  "Tomorrow · 4–6 PM",
  "Saturday · 11 AM–1 PM",
];

const METHODS = [
  { id: "upi", label: "UPI", icon: Smartphone, hint: "GPay / PhonePe / Paytm" },
  { id: "card", label: "Card", icon: CreditCard, hint: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Pay at door", icon: Banknote, hint: "Cash or UPI to stylist" },
] as const;

function TrunkPage() {
  const { trunk, productById, removeFromTrunk, clearTrunk, addBooking, bookings, hydrated } =
    useFitVerse();
  const [step, setStep] = useState<"trunk" | "book" | "pay">("trunk");
  const [slot, setSlot] = useState(SLOTS[0]!);
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<string>("upi");
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const items = useMemo(
    () => trunk.map((t) => ({ ...t, product: productById(t.productId) })).filter((i) => i.product),
    [trunk, productById],
  );
  const garmentValue = items.reduce((s, i) => s + (i.product?.price ?? 0), 0);
  const tryOnFees = items.reduce((s, i) => s + (i.product?.tryOnFee ?? 0), 0);
  const dueNow = TRIAL_VISIT_FEE + tryOnFees;

  if (confirmed) {
    return (
      <Screen eyebrow="Confirmed" title="Your stylist is on the way">
        <div className="rounded-xl border border-primary/30 bg-primary/[0.06] p-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-primary" />
          <p className="mt-3 text-lg">Trial {confirmed} booked</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {slot} · {items.length} pieces · 60 minutes at home
          </p>
          <Link
            to="/browse"
            className="mt-5 inline-block rounded-lg bg-gold-gradient px-5 py-2.5 text-sm font-semibold tracking-[0.1em] text-primary-foreground uppercase"
          >
            Keep browsing
          </Link>
        </div>
      </Screen>
    );
  }

  return (
    <Screen
      eyebrow={`${items.length} of ${TRUNK_CAP} slots filled`}
      title="Trial Trunk"
      subtitle="Four pieces travel to your door in one trunk. Try them on, keep what fits, hand back the rest."
      action={
        items.length > 0 ? (
          <button
            onClick={() => {
              clearTrunk();
              setStep("trunk");
            }}
            className="shrink-0 text-xs tracking-[0.12em] text-muted-foreground uppercase hover:text-destructive"
          >
            Empty
          </button>
        ) : null
      }
    >
      <div className="mb-5 flex gap-1.5">
        {Array.from({ length: TRUNK_CAP }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full",
              i < items.length ? "bg-gold-gradient" : "bg-secondary",
            )}
          />
        ))}
      </div>

      {hydrated && items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <Briefcase className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Your trunk is empty. Add up to four pieces for a single home visit.
          </p>
          <Link to="/browse" className="mt-4 inline-block text-sm text-primary underline">
            Browse the marketplace
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-start">
          <ul className="space-y-2.5">
            {items.map((i) => (
              <li
                key={i.productId}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <span
                  className="size-16 shrink-0 overflow-hidden rounded-lg"
                  style={{ background: "var(--color-surface-raised)" }}
                >
                  <GarmentSwatch product={i.product!} className="size-full p-2" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{i.product!.name}</span>
                  <span className="eyebrow block">
                    Size {i.size} · {i.product!.brand}
                  </span>
                  <span className="mt-1 block text-sm text-primary">
                    {formatINR(i.product!.price)}
                    {i.product!.tryOnFee > 0 && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        + {formatINR(i.product!.tryOnFee)} try-on
                      </span>
                    )}
                  </span>
                </span>
                <button
                  onClick={() => removeFromTrunk(i.productId)}
                  aria-label={`Remove ${i.product!.name}`}
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
            {items.length < TRUNK_CAP && (
              <li>
                <Link
                  to="/browse"
                  className="block rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground hover:border-primary/45 hover:text-foreground"
                >
                  + Add {TRUNK_CAP - items.length} more piece
                  {TRUNK_CAP - items.length > 1 ? "s" : ""}
                </Link>
              </li>
            )}
          </ul>

          <div className="space-y-4 rounded-xl border border-border bg-card p-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Garment value in trunk</span>
                <span>{formatINR(garmentValue)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Premium try-on fees</span>
                <span>{tryOnFees === 0 ? "Free" : formatINR(tryOnFees)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Doorstep visit fee</span>
                <span>{formatINR(TRIAL_VISIT_FEE)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-2 text-base">
                <span>Due now</span>
                <span className="font-semibold text-primary">{formatINR(dueNow)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Adjusted against anything you keep. Pay for garments only after trying them.
              </p>
            </div>

            {step === "trunk" && (
              <button
                onClick={() => setStep("book")}
                className="w-full rounded-lg bg-gold-gradient py-3 text-sm font-semibold tracking-[0.1em] text-primary-foreground uppercase shadow-gold"
              >
                Book home trial
              </button>
            )}

            {step === "book" && (
              <div className="space-y-4">
                <div>
                  <p className="eyebrow mb-2 flex items-center gap-1.5">
                    <CalendarClock className="size-3.5" /> Choose a slot
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {SLOTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlot(s)}
                        className={cn(
                          "rounded-lg border px-2.5 py-2 text-xs transition-colors",
                          slot === s
                            ? "border-primary bg-primary/12 text-primary"
                            : "border-border text-muted-foreground",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="addr" className="eyebrow mb-2 flex items-center gap-1.5">
                    <MapPin className="size-3.5" /> Trial address
                  </label>
                  <textarea
                    id="addr"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat, street, landmark, city, PIN"
                    className="w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <button
                  onClick={() => {
                    if (address.trim().length < 12) {
                      toast.error("Add a full address so the stylist can reach you");
                      return;
                    }
                    setStep("pay");
                  }}
                  className="w-full rounded-lg bg-gold-gradient py-3 text-sm font-semibold tracking-[0.1em] text-primary-foreground uppercase"
                >
                  Continue to payment
                </button>
              </div>
            )}

            {step === "pay" && (
              <div className="space-y-3">
                <p className="eyebrow">Pay {formatINR(dueNow)} to lock the slot</p>
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                      method === m.id ? "border-primary bg-primary/[0.08]" : "border-border",
                    )}
                  >
                    <m.icon className="size-4 text-primary" />
                    <span>
                      <span className="block text-sm">{m.label}</span>
                      <span className="eyebrow">{m.hint}</span>
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    const b = addBooking({
                      slot,
                      address,
                      items: trunk,
                      total: dueNow,
                      method,
                    });
                    clearTrunk();
                    setConfirmed(b.id);
                    toast.success("Payment simulated — trial confirmed");
                  }}
                  className="w-full rounded-lg bg-gold-gradient py-3 text-sm font-semibold tracking-[0.1em] text-primary-foreground uppercase shadow-gold"
                >
                  Pay {formatINR(dueNow)}
                </button>
                <p className="text-center text-[0.6875rem] text-muted-foreground">
                  Demo checkout — no real payment is taken.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {hydrated && bookings.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-semibold">Past trials</h2>
          <ul className="space-y-2">
            {bookings.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm"
              >
                <span>
                  <span className="block">{b.id}</span>
                  <span className="eyebrow">
                    {b.slot} · {b.items.length} pieces
                  </span>
                </span>
                <span className="text-primary">{formatINR(b.total)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Screen>
  );
}
