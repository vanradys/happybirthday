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

export default function VideoIntroPage({ onNext }: VideoIntroPageProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  useEffect(() => {
    if (currentTextIndex < introTexts.length - 1) {
      const timer = window.setTimeout(() => {
        setCurrentTextIndex((prevIndex) => prevIndex + 1);
      }, 3500);

      return () => window.clearTimeout(timer);
    }

    const videoTimer = window.setTimeout(() => {
      setShowVideo(true);
    }, 3500);

    return () => window.clearTimeout(videoTimer);
  }, [currentTextIndex]);

  const handleVideoEnd = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <section className="video-intro-page">
      {!showVideo ? (
        <div className="intro-text-wrapper">
          <p key={currentTextIndex} className="intro-text fade-text">
            {introTexts[currentTextIndex]}
          </p>
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