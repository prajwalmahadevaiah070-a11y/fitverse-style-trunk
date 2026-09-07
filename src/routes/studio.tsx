import { createFileRoute } from "@tanstack/react-router";
import {
  Camera,
  Columns2,
  ImagePlus,
  Layers,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { GarmentSwatch } from "@/components/GarmentSwatch";
import { Screen } from "@/components/Screen";
import { useFitVerse } from "@/lib/fitverse-store";
import type { Product } from "@/lib/fitverse-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio")({
  validateSearch: (search: Record<string, unknown>) => ({
    garment: typeof search.garment === "string" ? search.garment : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Digital Try-On Studio — Layer Outfits on Your Photo | FitVerse" },
      {
        name: "description",
        content:
          "Upload a photo or pick a mannequin, layer garments, adjust scale and position, compare two looks and share the result on WhatsApp.",
      },
      { property: "og:title", content: "Digital Try-On Studio | FitVerse" },
      {
        property: "og:description",
        content:
          "Layer Indian couture on your own photo, fine-tune the fit, and share looks with friends before booking a home trial.",
      },
    ],
  }),
  component: StudioPage,
});

const MANNEQUINS = [
  { id: "petite", label: "Petite", height: 0.9, tone: "#8a6a52" },
  { id: "regular", label: "Regular", height: 1, tone: "#a07f63" },
  { id: "tall", label: "Tall", height: 1.08, tone: "#5f4736" },
  { id: "curve", label: "Curve", height: 1, tone: "#c19a7b" },
] as const;

type Layer = {
  key: string;
  product: Product;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
};

function Mannequin({ mannequin }: { mannequin: (typeof MANNEQUINS)[number] }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
      <g
        transform={`translate(50 100) scale(1 ${mannequin.height}) translate(-50 -100)`}
        fill={mannequin.tone}
        opacity="0.85"
      >
        <circle cx="50" cy="14" r="7.5" />
        <rect x="47" y="21" width="6" height="6" />
        <path d="M38 27 L62 27 L64 60 L36 60 Z" />
        <rect x="43" y="60" width="6" height="38" rx="3" />
        <rect x="51" y="60" width="6" height="38" rx="3" />
        <rect x="33" y="28" width="5" height="30" rx="2.5" />
        <rect x="62" y="28" width="5" height="30" rx="2.5" />
      </g>
    </svg>
  );
}

function Stage({
  base,
  mannequin,
  layers,
  activeKey,
}: {
  base: string | null;
  mannequin: (typeof MANNEQUINS)[number];
  layers: Layer[];
  activeKey: string | null;
}) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border bg-[var(--color-surface-raised)]">
      {base ? (
        <img src={base} alt="Your try-on photo" className="absolute inset-0 size-full object-cover" />
      ) : (
        <Mannequin mannequin={mannequin} />
      )}
      <div className="absolute inset-0">
        {layers.map((l) => (
          <div
            key={l.key}
            className={cn(
              "absolute inset-0 transition-[outline] duration-150",
              activeKey === l.key && "outline outline-dashed outline-primary/50",
            )}
            style={{
              transform: `translate(${l.x}%, ${l.y}%) scale(${l.scale}) rotate(${l.rotate}deg)`,
            }}
          >
            <GarmentSwatch product={l.product} className="size-full p-6" opacity={l.opacity} />
          </div>
        ))}
      </div>
      <div className="absolute right-2 bottom-2 rounded-full bg-background/75 px-2.5 py-1 text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase backdrop-blur">
        Simulated preview
      </div>
    </div>
  );
}

function StudioPage() {
  const { garment } = Route.useSearch();
  const { products, photos, addPhoto, removePhoto, hydrated } = useFitVerse();
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const [mannequin, setMannequin] = useState<(typeof MANNEQUINS)[number]>(MANNEQUINS[1]!);
  const [basePhoto, setBasePhoto] = useState<string | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [compare, setCompare] = useState(false);
  const [savedLook, setSavedLook] = useState<Layer[] | null>(null);

  useEffect(() => {
    if (!garment) return;
    const p = products.find((x) => x.id === garment);
    if (!p) return;
    setLayers((prev) =>
      prev.some((l) => l.product.id === p.id)
        ? prev
        : [...prev, { key: p.id + Date.now(), product: p, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }],
    );
  }, [garment, products]);

  const active = layers.find((l) => l.key === activeKey) ?? layers[layers.length - 1] ?? null;

  const onFile = (file: File | undefined, label: string) => {
    if (!file) return;
    if (file.size > 4_500_000) {
      toast.error("Pick an image under 4.5 MB so it saves on this device");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      addPhoto({ label, dataUrl });
      setBasePhoto(dataUrl);
      toast.success("Photo saved to this device");
    };
    reader.readAsDataURL(file);
  };

  const addLayer = (p: Product) => {
    if (layers.length >= 3) {
      toast.error("Three layers is the limit — remove one to add another");
      return;
    }
    const key = p.id + "-" + Date.now();
    setLayers((prev) => [...prev, { key, product: p, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }]);
    setActiveKey(key);
  };

  const patch = (key: string, delta: Partial<Layer>) =>
    setLayers((prev) => prev.map((l) => (l.key === key ? { ...l, ...delta } : l)));

  const share = () => {
    const names = layers.map((l) => `${l.product.name} (${l.product.brand})`).join(" + ");
    const text = names
      ? `My FitVerse try-on look: ${names}. Book a doorstep trial with me?`
      : "Check out FitVerse — try Indian couture on at home before you buy.";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <Screen
      eyebrow="Digital Try-On Studio"
      title="Style it before it arrives"
      subtitle="Drop in a photo or choose a mannequin, layer pieces, then nudge scale and drape until it reads right."
    >
      <div className="grid gap-5 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          <div className={cn("grid gap-3", compare && savedLook && "grid-cols-2")}>
            <div>
              <Stage
                base={basePhoto}
                mannequin={mannequin}
                layers={layers}
                activeKey={activeKey}
              />
              {compare && savedLook && (
                <p className="eyebrow mt-2 text-center">Current look</p>
              )}
            </div>
            {compare && savedLook && (
              <div>
                <Stage base={basePhoto} mannequin={mannequin} layers={savedLook} activeKey={null} />
                <p className="eyebrow mt-2 text-center">Saved look</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-xs tracking-[0.12em] uppercase hover:border-primary/50"
            >
              <ImagePlus className="size-4" /> Upload photo
            </button>
            <button
              onClick={() => cameraRef.current?.click()}
              className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-xs tracking-[0.12em] uppercase hover:border-primary/50"
            >
              <Camera className="size-4" /> Use camera
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0], "Upload")}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0], "Camera")}
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => {
                setSavedLook(layers);
                setCompare(true);
                toast.success("Look saved for comparison");
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-xs tracking-[0.12em] uppercase"
            >
              <Columns2 className="size-4" /> Save look
            </button>
            <button
              onClick={() => setCompare((v) => !v)}
              disabled={!savedLook}
              className="flex items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-xs tracking-[0.12em] uppercase disabled:opacity-45"
            >
              <Layers className="size-4" /> {compare ? "Single" : "Compare"}
            </button>
            <button
              onClick={share}
              className="flex items-center justify-center gap-2 rounded-lg bg-gold-gradient py-2.5 text-xs font-semibold tracking-[0.12em] text-primary-foreground uppercase"
            >
              <Share2 className="size-4" /> Share
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <p className="eyebrow mb-2">Mannequin</p>
            <div className="flex flex-wrap gap-2">
              {MANNEQUINS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMannequin(m);
                    setBasePhoto(null);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
                    !basePhoto && mannequin.id === m.id
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground",
                  )}
                >
                  <User className="size-3.5" /> {m.label}
                </button>
              ))}
            </div>
          </section>

          {hydrated && photos.length > 0 && (
            <section>
              <p className="eyebrow mb-2">Your saved photos</p>
              <div className="hide-scrollbar flex gap-2 overflow-x-auto">
                {photos.map((ph) => (
                  <div key={ph.id} className="relative shrink-0">
                    <button onClick={() => setBasePhoto(ph.dataUrl)}>
                      <img
                        src={ph.dataUrl}
                        alt={ph.label}
                        className={cn(
                          "size-16 rounded-lg border object-cover",
                          basePhoto === ph.dataUrl ? "border-primary" : "border-border",
                        )}
                      />
                    </button>
                    <button
                      onClick={() => {
                        removePhoto(ph.id);
                        if (basePhoto === ph.dataUrl) setBasePhoto(null);
                      }}
                      aria-label="Delete photo"
                      className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-background/90 border border-border"
                    >
                      <Trash2 className="size-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <p className="eyebrow mb-2">Garment layers ({layers.length}/3)</p>
            <div className="space-y-2">
              {layers.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                  No layers yet. Add a piece from the rail below.
                </p>
              )}
              {layers.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setActiveKey(l.key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-colors",
                    active?.key === l.key ? "border-primary/60 bg-primary/[0.07]" : "border-border",
                  )}
                >
                  <span
                    className="size-8 shrink-0 rounded"
                    style={{
                      background: `linear-gradient(135deg, ${l.product.swatch[0]}, ${l.product.swatch[1]})`,
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{l.product.name}</span>
                    <span className="eyebrow">{l.product.subcategory}</span>
                  </span>
                  <Trash2
                    className="size-4 text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLayers((prev) => prev.filter((x) => x.key !== l.key));
                    }}
                  />
                </button>
              ))}
            </div>
          </section>

          {active && (
            <section className="space-y-4 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Transform · {active.product.subcategory}</p>
                <button
                  onClick={() =>
                    patch(active.key, { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 })
                  }
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="size-3" /> Reset
                </button>
              </div>

              {(
                [
                  { key: "scale", label: "Scale", min: 0.5, max: 1.8, step: 0.02 },
                  { key: "x", label: "Horizontal", min: -30, max: 30, step: 1 },
                  { key: "y", label: "Vertical", min: -30, max: 30, step: 1 },
                  { key: "rotate", label: "Rotate", min: -25, max: 25, step: 1 },
                  { key: "opacity", label: "Opacity", min: 0.3, max: 1, step: 0.05 },
                ] as const
              ).map((ctl) => (
                <div key={ctl.key}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <label htmlFor={`ctl-${ctl.key}`}>{ctl.label}</label>
                    <span className="flex items-center gap-2">
                      <button
                        aria-label={`Decrease ${ctl.label}`}
                        onClick={() =>
                          patch(active.key, {
                            [ctl.key]: Math.max(ctl.min, active[ctl.key] - ctl.step),
                          })
                        }
                        className="grid size-5 place-items-center rounded bg-secondary"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-10 text-right text-primary">
                        {active[ctl.key].toFixed(ctl.step < 1 ? 2 : 0)}
                      </span>
                      <button
                        aria-label={`Increase ${ctl.label}`}
                        onClick={() =>
                          patch(active.key, {
                            [ctl.key]: Math.min(ctl.max, active[ctl.key] + ctl.step),
                          })
                        }
                        className="grid size-5 place-items-center rounded bg-secondary"
                      >
                        <Plus className="size-3" />
                      </button>
                    </span>
                  </div>
                  <input
                    id={`ctl-${ctl.key}`}
                    type="range"
                    min={ctl.min}
                    max={ctl.max}
                    step={ctl.step}
                    value={active[ctl.key]}
                    onChange={(e) => patch(active.key, { [ctl.key]: Number(e.target.value) })}
                    className="w-full accent-[var(--gold)]"
                  />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <section className="mt-8">
        <p className="eyebrow mb-2">Add a garment layer</p>
        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:px-0">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => addLayer(p)}
              className="w-28 shrink-0 overflow-hidden rounded-lg border border-border bg-card text-left hover:border-primary/50"
            >
              <span
                className="fabric-sheen block aspect-square"
                style={{ background: "var(--color-surface-raised)" }}
              >
                <GarmentSwatch product={p} className="size-full p-3" />
              </span>
              <span className="block truncate p-2 text-xs">{p.name}</span>
            </button>
          ))}
        </div>
      </section>
    </Screen>
  );
}
