import { useEffect } from "react";

const SYMBOLS = ["♥", "✦", "✧", "♡", "✿", "·", "✨", "💕"];

export default function CursorEffect() {
  useEffect(() => {
    let lastTime = 0;

    const createParticle = (x: number, y: number) => {
      const el = document.createElement("div");

      el.className = "sparkle-particle";
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

      el.style.left = x + (Math.random() * 24 - 12) + "px";
      el.style.top = y + (Math.random() * 24 - 12) + "px";

      el.style.setProperty("--tx", Math.random() * 70 - 35 + "px");
      el.style.setProperty("--ty", -(Math.random() * 45 + 15) + "px");

      document.body.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 1000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      if (now - lastTime < 20) return;
      lastTime = now;

      for (let i = 0; i < 2; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
