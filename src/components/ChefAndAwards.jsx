import React from "react";
import { Star, Award, Quote } from "lucide-react";

export default function ChefAndAwards({ chef, awards }) {
  return (
    <section
      id="chef-awards"
      className="py-10 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto border-t border-[#EAE1D5] bg-[#FBF9F5]"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
        <p className="text-[11px] font-mono text-[#B86B35] tracking-[0.25em] uppercase font-semibold">
          [ 05 // MAESTRO & CRITICAL ACCLAIM ]
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#2B1B17] leading-snug">
          Culinary Leadership & Recognition
        </h2>
      </div>

      {/* Chef Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white border border-[#EAE1D5] rounded-2xl p-5 sm:p-7 mb-8 shadow-xs">
        
        {/* Left: Chef Portrait */}
        <div className="md:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F5EFEB] border border-[#EAE1D5]">
          <img
            src={chef.photo}
            alt={chef.name}
            className="w-full h-full object-cover object-top filter contrast-[102%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] font-mono tracking-widest text-[#DFC2A5] uppercase block">
              {chef.role}
            </span>
            <span className="font-serif text-lg sm:text-xl font-medium">
              Chef {chef.name}
            </span>
          </div>
        </div>

        {/* Right: Bio & Stats */}
        <div className="md:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B86B35] tracking-widest uppercase font-semibold">
            <span>❦</span>
            <span>Cooked by the best chefs</span>
            <span>❦</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#2B1B17]">
            Rooted in Italian Heritage
          </h3>

          <div className="p-3 rounded-xl bg-[#FBF9F5] border border-[#EAE1D5] space-y-1.5">
            <Quote size={16} className="text-[#B86B35] opacity-75" />
            <p className="font-serif italic text-[#4A3B34] text-xs sm:text-sm leading-relaxed">
              "{chef.quote}"
            </p>
          </div>

          <p className="text-xs text-[#7E6B60] leading-relaxed font-light">
            Born in Tuscany, Chef Alessandro brings over a decade of fine-dining experience across Italy and Asia. His kitchen at Sapori d'Italia pairs time-honored nonna techniques with certified Italian DOP ingredients flown in weekly to Connaught Place.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EAE1D5] text-center">
              <span className="text-xl font-serif text-[#2B1B17] font-semibold block">{chef.experience}</span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#8C7769]">Heritage Experience</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EAE1D5] text-center">
              <span className="text-xl font-serif text-[#B86B35] font-semibold block">{chef.awardsCount}</span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#8C7769]">Global Accreditations</span>
            </div>
          </div>
        </div>

      </div>

      {/* 8 Awards Grid */}
      {/* <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#EAE1D5] shadow-2xs">
        <p className="text-center text-[10px] font-mono text-[#8C7769] tracking-widest uppercase mb-4">
          HONORS & CRITICAL PRESS RECOGNITION
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {awards.map((award, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EAE1D5]/80 hover:border-[#B86B35] text-center transition-colors group"
            >
              <div className="w-6 h-6 rounded-full bg-white mx-auto flex items-center justify-center text-[#B86B35] mb-1.5 shadow-2xs border border-[#EAE1D5]">
                {i === 0 && <span className="text-red-500 text-xs">❀</span>}
                {i === 1 && <span className="text-[#B86B35] text-xs">⚜</span>}
                {i === 2 && <Star size={11} className="text-[#B86B35]" />}
                {i === 3 && <Award size={11} className="text-emerald-600" />}
                {i >= 4 && <span className="font-mono font-bold text-[9px] text-[#2B1B17]">PRESS</span>}
              </div>
              <h5 className="font-serif text-xs sm:text-sm text-[#2B1B17] group-hover:text-[#B86B35] transition-colors leading-tight">
                {award.name}
              </h5>
              <p className="text-[9px] font-mono text-[#8C7769] tracking-wider mt-0.5">
                {award.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div> */}

    </section>
  );
}
