import React, { useEffect, useRef, useState } from "react";
import bgAudio from "./assets/Sounds/bg.mp3";

const BgSound = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(bgAudio);
    audio.loop = true;
    audioRef.current = audio;

    const unlockAudio = () => {
      setAudioReady(true);
      document.removeEventListener("click", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio || !audioReady) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(err => console.warn("Audio play error:", err));
    }
  };

  return (
    <button
      onClick={toggleSound}
      aria-label={isPlaying ? "Pause Background Sound" : "Play Background Sound"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "white",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "24px",
        width: "24px",
        padding: "0",
        margin: "0.5rem auto",
        outline: "none",
        boxShadow: "none"
      }}
      onFocus={(e) => e.target.style.outline = "none"}
    >
      {isPlaying ? "❚❚" : "▶"}
    </button>
  );
};

export default BgSound;
