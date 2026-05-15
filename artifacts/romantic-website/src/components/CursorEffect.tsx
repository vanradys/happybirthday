import { useEffect } from "react";

const SYMBOLS = ["♥", "✦", "✧", "♡", "✿", "·"];

export default function CursorEffect() {
  useEffect(() => {
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 80) return;
      lastTime = now;

      const el = document.createElement("div");
      el.className = "sparkle-particle";
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
      el.style.setProperty("--tx", Math.random() * 40 - 20 + "px");
      el.style.setProperty("--ty", -(Math.random() * 30 + 10) + "px");

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}
