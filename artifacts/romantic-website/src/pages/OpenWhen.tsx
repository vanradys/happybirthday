import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, X } from "lucide-react";
import { config } from "@/config";

type OpenWhenItem = (typeof config.openWhen)[0];

export default function OpenWhen() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<OpenWhenItem | null>(null);

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
          Open When Letters
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Buka sesuai perasaan kamu sekarang
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.openWhen.map((item, idx) => (
            <button
              key={idx}
              data-testid={`card-open-when-${idx}`}
              onClick={() => setSelected(item)}
              className="bg-white border-2 border-border rounded-2xl p-6 text-left shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary transition-all duration-200"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">Klik untuk membuka</p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease]"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              data-testid="button-close-modal"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
            <div className="text-5xl mb-4 text-center">{selected.emoji}</div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-4 text-center">
              {selected.title}
            </h3>
            <p className="text-foreground leading-relaxed text-center font-serif">
              {selected.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
