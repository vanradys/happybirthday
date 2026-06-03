import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { config } from "@/config";

interface Heart {
  id: number;
  left: string;
  fontSize: string;
  duration: string;
  delay: string;
}

export default function Landing() {
  const [, setLocation] = useLocation();
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [showLetter, setShowLetter] = useState(false);
  const [visibleParagraphCount, setVisibleParagraphCount] = useState(0);

  const birthdayLetter = config.letters.birthday;
  const isAllParagraphVisible =
    visibleParagraphCount >= birthdayLetter.paragraphs.length;

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      fontSize: Math.random() * 18 + 10 + "px",
      duration: Math.random() * 6 + 7 + "s",
      delay: Math.random() * 8 + "s",
    }));

    setHearts(generated);
  }, []);

  const handleStartOpen = () => {
    setShowLetter(true);
    setVisibleParagraphCount(0);
  };

  const handleNextLetterText = () => {
    if (!isAllParagraphVisible) {
      setVisibleParagraphCount((prev) => prev + 1);
      return;
    }

    setLocation("/password");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart select-none"
          style={{
            left: h.left,
            fontSize: h.fontSize,
            animationDuration: h.duration,
            animationDelay: h.delay,
            bottom: "-5%",
          }}
        >
          ♥
        </span>
      ))}

      {!showLetter ? (
        <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
          <div
            className="text-6xl mb-6"
            style={{ animation: "floatBounce 2s ease-in-out infinite" }}
          >
            💌
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-rose-700 mb-4 leading-snug">
            Hai sayang, aku bikin sesuatu buat kamu
          </h1>

          <p className="text-base sm:text-lg text-rose-400 mb-10 font-light italic">
            Buka pelan-pelan ya, jangan langsung sok cool.
          </p>

          <button
            data-testid="button-start"
            onClick={handleStartOpen}
            className="px-10 py-3.5 bg-primary text-white rounded-full font-semibold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Mulai Buka
          </button>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-xl mx-auto px-6">
          <div className="rounded-[2rem] border border-rose-100 bg-white/80 px-7 py-9 text-center shadow-2xl backdrop-blur sm:px-10">
            <div
              className="text-6xl mb-5"
              style={{ animation: "floatBounce 2s ease-in-out infinite" }}
            >
              💌
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-rose-700 mb-6 leading-snug">
              {birthdayLetter.title}
            </h1>

            <div className="min-h-[210px] space-y-4 text-left">
              {birthdayLetter.paragraphs
                .slice(0, visibleParagraphCount)
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="animate-[fadeIn_0.35s_ease] rounded-2xl bg-rose-50 px-5 py-4 font-serif text-base leading-relaxed text-rose-700 shadow-sm"
                  >
                    {paragraph}
                  </p>
                ))}

              {visibleParagraphCount === 0 && (
                <p className="text-center text-sm italic text-rose-400">
                  Pencet tombolnya pelan-pelan ya, nanti kalimatnya muncul satu-satu.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleNextLetterText}
              className="mt-8 px-10 py-3.5 bg-primary text-white rounded-full font-semibold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              {isAllParagraphVisible ? "Lanjut Buka Kuncinya ✨" : "Buka Kalimatnya 💗"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
