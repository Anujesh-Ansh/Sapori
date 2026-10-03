import React from "react";
import { Crown, Sparkles, Gift, Award, ArrowRight, ShieldCheck, Ticket } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { LOYALTY_TIERS } from "../data/loyaltyData";

export default function LoyaltySection({
  onOpenAuth,
  onOpenLoyalty,
}) {
  const { isLoggedIn, user, tierInfo } = useAuth();

  return (
    <section
      id="loyalty"
      className="py-14 sm:py-20 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto border-t border-[#EAE1D5] bg-[#F7F2EC]/60 relative overflow-hidden"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 bg-[#B86B35]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#DFC2A5]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2 relative z-10">
        <p className="text-[11px] font-mono text-[#B86B35] tracking-[0.25em] uppercase font-semibold">
          [ 05 // CLUB PRIVILEGIO ]
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#2B1B17] leading-tight">
          Sapori Club di Fedeltà
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#7E6B60] tracking-wider max-w-lg mx-auto leading-relaxed">
          Our prestigious loyalty program crafted for Italian culinary connoisseurs. Earn Sapori Punti on every visit, reserve wines, and private chef's tables.
        </p>
      </div>

      {/* Current Member Banner (if logged in or in guest mode) */}
      {isLoggedIn && (
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#2B1B17] to-[#3D251D] text-white shadow-lg border border-[#DFCBB9]/30 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#B86B35]/20 border border-[#B86B35] flex items-center justify-center text-[#DFC2A5] shrink-0">
              <Crown size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-serif text-lg sm:text-xl font-bold">
                  {user.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#B86B35] text-white uppercase">
                  {tierInfo.badgeLabel}
                </span>
              </div>
              <span className="text-xs font-mono text-[#DFC2A5] mt-0.5 block">
                {user.points?.toLocaleString()} Sapori Punti Available • {user.rewards?.length || 0} Vouchers Active
              </span>
            </div>
          </div>

          <button
            onClick={onOpenLoyalty}
            className="py-2.5 px-6 rounded-full bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            Access My Privilegio Card & Vouchers →
          </button>
        </div>
      )}

      {/* 3 Tier Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {Object.values(LOYALTY_TIERS).map((tier) => {
          const isUserTier = isLoggedIn && user.tier === tier.id;

          return (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between space-y-6 ${
                isUserTier
                  ? "bg-white border-2 border-[#B86B35] shadow-lg -translate-y-1"
                  : "bg-white/80 hover:bg-white border border-[#EAE1D5] hover:border-[#DFC8B2] shadow-2xs hover:shadow-sm"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#B86B35] uppercase font-semibold">
                      {tier.multiplier} POINT MULTIPLIER
                    </span>
                    <h3 className="font-serif text-2xl text-[#2B1B17] font-semibold mt-0.5">
                      {tier.name}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${tier.badgeBg} ${tier.badgeText} ${tier.badgeBorder}`}
                  >
                    {tier.badgeLabel}
                  </span>
                </div>

                <div className="py-2 border-y border-[#F5EFEB] font-mono text-xs text-[#5C4A3E]">
                  <span className="text-[#8C7769] block text-[10px] uppercase tracking-wider">Qualification</span>
                  <span className="font-bold text-[#2B1B17]">
                    {tier.minPoints === 0 ? "Complimentary upon Joining" : `${tier.minPoints.toLocaleString()}+ Sapori Punti`}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7769] block font-semibold">
                    Privileged Perks:
                  </span>
                  <ul className="space-y-2 text-xs text-[#5C4A3E]">
                    {tier.perks.slice(0, 4).map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles size={12} className="text-[#B86B35] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                {isLoggedIn ? (
                  <button
                    onClick={onOpenLoyalty}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#EAE1D5] hover:border-[#B86B35] hover:bg-[#FBF9F5] text-[#2B1B17] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{isUserTier ? "Current Active Tier" : "View Perks"}</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={onOpenAuth}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2B1B17] hover:bg-[#B86B35] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Join or Guest Login</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-12 p-6 rounded-3xl bg-white border border-[#EAE1D5] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#B86B35] shrink-0">
            <Gift size={22} />
          </div>
          <div>
            <h4 className="font-serif text-lg text-[#2B1B17] font-semibold">
              Instant 500 Welcome Bonus Punti on Enrollment
            </h4>
            <p className="text-xs text-[#7E6B60] font-light">
              Log in with email or continue as Guest to immediately access your rewards wallet and table settings.
            </p>
          </div>
        </div>

        <div className="flex gap-2.5 shrink-0">
          {!isLoggedIn ? (
            <>
              <button
                onClick={onOpenAuth}
                className="py-2.5 px-5 rounded-full bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xs cursor-pointer"
              >
                Join Club Privilegio
              </button>
              <button
                onClick={onOpenAuth}
                className="py-2.5 px-5 rounded-full border border-[#DFCBB9] hover:bg-[#FBF9F5] text-[#2B1B17] font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Guest Login
              </button>
            </>
          ) : (
            <button
              onClick={onOpenLoyalty}
              className="py-2.5 px-6 rounded-full bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xs cursor-pointer"
            >
              Open Rewards Wallet
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
