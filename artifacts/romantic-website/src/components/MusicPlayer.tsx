import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";

type MusicFadeOutEvent = CustomEvent<{
  duration?: number;
}>;

const MUSIC_SRC = "/penjaga-hati.mp3";
const DEFAULT_VOLUME = 0.4;

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const shouldStopAutoPlayRef = useRef(false);
  const isTryingToPlayRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);

    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audio.preload = "auto";

    audioRef.current = audio;

    const clearFadeInterval = () => {
      if (fadeIntervalRef.current !== null) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("pointerdown", playAfterFirstInteraction, true);
      window.removeEventListener("click", playAfterFirstInteraction, true);
      window.removeEventListener("touchstart", playAfterFirstInteraction, true);
      window.removeEventListener("keydown", playAfterFirstInteraction, true);
      window.removeEventListener("scroll", playAfterFirstInteraction, true);
    };

    const playMusic = async (useMutedAutoplay = false) => {
      if (shouldStopAutoPlayRef.current || isTryingToPlayRef.current) return;

      isTryingToPlayRef.current = true;

      try {
        audio.volume = DEFAULT_VOLUME;
        audio.muted = useMutedAutoplay;

        await audio.play();

        if (useMutedAutoplay) {
          window.setTimeout(() => {
            if (!shouldStopAutoPlayRef.current) {
              audio.muted = false;
              audio.volume = DEFAULT_VOLUME;
            }
          }, 250);
        }

        setIsPlaying(true);
        setIsBlocked(false);
        removeInteractionListeners();
      } catch {
        audio.muted = false;
        setIsPlaying(false);
        setIsBlocked(true);
      } finally {
        isTryingToPlayRef.current = false;
      }
    };

    function playAfterFirstInteraction() {
      playMusic(false);
    }

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
      setIsBlocked(false);
      removeInteractionListeners();
    };

    const handleFadeOut = (event: Event) => {
      const fadeEvent = event as MusicFadeOutEvent;
      const duration = fadeEvent.detail?.duration ?? 2500;

      shouldStopAutoPlayRef.current = true;
      removeInteractionListeners();
      clearFadeInterval();

      if (audio.paused) {
        window.dispatchEvent(new CustomEvent("birthday-music-fade-out-done"));
        return;
      }

      const startVolume = audio.volume || DEFAULT_VOLUME;
      const steps = 30;
      const intervalTime = duration / steps;
      let currentStep = 0;

      fadeIntervalRef.current = window.setInterval(() => {
        currentStep += 1;

        const progress = currentStep / steps;
        audio.volume = Math.max(0, startVolume * (1 - progress));

        if (currentStep >= steps) {
          clearFadeInterval();

          audio.pause();
          audio.muted = false;
          audio.volume = DEFAULT_VOLUME;

          setIsPlaying(false);
          window.dispatchEvent(new CustomEvent("birthday-music-fade-out-done"));
        }
      }, intervalTime);
    };

    audio.addEventListener("error", handleError);
    window.addEventListener("birthday-music-fade-out", handleFadeOut);

    window.addEventListener("pointerdown", playAfterFirstInteraction, true);
    window.addEventListener("click", playAfterFirstInteraction, true);
    window.addEventListener("touchstart", playAfterFirstInteraction, true);
    window.addEventListener("keydown", playAfterFirstInteraction, true);
    window.addEventListener("scroll", playAfterFirstInteraction, true);

    // Attempt 1: autoplay normal. Browser may block this.
    playMusic(false);

    // Attempt 2: muted autoplay trick. Some browsers allow this, then we unmute shortly after.
    const mutedAutoplayTimer = window.setTimeout(() => {
      if (audio.paused && !shouldStopAutoPlayRef.current) {
        playMusic(true);
      }
    }, 450);

    return () => {
      window.clearTimeout(mutedAutoplayTimer);
      removeInteractionListeners();
      clearFadeInterval();

      audio.removeEventListener("error", handleError);
      window.removeEventListener("birthday-music-fade-out", handleFadeOut);

      audio.pause();
      audio.src = "";

      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying && !audioRef.current.paused) {
      shouldStopAutoPlayRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      shouldStopAutoPlayRef.current = false;
      audioRef.current.muted = false;
      audioRef.current.volume = DEFAULT_VOLUME;

      await audioRef.current.play();

      setIsPlaying(true);
      setIsBlocked(false);
    } catch {
      setIsBlocked(true);
    }
  };

  return (
    <button
      type="button"
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
