import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef(null);

  const playGuitarNote = (ctx, freq, time, duration = 1.4, volume = 0.16) => {
    try {
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
    if (!isPlaying) {
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
        console.error("Audio activation failed:", err);
      }
    } else {
      isPlayingRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    // Fixed width (w-[140px]) guarantees the button NEVER resizes or shifts the header
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute Italian Ambiance" : "Play Gentle Italian Acoustic Ambiance"}
      className={`w-[140px] h-[34px] flex items-center justify-center gap-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase transition-colors duration-200 shadow-xs shrink-0 select-none ${
        isPlaying
          ? "bg-[#B86B35] text-white border-[#B86B35]"
          : "bg-white text-[#2B1B17] border-[#EAE1D5] hover:border-[#B86B35] hover:text-[#B86B35]"
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 size={13} className="text-white shrink-0" />
          <span className="font-semibold">AMBIANCE: ON</span>
        </>
      ) : (
        <>
          <VolumeX size={13} className="text-[#8C7769] shrink-0" />
          <span className="text-[#5C4A3E]">AMBIANCE: OFF</span>
        </>
      )}
    </button>
  );
}
