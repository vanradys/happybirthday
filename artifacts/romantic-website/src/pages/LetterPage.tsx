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

        <div className="paper-texture bg-[#fff7e8] p-7 sm:p-10 rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-center text-[#4b1515] mb-8">
            {letter.title}
          </h1>

          {!started ? (
            <div className="text-center py-6">
              <p className="text-[#8a6262] mb-6 text-sm italic">
                Siap buat baca surat dari akuu?
              </p>
              <button
                data-testid="button-open-letter"
                onClick={() => {
                  setStarted(true);
                  setRevealed(1);
                }}
                className="px-7 py-3 bg-[#9f1d23] text-[#fff7e8] rounded-full font-semibold hover:bg-[#7f151b] transition-colors shadow-md"
              >
                Klik nya yang sabar yaa 💌
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-5 mb-8">
                {letter.paragraphs.slice(0, revealed).map((para, idx) => (
                  <p
                    key={idx}
                    className="text-[#4b1515] leading-relaxed font-serif animate-[fadeIn_0.5s_ease]"
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
                    className="px-7 py-3 bg-[#9f1d23] text-[#fff7e8] rounded-full font-semibold hover:bg-[#7f151b] transition-colors"
                  >
                    Lanjut... 💕
                  </button>
                ) : (
                  <div className="space-y-5 animate-[fadeIn_0.5s_ease]">
                    <div className="text-3xl">🌸</div>
                    <p className="text-[#8a6262] text-sm italic">
                      Rasa Sayangnya gak cuma segini kok, buka page lain yaa buat liat lebih banyak 💌
                    </p>
                    <button
                      data-testid="button-back-to-menu-end"
                      onClick={() => setLocation("/menu")}
                      className="px-7 py-3 bg-[#9f1d23] text-[#fff7e8] rounded-full font-semibold hover:bg-[#7f151b] transition-colors"
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
