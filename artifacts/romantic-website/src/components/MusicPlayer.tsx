import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.4;
    audio.src = "/music.mp3";
    audio.addEventListener("error", () => setHasError(true));
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setHasError(true);
      });
    }
  };

  return (
    <button
      onClick={toggle}
      data-testid="music-player-toggle"
      title={isPlaying ? "Pause music" : "Play music"}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
        hasError
          ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          : "bg-primary text-white"
      }`}
    >
      {isPlaying ? <Pause size={18} /> : <Music size={18} />}
    </button>
  );
}
