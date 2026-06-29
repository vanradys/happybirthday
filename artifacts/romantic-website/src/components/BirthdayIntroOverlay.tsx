import { useEffect, useMemo, useState } from "react";

type Candle = {
  id: number;
  left: number;
  top: number;
  isBlown: boolean;
};

export default function BirthdayIntroOverlay() {
  const [candles, setCandles] = useState<Candle[]>([
    { id: 1, left: 95, top: 105, isBlown: false },
    { id: 2, left: 135, top: 92, isBlown: false },
    { id: 3, left: 175, top: 105, isBlown: false },
  ]);

  const shouldShowOnThisPage = useMemo(() => {
    if (typeof window === "undefined") return false;

    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

    return currentPath === "/";
  }, []);

  const [showIntro, setShowIntro] = useState(shouldShowOnThisPage);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "cake" | "wish" | "envelope">("loading");

  useEffect(() => {
    if (!showIntro || phase !== "loading") return;

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setPhase("cake"), 500);
          return 100;
        }

        return prev + 2;
      });
    }, 55);

    return () => window.clearInterval(timer);
  }, [phase, showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowIntro(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#080202] text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(170,32,32,0.48),transparent_58%)]" />
      <div className="absolute inset-0 opacity-25 birthday-intro-stars" />

      <button
        type="button"
          onClick={() => {
            sessionStorage.setItem("romantic-auth", "true");
            window.location.href = "/menu";
          }}
            className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur hover:bg-white/20 transition"
      >
        Skip
      </button>

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {phase === "loading" && (
          <div className="birthday-intro-fade-in">
            <div className="mb-6 text-sm font-semibold tracking-[0.35em] text-white/70">
              BIRTHDAY SURPRISE
            </div>

            <h1 className="mb-8 font-serif text-3xl leading-tight text-[#ffd166] sm:text-4xl birthday-intro-glow">
              One day,
              <br />
              One moment,
              <br />
              One birthday surprise.
            </h1>

            <div className="mx-auto mb-6">
              <div className="birthday-css-cake" aria-label="Birthday cake">
              <span className="cake-candle">
                <span className="cake-flame" />
              </span>
              <span className="cake-top">
                <span className="cake-sprinkle sprinkle-1" />
                <span className="cake-sprinkle sprinkle-2" />
                <span className="cake-sprinkle sprinkle-3" />
                <span className="cake-sprinkle sprinkle-4" />
              </span>
              <span className="cake-body">
                <span className="cake-face">
                  <span className="cake-eye" />
                  <span className="cake-smile" />
                  <span className="cake-eye" />
                </span>
              </span>
              <span className="cake-plate" />
              </div>
</div>

            <p className="mb-4 text-sm text-white/75">
              Loading your birthday surprise...
            </p>

            <div className="mx-auto h-3 w-72 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-[#ffd166] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {phase === "cake" && (
          <div className="birthday-cake-scene">
            <div className="birthday-cake-stage">
              <div className="cake-title cake-pop cake-pop-title">
                HAPPY BIRTHDAY!
              </div>

              <div className="cake-pop cake-pop-cake cake-with-confetti">
                <div
                  className="cute-cake"
                  onClick={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const left = event.clientX - rect.left;
                    const top = event.clientY - rect.top;

                    setCandles((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        left,
                        top,
                        isBlown: false,
                      },
                    ]);
                  }}
                >
                  <div className="cake-plate" />
                  <div className="cake-layer cake-layer-bottom" />
                  <div className="cake-layer cake-layer-middle" />
                  <div className="cake-layer cake-layer-top" />
                  <div className="cake-icing" />
                  <div className="cake-drip cake-drip-1" />
                  <div className="cake-drip cake-drip-2" />
                  <div className="cake-drip cake-drip-3" />

                  {candles.map((candle) => (
                    <div
                      key={candle.id}
                      className="cake-candle-real"
                      style={{
                        left: `${candle.left}px`,
                        top: `${candle.top}px`,
                      }}
                    >
                      {!candle.isBlown && <div className="cake-flame-real" />}
                    </div>
                  ))}
                </div>
              </div>

              <h1 className="birthday-cake-heading cake-pop cake-pop-heading">
                Make a Wish★
              </h1>

              <div className="birthday-cake-actions cake-pop cake-pop-actions">
                <button
                  type="button"
                  onClick={() => {
                    setCandles((prev) =>
                      prev.map((candle) => ({
                        ...candle,
                        isBlown: true,
                      })),
                    );
                  }}
                  className="birthday-outline-button"
                >
                  Tiup Lilin 🕯
                </button>

                <button
                  type="button"
                  onClick={() => setPhase("wish")}
                  className="birthday-solid-button"
                >
                  Lanjut★
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === "wish" && (
          <div className="birthday-intro-pop">
            <div className="mx-auto mb-5 birthday-css-cake">
              <span className="cake-candle">
                <span className="cake-flame" />
              </span>
              <span className="cake-top">
                <span className="cake-sprinkle sprinkle-1" />
                <span className="cake-sprinkle sprinkle-2" />
                <span className="cake-sprinkle sprinkle-3" />
                <span className="cake-sprinkle sprinkle-4" />
              </span>
              <span className="cake-body">
                <span className="cake-face">
                  <span className="cake-eye" />
                  <span className="cake-smile" />
                  <span className="cake-eye" />
                </span>
              </span>
              <span className="cake-plate" />
            </div>
            <h2 className="mb-3 font-serif text-3xl text-[#ffd166] birthday-intro-glow">
              Happy Birthday!
            </h2>
            <p className="mb-7 text-sm text-white/75">
              Ada surat kecil yang aku siapin buat kamu.
            </p>
            <button
              type="button"
              onClick={() => setPhase("envelope")}
              className="rounded-full bg-[#ffd166] px-7 py-3 font-bold text-[#5a1414] shadow-lg hover:scale-105 transition"
            >
              Open Letter ✉︎
            </button>
          </div>
        )}


        {phase === "envelope" && (
          <div className="birthday-intro-pop rounded-3xl border border-white/10 bg-[#fff8ec] p-8 text-[#5a1414] shadow-2xl">
            <div className="mb-4 text-8xl birthday-envelope-float">💌</div>
            <h2 className="mb-3 font-serif text-3xl font-bold">
              Surprise is ready
            </h2>
            <p className="mb-7 text-sm text-[#5a1414]/70">
              Sekarang lanjut ke halaman utamanya ya.
            </p>
            <button
              type="button"
              onClick={() => setShowIntro(false)}
              className="rounded-full bg-[#8b1e1e] px-7 py-3 font-bold text-white shadow-lg hover:scale-105 transition"
            >
              Continue ❤︎
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
