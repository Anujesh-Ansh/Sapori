import React from "react";
import { Sparkles, Calendar, Utensils } from "lucide-react";

export default function Hero({ brand, onReserve, onExploreMenu }) {
  return (
    <section className="relative flex flex-col items-center pt-24 pb-8 px-4 sm:px-6 text-center overflow-hidden bg-[#FBF9F5]">
      
      {/* Symmetrical Compact Brand Heading */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-2 z-10">
        
        {/* Positioning Pill from Business Model */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#B86B35]/30 bg-white/90 shadow-2xs text-[10px] font-mono tracking-[0.25em] text-[#B86B35] uppercase">
          <Sparkles size={10} className="text-[#B86B35]" />
          <span>{brand.positioning}</span>
        </div>

        {/* Primary Restaurant Name Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#2B1B17] font-normal tracking-tight leading-none text-center">
          {brand.name}
        </h1>

        {/* Official Tagline from PDF Page 1 & 2 */}
        <p className="text-base sm:text-xl font-serif italic text-[#B86B35] font-light max-w-xl mx-auto text-center">
          "{brand.tagline}"
        </p>

        <p className="text-[11px] sm:text-xs font-mono text-[#7E6B60] tracking-[0.2em] uppercase text-center">
          Connaught Place, New Delhi • Wood-Fired Hearth & Handmade Pasta
        </p>
      </div>

      {/* Hero Showcase Photography */}
      <div className="w-full max-w-5xl my-4 relative z-10 px-2 sm:px-4 mx-auto">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl border border-[#EAE1D5] shadow-md bg-white">
          <img
            src="/images/hero_dining.jpg"
            alt="Sapori d'Italia Intimate Fine Dining in Connaught Place"
            loading="eager"
            className="w-full h-full object-cover filter contrast-[103%]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/75 via-transparent to-transparent pointer-events-none" />

          {/* Overlay Content within Hero Image */}
          <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-left">
            <div className="font-mono text-[10px] sm:text-xs text-white/90 tracking-widest uppercase">
              <span className="text-[#DFC2A5] font-semibold block">HERITAGE ATRIUM // CONNAUGHT PLACE</span>
              <p className="text-white font-serif normal-case italic text-sm sm:text-base">
                Warm, rustic-elegant interiors inspired by the Italian countryside
              </p>
            </div>

            {/* Quick Action Buttons on Desktop */}
            <div className="flex gap-2">
              <button
                onClick={onReserve}
                className="font-mono text-[11px] tracking-wider uppercase py-2 px-5 bg-[#B86B35] hover:bg-[#8F4918] text-white font-semibold rounded-full shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <Calendar size={12} />
                <span>Reserve Table</span>
              </button>
              <button
                onClick={onExploreMenu}
                className="font-mono text-[11px] tracking-wider uppercase py-2 px-5 bg-white/90 hover:bg-white text-[#2B1B17] font-semibold rounded-full shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <Utensils size={12} />
                <span>View Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Compact Credibility Triad directly under image */}
        <div className="mt-3 pt-2.5 border-t border-[#EAE1D5] flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-center text-[11px] font-mono text-[#5C4A3E]">
          <span>3,200 SQ. FT. SPACE</span>
          <span className="text-[#C88A58]">•</span>
          <span>80 COVERS</span>
          <span className="text-[#C88A58]">•</span>
          <span>450°C WOOD-FIRED HEARTH</span>
          <span className="text-[#C88A58]">•</span>
          <span>OPEN 12 PM – MIDNIGHT</span>
        </div>
      </div>

    </section>
  );
}
