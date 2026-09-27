import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function SignatureDishes({ signatures, onSelectDish }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="signatures"
      className="py-20 px-6 md:px-16 max-w-6xl mx-auto border-t border-[#EAE1D5] bg-[#FBF9F5]"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
        <p className="text-xs font-mono text-[#B86B35] tracking-[0.3em] uppercase font-semibold">
          [ 03 // CHEF'S SIGNATURES ]
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#2B1B17] leading-tight">
          Our Signature Dishes
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#7E6B60] tracking-wider">
          Discover the pinnacle of authentic Italian gastronomy
        </p>
      </div>

      {/* 3 Side-by-Side Cards (Layout of Wireframe 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {signatures.map((sig, idx) => (
          <div
            key={sig.id}
            onClick={() => {
              setActiveIdx(idx);
              onSelectDish(sig);
            }}
            className="cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#EAE1D5] hover:border-[#B86B35] transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F5EFEB]">
              <img
                src={sig.img}
                alt={sig.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#2B1B17]/80 backdrop-blur-sm text-[10px] font-mono tracking-widest text-[#DFC2A5] px-2.5 py-0.5 rounded-full uppercase font-medium">
                {sig.category}
              </div>
            </div>

            <div className="p-5 space-y-2.5">
              <h4 className="font-serif text-xl text-[#2B1B17] group-hover:text-[#B86B35] transition-colors leading-snug">
                {sig.title}
              </h4>
              <p className="text-xs text-[#5C4A3E] line-clamp-2 font-light leading-relaxed">
                {sig.desc}
              </p>

              <div className="flex justify-between items-center pt-3 border-t border-[#EAE1D5]">
                <span className="font-mono text-base font-semibold text-[#B86B35]">
                  {sig.price}
                </span>

                <div className="w-8 h-8 rounded-full border border-[#EAE1D5] group-hover:border-[#B86B35] group-hover:bg-[#B86B35] group-hover:text-white flex items-center justify-center text-[#7E6B60] transition-colors shadow-2xs">
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
