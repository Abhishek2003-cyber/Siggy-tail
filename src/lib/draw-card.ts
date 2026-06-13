import { type Tail, tailPath } from "@/components/SiggyCard";

const W = 400;
const H = 600;

function loadImage(src: string): Promise<HTMLImageElement> {
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

function buildSiggySvg(variant: string, color: string): string {
  const t = tailPath(variant);
  let tailMarkup = "";
  if (t.type === "path") {
    tailMarkup += `<path d="${t.d}" stroke="${color}" stroke-width="6" stroke-linecap="round" fill="none" opacity="${t.opacity ?? 1}"/>`;
  } else if (t.type === "poly") {
    tailMarkup += `<polyline points="${t.points}" stroke="${color}" stroke-width="5" stroke-linejoin="miter" stroke-linecap="square" fill="none"/>`;
  }
  if (t.extras) {
    for (const e of t.extras) {
      const attrs = Object.entries(e.attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      if (e.type === "circle") {
        const fill = (e.attrs as any).fill ?? color;
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

export async function drawSiggyCard(opts: {
  handle: string;
  tail: Tail;
  pfpUrl?: string | null;
  minted?: boolean;
}): Promise<HTMLCanvasElement> {
  const { handle, tail, pfpUrl, minted = true } = opts;
  const canvas = document.createElement("canvas");
  canvas.width = W * 2;
  canvas.height = H * 2;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(2, 2);

  const c = tail.color;

  // Background
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, W, H);

  // Border
  ctx.strokeStyle = c;
  ctx.lineWidth = 2;
  roundRect(ctx, 8, 8, W - 16, H - 16, 18);
  ctx.stroke();

  // Glow
  ctx.save();
  ctx.shadowColor = c;
  ctx.shadowBlur = 30;
  ctx.strokeStyle = c;
  ctx.lineWidth = 1;
  roundRect(ctx, 8, 8, W - 16, H - 16, 18);
  ctx.stroke();
  ctx.restore();

  // Header: RITUAL/1979 + rarity badge
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(32, 38, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#888";
  ctx.font = "10px ui-monospace, Menlo, monospace";
  ctx.textBaseline = "middle";
  ctx.fillText("RITUAL/1979", 46, 38);

  // Rarity badge
  ctx.strokeStyle = c;
  ctx.fillStyle = c;
  const badge = tail.rarity;
  ctx.font = "bold 10px ui-monospace, Menlo, monospace";
  const bw = ctx.measureText(badge).width + 16;
  ctx.strokeRect(W - 24 - bw, 28, bw, 20);
  ctx.fillText(badge, W - 24 - bw + 8, 38);

  // PFP circle + handle
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
    } catch {}
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

  // Cat art via SVG
  const svg = buildSiggySvg(tail.key, c);
  const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  try {
    const img = await loadImage(svgUrl);
    ctx.drawImage(img, (W - 240) / 2, 120, 240, 260);
  } catch {}

  // Tail name
  ctx.save();
  ctx.shadowColor = c;
  ctx.shadowBlur = 14;
  ctx.fillStyle = c;
  ctx.textAlign = "center";
  ctx.font = "bold 24px ui-monospace, Menlo, monospace";
  ctx.fillText(tail.name.toUpperCase(), W / 2, 410);
  ctx.restore();

  // Quote
  ctx.fillStyle = "#9ca3af";
  ctx.font = "italic 12px ui-monospace, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.fillText(tail.tagline, W / 2, 434);

  // Tags
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

  // Divider
  ctx.strokeStyle = c + "33";
  ctx.beginPath();
  ctx.moveTo(28, 510);
  ctx.lineTo(W - 28, 510);
  ctx.stroke();

  // Footer: id + minted
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

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
