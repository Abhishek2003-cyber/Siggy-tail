import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
const TAILS = [
  {
    key: "fire",
    name: "Fire Tail",
    rarity: "LEGENDARY",
    color: "#ff8a3d",
    tagline: "“first to sign, last to burn.”",
    traits: ["FIRE", "FORGE", "FLAME", "ASH"],
    index: 1
  },
  {
    key: "storm",
    name: "Storm Tail",
    rarity: "EPIC",
    color: "#4fa8ff",
    tagline: "“strikes once, settles forever.”",
    traits: ["ZAP", "BOLT", "SURGE", "ARC"],
    index: 2
  },
  {
    key: "shadow",
    name: "Shadow Tail",
    rarity: "RARE",
    color: "#b56bff",
    tagline: "“never seen, always there.”",
    traits: ["DARK", "GHOST", "FADE", "VOID"],
    index: 3
  },
  {
    key: "mystic",
    name: "Mystic Tail",
    rarity: "UNCOMMON",
    color: "#ffd84d",
    tagline: "“sealed in light, spoken in rune.”",
    traits: ["RUNE", "MYTH", "SEAL", "ORB"],
    index: 4
  },
  {
    key: "ghost",
    name: "Ghost Tail",
    rarity: "COMMON",
    color: "#4ade80",
    tagline: "“empty echo, perfect zero.”",
    traits: ["VOID", "NULL", "ECHO", "ZERO"],
    index: 5
  }
];
function resolveTail(handle) {
  const h = handle.trim().toLowerCase();
  if (!h) return TAILS[1];
  let hash = 0;
  for (let i = 0; i < h.length; i++) hash = hash * 31 + h.charCodeAt(i) >>> 0;
  return TAILS[hash % TAILS.length];
}
const SiggyCard = reactExports.forwardRef(function SiggyCard2({ handle, tail, minted, pfpUrl, onPfpError }, ref) {
  const c = tail.color;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "relative overflow-hidden rounded-2xl border bg-card p-5",
      style: {
        borderColor: c,
        boxShadow: `0 0 40px -10px ${c}, inset 0 0 60px -30px ${c}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10", stroke: c, strokeWidth: "1.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3", fill: c })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.2em] text-muted-foreground", children: "RITUAL/1979" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "rounded-sm border px-2 py-0.5 text-[10px] tracking-[0.2em]",
              style: { borderColor: c, color: c },
              children: tail.rarity
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-10 w-10 overflow-hidden rounded-full border bg-muted",
              style: { borderColor: c },
              children: pfpUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: pfpUrl,
                  alt: handle,
                  crossOrigin: "anonymous",
                  referrerPolicy: "no-referrer",
                  className: "h-full w-full object-cover",
                  onError: (e) => {
                    onPfpError?.();
                    e.currentTarget.style.display = "none";
                  }
                },
                pfpUrl
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-foreground", children: [
              "@",
              handle || "anon"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground", children: "HOLDER" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative my-4 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiggyArt, { color: c, variant: tail.key }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-2xl font-bold tracking-[0.25em]",
              style: { color: c, textShadow: `0 0 12px ${c}` },
              children: tail.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs italic text-muted-foreground", children: tail.tagline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-4 flex flex-wrap justify-center gap-1.5", children: tail.traits.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "rounded-full border px-2 py-0.5 text-[10px] tracking-widest",
            style: { borderColor: c, color: c, opacity: 0.85 },
            children: t
          },
          t
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative mt-4 flex items-center justify-between border-t pt-3 text-[10px] tracking-widest",
            style: { borderColor: `${c}33` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "#",
                String(tail.index).padStart(4, "0"),
                "/0005"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", style: { color: minted ? "#4ade80" : void 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-1.5 w-1.5 rounded-full",
                    style: { background: minted ? "#4ade80" : "var(--muted-foreground)" }
                  }
                ),
                minted ? "MINTED" : "UNMINTED"
              ] })
            ]
          }
        )
      ]
    }
  );
});
function tailPath(variant) {
  switch (variant) {
    case "fire":
      return {
        type: "path",
        d: "M138 145 Q175 135 180 100 Q183 70 195 55 Q188 80 200 40 Q205 70 212 30 Q215 55 220 18"
      };
    case "storm":
      return {
        type: "poly",
        points: "138,145 162,128 150,108 178,95 162,72 188,55 175,32 200,18"
      };
    case "shadow":
      return {
        type: "path",
        d: "M138 145 Q175 140 188 110 Q198 78 180 55 Q170 38 192 25",
        opacity: 0.75,
        extras: [
          { type: "circle", attrs: { cx: 182, cy: 100, r: 3, opacity: 0.5 } },
          { type: "circle", attrs: { cx: 192, cy: 75, r: 2.5, opacity: 0.4 } },
          { type: "circle", attrs: { cx: 188, cy: 45, r: 2, opacity: 0.3 } }
        ]
      };
    case "mystic":
      return {
        type: "path",
        d: "M138 145 Q172 130 180 100 Q186 70 200 55 Q210 42 205 22",
        extras: [
          { type: "circle", attrs: { cx: 205, cy: 22, r: 5, fill: "none", "stroke-width": 1.5 } },
          { type: "path", attrs: { d: "M200 22 L210 22 M205 17 L205 27", "stroke-width": 1.2 } },
          { type: "circle", attrs: { cx: 184, cy: 78, r: 2.5, opacity: 0.7 } }
        ]
      };
    case "ghost":
      return {
        type: "path",
        d: "M138 145 Q170 138 182 108 Q190 78 178 52 Q170 32 188 18",
        opacity: 0.6,
        extras: [
          { type: "circle", attrs: { cx: 180, cy: 95, r: 2, opacity: 0.4 } },
          { type: "circle", attrs: { cx: 186, cy: 60, r: 1.8, opacity: 0.3 } }
        ]
      };
  }
  return { type: "path", d: "M138 145 Q180 100 200 40" };
}
function SiggyArt({ color, variant }) {
  const c = color;
  const t = tailPath(variant);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "200", height: "220", viewBox: "0 0 220 240", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: `glow-${variant}`, cx: "50%", cy: "60%", r: "50%", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: c, stopOpacity: "0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: c, stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "110", cy: "140", r: "90", fill: `url(#glow-${variant})`, className: "animate-pulse-glow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "animate-tail-sway", style: { transformOrigin: "145px 140px" }, children: [
      t.type === "path" && /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: t.d, stroke: c, strokeWidth: "6", strokeLinecap: "round", fill: "none", opacity: t.opacity ?? 1 }),
      t.type === "poly" && /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: t.points, stroke: c, strokeWidth: "5", strokeLinejoin: "miter", strokeLinecap: "square", fill: "none" }),
      t.extras?.map((e, i) => {
        if (e.type === "circle") return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { ...e.attrs, fill: e.attrs.fill ?? c, stroke: c }, i);
        if (e.type === "path") return /* @__PURE__ */ jsxRuntimeExports.jsx("path", { ...e.attrs, stroke: c, fill: "none" }, i);
        return null;
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "110", cy: "155", rx: "42", ry: "34", fill: "#0a0a0a", stroke: c, strokeWidth: "1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "110", cy: "110", r: "32", fill: "#0a0a0a", stroke: c, strokeWidth: "1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "86,90 80,70 98,83", fill: "#0a0a0a", stroke: c, strokeWidth: "1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "134,90 140,70 122,83", fill: "#0a0a0a", stroke: c, strokeWidth: "1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "88,87 86,77 94,83", fill: c, opacity: "0.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "132,87 134,77 126,83", fill: c, opacity: "0.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "animate-blink", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "110", rx: "4", ry: "6", fill: c }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "120", cy: "110", rx: "4", ry: "6", fill: c })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "108,120 112,120 110,123", fill: c }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M110 123 Q106 128 102 125", stroke: c, strokeWidth: "1", fill: "none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M110 123 Q114 128 118 125", stroke: c, strokeWidth: "1", fill: "none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "80", y1: "123", x2: "98", y2: "125", stroke: c, strokeWidth: "0.6", opacity: "0.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "80", y1: "128", x2: "98", y2: "128", stroke: c, strokeWidth: "0.6", opacity: "0.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "140", y1: "123", x2: "122", y2: "125", stroke: c, strokeWidth: "0.6", opacity: "0.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "140", y1: "128", x2: "122", y2: "128", stroke: c, strokeWidth: "0.6", opacity: "0.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "92", cy: "185", rx: "8", ry: "5", fill: "#0a0a0a", stroke: c, strokeWidth: "1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "128", cy: "185", rx: "8", ry: "5", fill: "#0a0a0a", stroke: c, strokeWidth: "1" })
  ] });
}
const W = 400;
const H = 600;
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith("data:") && !src.startsWith("blob:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
function buildSiggySvg(variant, color) {
  const t = tailPath(variant);
  let tailMarkup = "";
  if (t.type === "path") {
    tailMarkup += `<path d="${t.d}" stroke="${color}" stroke-width="6" stroke-linecap="round" fill="none" opacity="${t.opacity ?? 1}"/>`;
  } else if (t.type === "poly") {
    tailMarkup += `<polyline points="${t.points}" stroke="${color}" stroke-width="5" stroke-linejoin="miter" stroke-linecap="square" fill="none"/>`;
  }
  if (t.extras) {
    for (const e of t.extras) {
      const attrs = Object.entries(e.attrs).map(([k, v]) => `${k}="${v}"`).join(" ");
      if (e.type === "circle") {
        const fill = e.attrs.fill ?? color;
        tailMarkup += `<circle ${attrs} fill="${fill}" stroke="${color}"/>`;
      } else if (e.type === "path") {
        tailMarkup += `<path ${attrs} stroke="${color}" fill="none"/>`;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="240" viewBox="0 0 220 240">
    <defs><radialGradient id="g" cx="50%" cy="60%" r="50%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient></defs>
    <circle cx="110" cy="140" r="90" fill="url(#g)"/>
    ${tailMarkup}
    <ellipse cx="110" cy="155" rx="42" ry="34" fill="#0a0a0a" stroke="${color}"/>
    <circle cx="110" cy="110" r="32" fill="#0a0a0a" stroke="${color}"/>
    <polygon points="86,90 80,70 98,83" fill="#0a0a0a" stroke="${color}"/>
    <polygon points="134,90 140,70 122,83" fill="#0a0a0a" stroke="${color}"/>
    <polygon points="88,87 86,77 94,83" fill="${color}" opacity="0.5"/>
    <polygon points="132,87 134,77 126,83" fill="${color}" opacity="0.5"/>
    <ellipse cx="100" cy="110" rx="4" ry="6" fill="${color}"/>
    <ellipse cx="120" cy="110" rx="4" ry="6" fill="${color}"/>
    <polygon points="108,120 112,120 110,123" fill="${color}"/>
    <path d="M110 123 Q106 128 102 125" stroke="${color}" stroke-width="1" fill="none"/>
    <path d="M110 123 Q114 128 118 125" stroke="${color}" stroke-width="1" fill="none"/>
    <ellipse cx="92" cy="185" rx="8" ry="5" fill="#0a0a0a" stroke="${color}"/>
    <ellipse cx="128" cy="185" rx="8" ry="5" fill="#0a0a0a" stroke="${color}"/>
  </svg>`;
}
async function drawSiggyCard(opts) {
  const { handle, tail, pfpUrl, minted = true } = opts;
  const canvas = document.createElement("canvas");
  canvas.width = W * 2;
  canvas.height = H * 2;
  const ctx = canvas.getContext("2d");
  ctx.scale(2, 2);
  const c = tail.color;
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = c;
  ctx.lineWidth = 2;
  roundRect(ctx, 8, 8, W - 16, H - 16, 18);
  ctx.stroke();
  ctx.save();
  ctx.shadowColor = c;
  ctx.shadowBlur = 30;
  ctx.strokeStyle = c;
  ctx.lineWidth = 1;
  roundRect(ctx, 8, 8, W - 16, H - 16, 18);
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(32, 38, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#888";
  ctx.font = "10px ui-monospace, Menlo, monospace";
  ctx.textBaseline = "middle";
  ctx.fillText("RITUAL/1979", 46, 38);
  ctx.strokeStyle = c;
  ctx.fillStyle = c;
  const badge = tail.rarity;
  ctx.font = "bold 10px ui-monospace, Menlo, monospace";
  const bw = ctx.measureText(badge).width + 16;
  ctx.strokeRect(W - 24 - bw, 28, bw, 20);
  ctx.fillText(badge, W - 24 - bw + 8, 38);
  ctx.save();
  ctx.beginPath();
  ctx.arc(48, 84, 22, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(26, 62, 44, 44);
  if (pfpUrl) {
    try {
      const img = await loadImage(pfpUrl);
      ctx.drawImage(img, 26, 62, 44, 44);
    } catch {
    }
  }
  ctx.restore();
  ctx.strokeStyle = c;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(48, 84, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = "14px ui-monospace, Menlo, monospace";
  ctx.fillText(`@${handle || "anon"}`, 82, 78);
  ctx.fillStyle = "#888";
  ctx.font = "9px ui-monospace, Menlo, monospace";
  ctx.fillText("HOLDER", 82, 94);
  const svg = buildSiggySvg(tail.key, c);
  const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  try {
    const img = await loadImage(svgUrl);
    ctx.drawImage(img, (W - 240) / 2, 120, 240, 260);
  } catch {
  }
  ctx.save();
  ctx.shadowColor = c;
  ctx.shadowBlur = 14;
  ctx.fillStyle = c;
  ctx.textAlign = "center";
  ctx.font = "bold 24px ui-monospace, Menlo, monospace";
  ctx.fillText(tail.name.toUpperCase(), W / 2, 410);
  ctx.restore();
  ctx.fillStyle = "#9ca3af";
  ctx.font = "italic 12px ui-monospace, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.fillText(tail.tagline, W / 2, 434);
  ctx.font = "10px ui-monospace, Menlo, monospace";
  const tags = tail.traits;
  const gap = 8;
  const padX = 10;
  const widths = tags.map((t) => ctx.measureText(t).width + padX * 2);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (tags.length - 1);
  let x = (W - total) / 2;
  const y = 460;
  ctx.strokeStyle = c;
  ctx.fillStyle = c;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  for (let i = 0; i < tags.length; i++) {
    roundRect(ctx, x, y, widths[i], 20, 10);
    ctx.stroke();
    ctx.fillText(tags[i], x + padX, y + 10);
    x += widths[i] + gap;
  }
  ctx.strokeStyle = c + "33";
  ctx.beginPath();
  ctx.moveTo(28, 510);
  ctx.lineTo(W - 28, 510);
  ctx.stroke();
  ctx.fillStyle = "#888";
  ctx.font = "10px ui-monospace, Menlo, monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(`#${String(tail.index).padStart(4, "0")}/0005`, 28, 530);
  ctx.textAlign = "right";
  const mintColor = minted ? "#4ade80" : "#888";
  ctx.fillStyle = mintColor;
  ctx.fillText(minted ? "MINTED" : "UNMINTED", W - 28, 530);
  ctx.beginPath();
  ctx.arc(W - 28 - ctx.measureText(minted ? "MINTED" : "UNMINTED").width - 8, 530, 3, 0, Math.PI * 2);
  ctx.fill();
  return canvas;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
const RITUAL_RPC = "https://rpc.ritualfoundation.org";
const MINTED_COUNT_SELECTOR = "0xa2309ff8";
const DISPLAY_MAX_SUPPLY = 500;
const RITUAL_CHAIN_ID_HEX = "0x7bb";
const MINT_CONTRACT = "0x4dCC92642Fa28b994b05dd57f7f793deEFc39a30";
const MINT_DATA = "0x1249c58b";
async function readContractUint(selector) {
  const res = await fetch(RITUAL_RPC, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "eth_call",
      params: [{
        to: MINT_CONTRACT,
        data: selector
      }, "latest"]
    })
  });
  const json = await res.json();
  if (!json?.result || json.result === "0x") return null;
  return parseInt(json.result, 16);
}
function sanitizeHandle(value) {
  return value.trim().replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, "");
}
function buildTwitterAvatarUrls(handle) {
  const safeHandle = encodeURIComponent(handle);
  const xPath = `unavatar.io/x/${safeHandle}`;
  const twitterPath = `unavatar.io/twitter/${safeHandle}`;
  return [`https://unavatar.io/x/${safeHandle}`, `https://unavatar.io/twitter/${safeHandle}`, `https://images.weserv.nl/?url=${encodeURIComponent(xPath)}&w=256&h=256&fit=cover&output=png`, `https://images.weserv.nl/?url=${encodeURIComponent(twitterPath)}&w=256&h=256&fit=cover&output=png`];
}
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
async function resolveAvatarDataUrl(handle) {
  for (const url of buildTwitterAvatarUrls(handle)) {
    try {
      const res = await fetch(url, {
        mode: "cors",
        cache: "no-store"
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || !contentType.startsWith("image/")) continue;
      return await blobToDataUrl(await res.blob());
    } catch {
    }
  }
  return null;
}
function Index() {
  const [handle, setHandle] = reactExports.useState("");
  const [stage, setStage] = reactExports.useState("idle");
  const [tail, setTail] = reactExports.useState(null);
  const [toast, setToast] = reactExports.useState(null);
  const [wallet, setWallet] = reactExports.useState(null);
  const [minting, setMinting] = reactExports.useState(false);
  const [txHash, setTxHash] = reactExports.useState(null);
  const [supply, setSupply] = reactExports.useState(null);
  const [maxSupply] = reactExports.useState(DISPLAY_MAX_SUPPLY);
  const [avatarCandidateIndex, setAvatarCandidateIndex] = reactExports.useState(0);
  const cardRef = reactExports.useRef(null);
  const optimisticSupplyRef = reactExports.useRef(null);
  const fetchSupply = async () => {
    try {
      const minted = await readContractUint(MINTED_COUNT_SELECTOR);
      if (minted !== null) {
        const optimistic = optimisticSupplyRef.current;
        if (optimistic !== null && minted >= optimistic) optimisticSupplyRef.current = null;
        setSupply(optimistic === null ? minted : Math.max(minted, optimistic));
      }
    } catch (e) {
      console.error("supply fetch failed", e);
    }
  };
  reactExports.useEffect(() => {
    fetchSupply();
    const id = setInterval(fetchSupply, 1e4);
    return () => clearInterval(id);
  }, []);
  const normalizedHandle = sanitizeHandle(handle);
  const avatarCandidates = normalizedHandle ? buildTwitterAvatarUrls(normalizedHandle) : [];
  const pfpImageUrl = avatarCandidates[avatarCandidateIndex] ?? null;
  reactExports.useEffect(() => {
    setAvatarCandidateIndex(0);
  }, [normalizedHandle]);
  const advanceAvatarCandidate = () => {
    setAvatarCandidateIndex((current) => current + 1 < avatarCandidates.length ? current + 1 : current);
  };
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };
  const ensureRitualChain = async () => {
    const eth = window.ethereum;
    const current = await eth.request({
      method: "eth_chainId"
    });
    if (current === RITUAL_CHAIN_ID_HEX) return;
    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: RITUAL_CHAIN_ID_HEX
        }]
      });
    } catch (err) {
      if (err?.code === 4902) {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: RITUAL_CHAIN_ID_HEX,
            chainName: "Ritual Chain",
            nativeCurrency: {
              name: "Ritual",
              symbol: "RITUAL",
              decimals: 18
            },
            rpcUrls: ["https://rpc.ritualfoundation.org"],
            blockExplorerUrls: ["https://explorer.ritualfoundation.org"]
          }]
        });
      } else {
        throw err;
      }
    }
  };
  const connectWallet = async () => {
    const eth = window.ethereum;
    if (!eth) {
      showToast("METAMASK NOT FOUND");
      return null;
    }
    try {
      const accounts = await eth.request({
        method: "eth_requestAccounts"
      });
      const addr = accounts[0];
      setWallet(addr);
      await ensureRitualChain();
      showToast("WALLET CONNECTED");
      return addr;
    } catch (e) {
      showToast(e?.message?.slice(0, 40) || "CONNECT FAILED");
      return null;
    }
  };
  const invoke = () => {
    if (!handle.trim()) return;
    setStage("invoking");
    setTail(null);
    setTimeout(() => {
      setTail(resolveTail(handle));
      setStage("revealed");
    }, 1800);
  };
  const reset = () => {
    setStage("idle");
    setTail(null);
    setTxHash(null);
  };
  const mint = async () => {
    if (minting) return;
    setMinting(true);
    try {
      const eth = window.ethereum;
      if (!eth) {
        showToast("METAMASK NOT FOUND");
        return;
      }
      let from = wallet;
      if (!from) from = await connectWallet();
      if (!from) return;
      await ensureRitualChain();
      const txParams = {
        from,
        to: MINT_CONTRACT,
        data: MINT_DATA
      };
      let gas;
      try {
        gas = await eth.request({
          method: "eth_estimateGas",
          params: [txParams]
        });
      } catch (e) {
        showToast("GAS ESTIMATE FAILED");
        console.error("estimateGas failed", e);
        return;
      }
      const hash = await eth.request({
        method: "eth_sendTransaction",
        params: [{
          ...txParams,
          gas
        }]
      });
      setTxHash(hash);
      setStage("minted");
      showToast("MINT SUBMITTED");
      setSupply((current) => {
        const next = (current ?? 0) + 1;
        optimisticSupplyRef.current = next;
        return next;
      });
      fetchSupply();
      setTimeout(fetchSupply, 4e3);
    } catch (e) {
      console.error("mint failed", e);
      showToast(e?.message?.slice(0, 48) || "MINT FAILED");
    } finally {
      setMinting(false);
    }
  };
  const buildCanvas = async () => {
    if (!tail) return null;
    const canvasPfp = normalizedHandle ? await resolveAvatarDataUrl(normalizedHandle) : null;
    return await drawSiggyCard({
      handle,
      tail,
      pfpUrl: canvasPfp ?? pfpImageUrl,
      minted: true
    });
  };
  const onSave = async () => {
    const canvas = await buildCanvas();
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "siggy-card.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("SAVED");
  };
  const onCopy = async () => {
    try {
      const canvas = await buildCanvas();
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([new ClipboardItem({
            "image/png": blob
          })]);
          showToast("COPIED TO CLIPBOARD");
        } catch {
          showToast("CLIPBOARD BLOCKED");
        }
      }, "image/png");
    } catch {
      showToast("COPY FAILED");
    }
  };
  const onXPost = () => {
    const text = `I just minted my Siggy Tail on Ritual chain! 🐱 siggy-tails-nft.lovable.app`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden bg-black text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StarryBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto flex max-w-6xl items-center justify-between px-6 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full border border-primary/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-2 w-2 rounded-full bg-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-[0.3em]", children: "SIGGY//TAILS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] tracking-[0.3em] text-muted-foreground", children: "RITUAL CHAIN · 1979" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: connectWallet, className: "rounded-md border border-primary px-3 py-1.5 text-[10px] tracking-[0.3em] text-primary transition hover:bg-primary/10", children: wallet ? `▸ ${wallet.slice(0, 6)}…${wallet.slice(-4)}` : "▸ CONNECT METAMASK" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 pb-10 pt-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] text-primary", children: "/ BORN ON THE RITUAL CHAIN /" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "neon-title mt-3 text-5xl sm:text-7xl", children: [
          "SIGGY ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent", children: "TAILS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground", children: "Enter your Twitter handle. The chain reveals which Siggy Tail you are. Five tails. Five fates. One mint." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-black/80 p-6 backdrop-blur", style: {
          borderColor: tail?.color || void 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.3em] text-muted-foreground", children: "> STEP_01 // CLAIM_IDENTITY" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-md border border-primary/40 bg-background/60 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] tracking-[0.3em] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LIVE_SUPPLY" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }),
                "ON-CHAIN"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 font-mono text-2xl tracking-[0.15em] text-foreground", children: [
              supply === null ? "—" : String(supply).padStart(3, "0"),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                " / ",
                maxSupply,
                " "
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.3em] text-primary", children: "MINTED" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-all", style: {
              width: `${Math.min(100, (supply ?? 0) / maxSupply * 100)}%`
            } }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mt-4 block text-xs tracking-[0.2em] text-muted-foreground", children: "TWITTER HANDLE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 shrink-0 overflow-hidden rounded-full border bg-muted", style: {
              borderColor: tail?.color || "var(--primary)"
            }, children: pfpImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: pfpImageUrl, alt: handle, crossOrigin: "anonymous", referrerPolicy: "no-referrer", className: "h-full w-full object-cover", onError: (e) => {
              advanceAvatarCandidate();
              e.currentTarget.style.display = "none";
            } }, pfpImageUrl) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center rounded-md border border-input bg-background px-3 py-2 focus-within:border-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "@" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: handle, onChange: (e) => {
                setHandle(sanitizeHandle(e.target.value));
                if (stage !== "idle") reset();
              }, onKeyDown: (e) => {
                if (e.key === "Enter") invoke();
              }, placeholder: "vitalik", className: "ml-1 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50", autoComplete: "off", spellCheck: false })
            ] })
          ] }),
          stage === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: invoke, disabled: !handle.trim(), className: "mt-5 w-full rounded-md border border-primary bg-primary px-4 py-3 text-sm tracking-[0.35em] text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground", children: "▶ INVOKE MY FATE" }),
          stage === "invoking" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-md border border-primary/60 bg-background/60 p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] text-primary animate-pulse", children: "QUERYING THE CHAIN…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-mono text-xs text-muted-foreground", children: [
              "> hashing @",
              handle,
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "> rolling tail entropy…"
            ] })
          ] }),
          stage !== "idle" && stage !== "invoking" && tail && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-[11px] tracking-widest text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "CHAIN_ID", v: "1979" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "RPC", v: "rpc.ritualfoundation.org" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "WALLET", v: wallet ? `${wallet.slice(0, 6)}…${wallet.slice(-4)}` : "DISCONNECTED" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "ASSIGNED", v: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: tail.color
              }, children: tail.rarity }) })
            ] }),
            stage === "revealed" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: mint, disabled: minting, className: "mt-6 w-full rounded-md border border-primary bg-primary px-4 py-3 text-sm tracking-[0.3em] text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60", children: minting ? "▶ SIGNING…" : "▶ MINT ON RITUAL" }),
            stage === "minted" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-md border border-primary/60 bg-primary/10 p-3 text-center text-[10px] tracking-[0.35em] text-primary break-all", children: [
              "✓ MINT SUBMITTED · TX ",
              txHash ? `${txHash.slice(0, 10)}…${txHash.slice(-6)}` : ""
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm", children: [
            stage === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid aspect-[3/4] place-items-center rounded-2xl border border-dashed border-border bg-card/30 p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] text-muted-foreground", children: "AWAITING INVOCATION" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground/70", children: [
                "enter a handle · press ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "INVOKE MY FATE" })
              ] })
            ] }) }),
            stage === "invoking" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid aspect-[3/4] place-items-center overflow-hidden rounded-2xl border border-primary/60 bg-card/40 p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-ritual-flicker bg-gradient-to-b from-primary/10 via-transparent to-primary/10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-1/2 h-px animate-ritual-scan bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-5xl tracking-widest text-primary animate-ritual-glitch", children: "?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[10px] tracking-[0.4em] text-primary/80", children: "THE CHAIN DECIDES" })
              ] })
            ] }),
            (stage === "revealed" || stage === "minted") && tail && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-card-reveal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiggyCard, { ref: cardRef, handle, tail, minted: stage === "minted", pfpUrl: pfpImageUrl, onPfpError: advanceAvatarCandidate }) })
          ] }),
          stage === "minted" && tail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-sm grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBtn, { onClick: onSave, label: "SAVE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBtn, { onClick: onCopy, label: "COPY" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBtn, { onClick: onXPost, label: "X POST" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 pb-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-end justify-between border-b border-border/60 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.3em] text-muted-foreground", children: "/ COLLECTION /" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-2xl tracking-[0.2em]", children: "ALL FIVE TAILS" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.3em] text-muted-foreground", children: "005 / 005" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: TAILS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SiggyCard, { handle: "ritual", tail: t }, t.key)) })
      ] })
    ] }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fade-in rounded-md border border-primary bg-background/90 px-4 py-2 text-[10px] tracking-[0.35em] text-primary backdrop-blur", children: toast }) })
  ] });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-dashed border-border/50 py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: v })
  ] });
}
function ActionBtn({
  onClick,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: "rounded-md border border-primary/60 bg-background/40 px-3 py-2 text-[10px] tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground", children: label });
}
function StarryBackground() {
  const stars = Array.from({
    length: 160
  }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rand = (n) => seed * (n + 1) % 1e3 / 1e3;
    return {
      top: rand(1) * 100,
      left: rand(2) * 100,
      size: 1 + rand(3) * 3,
      delay: rand(4) * 4,
      duration: 1.5 + rand(5) * 2.5
    };
  });
  const sparkles = Array.from({
    length: 40
  }, (_, i) => {
    const seed = (i * 4567 + 1234) % 9999;
    const rand = (n) => seed * (n + 1) % 1e3 / 1e3;
    return {
      top: rand(1) * 100,
      left: rand(2) * 100,
      delay: rand(3) * 5,
      hue: ["#fff", "#a3ffd6", "#9be7ff", "#ffd1a8", "#ffb3ff", "#c2a3ff"][i % 6]
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(80,255,160,0.08),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(60,120,255,0.06),transparent_60%)]" }),
    stars.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute rounded-full bg-white animate-twinkle", style: {
      top: `${s.top}%`,
      left: `${s.left}%`,
      width: `${s.size}px`,
      height: `${s.size}px`,
      animationDelay: `${s.delay}s`,
      animationDuration: `${s.duration}s`,
      opacity: 0.7
    } }, `s-${i}`)),
    sparkles.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute h-1.5 w-1.5 rounded-full animate-sparkle", style: {
      top: `${s.top}%`,
      left: `${s.left}%`,
      background: s.hue,
      boxShadow: `0 0 12px ${s.hue}, 0 0 24px ${s.hue}`,
      animationDelay: `${s.delay}s`
    } }, `g-${i}`))
  ] });
}
export {
  Index as component
};
