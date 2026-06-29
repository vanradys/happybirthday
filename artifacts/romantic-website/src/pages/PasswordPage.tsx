import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { config } from "@/config";

export default function PasswordPage() {
  const [, setLocation] = useLocation();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.toLowerCase().trim() === config.password.toLowerCase().trim()) {
      sessionStorage.setItem("romantic-auth", "true");
      setLocation("/menu");
    } else {
      setError(true);
      setShaking(true);
      setValue("");
      setTimeout(() => setShaking(false), 400);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-pink-100 px-4">
      <div
        className={`bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center ${shaking ? "animate-[shake_0.4s_ease]" : ""}`}
      >
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Sebelum lanjut</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Apa nama panggilan kita?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            data-testid="input-password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="kata kuncinya..."
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground text-center tracking-widest focus:outline-none focus:border-primary transition-colors text-lg"
          />

          {error && (
            <p className="text-rose-500 text-sm font-medium animate-[fadeIn_0.2s_ease]">
              Hmm masa lupa sih? coba lagi🥺
            </p>
          )}

          <button
            type="submit"
            data-testid="button-password-submit"
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Buka ✨
          </button>
        </form>
      </div>
    </div>
  );
}
