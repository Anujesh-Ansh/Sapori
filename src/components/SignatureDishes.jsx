import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import DietaryBadges, { VegSymbol, NonVegSymbol, EggSymbol, DietarySymbol } from "./DietaryBadges";

export default function SignatureDishes({ signatures, onSelectDish }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="signatures"
      className="py-10 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto border-t border-[#EAE1D5] bg-[#FBF9F5]"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
        <p className="text-[11px] font-mono text-[#B86B35] tracking-[0.25em] uppercase font-semibold">
          [ 03 // CHEF'S SIGNATURES ]
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#2B1B17] leading-snug">
          Our Signature Dishes
        </h2>
        <p className="text-xs font-mono text-[#7E6B60] tracking-wider">
          Discover the pinnacle of authentic Italian gastronomy
        </p>
      </div>

      {/* 3 Side-by-Side Cards (Layout of Wireframe 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {signatures.map((sig, idx) => {
          const isNonVeg = sig.tags?.includes("nonveg") || sig.diet === "Non-Veg";

          return (
            <div
              key={sig.id}
              onClick={() => {
                setActiveIdx(idx);
                onSelectDish(sig);
              }}
              className="cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#EAE1D5] hover:border-[#B86B35] transition-all duration-200 group hover:-translate-y-1 shadow-xs hover:shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F5EFEB]">
                <img
                  src={sig.img}
                  alt={sig.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#2B1B17]/85 backdrop-blur-sm text-[9px] font-mono tracking-widest text-[#DFC2A5] px-2 py-0.5 rounded-full uppercase font-medium">
                  {sig.category}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <DietarySymbol dish={sig} />
                    <h4 className="font-serif text-lg text-[#2B1B17] group-hover:text-[#B86B35] transition-colors leading-snug truncate">
                      {sig.title}
                    </h4>
                  </div>
                  <DietaryBadges tags={sig.tags?.filter(t => t !== "veg" && t !== "nonveg")} />
                </div>

                <p className="text-xs text-[#5C4A3E] line-clamp-2 font-light leading-relaxed">
                  {sig.desc}
                </p>

              <div className="flex justify-between items-center pt-2.5 border-t border-[#EAE1D5]">
                <span className="font-mono text-sm font-semibold text-[#B86B35]">
                  {sig.price}
                </span>

                <div className="w-7 h-7 rounded-full border border-[#EAE1D5] group-hover:border-[#B86B35] group-hover:bg-[#B86B35] group-hover:text-white flex items-center justify-center text-[#7E6B60] transition-colors shadow-2xs">
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);
}
