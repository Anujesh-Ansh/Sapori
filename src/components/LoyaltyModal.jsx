import React, { useState } from "react";
import {
  X,
  Sparkles,
  Crown,
  Award,
  Ticket,
  Clock,
  CheckCircle2,
  Gift,
  ArrowRight,
  Settings,
  Wine,
  Utensils,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { REWARDS_CATALOGUE } from "../data/loyaltyData";

export default function LoyaltyModal({
  isOpen,
  onClose,
  onOpenSettings,
  onReserveWithReward,
}) {
  const { user, tierInfo, tiers, redeemReward } = useAuth();
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "rewards" | "tiers" | "history"
  const [copiedCode, setCopiedCode] = useState(null);
  const [redeemSuccess, setRedeemSuccess] = useState(null);
  const [redeemError, setRedeemError] = useState("");

  if (!isOpen || !user) return null;

  const currentPoints = user.points || 0;
  // Tier is strictly calculated on lifetime points so redeeming points never causes a downgrade
  const lifetimePoints = user.lifetimePoints != null ? user.lifetimePoints : currentPoints;

  const nextTierKey = user.tier === "classico" ? "riserva" : user.tier === "riserva" ? "eccellenza" : null;
  const nextTier = nextTierKey ? tiers[nextTierKey] : null;

  const progressPercent = nextTier
    ? Math.min(
        100,
        Math.max(
          10,
          ((lifetimePoints - (user.tier === "riserva" ? 2000 : 0)) /
            (nextTier.minPoints - (user.tier === "riserva" ? 2000 : 0))) *
            100
        )
      )
    : 100;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleRedeem = (reward) => {
    setRedeemError("");
    setRedeemSuccess(null);
    const result = redeemReward(reward);
    if (result.success) {
      setRedeemSuccess(`Successfully unlocked ${reward.title}! Use code ${result.voucher.code}`);
      setTimeout(() => setRedeemSuccess(null), 6000);
    } else {
      setRedeemError(result.error);
      setTimeout(() => setRedeemError(""), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B1B17]/75 backdrop-blur-md transition-opacity"
      />

      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#DFCBB9] rounded-3xl shadow-2xl overflow-hidden z-10 animate-fadeIn my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#2B1B17] text-white px-6 py-4 flex items-center justify-between border-b border-[#DFCBB9]/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#B86B35]/20 border border-[#B86B35] flex items-center justify-center text-[#DFC2A5]">
              <Crown size={16} />
            </div>
            <div>
              <span className="font-serif text-lg text-white font-medium block leading-none">
                Club Privilegio
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#DFC2A5] block mt-0.5">
                Sapori d'Italia • Exclusive Member Privileges
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                if (onOpenSettings) onOpenSettings();
              }}
              className="p-1.5 rounded-full text-[#DFC2A5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Account Settings"
              aria-label="Account Settings"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#DFC2A5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto bg-[#EFE9E2] border-b border-[#EAE1D5] text-[11px] font-mono shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-3 px-3 text-center uppercase tracking-wider font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "border-[#B86B35] text-[#2B1B17] bg-white"
                : "border-transparent text-[#7E6B60] hover:text-[#2B1B17]"
            }`}
          >
            My Card
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`flex-1 py-3 px-3 text-center uppercase tracking-wider font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "rewards"
                ? "border-[#B86B35] text-[#2B1B17] bg-white"
                : "border-transparent text-[#7E6B60] hover:text-[#2B1B17]"
            }`}
          >
            Rewards ({REWARDS_CATALOGUE.length})
          </button>
          <button
            onClick={() => setActiveTab("tiers")}
            className={`flex-1 py-3 px-3 text-center uppercase tracking-wider font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "tiers"
                ? "border-[#B86B35] text-[#2B1B17] bg-white"
                : "border-transparent text-[#7E6B60] hover:text-[#2B1B17]"
            }`}
          >
            Tiers & Perks
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 px-3 text-center uppercase tracking-wider font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "history"
                ? "border-[#B86B35] text-[#2B1B17] bg-white"
                : "border-transparent text-[#7E6B60] hover:text-[#2B1B17]"
            }`}
          >
            History
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Status Alerts */}
          {redeemSuccess && (
            <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-mono flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{redeemSuccess}</span>
            </div>
          )}

          {redeemError && (
            <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] text-xs font-mono flex items-center gap-2 animate-fadeIn">
              <X size={16} className="shrink-0" />
              <span>{redeemError}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW & DIGITAL MEMBERSHIP CARD */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Luxury Metallic Foil Card */}
              <div
                className={`relative rounded-3xl p-6 sm:p-7 text-white shadow-xl overflow-hidden border border-[#EAE1D5]/20 bg-gradient-to-br ${tierInfo.cardGradient}`}
              >
                {/* Background watermark badge */}
                <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-white/5 blur-xl pointer-events-none" />
                <div className="absolute top-4 right-4 opacity-20 font-serif text-6xl italic select-none pointer-events-none">
                  Sapori
                </div>

                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#DFC2A5] uppercase font-semibold block">
                      SAPORI D'ITALIA • PRIVILEGIO
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide mt-1">
                      {user.name}
                    </h4>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-white/15 text-[#DFC2A5] border border-white/20 uppercase tracking-wider">
                      Verified Member
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-bold bg-[#B86B35] text-white uppercase shadow-sm">
                      {tierInfo.badgeLabel}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex justify-between items-end relative z-10">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#DFC2A5]/80 block">
                      Member Identifier
                    </span>
                    <span className="font-mono text-sm tracking-widest text-white font-medium block">
                      {user.memberNumber}
                    </span>
                    <span className="text-[10px] font-mono text-[#DFC2A5]/80 block mt-0.5">
                      Lifetime Dining: <strong className="text-white">{lifetimePoints.toLocaleString()} pts</strong>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#DFC2A5]/80 block">
                      Spendable Punti
                    </span>
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#E59866]">
                      {currentPoints.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Permanent Tier Protection Assurance */}
                <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center gap-2 text-[10px] font-mono text-[#DFC2A5] relative z-10">
                  <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                  <span>
                    <strong>Tier Protected:</strong> Your {tierInfo.badgeLabel} rank is qualified by {lifetimePoints.toLocaleString()} lifetime points. Redeeming vouchers NEVER downgrades your tier!
                  </span>
                </div>
              </div>

              {/* Tier Progress Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE1D5] shadow-xs space-y-2.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#5C4A3E] font-medium flex items-center gap-1.5">
                    <Award size={14} className="text-[#B86B35]" />
                    <span>Current: <strong>{tierInfo.name}</strong> ({tierInfo.multiplier} Earning)</span>
                  </span>
                  {nextTier ? (
                    <span className="text-[#B86B35] font-semibold">
                      {(nextTier.minPoints - lifetimePoints).toLocaleString()} pts to {nextTier.name}
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">
                      Maximum Tier Reached
                    </span>
                  )}
                </div>

                <div className="w-full h-2.5 bg-[#EFE9E2] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#B86B35] to-[#E59866] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <p className="text-[11px] text-[#7E6B60] font-light">
                  {tierInfo.earnRate}. Based on <strong>10% of your dining bill</strong>. Spend points on dining discounts without losing tier rank.
                </p>
              </div>

              {/* Active Rewards / Unlocked Vouchers */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8C7769] font-semibold">
                    My Active Vouchers ({user.rewards?.length || 0})
                  </span>
                  <button
                    onClick={() => setActiveTab("rewards")}
                    className="text-xs font-mono text-[#B86B35] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Browse Rewards</span>
                    <ChevronRight size={13} />
                  </button>
                </div>

                {user.rewards && user.rewards.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.rewards.map((rew) => (
                      <div
                        key={rew.id}
                        className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DFC8B2] space-y-2 relative shadow-2xs"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[9px] font-mono uppercase tracking-wider text-[#B86B35] font-semibold">
                                Ready to Redeem
                              </span>
                              {rew.minSpend && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#FFF7ED] text-[#B86B35] border border-[#FED7AA]">
                                  {rew.minSpend}
                                </span>
                              )}
                            </div>
                            <h5 className="font-serif text-sm font-semibold text-[#2B1B17] mt-0.5">
                              {rew.title}
                            </h5>
                          </div>
                          <Gift size={16} className="text-[#B86B35] shrink-0" />
                        </div>

                        <div className="p-2 bg-[#F5EFEB] rounded-xl flex items-center justify-between font-mono text-xs">
                          <code className="font-bold text-[#2B1B17] tracking-wider">
                            {rew.code}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopy(rew.code)}
                            className="text-[#B86B35] hover:text-[#8F4918] p-1 cursor-pointer flex items-center gap-1 text-[10px]"
                            title="Copy Code"
                          >
                            {copiedCode === rew.code ? (
                              <Check size={12} className="text-emerald-700" />
                            ) : (
                              <Copy size={12} />
                            )}
                            <span>{copiedCode === rew.code ? "Copied" : "Copy"}</span>
                          </button>
                        </div>

                        {rew.terms && (
                          <p className="text-[10px] text-[#7E6B60] italic leading-tight">
                            {rew.terms}
                          </p>
                        )}

                        <div className="flex justify-between items-center text-[10px] text-[#8C7769] font-mono pt-1 border-t border-[#F5EFEB]">
                          <span>{rew.expiry}</span>
                          <button
                            onClick={() => {
                              onClose();
                              if (onReserveWithReward) onReserveWithReward(rew);
                            }}
                            className="text-[#B86B35] hover:underline font-semibold"
                          >
                            Apply to Booking →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center rounded-2xl bg-white border border-dashed border-[#DFCBB9] space-y-2">
                    <Ticket size={24} className="mx-auto text-[#B86B35]/60" />
                    <p className="text-xs font-mono text-[#5C4A3E]">
                      No active vouchers yet. Redeem your points below!
                    </p>
                    <button
                      onClick={() => setActiveTab("rewards")}
                      className="text-xs font-mono font-semibold text-[#B86B35] underline cursor-pointer"
                    >
                      View Redeemable Catalog
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setActiveTab("rewards")}
                  className="flex-1 py-3 px-4 rounded-xl border border-[#DFC8B2] bg-white hover:bg-[#F7F2EC] text-[#2B1B17] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Gift size={14} className="text-[#B86B35]" />
                  <span>Browse Rewards Catalog</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById("reserve");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Utensils size={14} />
                  <span>Reserve Table & Dine</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: REWARDS MARKETPLACE */}
          {activeTab === "rewards" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#EAE1D5]">
                <div>
                  <h4 className="font-serif text-lg text-[#2B1B17]">
                    Redeem Luxury Privileges
                  </h4>
                  <p className="text-xs text-[#7E6B60]">
                    Select any reward to unlock an instant coupon code for your next visit.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-[#8C7769] block">Spendable Balance</span>
                  <span className="font-mono text-base font-bold text-[#B86B35]">
                    {currentPoints.toLocaleString()} pts
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REWARDS_CATALOGUE.map((reward) => {
                  const canAfford = currentPoints >= reward.pointsCost;

                  return (
                    <div
                      key={reward.id}
                      className="p-4 rounded-2xl bg-white border border-[#EAE1D5] hover:border-[#DFC8B2] transition-all flex flex-col justify-between space-y-3 shadow-2xs"
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[9px] font-mono tracking-widest text-[#B86B35] uppercase font-semibold">
                            {reward.category}
                          </span>
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#B86B35] border border-[#FED7AA]">
                            {reward.pointsCost} pts
                          </span>
                        </div>
                        <h5 className="font-serif text-base font-semibold text-[#2B1B17] leading-snug">
                          {reward.title}
                        </h5>
                        <p className="text-xs text-[#5C4A3E] font-light leading-relaxed">
                          {reward.desc}
                        </p>
                        {reward.minSpend && (
                          <div className="pt-1">
                            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#FBF9F5] text-[#8C7769] border border-[#EAE1D5]">
                              {reward.minSpend}
                            </span>
                          </div>
                        )}
                        {reward.terms && (
                          <p className="text-[9px] text-[#8C7769] italic font-mono leading-tight">
                            *{reward.terms}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#F5EFEB] flex justify-between items-center">
                        <span className="text-[10px] font-mono text-[#8C7769]">
                          Valid {reward.expiryDays} days
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRedeem(reward)}
                          disabled={!canAfford}
                          className={`py-1.5 px-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                            canAfford
                              ? "bg-[#B86B35] hover:bg-[#8F4918] text-white shadow-2xs"
                              : "bg-[#EFE9E2] text-[#A8988C] cursor-not-allowed"
                          }`}
                        >
                          {canAfford ? "Redeem Perk" : "Need Points"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-[10px] font-mono text-[#8C7769] text-center pt-2">
                *Note: Redeeming points for rewards reduces spendable points balance only. Your Lifetime Tier status is permanently preserved.
              </p>
            </div>
          )}

          {/* TAB 3: TIERS & PRIVILEGES */}
          {activeTab === "tiers" && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-[#EAE1D5]">
                <h4 className="font-serif text-lg text-[#2B1B17]">
                  Membership Tiers (Gradi di Fedeltà)
                </h4>
                <p className="text-xs text-[#7E6B60]">
                  Ascend through our tiers as you dine with us in Connaught Place.
                </p>
              </div>

              <div className="space-y-3">
                {Object.values(tiers).map((t) => {
                  const isCurrent = user.tier === t.id;

                  return (
                    <div
                      key={t.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? "bg-[#FFFDF9] border-[#B86B35] shadow-xs"
                          : "bg-white border-[#EAE1D5]"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2.5">
                          <Crown
                            size={18}
                            className={
                              t.id === "eccellenza"
                                ? "text-[#8B2519]"
                                : t.id === "riserva"
                                ? "text-[#B86B35]"
                                : "text-[#7E6B60]"
                            }
                          />
                          <div>
                            <h5 className="font-serif text-lg font-bold text-[#2B1B17]">
                              {t.title}
                            </h5>
                            <span className="text-[10px] font-mono text-[#8C7769]">
                              {t.minPoints.toLocaleString()}+ Punti Required
                            </span>
                          </div>
                        </div>

                        {isCurrent ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#B86B35] text-white uppercase tracking-wider">
                            Your Tier
                          </span>
                        ) : (
                          <span className="font-mono text-xs font-semibold text-[#8C7769]">
                            {t.multiplier} Earning
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-[#F5EFEB]">
                        {t.perks.map((perk, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#5C4A3E]">
                            <CheckCircle2 size={13} className="text-[#B86B35] shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: POINTS HISTORY */}
          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#EAE1D5]">
                <div>
                  <h4 className="font-serif text-lg text-[#2B1B17]">
                    Points Activity Ledger
                  </h4>
                  <p className="text-xs text-[#7E6B60]">
                    Real-time transaction history of points earned and redeemed.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {user.history && user.history.length > 0 ? (
                  user.history.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-white border border-[#EAE1D5] flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            item.type === "earn"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-[#FFF7ED] text-[#B86B35] border border-[#FED7AA]"
                          }`}
                        >
                          <Clock size={14} />
                        </div>
                        <div>
                          <h6 className="font-serif text-sm font-medium text-[#2B1B17]">
                            {item.title}
                          </h6>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-[#8C7769]">
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.category}</span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`font-mono text-sm font-bold shrink-0 ${
                          item.type === "earn" ? "text-emerald-700" : "text-[#B86B35]"
                        }`}
                      >
                        {item.points} pts
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs font-mono text-[#8C7769]">
                    No activity recorded yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
