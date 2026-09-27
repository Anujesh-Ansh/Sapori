import React, { useState } from "react";
import { Wine, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export default function VinoSection({ vino }) {
  const [showFullWineList, setShowFullWineList] = useState(false);

  return (
    <section
      id="vino"
      className="py-24 px-6 md:px-16 max-w-5xl mx-auto border-t border-white/10 text-center"
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto mb-12 space-y-3">
        <p className="text-xs font-mono text-[#C8A97E] tracking-[0.35em] uppercase">
          [ 06 // IL CELLAR ]
        </p>

        <h3 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
          {vino.tagline}
        </h3>

        <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed font-light pt-2">
          {vino.desc}
        </p>
      </div>

      {/* Single Bottle / Glass Editorial Visual with Sommelier Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto mb-12 bg-[#161616] p-6 sm:p-10 rounded-2xl border border-white/10">
        
        {/* Left: Solitary Wine Photography */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-56 sm:w-64 aspect-[3/4] overflow-hidden rounded-xl border border-white/15 shadow-2xl relative group">
            <img
              src={vino.featuredImg}
              alt="Italian Wine Curated Selection"
              loading="lazy"
              className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-[10px] font-mono tracking-widest text-[#C8A97E] px-2 py-0.5 rounded border border-[#C8A97E]/30">
              CASTELLO BANFI
            </div>
          </div>
        </div>

        {/* Right: Curated Tasting Feature Notes */}
        <div className="md:col-span-7 text-left space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C8A97E] tracking-widest uppercase">
            <Wine size={14} />
            <span>ESTATE RESERVE • MONTALCINO</span>
          </div>

          <h4 className="font-serif text-2xl sm:text-3xl text-white">
            Castello Banfi Brunello di Montalcino DOCG
          </h4>

          <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
            A benchmark of Tuscan winemaking. Matured for 24 months in French oak barriques, followed by deep cellar aging. Notes of dark plum, violet blossoms, pipe tobacco, and velvety structured tannins.
          </p>

          <div className="pt-2 flex items-center gap-6 font-mono text-xs">
            <div>
              <span className="text-white/40 block text-[10px] uppercase tracking-wider">Per Calice</span>
              <span className="text-[#C8A97E] font-medium text-sm">₹1,950</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-white/40 block text-[10px] uppercase tracking-wider">Bottiglia 750ml</span>
              <span className="text-[#C8A97E] font-medium text-sm">₹9,800</span>
            </div>
          </div>

          <div className="pt-3">
            <p className="text-[11px] font-mono text-white/40">
              *Full sommelier pairing available for each course of our tasting menu.
            </p>
          </div>
        </div>

      </div>

      {/* CTA Button */}
      <button
        onClick={() => setShowFullWineList(!showFullWineList)}
        className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase border border-white/25 py-2.5 px-8 rounded-full hover:border-[#C8A97E] hover:text-[#C8A97E] transition-all duration-300"
      >
        <span>{showFullWineList ? "[ COLLAPSE WINE LIST ]" : "[ VIEW WINE LIST ]"}</span>
        {showFullWineList ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Expandable Curated Wine Cellar List */}
      {showFullWineList && (
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#C8A97E]/30 text-left space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center border-b border-white/15 pb-3 text-xs font-mono text-white/50 tracking-widest uppercase">
            <span>LABEL // REGION // VINTAGE</span>
            <span>GLASS / BOTTLE</span>
          </div>

          <div className="space-y-5">
            {vino.selections.map((wine, i) => (
              <div
                key={i}
                className="p-3 rounded-lg hover:bg-white/5 transition-colors space-y-1.5"
              >
                <div className="flex justify-between items-baseline gap-2">
                  <div>
                    <span className="font-serif text-lg text-white block">
                      {wine.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#C8A97E] tracking-wider uppercase">
                      {wine.region} • {wine.vintage}
                    </span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-right shrink-0">
                    <span className="text-white/80">{wine.glass}</span>
                    <span className="text-white/30 mx-1.5">/</span>
                    <span className="text-[#C8A97E]">{wine.bottle}</span>
                  </div>
                </div>

                <p className="text-xs text-white/60 font-light italic">
                  {wine.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
