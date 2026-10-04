import React, { useState, useEffect } from "react";
import { Menu as MenuIcon, X, Sparkles, Volume2, Crown, Settings, Calendar } from "lucide-react";
import AmbientSoundToggle from "./AmbientSoundToggle";
import { useAmbiance } from "../context/AmbianceContext";
import { useAuth } from "../context/AuthContext";

export default function Header({
  brand,
  onNavigate,
  onOpenAiConcierge,
  onOpenAuth,
  onOpenLoyalty,
  onOpenSettings,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isPlaying, toggleSound } = useAmbiance();
  const { user, isLoggedIn, tierInfo } = useAuth();

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
            ? "bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EAE1D5] py-2.5 sm:py-3 shadow-xs"
            : "bg-[#FBF9F5]/90 backdrop-blur-sm py-3.5 sm:py-4 border-b border-[#EAE1D5]/60"
        } px-4 sm:px-8 md:px-12 text-xs tracking-widest font-mono uppercase`}
      >
        <div className="relative w-full flex items-center justify-between min-h-[40px]">
          
          {/* Left Navigation Brackets - Desktop only */}
          <div className="hidden md:flex items-center gap-5 z-10">
            <button
              onClick={() => handleNavClick("menu")}
              className="text-[#4A3B34] hover:text-[#B86B35] transition-colors focus:outline-none cursor-pointer"
            >
              [ MENU ]
            </button>
            <button
              onClick={() => handleNavClick("signatures")}
              className="text-[#4A3B34] hover:text-[#B86B35] transition-colors focus:outline-none cursor-pointer"
            >
              [ SIGNATURES ]
            </button>
            <button
              onClick={() => handleNavClick("experience")}
              className="text-[#4A3B34] hover:text-[#B86B35] transition-colors focus:outline-none cursor-pointer"
            >
              [ EXPERIENCE ]
            </button>
            <button
              onClick={() => handleNavClick("chef-awards")}
              className="text-[#4A3B34] hover:text-[#B86B35] transition-colors focus:outline-none cursor-pointer"
            >
              [ MAESTRO ]
            </button>
          </div>

          {/* EXACT MATHEMATICAL SCREEN CENTER: Logo and Subtext */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer group z-20 pointer-events-auto"
          >
            <span className="font-serif text-lg sm:text-2xl tracking-[0.16em] font-semibold text-[#2B1B17] group-hover:text-[#B86B35] transition-colors whitespace-nowrap block">
              {brand.name}
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#8C7769] block -mt-0.5 font-mono whitespace-nowrap">
              CONNAUGHT PLACE • NEW DELHI
            </span>
          </div>

          {/* Right Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 z-10 ml-auto">
            {/* AMBIANCE TOGGLE */}
            <div className="hidden md:flex items-center">
              <AmbientSoundToggle />
            </div>

            {/* AI CONCIERGE BUTTON */}
            <button
              onClick={onOpenAiConcierge}
              className="hidden lg:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#B86B35]/10 text-[#B86B35] hover:bg-[#B86B35] hover:text-white border border-[#B86B35]/30 transition-all font-mono text-[11px] cursor-pointer"
            >
              <Sparkles size={12} />
              <span>AI CONCIERGE</span>
            </button>

            {/* CLUB MEMBERSHIP / GUEST AUTH ICON BUTTON */}
            {isLoggedIn ? (
              <button
                onClick={onOpenLoyalty}
                className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFF7ED] hover:bg-[#FED7AA] text-[#B86B35] border border-[#FED7AA] transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                title={`${user.name} • ${tierInfo?.badgeLabel} (${user.points?.toLocaleString()} PTS) • Club Privilegio`}
                aria-label="Club Privilegio Member Profile"
              >
                <Crown size={15} className="text-[#B86B35]" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#F7F2EC] text-[#2B1B17] hover:text-[#B86B35] border border-[#DFCBB9] transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                title="Club Privilegio • Member Privileges & Sign In"
                aria-label="Club Privilegio Sign In"
              >
                <Crown size={15} className="text-[#B86B35]" />
              </button>
            )}

            {/* RESERVE ICON BUTTON */}
            <button
              onClick={() => handleNavClick("reserve")}
              className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#B86B35] text-white hover:bg-[#8F4918] transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
              title="Reserve a Table"
              aria-label="Reserve a Table"
            >
              <Calendar size={15} />
            </button>

            {/* On mobile, if ambiance is playing, show a compact mute toggle button next to the hamburger icon */}
            {isPlaying && (
              <button
                onClick={toggleSound}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-[#B86B35] text-white shadow-xs cursor-pointer"
                title="Ambiance Playing - Tap to Mute"
                aria-label="Ambiance Playing - Tap to Mute"
              >
                <Volume2 size={14} className="animate-pulse" />
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#2B1B17] hover:text-[#B86B35] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FBF9F5]/98 backdrop-blur-xl md:hidden flex flex-col justify-center items-center gap-4 font-mono text-sm tracking-widest uppercase p-6 animate-fadeIn overflow-y-auto">
          
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-2 text-[#2B1B17] hover:text-[#B86B35]"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-1">
            <span className="font-serif text-2xl font-bold text-[#2B1B17] block">
              {brand.name}
            </span>
            <span className="text-[10px] text-[#8C7769] tracking-widest">
              CONNAUGHT PLACE, NEW DELHI
            </span>
          </div>

          {/* Member Card or Auth in Mobile Drawer */}
          {isLoggedIn ? (
            <div className="w-full max-w-xs p-3.5 rounded-2xl bg-white border border-[#DFC8B2] shadow-xs flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoyalty();
                }}
                className="flex items-center gap-2.5 text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#B86B35] border border-[#FED7AA] flex items-center justify-center shrink-0">
                  <Crown size={15} />
                </div>
                <div>
                  <span className="text-xs font-serif font-bold text-[#2B1B17] block leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#B86B35] block mt-1 font-semibold">
                    {user.points?.toLocaleString()} Sapori Punti
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="p-1.5 text-[#7E6B60] hover:text-[#2B1B17] cursor-pointer"
                title="Account Settings"
              >
                <Settings size={17} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full max-w-xs py-2.5 px-4 rounded-xl bg-[#2B1B17] text-white flex items-center justify-center gap-2 text-xs font-mono font-semibold shadow-xs"
            >
              <Crown size={14} className="text-[#DFC2A5]" />
              <span>[ CLUB PRIVILEGIO // SIGN IN ]</span>
            </button>
          )}

          {/* Ambiance Toggle Inside Mobile Side Menu */}
          <div className="py-2 flex flex-col items-center gap-1 border-y border-[#EAE1D5] w-full max-w-xs">
            <span className="text-[10px] font-mono text-[#8C7769] tracking-wider uppercase mb-1">
              RESTAURANT AMBIANCE
            </span>
            <AmbientSoundToggle />
          </div>

          <button
            onClick={() => handleNavClick("menu")}
            className="text-base py-1 hover:text-[#B86B35] text-[#2B1B17] transition-colors"
          >
            [ EDITORIAL MENU ]
          </button>
          <button
            onClick={() => handleNavClick("signatures")}
            className="text-base py-1 hover:text-[#B86B35] text-[#2B1B17] transition-colors"
          >
            [ SIGNATURE DISHES ]
          </button>
          <button
            onClick={() => handleNavClick("experience")}
            className="text-base py-1 hover:text-[#B86B35] text-[#2B1B17] transition-colors"
          >
            [ THE EXPERIENCE ]
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (isLoggedIn && onOpenLoyalty) {
                onOpenLoyalty();
              } else {
                handleNavClick("loyalty");
              }
            }}
            className="text-base py-1 text-[#B86B35] flex items-center gap-1.5"
          >
            <Crown size={15} />
            <span>[ CLUB PRIVILEGIO ]</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAiConcierge();
            }}
            className="text-base py-1 text-[#B86B35] flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            <span>[ AI PALATE CONCIERGE ]</span>
          </button>
          <button
            onClick={() => handleNavClick("chef-awards")}
            className="text-base py-1 hover:text-[#B86B35] text-[#2B1B17] transition-colors"
          >
            [ CHEF ]
          </button>
          <button
            onClick={() => handleNavClick("reserve")}
            className="mt-1 py-3 px-8 bg-[#B86B35] text-white hover:bg-[#8F4918] transition-all rounded-full font-semibold shadow-sm w-full max-w-xs"
          >
            [ RESERVE A TABLE ]
          </button>
        </div>
      )}
    </>
  );
}

