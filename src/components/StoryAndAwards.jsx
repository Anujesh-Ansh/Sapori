import React, { useState } from "react";
import { Award, Star, Quote, ChevronRight, ShieldCheck, Flame, Wine, Compass } from "lucide-react";

export default function StoryAndAwards({ story, chef, awards }) {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <section id="story" className="py-24 px-6 md:px-16 max-w-6xl mx-auto border-t border-white/10 relative">
      
      {/* SECTION 2A: OUR STORY INTRO */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <p className="text-xs font-mono text-[#C8A97E] tracking-[0.35em] uppercase">
          [ 02 // OUR HERITAGE ]
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F4F0] leading-tight">
          {story.title}
        </h2>
        <div className="w-16 h-0.5 bg-[#C8A97E] mx-auto my-4 opacity-70" />
        <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
          {story.narrative[0]}
        </p>
      </div>

      {/* STORY HIGHLIGHT METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 text-center">
        {story.stats.map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-[#181818]/60 border border-white/10 hover:border-[#C8A97E]/40 transition-colors"
          >
            <div className="text-xl sm:text-2xl font-serif text-[#C8A97E] mb-1">{stat.value}</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* SECTION 2B: MEET THE EXECUTIVE CHEF (Matching Uploaded Wireframe 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-[#141414] border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-10 mb-24 shadow-2xl">
        
        {/* Left Column: Chef Portrait with Overlay Quote */}
        <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/10 min-h-[420px] flex flex-col justify-end">
          <img
            src={chef.photo}
            alt={chef.name}
            className="absolute inset-0 w-full h-full object-cover object-top filter contrast-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          
          <div className="relative z-10 p-6 sm:p-8 space-y-3">
            <Quote size={28} className="text-[#C8A97E] opacity-80" />
            <blockquote className="font-serif italic text-white/95 text-sm sm:text-base leading-relaxed">
              "{chef.quote}"
            </blockquote>
            <p className="font-mono text-xs uppercase tracking-widest text-[#C8A97E] pt-2">
              — Chef {chef.name}, {chef.origin}
            </p>
          </div>
        </div>

        {/* Right Column: Chef Biography & Stats */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2 sm:py-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C8A97E]">
              <span>❦</span>
              <span>Cooked by the best chefs</span>
              <span>❦</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif text-white">
              Meet {chef.name}
            </h3>

            <p className="text-xs sm:text-sm font-mono text-[#C8A97E] tracking-widest uppercase">
              {chef.role} • {chef.origin}
            </p>

            <p className="text-sm text-white/70 leading-relaxed font-light">
              {chef.bio}
            </p>

            {showFullBio && (
              <p className="text-sm text-white/70 leading-relaxed font-light pt-2 animate-fadeIn border-t border-white/10">
                Alessandro works directly with artisanal suppliers in Modena, Parma, and Campania to fly in cold-extracted extra virgin olive oil, wild black Norcia truffles, and San Marzano DOP tomatoes weekly. In New Delhi, he combines these Italian treasures with organic seasonal harvests to create a culinary bridge between continents.
              </p>
            )}

            <div>
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase py-2 px-5 rounded border border-white/20 hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors"
              >
                <span>{showFullBio ? "VIEW LESS" : "VIEW MORE"}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Wireframe 3 Stat Cards: 10+ Years of Experience & 20+ Awards */}
          <div className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-white/10">
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-white/5 text-center">
              <span className="text-2xl sm:text-3xl font-serif text-white block mb-0.5">{chef.experience}</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">Years of Experience</span>
            </div>
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-white/5 text-center">
              <span className="text-2xl sm:text-3xl font-serif text-[#C8A97E] block mb-0.5">{chef.awardsCount}</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">Awards & Accreditations</span>
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 2C: OUR AWARDS AND RECOGNITIONS (Matching Uploaded Wireframe 1) */}
      <div className="py-12 px-6 sm:px-10 rounded-2xl bg-[#141414]/90 border border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-mono text-[#C8A97E] tracking-[0.3em] uppercase">
            ACCOLADES & CRITICAL ACCLAIM
          </p>
          <h3 className="text-2xl sm:text-4xl font-serif text-white">
            Our Awards and Recognitions
          </h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
            Sapori d'Italia is proud to be the recipient of prestigious international honors. These accolades reflect our unwavering commitment to culinary excellence, unhurried innovation, and exceptional service. Each award is a testament to the passion and dedication of our team.
          </p>
        </div>

        {/* 8-Badge Grid (Michelin, Forbes, Les Grandes Tables, TripAdvisor, BBC, Yahoo, CNN, CNBC) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#181818] border border-white/5 hover:border-[#C8A97E]/50 flex flex-col justify-center items-center text-center group transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-[#C8A97E]/10 transition-colors">
                {idx === 0 && <span className="text-red-400 text-lg">❀</span>}
                {idx === 1 && <span className="text-[#C8A97E] text-base">⚜</span>}
                {idx === 2 && <Star size={18} className="text-[#C8A97E]" />}
                {idx === 3 && <Award size={18} className="text-emerald-400" />}
                {idx === 4 && <span className="font-mono font-bold text-white text-xs">BBC</span>}
                {idx === 5 && <span className="font-serif italic font-bold text-purple-300 text-xs">yahoo!</span>}
                {idx === 6 && <span className="font-mono font-black text-red-500 text-xs">CNN</span>}
                {idx === 7 && <span className="font-mono font-bold text-sky-400 text-xs">CNBC</span>}
              </div>
              <p className="font-serif text-sm sm:text-base text-white group-hover:text-[#C8A97E] transition-colors line-clamp-1">
                {award.name}
              </p>
              <p className="text-[10px] font-mono text-white/40 tracking-wider uppercase mt-1">
                {award.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Triad */}
      <div className="text-center pt-14">
        <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-white/50 uppercase">
          {story.triad}
        </p>
      </div>

    </section>
  );
}
