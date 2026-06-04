import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";

interface LetterProps {
  letter: {
    title: string;
    paragraphs: string[];
  };
}

export default function LetterPage({ letter }: LetterProps) {
  const [, setLocation] = useLocation();
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const allRevealed = revealed >= letter.paragraphs.length;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-xl mx-auto">
        <button
          data-testid="button-back-to-menu"
          onClick={() => setLocation("/menu")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft size={18} />
          Kembali
        </button>

        <div className="paper-texture p-7 sm:p-10 rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-center text-foreground mb-8">
            {letter.title}
          </h1>

          {!started ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-6 text-sm italic">
                Siap buat baca surat ini?
              </p>
              <button
                data-testid="button-open-letter"
                onClick={() => {
                  setStarted(true);
                  setRevealed(1);
                }}
                className="px-7 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md"
              >
                Klik nya yang sabar ya 💌
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-5 mb-8">
                {letter.paragraphs.slice(0, revealed).map((para, idx) => (
                  <p
                    key={idx}
                    className="text-foreground leading-relaxed font-serif animate-[fadeIn_0.5s_ease]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="text-center">
                {!allRevealed ? (
                  <button
                    data-testid="button-next-paragraph"
                    onClick={() => setRevealed((r) => r + 1)}
                    className="px-7 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                  >
                    Lanjut... 💕
                  </button>
                ) : (
                  <div className="space-y-5 animate-[fadeIn_0.5s_ease]">
                    <div className="text-3xl">🌸</div>
                    <p className="text-muted-foreground text-sm italic">
                      Sekian surat dari aku, semoga kamu suka ya.
                    </p>
                    <button
                      data-testid="button-back-to-menu-end"
                      onClick={() => setLocation("/menu")}
                      className="px-7 py-3 bg-accent text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                      Kembali ke Menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
