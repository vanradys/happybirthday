import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";
import { config } from "@/config";

export default function Achievements() {
  const [, setLocation] = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

        <h1 className="text-2xl font-serif font-bold text-center text-foreground mb-1">
          Achievement Unlocked
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Terima kasih sudah jadi dia yang luar biasa 🏆
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.achievements.map((item, idx) => (
            <div
              key={idx}
              data-testid={`achievement-${idx}`}
              className={`bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-5 shadow-sm transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{item.emoji}</div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-amber-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
