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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2b0808]">
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

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#fff7e8] mb-4 leading-snug">
            Hai sayang, aku bikin sesuatu buat kamu
          </h1>

          <p className="text-base sm:text-lg text-[#e8c96a] mb-10 font-light italic">
            Buka pelan-pelan ya, jangan langsung sok cool.
          </p>

          <button
            data-testid="button-start"
            onClick={handleStartOpen}
            className="px-10 py-3.5 bg-[#9f1d23] text-[#fff7e8] rounded-full font-semibold text-lg shadow-md hover:bg-[#7f151b] hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Mulai Buka
          </button>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-xl mx-auto px-6">
          <div className="rounded-[2rem] border border-[#f1d8b8] bg-[#fff7e8] px-7 py-8 text-center shadow-2xl backdrop-blur sm:px-10">
            <div
              className="text-5xl mb-4"
              style={{ animation: "floatBounce 2s ease-in-out infinite" }}
            >
              💌
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4b1515] mb-5 leading-snug">
              {birthdayLetter.title}
            </h1>

            <div className="space-y-4 text-left">
              {birthdayLetter.paragraphs
                .slice(0, visibleParagraphCount)
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="animate-[fadeIn_0.35s_ease] rounded-2xl bg-[#fff7e8] border border-[#ead7bd] px-5 py-4 font-serif text-base leading-relaxed text-[#4b1515] shadow-sm"
                  >
                    {paragraph}
                  </p>
                ))}

              {visibleParagraphCount === 0 && (
                <p className="text-center text-sm italic text-[#8a6262]">
                  Pencet tombolnya pelan-pelan ya, nanti kalimatnya muncul satu-satu.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleNextLetterText}
              className="mt-8 px-10 py-3.5 bg-[#9f1d23] text-[#fff7e8] rounded-full font-semibold text-lg shadow-md hover:bg-[#7f151b] hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              {isAllParagraphVisible ? "Lanjut Buka Kuncinya ✨" : "Buka Kalimatnya 💗"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
