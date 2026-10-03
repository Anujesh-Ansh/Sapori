import React, { useState } from "react";
import { Crown, Sparkles, Gift, Award, ArrowRight, ShieldCheck, Ticket, Calculator, Coins } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { LOYALTY_TIERS } from "../data/loyaltyData";

export default function LoyaltySection({
  onOpenAuth,
  onOpenLoyalty,
}) {
  const { isLoggedIn, user, tierInfo, earnPointsFromBill } = useAuth();
  const [calcBill, setCalcBill] = useState(5400); // 2 covers average (~₹2,700/cover)
  const [calcSuccess, setCalcSuccess] = useState(null);

  const userRate = isLoggedIn
    ? (user.tier === "eccellenza" ? 0.20 : user.tier === "riserva" ? 0.15 : 0.10)
    : 0.10;
  const puntiEarned = Math.round(calcBill * userRate);

  const handleSimulateInPage = () => {
    if (!isLoggedIn) {
      onOpenAuth();
      return;
    }
    const res = earnPointsFromBill(calcBill);
    if (res.success) {
      setCalcSuccess(`Credited +${res.pointsEarned} Punti for bill of ₹${calcBill.toLocaleString()}!`);
      setTimeout(() => setCalcSuccess(null), 5000);
    }
  };

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
          [ 06 // CLUB PRIVILEGIO ]
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#2B1B17] leading-tight">
          Sapori Club Privilegio
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#7E6B60] tracking-wider max-w-lg mx-auto leading-relaxed">
          An exclusive members-only culinary society. Earn <strong>10% of your dining bill</strong> in Sapori Punti, unlock reserve Italian wines, and enjoy privileged table seating.
        </p>
      </div>

      {/* Current Member Banner (if logged in) */}
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
                {user.points?.toLocaleString()} Spendable Punti • {user.lifetimePoints?.toLocaleString() || user.points} Lifetime Tier Punti
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
                  <span className="text-[#8C7769] block text-[10px] uppercase tracking-wider">Qualification Requirement</span>
                  <span className="font-bold text-[#2B1B17]">
                    {tier.minPoints === 0 ? "Complimentary upon Enrollment" : `${tier.minPoints.toLocaleString()}+ Lifetime Punti`}
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
                    <span>{isUserTier ? "Current Active Tier" : "View Tier Details"}</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={onOpenAuth}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2B1B17] hover:bg-[#B86B35] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Enroll in Club Privilegio</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE 10% BILL POINTS CALCULATOR */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE1D5] shadow-xs relative z-10 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#F5EFEB]">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#B86B35]/10 border border-[#B86B35]/30 flex items-center justify-center text-[#B86B35]">
                <Calculator size={15} />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2B1B17] font-semibold">
                10% Dining Bill Points Calculator
              </h3>
            </div>
            <p className="text-xs font-mono text-[#7E6B60] mt-1">
              Estimate the Sapori Punti credited directly to your registered mobile (+91) after dining.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-[#8C7769] block">Average Cover: ₹2,700</span>
            <span className="font-mono text-xs font-semibold text-[#B86B35]">
              {isLoggedIn ? `${tierInfo.name} Rate (${Math.round(userRate * 100)}%)` : "Classico 10% Base Rate"}
            </span>
          </div>
        </div>

        {calcSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono animate-fadeIn flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
            <span>{calcSuccess}</span>
          </div>
        )}

        {/* Bill Slider & Presets */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8C7769] font-semibold">
              Expected Dining Bill:
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B17]">
              ₹{calcBill.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min="1000"
            max="20000"
            step="250"
            value={calcBill}
            onChange={(e) => setCalcBill(Number(e.target.value))}
            className="w-full h-2 bg-[#EFE9E2] rounded-lg appearance-none cursor-pointer accent-[#B86B35]"
          />

          {/* Quick Party Size Presets */}
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setCalcBill(2700)}
              className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                calcBill === 2700 ? "bg-[#B86B35] text-white border-[#B86B35]" : "bg-[#FBF9F5] border-[#EAE1D5] text-[#5C4A3E] hover:border-[#B86B35]"
              }`}
            >
              1 Cover (₹2,700)
            </button>
            <button
              type="button"
              onClick={() => setCalcBill(5400)}
              className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                calcBill === 5400 ? "bg-[#B86B35] text-white border-[#B86B35]" : "bg-[#FBF9F5] border-[#EAE1D5] text-[#5C4A3E] hover:border-[#B86B35]"
              }`}
            >
              Couple (₹5,400)
            </button>
            <button
              type="button"
              onClick={() => setCalcBill(8000)}
              className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                calcBill === 8000 ? "bg-[#B86B35] text-white border-[#B86B35]" : "bg-[#FBF9F5] border-[#EAE1D5] text-[#5C4A3E] hover:border-[#B86B35]"
              }`}
            >
              Wine Dinner (₹8,000)
            </button>
            <button
              type="button"
              onClick={() => setCalcBill(10800)}
              className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                calcBill === 10800 ? "bg-[#B86B35] text-white border-[#B86B35]" : "bg-[#FBF9F5] border-[#EAE1D5] text-[#5C4A3E] hover:border-[#B86B35]"
              }`}
            >
              Family of 4 (₹10,800)
            </button>
            <button
              type="button"
              onClick={() => setCalcBill(16000)}
              className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                calcBill === 16000 ? "bg-[#B86B35] text-white border-[#B86B35]" : "bg-[#FBF9F5] border-[#EAE1D5] text-[#5C4A3E] hover:border-[#B86B35]"
              }`}
            >
              Salon Party (₹16,000)
            </button>
          </div>
        </div>

        {/* Live Earnings Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FBF9F5] border border-[#DFCBB9] font-mono text-center">
          <div>
            <span className="text-[10px] uppercase text-[#8C7769] block">Total Dining Bill</span>
            <span className="text-lg font-bold text-[#2B1B17] mt-0.5 block">
              ₹{calcBill.toLocaleString()}
            </span>
          </div>

          <div className="border-y sm:border-y-0 sm:border-x border-[#DFCBB9]/60 py-2 sm:py-0">
            <span className="text-[10px] uppercase text-[#B86B35] font-semibold block">You Earn (10% Return)</span>
            <span className="text-2xl font-bold text-[#B86B35] mt-0.5 block">
              +{puntiEarned.toLocaleString()} Punti
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-[#8C7769] block">Tier Trajectory</span>
            <span className="text-xs font-semibold text-[#5C4A3E] mt-1 block">
              {calcBill >= 10000
                ? "🚀 Halfway to Riserva Gold (2,000 pts)!"
                : "⭐ Progress towards Riserva Gold (2,000 pts)"}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 text-xs font-mono text-[#7E6B60]">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
            <span>Points credited automatically within 6 hours of dining bill settlement.</span>
          </p>

          {isLoggedIn ? (
            <button
              onClick={handleSimulateInPage}
              className="py-2 px-4 rounded-xl bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            >
              Test Simulate Bill Credit (+{puntiEarned} pts)
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="py-2 px-4 rounded-xl bg-[#2B1B17] hover:bg-[#B86B35] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            >
              Enroll to Collect Points →
            </button>
          )}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-10 p-6 rounded-3xl bg-white border border-[#EAE1D5] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#B86B35] shrink-0">
            <Gift size={22} />
          </div>
          <div>
            <h4 className="font-serif text-lg text-[#2B1B17] font-semibold">
              Complimentary 200 Welcome Gift Punti on Enrollment
            </h4>
            <p className="text-xs text-[#7E6B60] font-light">
              Join our exclusive culinary circle to immediately access your member wallet, dining credit vouchers, and personal table preferences.
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
                Enroll in Club Privilegio
              </button>
              <button
                onClick={onOpenAuth}
                className="py-2.5 px-5 rounded-full border border-[#DFCBB9] hover:bg-[#FBF9F5] text-[#2B1B17] font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Member Sign In
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
