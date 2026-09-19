import { useEffect, useState } from "react";
import "./VideoIntroPage.css";

interface VideoIntroPageProps {
  onNext?: () => void;
}

type VideoStep = "intro-text" | "main-video" | "friends-text" | "friends-video";

const introTexts: string[] = [
  "One more thing...",
  "Kalau suatu hari nanti kita lupa seberapa jauhnya kita sudah berjalan...",
  "Semoga video ini bisa mengingatkan kita...",
  "Betapa kerasnya usaha kita untuk memperjuangkan hubungan ini...",
  "Apapun yang terjadi, aku harap kita selalu mengusahakan semuanya bersama...",
  "This is for you, my love.",
];

const FRIENDS_INTRO_TEXT =
  "Gimana videonyaa? lucu kann hehe.\nSelanjutnya ada doa dari temen-temen baikmu sayang, enjoy~.";

const INITIAL_BLACK_SCREEN_DELAY = 2400;
const TEXT_DURATION = 3500;
const FRIENDS_TEXT_DURATION = 4500;

export default function VideoIntroPage({ onNext }: VideoIntroPageProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [showIntroText, setShowIntroText] = useState<boolean>(false);
  const [step, setStep] = useState<VideoStep>("intro-text");
  const [isMainVideoFinished, setIsMainVideoFinished] = useState<boolean>(false);
  const [isFriendsVideoFinished, setIsFriendsVideoFinished] = useState<boolean>(false);

  useEffect(() => {
    const blackScreenTimer = window.setTimeout(() => {
      setShowIntroText(true);
    }, INITIAL_BLACK_SCREEN_DELAY);

    return () => window.clearTimeout(blackScreenTimer);
  }, []);

  useEffect(() => {
    if (step !== "intro-text") return;
    if (!showIntroText) return;

    if (currentTextIndex < introTexts.length - 1) {
      const timer = window.setTimeout(() => {
        setCurrentTextIndex((prevIndex) => prevIndex + 1);
      }, TEXT_DURATION);

      return () => window.clearTimeout(timer);
    }

    const videoTimer = window.setTimeout(() => {
      setStep("main-video");
      setIsMainVideoFinished(false);
    }, TEXT_DURATION);

    return () => window.clearTimeout(videoTimer);
  }, [currentTextIndex, showIntroText, step]);

  useEffect(() => {
    if (step !== "friends-text") return;

    const friendsTextTimer = window.setTimeout(() => {
      setStep("friends-video");
      setIsFriendsVideoFinished(false);
    }, FRIENDS_TEXT_DURATION);

    return () => window.clearTimeout(friendsTextTimer);
  }, [step]);

  const handleMainVideoEnd = () => {
    setIsMainVideoFinished(true);
  };

  const handleContinueToFriendsVideo = () => {
    setStep("friends-text");
    setIsMainVideoFinished(false);
  };

  const handleFriendsVideoEnd = () => {
    setIsFriendsVideoFinished(true);
  };

  const handleFinishClick = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <section className="video-intro-page">
      {step === "intro-text" && (
        <div className="intro-text-wrapper">
          {showIntroText && (
            <p key={currentTextIndex} className="intro-text fade-text">
              {introTexts[currentTextIndex]}
            </p>
          )}
        </div>
      )}

      {step === "main-video" && (
        <div className="video-wrapper">
          <div className="video-frame">
            <img
              src="/video_page/decor.png"
              alt="Decor 1"
              className="video-decor video-decor-1"
            />
            <img
              src="/video_page/decor2.png"
              alt="Decor 2"
              className="video-decor video-decor-2"
            />
            <img
              src="/video_page/decor3.png"
              alt="Decor 3"
              className="video-decor video-decor-3"
            />

            <video
              className="memory-video"
              src="/videos/memory-video.mp4"
              controls
              autoPlay
              onEnded={handleMainVideoEnd}
            />
          </div>

          {isMainVideoFinished && (
            <button
              type="button"
              onClick={handleContinueToFriendsVideo}
              className="video-next-button"
            >
              Lanjut ke Video Teman-teman
            </button>
          )}
        </div>
      )}

      {step === "friends-text" && (
        <div className="intro-text-wrapper">
          <p className="intro-text fade-text whitespace-pre-line">{FRIENDS_INTRO_TEXT}</p>
        </div>
      )}

      {step === "friends-video" && (
        <div className="video-wrapper">
          <div className="video-frame">
            <img
              src="/video_page/decor.png"
              alt="Decor 1"
              className="video-decor video-decor-1"
            />
            <img
              src="/video_page/decor2.png"
              alt="Decor 2"
              className="video-decor video-decor-2"
            />
            <img
              src="/video_page/decor3.png"
              alt="Decor 3"
              className="video-decor video-decor-3"
            />

            <video
              className="memory-video"
              src="/videos/friends-video.mp4"
              controls
              autoPlay
              onEnded={handleFriendsVideoEnd}
            />
          </div>

          {isFriendsVideoFinished && (
            <button
              type="button"
              onClick={handleFinishClick}
              className="video-next-button"
            >
              Selesai
            </button>
          )}
        </div>
      )}
    </section>
  );
}
