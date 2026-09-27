import React from "react";
import { Wine, Sparkles } from "lucide-react";

export default function TheExperience({ onReserve }) {
  return (
    <section
      id="experience"
      className="py-20 px-6 md:px-16 max-w-6xl mx-auto border-t border-[#EAE1D5] bg-[#FBF9F5]"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
        <p className="text-xs font-mono text-[#B86B35] tracking-[0.3em] uppercase font-semibold">
          [ 04 // THE SPACE & CELLAR ]
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#2B1B17] leading-tight">
          Crafted with Warmth, Served with Elegance
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#7E6B60] tracking-wider pt-1">
          80 Covers • Dual Valoriani Hearths • 140+ Curated Italian Wines
        </p>
      </div>

      {/* Ambiance Photo Showcase */}
      <div className="relative aspect-[16/8] sm:aspect-[21/9] overflow-hidden rounded-3xl border border-[#EAE1D5] mb-10 shadow-sm bg-white group">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
          alt="Sapori d'Italia Warm Ambiance"
          className="w-full h-full object-cover filter contrast-[103%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/75 via-transparent to-transparent" />
        
        <div className="absolute bottom-5 left-6 sm:bottom-8 sm:left-10 text-white">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#DFC2A5] uppercase block mb-1">
            HERITAGE DINING HALL // CONNAUGHT PLACE
          </span>
          <p className="font-serif text-lg sm:text-2xl font-light">
            Vaulted colonial arches, warm acoustic lighting, and unhurried hospitality
          </p>
        </div>
      </div>

      {/* 3 Experience Highlights from Business Proposal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="p-6 rounded-2xl bg-white border border-[#EAE1D5] shadow-xs space-y-2">
          <span className="font-mono text-xs text-[#B86B35] tracking-widest block font-semibold">01 // THE SPACE</span>
          <h4 className="font-serif text-xl text-[#2B1B17]">3,200 sq. ft. Heritage</h4>
          <p className="text-xs text-[#5C4A3E] font-light leading-relaxed">
            Spacious, airy 80-cover seating designed with rustic Italian terracotta tiles, soft linen, and private dining alcoves.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE1D5] shadow-xs space-y-2">
          <span className="font-mono text-xs text-[#B86B35] tracking-widest block font-semibold">02 // WOOD-FIRED HEARTH</span>
          <h4 className="font-serif text-xl text-[#2B1B17]">450°C Clay Oven</h4>
          <p className="text-xs text-[#5C4A3E] font-light leading-relaxed">
            Authentic Valoriani clay ovens burning seasoned wood for blistered Neapolitan crusts and roasted Parmigiana.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE1D5] shadow-xs space-y-2">
          <span className="font-mono text-xs text-[#B86B35] tracking-widest block font-semibold">03 // IL CELLAR</span>
          <h4 className="font-serif text-xl text-[#2B1B17]">Curated Italian Vini</h4>
          <p className="text-xs text-[#5C4A3E] font-light leading-relaxed">
            Featuring Castello Banfi Le Rime, Civ & Civ Lambrusco, Principesco, Negronis, and classic Italian aperitivos.
          </p>
        </div>
      </div>

    </section>
  );
}
