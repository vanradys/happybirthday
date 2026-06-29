import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";
import { config } from "@/config";

const COLORS = [
  "bg-rose-100",
  "bg-pink-100",
  "bg-amber-100",
  "bg-purple-100",
  "bg-teal-100",
  "bg-sky-100",
];

const EMOJIS = ["🌸", "💕", "🌷", "✨", "🏡", "📷"];

const ROTATIONS = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-3",
  "rotate-2",
];

export default function Gallery() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          data-testid="button-back-to-menu"
          onClick={() => setLocation("/menu")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft size={18} />
          Kembali
        </button>

        <h1 className="text-2xl font-serif font-bold text-center text-foreground mb-1">
          Galeri Kenangan
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-10">
          Kenangan indah yang selalu aku jaga 💝
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          {config.gallery.map((item, idx) => (
            <div
              key={idx}
              data-testid={`polaroid-${idx}`}
              className={`bg-white p-3 pb-8 shadow-md ${ROTATIONS[idx % ROTATIONS.length]} hover:rotate-0 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <div
                className={`${COLORS[idx % COLORS.length]} aspect-square flex items-center justify-center text-4xl rounded-sm mb-3`}
              >
                {EMOJIS[idx % EMOJIS.length]}
              </div>
              <p className="text-center text-xs text-foreground/70 font-serif leading-tight">
                {item.caption}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-xs mt-10 italic">
          Semoga kita bisa bikin lebih banyak lagi ya sayang 💖
        </p>
      </div>
    </div>
  );
}
