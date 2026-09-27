import React from "react";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero({ brand, onReserve, onExploreMenu }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between items-center pt-28 pb-12 px-4 sm:px-6 text-center overflow-hidden bg-[#FBF9F5]">
      
      {/* Guaranteed Symmetrical Centering */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-3.5 pt-2 z-10">
        
        {/* Positioning Pill from Business Model */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B86B35]/30 bg-white/90 shadow-2xs text-[11px] font-mono tracking-[0.3em] text-[#B86B35] uppercase">
          <Sparkles size={11} className="text-[#B86B35]" />
          <span>{brand.positioning}</span>
        </div>

        {/* Primary Restaurant Name Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#2B1B17] font-normal tracking-tight leading-[1.05] text-center w-full">
          {brand.name}
        </h1>

        {/* Official Tagline from PDF Page 1 & 2 */}
        <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-[#B86B35] font-light max-w-2xl mx-auto text-center">
          "{brand.tagline}"
        </p>

        <p className="text-xs sm:text-sm font-mono text-[#7E6B60] tracking-[0.25em] uppercase text-center">
          Connaught Place, New Delhi • Wood-Fired Hearth & Handmade Pasta
        </p>
      </div>

      {/* Hero Photography - Locally Cached Fast-Load Image */}
      <div className="w-full max-w-5xl my-6 relative z-10 px-2 sm:px-4 mx-auto">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-3xl border border-[#EAE1D5] shadow-md bg-white">
          <img
            src="/images/hero_dining.jpg"
            alt="Sapori d'Italia Intimate Fine Dining in Connaught Place"
            loading="eager"
            className="w-full h-full object-cover filter contrast-[103%]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/65 via-transparent to-transparent pointer-events-none" />

          {/* Floating Subtle Caption */}
          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 text-left font-mono text-[10px] sm:text-xs text-white/90 tracking-widest uppercase">
            <span className="text-[#DFC2A5] font-semibold">HERITAGE ATRIUM // CONNAUGHT PLACE</span>
            <p className="text-white font-serif normal-case italic text-sm sm:text-base">Warm, rustic-elegant interiors inspired by the Italian countryside</p>
          </div>
        </div>

        {/* Quick Credibility Triad from Business Proposal Page 2 */}
        <div className="mt-5 pt-4 border-t border-[#EAE1D5] flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-center text-xs font-mono text-[#5C4A3E]">
          <span>3,200 SQ. FT. SPACE</span>
          <span className="text-[#C88A58]">•</span>
          <span>80 COVERS</span>
          <span className="text-[#C88A58]">•</span>
          <span>450°C WOOD-FIRED HEARTH</span>
          <span className="text-[#C88A58]">•</span>
          <span>OPEN 12 PM – MIDNIGHT</span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="space-y-3 z-10 pt-1 mx-auto flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onReserve}
            className="w-full sm:w-auto font-mono text-xs sm:text-sm tracking-[0.2em] uppercase py-3 px-8 bg-[#B86B35] hover:bg-[#8F4918] text-white font-semibold rounded-full shadow-sm transition-all duration-200"
          >
            [ RESERVE A TABLE ]
          </button>
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto font-mono text-xs sm:text-sm tracking-[0.2em] uppercase py-3 px-8 border border-[#B86B35] text-[#B86B35] hover:bg-[#B86B35]/10 rounded-full transition-all duration-200 bg-white"
          >
            [ VIEW OUR MENU ]
          </button>
        </div>

        {/* Scroll hint */}
        <div
          className="pt-2 flex justify-center text-[#8C7769] hover:text-[#B86B35] cursor-pointer"
          onClick={onExploreMenu}
        >
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </div>

    </section>
  );
}
