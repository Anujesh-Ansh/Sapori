import React, { useState, useEffect } from "react";
import { Menu as MenuIcon, X, Sparkles } from "lucide-react";
import AmbientSoundToggle from "./AmbientSoundToggle";

export default function Header({ brand, onNavigate, onOpenAiConcierge }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EAE1D5] py-3 shadow-xs"
            : "bg-[#FBF9F5]/90 backdrop-blur-sm py-4 border-b border-[#EAE1D5]/60"
        } px-4 sm:px-8 md:px-12 text-xs tracking-widest font-mono uppercase`}
      >
        <div className="relative w-full flex items-center justify-between min-h-[40px]">
          
          {/* Left Navigation Brackets */}
          <div className="hidden md:flex items-center gap-5 z-10">
            <button
              onClick={() => handleNavClick("menu")}
              className="text-[#4A3B34] hover:text-[#B86B35] transition-colors focus:outline-none"
            >
              [ MENU ]
            </button>
            <button
              onClick={() => handleNavClick("signatures")}
              className="text-[#4A3B34] hover:text-[#B86B35] transition-colors focus:outline-none"
            >
              [ SIGNATURES ]
            </button>
            <button
              onClick={() => handleNavClick("experience")}
              className="text-[#4A3B34] hover:text-[#B86B35] transition-colors focus:outline-none"
            >
              [ EXPERIENCE ]
            </button>
          </div>

          {/* EXACT MATHEMATICAL SCREEN CENTER: Logo and Subtext */}
          {/* Using absolute positioning with left-1/2 and -translate-x-1/2 guarantees 
              it NEVER moves or offsets even by 1 pixel regardless of what changes on left or right */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer group z-20 pointer-events-auto"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.16em] font-semibold text-[#2B1B17] group-hover:text-[#B86B35] transition-colors whitespace-nowrap block">
              {brand.name}
            </span>
            <span className="text-[9px] tracking-[0.28em] text-[#8C7769] block -mt-0.5 font-mono whitespace-nowrap">
              CONNAUGHT PLACE • NEW DELHI
            </span>
          </div>

          {/* Right Navigation & Controls (Ambiance + AI + Reserve) */}
          <div className="flex items-center gap-2.5 sm:gap-3 z-10 ml-auto">
            <AmbientSoundToggle />

            <button
              onClick={onOpenAiConcierge}
              className="hidden lg:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#B86B35]/10 text-[#B86B35] hover:bg-[#B86B35] hover:text-white border border-[#B86B35]/30 transition-all font-mono text-[11px]"
            >
              <Sparkles size={12} />
              <span>AI CONCIERGE</span>
            </button>

            <button
              onClick={() => handleNavClick("reserve")}
              className="hidden sm:inline-block py-1.5 px-4 rounded-full bg-[#B86B35] text-white hover:bg-[#8F4918] transition-all font-mono tracking-widest text-[11px] font-semibold shadow-xs"
            >
              [ RESERVE ]
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2B1B17] hover:text-[#B86B35]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#FBF9F5]/98 backdrop-blur-xl md:hidden flex flex-col justify-center items-center gap-6 font-mono text-sm tracking-widest uppercase p-6 animate-fadeIn">
          <div className="text-center mb-4">
            <span className="font-serif text-2xl font-bold text-[#2B1B17] block">
              {brand.name}
            </span>
            <span className="text-xs text-[#8C7769] tracking-widest">
              CONNAUGHT PLACE, NEW DELHI
            </span>
          </div>

          <button
            onClick={() => handleNavClick("menu")}
            className="text-base py-2 hover:text-[#B86B35] text-[#2B1B17] transition-colors"
          >
            [ EDITORIAL MENU ]
          </button>
          <button
            onClick={() => handleNavClick("signatures")}
            className="text-base py-2 hover:text-[#B86B35] text-[#2B1B17] transition-colors"
          >
            [ SIGNATURE DISHES ]
          </button>
          <button
            onClick={() => handleNavClick("experience")}
            className="text-base py-2 hover:text-[#B86B35] text-[#2B1B17] transition-colors"
          >
            [ THE EXPERIENCE ]
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAiConcierge();
            }}
            className="text-base py-2 text-[#B86B35] flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            <span>[ AI PALATE CONCIERGE ]</span>
          </button>
          <button
            onClick={() => handleNavClick("chef-awards")}
            className="text-base py-2 hover:text-[#B86B35] text-[#2B1B17] transition-colors"
          >
            [ CHEF & AWARDS ]
          </button>
          <button
            onClick={() => handleNavClick("reserve")}
            className="mt-2 py-3 px-8 bg-[#B86B35] text-white hover:bg-[#8F4918] transition-all rounded-full font-semibold"
          >
            [ RESERVE A TABLE ]
          </button>
        </div>
      )}
    </>
  );
}
