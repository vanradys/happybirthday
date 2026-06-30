import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useLocation } from "wouter";
import { Heart } from "lucide-react";
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

interface FloatingHeart {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
  rotate: number;
}

function FloatingHeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type HeartParticle = {
      x: number;
      y: number;
      size: number;
      speed: number;
      drift: number;
      rotation: number;
      rotationSpeed: number;
      alpha: number;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const hearts: HeartParticle[] = Array.from({ length: 130 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * window.innerHeight,
      size: 10 + Math.random() * 22,
      speed: 0.8 + Math.random() * 1.8,
      drift: Math.random() * 2 - 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      alpha: 0.18 + Math.random() * 0.48,
    }));

    const drawHeart = (heart: HeartParticle) => {
      ctx.save();
      ctx.translate(heart.x, heart.y);
      ctx.rotate(heart.rotation);
      ctx.scale(heart.size / 24, heart.size / 24);

      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.bezierCurveTo(-18, -6, -10, -22, 0, -12);
      ctx.bezierCurveTo(10, -22, 18, -6, 0, 8);

      ctx.fillStyle = `rgba(255, 255, 255, ${heart.alpha})`;
      ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
      ctx.shadowBlur = 12;
      ctx.fill();

      ctx.restore();
    };

    let animationFrame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        heart.y -= heart.speed;
        heart.x += Math.sin(heart.y * 0.015) * heart.drift;
        heart.rotation += heart.rotationSpeed;

        if (heart.y < -60) {
          heart.y = canvas.height + 60;
          heart.x = Math.random() * canvas.width;
          heart.size = 10 + Math.random() * 22;
          heart.speed = 0.8 + Math.random() * 1.8;
          heart.alpha = 0.18 + Math.random() * 0.48;
        }

        drawHeart(heart);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="love-more-canvas" />;
}

export default function Ending() {
  const [, setLocation] = useLocation();

  const [stars, setStars] = useState<Star[]>([]);
  const [textVisible, setTextVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(() => {
    return sessionStorage.getItem("show-final-ending") === "true";
  });
  const [showLoveMore, setShowLoveMore] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState<CSSProperties>({});

  const floatingHearts = useMemo<FloatingHeart[]>(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        size: Math.random() * 28 + 18,
        duration: Math.random() * 8 + 8 + "s",
        delay: Math.random() * 4 + "s",
        rotate: Math.random() * 40 - 20,
      })),
    []
  );

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

    const timer = window.setTimeout(() => {
      setTextVisible(true);
    }, 300);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLoveMore) return;

    let startFadeTimer: number;
    let fallbackTimer: number;
    let afterFadeTimer: number;

    const goToVideoIntro = () => {
      sessionStorage.setItem("show-final-ending", "true");
      setLocation("/video-intro");
    };

    const handleFadeOutDone = () => {
      window.clearTimeout(fallbackTimer);

      afterFadeTimer = window.setTimeout(() => {
        goToVideoIntro();
      }, 700);
    };

    startFadeTimer = window.setTimeout(() => {
      window.addEventListener("birthday-music-fade-out-done", handleFadeOutDone, {
        once: true,
      });

      window.dispatchEvent(
        new CustomEvent("birthday-music-fade-out", {
          detail: {
            duration: 2500,
          },
        }),
      );

      fallbackTimer = window.setTimeout(() => {
        goToVideoIntro();
      }, 3600);
    }, 4200);

    return () => {
      window.clearTimeout(startFadeTimer);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(afterFadeTimer);
      window.removeEventListener("birthday-music-fade-out-done", handleFadeOutDone);
    };
  }, [showLoveMore, setLocation]);

  const moveNoButton = () => {
    const buttonWidth = 120;
    const buttonHeight = 60;
    const padding = 24;

    const maxLeft = Math.max(
      padding,
      window.innerWidth - buttonWidth - padding
    );

    const maxTop = Math.max(
      padding,
      window.innerHeight - buttonHeight - padding
    );

    const newLeft = Math.random() * (maxLeft - padding) + padding;
    const newTop = Math.random() * (maxTop - padding) + padding;
    const randomRotate = Math.random() * 24 - 12;

    setNoBtnPosition({
      position: "fixed",
      left: `${newLeft}px`,
      top: `${newTop}px`,
      zIndex: 9999,
      transform: `rotate(${randomRotate}deg)`,
      transition: "all 180ms ease",
    });
  };

  if (showLoveMore) {
    return (
      <div className="love-more-page">
        <FloatingHeartCanvas />

        <div className="love-more-heart">
          {Array.from({ length: 90 }).map((_, index) => (
            <div
              className="love-more-item"
              key={index}
              style={{ "--i": index + 1 } as CSSProperties}
            >
              <div className="love-more-horizontal">
                <div className="love-more-vertical">
                  <div className="love-more-word">I Love You</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="love-more-title">LOVE YOU MORE SAYANGG</h1>
      </div>
    );
  }

  if (!isAccepted) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingHearts.map((heart) => (
            <Heart
              key={heart.id}
              className="absolute text-white/35 opacity-60 animate-[loveFloat_5s_ease-in-out_infinite]"
              fill="currentColor"
              style={{
                left: heart.left,
                top: heart.top,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
                transform: `rotate(${heart.rotate}deg)`,
                animationDuration: heart.duration,
                animationDelay: heart.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <Heart
            className="mb-14 h-24 w-24 text-[#9f1d23] drop-shadow-lg"
            fill="currentColor"
          />

          <h1 className="mb-14 text-5xl font-extrabold tracking-tight text-[#fff7e8] drop-shadow-sm sm:text-7xl">
            kamu sayang gakk sama akuu?
          </h1>

          <div className="relative flex h-28 items-center justify-center gap-8 sm:gap-12">
            <button
              type="button"
              onClick={() => setShowLoveMore(true)}
              className="rounded-full bg-[#fff7e8] px-12 py-4 text-xl font-black text-[#4b1515] shadow-xl transition hover:scale-110 hover:bg-[#ffd166] active:scale-95"
            >
              SAYANGPOLL
            </button>

            <button
              type="button"
              style={noBtnPosition}
              onMouseEnter={moveNoButton}
              onMouseMove={moveNoButton}
              onFocus={moveNoButton}
              onTouchStart={(event) => {
                event.preventDefault();
                moveNoButton();
              }}
              onClick={(event) => {
                event.preventDefault();
                moveNoButton();
              }}
              className="rounded-full bg-[#9f1d23] px-12 py-4 text-xl font-black text-[#fff7e8] shadow-xl transition hover:bg-[#7f151b] active:scale-90"
            >
              GAKK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-black">
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
        className={`relative z-10 text-center px-6 max-w-lg mx-auto ${
          textVisible ? "ending-text-pop" : "ending-text-hidden"
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
