import { useEffect, useState } from "react";
import "./VideoIntroPage.css";

interface VideoIntroPageProps {
  onNext?: () => void;
}

const introTexts: string[] = [
  "One more thing...",
  "Kalau suatu hari nanti kita lupa seberapa jauhnya kita sudah berjalan...",
  "Semoga video ini bisa mengingatkan kita lagi...",
  "Betapa kerasnya usaha kita untuk memperjuangkan hubungan ini...",
  "Apapun yang terjadi, aku harap kita selalu mengusahakan semuanya bersama...",
  "This is for you, my love",
];

const INITIAL_BLACK_SCREEN_DELAY = 2400;
const TEXT_DURATION = 3500;

export default function VideoIntroPage({ onNext }: VideoIntroPageProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [showIntroText, setShowIntroText] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  useEffect(() => {
    const blackScreenTimer = window.setTimeout(() => {
      setShowIntroText(true);
    }, INITIAL_BLACK_SCREEN_DELAY);

    return () => window.clearTimeout(blackScreenTimer);
  }, []);

  useEffect(() => {
    if (!showIntroText) return;

    if (currentTextIndex < introTexts.length - 1) {
      const timer = window.setTimeout(() => {
        setCurrentTextIndex((prevIndex) => prevIndex + 1);
      }, TEXT_DURATION);

      return () => window.clearTimeout(timer);
    }

    const videoTimer = window.setTimeout(() => {
      setShowVideo(true);
    }, TEXT_DURATION);

    return () => window.clearTimeout(videoTimer);
  }, [currentTextIndex, showIntroText]);

  const handleVideoEnd = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <section className="video-intro-page">
      {!showVideo ? (
        <div className="intro-text-wrapper">
          {showIntroText && (
            <p key={currentTextIndex} className="intro-text fade-text">
              {introTexts[currentTextIndex]}
            </p>
          )}
        </div>
      ) : (
        <div className="video-wrapper">
          <video
            className="memory-video"
            src="/videos/memory-video.mp4"
            controls
            autoPlay
            onEnded={handleVideoEnd}
          />
        </div>
      )}
    </section>
  );
}
