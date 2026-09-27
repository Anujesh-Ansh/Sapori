import React from "react";
import { Wine, Sparkles } from "lucide-react";

export default function TheExperience({ onReserve }) {
  return (
    <section
      id="experience"
      className="py-10 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto border-t border-[#EAE1D5] bg-[#FBF9F5]"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
        <p className="text-[11px] font-mono text-[#B86B35] tracking-[0.25em] uppercase font-semibold">
          [ 04 // THE SPACE & CELLAR ]
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#2B1B17] leading-snug">
          Crafted with Warmth, Served with Elegance
        </h2>
        <p className="text-xs font-mono text-[#7E6B60] tracking-wider">
          80 Covers • Dual Valoriani Hearths • 140+ Curated Italian Wines
        </p>
      </div>

      {/* Ambiance Photo Showcase */}
      <div className="relative aspect-[16/8] sm:aspect-[21/9] overflow-hidden rounded-2xl border border-[#EAE1D5] mb-6 shadow-xs bg-white group">
        <img
          src="/images/interior.jpg"
          alt="Sapori d'Italia Warm Ambiance"
          className="w-full h-full object-cover filter contrast-[103%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/75 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8 text-white">
          <span className="text-[10px] font-mono tracking-widest text-[#DFC2A5] uppercase block">
            HERITAGE DINING HALL // CONNAUGHT PLACE
          </span>
          <p className="font-serif text-base sm:text-xl font-light">
            Vaulted colonial arches, warm acoustic lighting, and unhurried hospitality
          </p>
        </div>
      </div>

      {/* 3 Experience Highlights from Business Proposal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4.5 rounded-xl bg-white border border-[#EAE1D5] shadow-2xs space-y-1.5">
          <span className="font-mono text-[10px] text-[#B86B35] tracking-widest block font-semibold">01 // THE SPACE</span>
          <h4 className="font-serif text-lg text-[#2B1B17]">3,200 sq. ft. Heritage</h4>
          <p className="text-xs text-[#5C4A3E] font-light leading-relaxed">
            Spacious 80-cover seating designed with rustic Italian terracotta tiles, soft linen, and private dining alcoves.
          </p>
        </div>

        <div className="p-4.5 rounded-xl bg-white border border-[#EAE1D5] shadow-2xs space-y-1.5">
          <span className="font-mono text-[10px] text-[#B86B35] tracking-widest block font-semibold">02 // WOOD-FIRED HEARTH</span>
          <h4 className="font-serif text-lg text-[#2B1B17]">450°C Clay Oven</h4>
          <p className="text-xs text-[#5C4A3E] font-light leading-relaxed">
            Authentic Valoriani clay ovens burning seasoned wood for blistered Neapolitan crusts and roasted Parmigiana.
          </p>
        </div>

        <div className="p-4.5 rounded-xl bg-white border border-[#EAE1D5] shadow-2xs space-y-1.5">
          <span className="font-mono text-[10px] text-[#B86B35] tracking-widest block font-semibold">03 // IL CELLAR</span>
          <h4 className="font-serif text-lg text-[#2B1B17]">Curated Italian Vini</h4>
          <p className="text-xs text-[#5C4A3E] font-light leading-relaxed">
            Featuring Castello Banfi Le Rime, Civ & Civ Lambrusco, Principesco, Negronis, and classic Italian aperitivos.
          </p>
        </div>
      </div>

    </section>
  );
}
