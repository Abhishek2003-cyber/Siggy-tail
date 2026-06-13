import { forwardRef } from "react";

export type Tail = {
  key: string;
  name: string;
  rarity: "LEGENDARY" | "EPIC" | "RARE" | "UNCOMMON" | "COMMON";
  color: string; // css color
  tagline: string;
  traits: string[];
  index: number;
};

export const TAILS: Tail[] = [
  {
    key: "fire",
    name: "Fire Tail",
    rarity: "LEGENDARY",
    color: "#ff8a3d",
    tagline: "“first to sign, last to burn.”",
    traits: ["FIRE", "FORGE", "FLAME", "ASH"],
    index: 1,
  },
  {
    key: "storm",
    name: "Storm Tail",
    rarity: "EPIC",
    color: "#4fa8ff",
    tagline: "“strikes once, settles forever.”",
    traits: ["ZAP", "BOLT", "SURGE", "ARC"],
    index: 2,
  },
  {
    key: "shadow",
    name: "Shadow Tail",
    rarity: "RARE",
    color: "#b56bff",
    tagline: "“never seen, always there.”",
    traits: ["DARK", "GHOST", "FADE", "VOID"],
    index: 3,
  },
  {
    key: "mystic",
    name: "Mystic Tail",
    rarity: "UNCOMMON",
    color: "#ffd84d",
    tagline: "“sealed in light, spoken in rune.”",
    traits: ["RUNE", "MYTH", "SEAL", "ORB"],
    index: 4,
  },
  {
    key: "ghost",
    name: "Ghost Tail",
    rarity: "COMMON",
    color: "#4ade80",
    tagline: "“empty echo, perfect zero.”",
    traits: ["VOID", "NULL", "ECHO", "ZERO"],
    index: 5,
  },
];

export function resolveTail(handle: string): Tail {
  const h = handle.trim().toLowerCase();
  if (!h) return TAILS[1];
  let hash = 0;
  for (let i = 0; i < h.length; i++) hash = (hash * 31 + h.charCodeAt(i)) >>> 0;
  return TAILS[hash % TAILS.length];
}

type Props = {
  handle: string;
  tail: Tail;
  minted?: boolean;
  pfpUrl?: string | null;
  onPfpError?: () => void;
};

export const SiggyCard = forwardRef<HTMLDivElement, Props>(function SiggyCard(
  { handle, tail, minted, pfpUrl, onPfpError },
  ref,
) {
  const c = tail.color;
  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border bg-card p-5"
      style={{
        borderColor: c,
        boxShadow: `0 0 40px -10px ${c}, inset 0 0 60px -30px ${c}`,
      }}
    >
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" fill={c} />
          </svg>
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground">RITUAL/1979</span>
        </div>
        <span
          className="rounded-sm border px-2 py-0.5 text-[10px] tracking-[0.2em]"
          style={{ borderColor: c, color: c }}
        >
          {tail.rarity}
        </span>
      </div>

      <div className="relative mt-4 flex items-center gap-3">
        <div
          className="h-10 w-10 overflow-hidden rounded-full border bg-muted"
          style={{ borderColor: c }}
        >
          {pfpUrl && (
            <img
              key={pfpUrl}
              src={pfpUrl}
              alt={handle}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
              onError={(e) => {
                onPfpError?.();
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
        <div className="text-sm">
          <div className="text-foreground">@{handle || "anon"}</div>
          <div className="text-[10px] tracking-widest text-muted-foreground">HOLDER</div>
        </div>
      </div>

      <div className="relative my-4 flex items-center justify-center">
        <SiggyArt color={c} variant={tail.key} />
      </div>

      <div className="relative text-center">
        <h3
          className="text-2xl font-bold tracking-[0.25em]"
          style={{ color: c, textShadow: `0 0 12px ${c}` }}
        >
          {tail.name}
        </h3>
        <p className="mt-2 text-xs italic text-muted-foreground">{tail.tagline}</p>
      </div>

      <div className="relative mt-4 flex flex-wrap justify-center gap-1.5">
        {tail.traits.map((t) => (
          <span
            key={t}
            className="rounded-full border px-2 py-0.5 text-[10px] tracking-widest"
            style={{ borderColor: c, color: c, opacity: 0.85 }}
          >
            {t}
          </span>
        ))}
      </div>

      <div
        className="relative mt-4 flex items-center justify-between border-t pt-3 text-[10px] tracking-widest"
        style={{ borderColor: `${c}33` }}
      >
        <span className="text-muted-foreground">
          #{String(tail.index).padStart(4, "0")}/0005
        </span>
        <span className="flex items-center gap-1.5" style={{ color: minted ? "#4ade80" : undefined }}>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: minted ? "#4ade80" : "var(--muted-foreground)" }}
          />
          {minted ? "MINTED" : "UNMINTED"}
        </span>
      </div>
    </div>
  );
});

// Longer, more dramatic tails extending further out
export function tailPath(variant: string): { d?: string; type: "path" | "poly" | "custom"; points?: string; extras?: Array<{ type: "circle" | "line" | "path"; attrs: Record<string, string | number> }>; opacity?: number } {
  switch (variant) {
    case "fire":
      return {
        type: "path",
        d: "M138 145 Q175 135 180 100 Q183 70 195 55 Q188 80 200 40 Q205 70 212 30 Q215 55 220 18",
      };
    case "storm":
      return {
        type: "poly",
        points: "138,145 162,128 150,108 178,95 162,72 188,55 175,32 200,18",
      };
    case "shadow":
      return {
        type: "path",
        d: "M138 145 Q175 140 188 110 Q198 78 180 55 Q170 38 192 25",
        opacity: 0.75,
        extras: [
          { type: "circle", attrs: { cx: 182, cy: 100, r: 3, opacity: 0.5 } },
          { type: "circle", attrs: { cx: 192, cy: 75, r: 2.5, opacity: 0.4 } },
          { type: "circle", attrs: { cx: 188, cy: 45, r: 2, opacity: 0.3 } },
        ],
      };
    case "mystic":
      return {
        type: "path",
        d: "M138 145 Q172 130 180 100 Q186 70 200 55 Q210 42 205 22",
        extras: [
          { type: "circle", attrs: { cx: 205, cy: 22, r: 5, fill: "none", "stroke-width": 1.5 } },
          { type: "path", attrs: { d: "M200 22 L210 22 M205 17 L205 27", "stroke-width": 1.2 } },
          { type: "circle", attrs: { cx: 184, cy: 78, r: 2.5, opacity: 0.7 } },
        ],
      };
    case "ghost":
      return {
        type: "path",
        d: "M138 145 Q170 138 182 108 Q190 78 178 52 Q170 32 188 18",
        opacity: 0.6,
        extras: [
          { type: "circle", attrs: { cx: 180, cy: 95, r: 2, opacity: 0.4 } },
          { type: "circle", attrs: { cx: 186, cy: 60, r: 1.8, opacity: 0.3 } },
        ],
      };
  }
  return { type: "path", d: "M138 145 Q180 100 200 40" };
}

function SiggyArt({ color, variant }: { color: string; variant: string }) {
  const c = color;
  const t = tailPath(variant);
  return (
    <svg width="200" height="220" viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`glow-${variant}`} cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={c} stopOpacity="0.5" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="140" r="90" fill={`url(#glow-${variant})`} className="animate-pulse-glow" />
      <g className="animate-tail-sway" style={{ transformOrigin: "145px 140px" }}>
        {t.type === "path" && (
          <path d={t.d} stroke={c} strokeWidth="6" strokeLinecap="round" fill="none" opacity={t.opacity ?? 1} />
        )}
        {t.type === "poly" && (
          <polyline points={t.points} stroke={c} strokeWidth="5" strokeLinejoin="miter" strokeLinecap="square" fill="none" />
        )}
        {t.extras?.map((e, i) => {
          if (e.type === "circle") return <circle key={i} {...(e.attrs as any)} fill={(e.attrs as any).fill ?? c} stroke={c} />;
          if (e.type === "path") return <path key={i} {...(e.attrs as any)} stroke={c} fill="none" />;
          return null;
        })}
      </g>
      <ellipse cx="110" cy="155" rx="42" ry="34" fill="#0a0a0a" stroke={c} strokeWidth="1" />
      <circle cx="110" cy="110" r="32" fill="#0a0a0a" stroke={c} strokeWidth="1" />
      <polygon points="86,90 80,70 98,83" fill="#0a0a0a" stroke={c} strokeWidth="1" />
      <polygon points="134,90 140,70 122,83" fill="#0a0a0a" stroke={c} strokeWidth="1" />
      <polygon points="88,87 86,77 94,83" fill={c} opacity="0.5" />
      <polygon points="132,87 134,77 126,83" fill={c} opacity="0.5" />
      <g className="animate-blink">
        <ellipse cx="100" cy="110" rx="4" ry="6" fill={c} />
        <ellipse cx="120" cy="110" rx="4" ry="6" fill={c} />
      </g>
      <polygon points="108,120 112,120 110,123" fill={c} />
      <path d="M110 123 Q106 128 102 125" stroke={c} strokeWidth="1" fill="none" />
      <path d="M110 123 Q114 128 118 125" stroke={c} strokeWidth="1" fill="none" />
      <line x1="80" y1="123" x2="98" y2="125" stroke={c} strokeWidth="0.6" opacity="0.6" />
      <line x1="80" y1="128" x2="98" y2="128" stroke={c} strokeWidth="0.6" opacity="0.6" />
      <line x1="140" y1="123" x2="122" y2="125" stroke={c} strokeWidth="0.6" opacity="0.6" />
      <line x1="140" y1="128" x2="122" y2="128" stroke={c} strokeWidth="0.6" opacity="0.6" />
      <ellipse cx="92" cy="185" rx="8" ry="5" fill="#0a0a0a" stroke={c} strokeWidth="1" />
      <ellipse cx="128" cy="185" rx="8" ry="5" fill="#0a0a0a" stroke={c} strokeWidth="1" />
    </svg>
  );
}
