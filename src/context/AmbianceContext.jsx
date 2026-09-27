import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const AmbianceContext = createContext(null);

export function AmbianceProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef(null);

  const playGuitarNote = (ctx, freq, time, duration = 1.4, volume = 0.16) => {
    try {
      if (!ctx || ctx.state === "closed") return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, time);
      filter.frequency.exponentialRampToValueAtTime(350, time + duration);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      console.error(e);
    }
  };

  const startItalianMelody = (ctx) => {
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 440.00], // Am
      [174.61, 220.00, 261.63, 349.23], // F
      [196.00, 246.94, 293.66, 392.00], // G
    ];

    let chordIdx = 0;

    const playCycle = () => {
      if (!isPlayingRef.current || !ctx || ctx.state === "closed") return;
      const now = ctx.currentTime;
      const currentNotes = chords[chordIdx % chords.length];

      currentNotes.forEach((freq, noteIdx) => {
        playGuitarNote(ctx, freq, now + noteIdx * 0.42, 1.6, 0.16);
      });

      chordIdx++;
      timerRef.current = setTimeout(playCycle, 1900);
    };

    playCycle();
  };

  const toggleSound = async () => {
    if (!isPlayingRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        let ctx = audioCtxRef.current;
        if (!ctx || ctx.state === "closed") {
          ctx = new AudioContext();
          audioCtxRef.current = ctx;
        }

        if (ctx.state === "suspended") {
          await ctx.resume();
        }

        isPlayingRef.current = true;
        setIsPlaying(true);
        startItalianMelody(ctx);
      } catch (err) {
        console.error("Ambiance activation failed:", err);
      }
    } else {
      isPlayingRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  // Clean up only when the entire App unmounts (e.g. page close)
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <AmbianceContext.Provider value={{ isPlaying, toggleSound }}>
      {children}
    </AmbianceContext.Provider>
  );
}

export function useAmbiance() {
  const context = useContext(AmbianceContext);
  if (!context) {
    throw new Error("useAmbiance must be used within an AmbianceProvider");
  }
  return context;
}
