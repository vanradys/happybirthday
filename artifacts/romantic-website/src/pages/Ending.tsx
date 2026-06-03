import { useEffect, useState } from "react";
import { config } from "@/config";

interface Star {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  duration: string;
  delay: string;
}

export default function Ending() {
  const [stars, setStars] = useState<Star[]>([]);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      width: Math.random() * 3 + 1 + "px",
      height: Math.random() * 3 + 1 + "px",
      duration: Math.random() * 3 + 2 + "s",
      delay: Math.random() * 4 + "s",
    }));
    setStars(generated);
    setTimeout(() => setTextVisible(true), 300);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-black ending-twinkle-stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.height,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}

      <div
        className={`relative z-10 text-center px-6 max-w-lg mx-auto transition-all duration-1000 ${
          textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-5xl mb-8">🌠</div>

        <p
          className="text-xl sm:text-2xl font-serif text-white leading-relaxed mb-5"
          style={{ textShadow: "0 0 30px rgba(255,200,200,0.4)" }}
        >
          "Aku suka dunia yang kita bikin berdua."
        </p>
        <p
          className="text-lg sm:text-xl font-serif text-rose-200 leading-relaxed mb-12"
          style={{ textShadow: "0 0 20px rgba(255,100,150,0.3)" }}
        >
          "Kalau dunia lagi berat, pulang aja ke aku yaa bubu."
        </p>

        <a
          href={`https://wa.me/${config.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-whatsapp"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          Balas aku di WhatsApp 💌
        </a>
      </div>
    </div>
  );
}
