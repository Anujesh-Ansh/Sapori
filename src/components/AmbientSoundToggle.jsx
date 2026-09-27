import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAmbiance } from "../context/AmbianceContext";

export default function AmbientSoundToggle() {
  const { isPlaying, toggleSound } = useAmbiance();

  return (
    // Fixed width (w-[140px]) guarantees the button NEVER resizes or shifts the header
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute Italian Ambiance" : "Play Gentle Italian Acoustic Ambiance"}
      className={`w-[140px] h-[34px] flex items-center justify-center gap-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase transition-colors duration-200 shadow-xs shrink-0 select-none cursor-pointer ${
        isPlaying
          ? "bg-[#B86B35] text-white border-[#B86B35]"
          : "bg-white text-[#2B1B17] border-[#EAE1D5] hover:border-[#B86B35] hover:text-[#B86B35]"
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 size={13} className="text-white shrink-0 animate-pulse" />
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
