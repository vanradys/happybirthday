import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";
import { config } from "@/config";

export default function Timeline() {
  const [, setLocation] = useLocation();
  const [visible, setVisible] = useState<boolean[]>(
    config.timeline.map(() => false)
  );
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = refs.current.map((el, idx) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
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
          Timeline Kitaa
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-10">
          Momen-momen lucu kitaa
        </p>

        <div className="relative pl-8">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

          <div className="space-y-8">
            {config.timeline.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  refs.current[idx] = el;
                }}
                className={`relative transition-all duration-700 ${
                  visible[idx]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="absolute -left-8 w-10 h-10 bg-white border-2 border-primary rounded-full flex items-center justify-center text-lg shadow-sm">
                  {item.emoji}
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-border ml-4">
                  <p className="text-xs text-accent font-semibold mb-1">{item.date}</p>
                  <h3 className="font-serif font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
