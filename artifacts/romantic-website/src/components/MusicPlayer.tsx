import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/penjaga-hati.mp3");

    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";

    audioRef.current = audio;

    const handleError = () => {
      setHasError(true);
    };

    let removeInteractionListeners = () => {};

    const tryPlayMusic = async () => {
      try {
        await audio.play();

        setIsPlaying(true);
        setIsBlocked(false);

        removeInteractionListeners();
      } catch {
        setIsPlaying(false);
        setIsBlocked(true);
      }
    };

    const playAfterFirstInteraction = () => {
      tryPlayMusic();
    };

    removeInteractionListeners = () => {
      window.removeEventListener("click", playAfterFirstInteraction);
      window.removeEventListener("touchstart", playAfterFirstInteraction);
      window.removeEventListener("keydown", playAfterFirstInteraction);
    };

    audio.addEventListener("error", handleError);

    const autoPlayTimer = window.setTimeout(() => {
      tryPlayMusic();
    }, 500);

    window.addEventListener("click", playAfterFirstInteraction);
    window.addEventListener("touchstart", playAfterFirstInteraction);
    window.addEventListener("keydown", playAfterFirstInteraction);

    return () => {
      window.clearTimeout(autoPlayTimer);
      removeInteractionListeners();

      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";

      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();

      setIsPlaying(true);
      setIsBlocked(false);
    } catch {
      setIsBlocked(true);
    }
  };

  return (
    <button
      onClick={toggle}
      data-testid="music-player-toggle"
      title={
        hasError
          ? "Music file not found"
          : isPlaying
            ? "Pause music"
            : isBlocked
              ? "Click to start music"
              : "Play music"
      }
      className={`fixed bottom-6 right-6 z-[10000] w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
        hasError
          ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          : "bg-primary text-white"
      }`}
    >
      {isPlaying ? <Pause size={18} /> : <Music size={18} />}
    </button>
  );
}
