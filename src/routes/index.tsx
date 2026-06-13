import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiggyCard, resolveTail, TAILS, type Tail } from "@/components/SiggyCard";
import { drawSiggyCard } from "@/lib/draw-card";

const RITUAL_RPC = "https://rpc.ritualfoundation.org";
// This contract stores live minted count at slot getter 0xa2309ff8.
const MINTED_COUNT_SELECTOR = "0xa2309ff8";
const DISPLAY_MAX_SUPPLY = 500;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Siggy Tails — Born on the Ritual Chain" },
      {
        name: "description",
        content:
          "Enter your Twitter handle. The chain decides which Siggy you are. Five tails. Five fates. One mint.",
      },
    ],
  }),
  component: Index,
});

type Stage = "idle" | "invoking" | "revealed" | "minted";

const RITUAL_CHAIN_ID_HEX = "0x7bb";
const MINT_CONTRACT = "0x4dCC92642Fa28b994b05dd57f7f793deEFc39a30";
const MINT_DATA = "0x1249c58b";

async function readContractUint(selector: string): Promise<number | null> {
  const res = await fetch(RITUAL_RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "eth_call",
      params: [{ to: MINT_CONTRACT, data: selector }, "latest"],
    }),
  });
  const json = await res.json();
  if (!json?.result || json.result === "0x") return null;
  return parseInt(json.result, 16);
}

function sanitizeHandle(value: string) {
  return value.trim().replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, "");
}

function buildTwitterAvatarUrls(handle: string) {
  const safeHandle = encodeURIComponent(handle);
  const xPath = `unavatar.io/x/${safeHandle}`;
  const twitterPath = `unavatar.io/twitter/${safeHandle}`;
  return [
    `https://unavatar.io/x/${safeHandle}`,
    `https://unavatar.io/twitter/${safeHandle}`,
    `https://images.weserv.nl/?url=${encodeURIComponent(xPath)}&w=256&h=256&fit=cover&output=png`,
    `https://images.weserv.nl/?url=${encodeURIComponent(twitterPath)}&w=256&h=256&fit=cover&output=png`,
  ];
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function resolveAvatarDataUrl(handle: string): Promise<string | null> {
  for (const url of buildTwitterAvatarUrls(handle)) {
    try {
      const res = await fetch(url, { mode: "cors", cache: "no-store" });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || !contentType.startsWith("image/")) continue;
      return await blobToDataUrl(await res.blob());
    } catch {
      // Try the next avatar source.
    }
  }
  return null;
}

function Index() {
  const [handle, setHandle] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [tail, setTail] = useState<Tail | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [supply, setSupply] = useState<number | null>(null);
  const [maxSupply] = useState<number>(DISPLAY_MAX_SUPPLY);
  const [avatarCandidateIndex, setAvatarCandidateIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const optimisticSupplyRef = useRef<number | null>(null);

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

  useEffect(() => {
    fetchSupply();
    const id = setInterval(fetchSupply, 10000);
    return () => clearInterval(id);
  }, []);

  const normalizedHandle = sanitizeHandle(handle);
  const avatarCandidates = normalizedHandle ? buildTwitterAvatarUrls(normalizedHandle) : [];
  const pfpImageUrl = avatarCandidates[avatarCandidateIndex] ?? null;

  useEffect(() => {
    setAvatarCandidateIndex(0);
  }, [normalizedHandle]);

  const advanceAvatarCandidate = () => {
    setAvatarCandidateIndex((current) =>
      current + 1 < avatarCandidates.length ? current + 1 : current,
    );
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const ensureRitualChain = async () => {
    const eth = (window as any).ethereum;
    const current = await eth.request({ method: "eth_chainId" });
    if (current === RITUAL_CHAIN_ID_HEX) return;
    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: RITUAL_CHAIN_ID_HEX }],
      });
    } catch (err: any) {
      if (err?.code === 4902) {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: RITUAL_CHAIN_ID_HEX,
              chainName: "Ritual Chain",
              nativeCurrency: { name: "Ritual", symbol: "RITUAL", decimals: 18 },
              rpcUrls: ["https://rpc.ritualfoundation.org"],
              blockExplorerUrls: ["https://explorer.ritualfoundation.org"],
            },
          ],
        });
      } else {
        throw err;
      }
    }
  };

  const connectWallet = async () => {
    const eth = (window as any).ethereum;
    if (!eth) {
      showToast("METAMASK NOT FOUND");
      return null;
    }
    try {
      const accounts: string[] = await eth.request({ method: "eth_requestAccounts" });
      const addr = accounts[0];
      setWallet(addr);
      await ensureRitualChain();
      showToast("WALLET CONNECTED");
      return addr;
    } catch (e: any) {
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
      const eth = (window as any).ethereum;
      if (!eth) {
        showToast("METAMASK NOT FOUND");
        return;
      }
      let from = wallet;
      if (!from) from = await connectWallet();
      if (!from) return;
      await ensureRitualChain();

      const txParams: Record<string, string> = {
        from,
        to: MINT_CONTRACT,
        data: MINT_DATA,
      };

      let gas: string;
      try {
        gas = await eth.request({ method: "eth_estimateGas", params: [txParams] });
      } catch (e) {
        showToast("GAS ESTIMATE FAILED");
        console.error("estimateGas failed", e);
        return;
      }

      const hash: string = await eth.request({
        method: "eth_sendTransaction",
        params: [{ ...txParams, gas }],
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
      setTimeout(fetchSupply, 4000);
    } catch (e: any) {
      console.error("mint failed", e);
      showToast(e?.message?.slice(0, 48) || "MINT FAILED");
    } finally {
      setMinting(false);
    }
  };

  const buildCanvas = async () => {
    if (!tail) return null;
    const canvasPfp = normalizedHandle ? await resolveAvatarDataUrl(normalizedHandle) : null;
    return await drawSiggyCard({ handle, tail, pfpUrl: canvasPfp ?? pfpImageUrl, minted: true });
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
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-foreground">
      <StarryBackground />
      <div className="relative z-10">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full border border-primary/60">
              <span className="block h-2 w-2 rounded-full bg-primary" />
            </div>
            <div className="leading-tight">
              <div className="text-xs tracking-[0.3em]">SIGGY//TAILS</div>
              <div className="text-[9px] tracking-[0.3em] text-muted-foreground">
                RITUAL CHAIN · 1979
              </div>
            </div>
          </div>
          <button
            onClick={connectWallet}
            className="rounded-md border border-primary px-3 py-1.5 text-[10px] tracking-[0.3em] text-primary transition hover:bg-primary/10"
          >
            {wallet ? `▸ ${wallet.slice(0, 6)}…${wallet.slice(-4)}` : "▸ CONNECT METAMASK"}
          </button>
        </header>

        <section className="mx-auto max-w-6xl px-6 pb-10 pt-12 text-center">
          <div className="text-[10px] tracking-[0.4em] text-primary">
            / BORN ON THE RITUAL CHAIN /
          </div>
          <h1 className="neon-title mt-3 text-5xl sm:text-7xl">
            SIGGY <span className="accent">TAILS</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Enter your Twitter handle. The chain reveals which Siggy Tail you are.
            Five tails. Five fates. One mint.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-2">
          {/* LEFT — claim panel */}
            <div
              className="rounded-2xl border bg-black/80 p-6 backdrop-blur"
              style={{ borderColor: tail?.color || undefined }}
            >
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">
              &gt; STEP_01 // CLAIM_IDENTITY
            </div>

            <div className="mt-3 rounded-md border border-primary/40 bg-background/60 p-3">
              <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-muted-foreground">
                <span>LIVE_SUPPLY</span>
                <span className="flex items-center gap-1.5 text-primary">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  ON-CHAIN
                </span>
              </div>
              <div className="mt-1 font-mono text-2xl tracking-[0.15em] text-foreground">
                {supply === null ? "—" : String(supply).padStart(3, "0")}
                <span className="text-muted-foreground"> / {maxSupply} </span>
                <span className="text-[10px] tracking-[0.3em] text-primary">MINTED</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, ((supply ?? 0) / maxSupply) * 100)}%` }}
                />
              </div>
            </div>

            <label className="mt-4 block text-xs tracking-[0.2em] text-muted-foreground">
              TWITTER HANDLE
            </label>
            <div className="mt-2 flex items-center gap-3">
              <div
                className="h-11 w-11 shrink-0 overflow-hidden rounded-full border bg-muted"
                style={{ borderColor: tail?.color || "var(--primary)" }}
              >
                {pfpImageUrl && (
                  <img
                    key={pfpImageUrl}
                    src={pfpImageUrl}
                    alt={handle}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      advanceAvatarCandidate();
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>
              <div className="flex flex-1 items-center rounded-md border border-input bg-background px-3 py-2 focus-within:border-primary">
                <span className="text-muted-foreground">@</span>
                <input
                  value={handle}
                  onChange={(e) => {
                    setHandle(sanitizeHandle(e.target.value));
                    if (stage !== "idle") reset();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") invoke();
                  }}
                  placeholder="vitalik"
                  className="ml-1 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>

            {stage === "idle" && (
              <button
                onClick={invoke}
                disabled={!handle.trim()}
                className="mt-5 w-full rounded-md border border-primary bg-primary px-4 py-3 text-sm tracking-[0.35em] text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground"
              >
                ▶ INVOKE MY FATE
              </button>
            )}

            {stage === "invoking" && (
              <div className="mt-5 rounded-md border border-primary/60 bg-background/60 p-4 text-center">
                <div className="text-[10px] tracking-[0.4em] text-primary animate-pulse">
                  QUERYING THE CHAIN…
                </div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">
                  &gt; hashing @{handle}
                  <br />
                  &gt; rolling tail entropy…
                </div>
              </div>
            )}

            {stage !== "idle" && stage !== "invoking" && tail && (
              <>
                <div className="mt-6 space-y-2 text-[11px] tracking-widest text-muted-foreground">
                  <Row k="CHAIN_ID" v="1979" />
                  <Row k="RPC" v="rpc.ritualfoundation.org" />
                  <Row k="WALLET" v={wallet ? `${wallet.slice(0,6)}…${wallet.slice(-4)}` : "DISCONNECTED"} />
                  <Row
                    k="ASSIGNED"
                    v={<span style={{ color: tail.color }}>{tail.rarity}</span>}
                  />
                </div>

                {stage === "revealed" && (
                  <button
                    onClick={mint}
                    disabled={minting}
                    className="mt-6 w-full rounded-md border border-primary bg-primary px-4 py-3 text-sm tracking-[0.3em] text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
                  >
                    {minting ? "▶ SIGNING…" : "▶ MINT ON RITUAL"}
                  </button>
                )}

                {stage === "minted" && (
                  <div className="mt-6 rounded-md border border-primary/60 bg-primary/10 p-3 text-center text-[10px] tracking-[0.35em] text-primary break-all">
                    ✓ MINT SUBMITTED · TX {txHash ? `${txHash.slice(0,10)}…${txHash.slice(-6)}` : ""}
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT — card stage */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-full max-w-sm">
              {stage === "idle" && (
                <div className="grid aspect-[3/4] place-items-center rounded-2xl border border-dashed border-border bg-card/30 p-6 text-center">
                  <div>
                    <div className="text-[10px] tracking-[0.4em] text-muted-foreground">
                      AWAITING INVOCATION
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground/70">
                      enter a handle · press <span className="text-primary">INVOKE MY FATE</span>
                    </div>
                  </div>
                </div>
              )}

              {stage === "invoking" && (
                <div className="relative grid aspect-[3/4] place-items-center overflow-hidden rounded-2xl border border-primary/60 bg-card/40 p-6">
                  <div className="absolute inset-0 animate-ritual-flicker bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
                  <div className="absolute inset-x-0 top-1/2 h-px animate-ritual-scan bg-primary" />
                  <div className="relative text-center">
                    <div className="font-mono text-5xl tracking-widest text-primary animate-ritual-glitch">
                      ?
                    </div>
                    <div className="mt-3 text-[10px] tracking-[0.4em] text-primary/80">
                      THE CHAIN DECIDES
                    </div>
                  </div>
                </div>
              )}

              {(stage === "revealed" || stage === "minted") && tail && (
                <div className="animate-card-reveal">
                  <SiggyCard
                    ref={cardRef}
                    handle={handle}
                    tail={tail}
                    minted={stage === "minted"}
                    pfpUrl={pfpImageUrl}
                    onPfpError={advanceAvatarCandidate}
                  />
                </div>
              )}
            </div>

            {stage === "minted" && tail && (
              <div className="grid w-full max-w-sm grid-cols-3 gap-2">
                <ActionBtn onClick={onSave} label="SAVE" />
                <ActionBtn onClick={onCopy} label="COPY" />
                <ActionBtn onClick={onXPost} label="X POST" />
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-6 flex items-end justify-between border-b border-border/60 pb-3">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground">
                / COLLECTION /
              </div>
              <h2 className="mt-1 text-2xl tracking-[0.2em]">ALL FIVE TAILS</h2>
            </div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">005 / 005</div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TAILS.map((t) => (
              <SiggyCard key={t.key} handle="ritual" tail={t} />
            ))}
          </div>
        </section>
      </div>

      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center">
          <div className="animate-fade-in rounded-md border border-primary bg-background/90 px-4 py-2 text-[10px] tracking-[0.35em] text-primary backdrop-blur">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-dashed border-border/50 py-1">
      <span>{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}

function ActionBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border border-primary/60 bg-background/40 px-3 py-2 text-[10px] tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground"
    >
      {label}
    </button>
  );
}

function StarryBackground() {
  // Deterministic star field
  const stars = Array.from({ length: 160 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rand = (n: number) => ((seed * (n + 1)) % 1000) / 1000;
    return {
      top: rand(1) * 100,
      left: rand(2) * 100,
      size: 1 + rand(3) * 3,
      delay: rand(4) * 4,
      duration: 1.5 + rand(5) * 2.5,
    };
  });
  const sparkles = Array.from({ length: 40 }, (_, i) => {
    const seed = (i * 4567 + 1234) % 9999;
    const rand = (n: number) => ((seed * (n + 1)) % 1000) / 1000;
    return {
      top: rand(1) * 100,
      left: rand(2) * 100,
      delay: rand(3) * 5,
      hue: ["#fff", "#a3ffd6", "#9be7ff", "#ffd1a8", "#ffb3ff", "#c2a3ff"][i % 6],
    };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(80,255,160,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(60,120,255,0.06),transparent_60%)]" />
      {stars.map((s, i) => (
        <span
          key={`s-${i}`}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: 0.7,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`g-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full animate-sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            background: s.hue,
            boxShadow: `0 0 12px ${s.hue}, 0 0 24px ${s.hue}`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
