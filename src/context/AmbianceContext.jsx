import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const AmbianceContext = createContext(null);

export function AmbianceProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElemRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef(null);

  // Fallback Synthesizer: Gentle Italian Acoustic Guitar
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

  const startSynthesizerFallback = async () => {
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

      startItalianMelody(ctx);
    } catch (err) {
      console.warn("Synthesizer fallback error:", err);
    }
  };

  const toggleSound = async () => {
    if (!isPlayingRef.current) {
      isPlayingRef.current = true;
      setIsPlaying(true);

      try {
        if (!audioElemRef.current) {
          const audio = new Audio("/audio/rosia.m4a");
          audio.loop = true;
          audio.volume = 0.5;
          
          audio.addEventListener("error", () => {
            console.warn("Audio file failed to load, switching to synthesizer fallback.");
            if (isPlayingRef.current) {
              startSynthesizerFallback();
            }
          });

          audioElemRef.current = audio;
        }

        const audio = audioElemRef.current;
        // Immediate play call preserves user-gesture authorization on iOS Safari and mobile Chrome
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Audio file play interrupted or not allowed, switching to synth fallback:", err);
            if (isPlayingRef.current) {
              startSynthesizerFallback();
            }
          });
        }
      } catch (err) {
        console.warn("Audio creation error:", err);
        if (isPlayingRef.current) {
          startSynthesizerFallback();
        }
      }
    } else {
      isPlayingRef.current = false;
      setIsPlaying(false);

      // Stop audio element if playing
      if (audioElemRef.current) {
        audioElemRef.current.pause();
        audioElemRef.current.currentTime = 0;
      }

      // Stop synth fallback if running
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (audioElemRef.current) {
        audioElemRef.current.pause();
      }
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
