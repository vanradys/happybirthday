import { useEffect, useState } from "react";
import { useLocation } from "wouter";

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

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <div className="text-6xl mb-6" style={{ animation: "floatBounce 2s ease-in-out infinite" }}>
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
          onClick={() => setLocation("/password")}
          className="px-10 py-3.5 bg-primary text-white rounded-full font-semibold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          Mulai Buka
        </button>
      </div>
    </div>
  );
}
