import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";
import { config } from "@/config";

export default function Messages() {
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState<string | null>(null);
  const [prevIdx, setPrevIdx] = useState(-1);
  const [visible, setVisible] = useState(false);

  const getNewMessage = () => {
    let idx = prevIdx;
    while (idx === prevIdx && config.loveMessages.length > 1) {
      idx = Math.floor(Math.random() * config.loveMessages.length);
    }
    setVisible(false);
    setTimeout(() => {
      setMessage(config.loveMessages[idx]);
      setPrevIdx(idx);
      setVisible(true);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-lg mx-auto">
        <button
          data-testid="button-back-to-menu"
          onClick={() => setLocation("/menu")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft size={18} />
          Kembali
        </button>

        <div className="text-center">
          <div className="text-6xl mb-4">💌</div>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Pesan Sayang</h1>
          <p className="text-muted-foreground text-sm mb-10">
            Tekan tombol kalau butuh kata-kata manis
          </p>

          {message && (
            <div
              className={`bg-white border-2 border-primary/20 rounded-2xl p-8 mb-8 shadow-md transition-all duration-300 ${
                visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="text-3xl mb-4">✨</div>
              <p
                data-testid="text-love-message"
                className="text-xl font-serif text-foreground leading-relaxed"
              >
                "{message}"
              </p>
            </div>
          )}

          <button
            data-testid="button-get-message"
            onClick={getNewMessage}
            className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Klik kalau butuh disayang 💕
          </button>
        </div>
      </div>
    </div>
  );
}
