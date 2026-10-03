import React, { useState } from "react";
import { X, Sparkles, User, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { isFirebaseConfigured } from "../services/firebase";

export default function AuthModal({ isOpen, onClose, onOpenLoyaltyModal }) {
  const { loginWithEmail, signupWithEmail, loginAsGuest } = useAuth();
  const [tab, setTab] = useState("signin"); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (tab === "signup") {
      if (!name.trim()) {
        setError("Please enter your name");
        setIsSubmitting(false);
        return;
      }
      const res = await signupWithEmail(name, email, password);
      if (res.success) {
        onClose();
        if (onOpenLoyaltyModal) onOpenLoyaltyModal();
      } else {
        setError(res.error);
      }
    } else {
      const res = await loginWithEmail(email, password);
      if (res.success) {
        onClose();
        if (onOpenLoyaltyModal) onOpenLoyaltyModal();
      } else {
        setError(res.error);
      }
    }
    setIsSubmitting(false);
  };

  const handleDemoLogin = async () => {
    setError("");
    setIsSubmitting(true);
    const res = await loginWithEmail("vip.member@saporiditalia.in", "password123");
    setIsSubmitting(false);
    if (res.success) {
      onClose();
      if (onOpenLoyaltyModal) onOpenLoyaltyModal();
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B1B17]/70 backdrop-blur-sm transition-opacity"
      />

      {/* Luxury Modal Box */}
      <div className="relative w-full max-w-md bg-[#FBF9F5] border border-[#DFCBB9] rounded-3xl shadow-2xl overflow-hidden z-10 animate-fadeIn">
        {/* Top Decorative Header */}
        <div className="bg-[#2B1B17] text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#B86B35]/20 rounded-full blur-2xl pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#DFC2A5] hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 text-[#DFC2A5] text-[10px] font-mono tracking-[0.25em] uppercase font-semibold mb-1">
            <Sparkles size={12} className="text-[#B86B35]" />
            <span>CLUB PRIVILEGIO // EXCLUSIVE ACCESS</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF9F5] leading-snug">
            Welcome to Sapori
          </h3>
          <p className="text-xs text-[#DFC2A5]/80 font-light mt-1">
            Exclusive dining points, chef's table allocations & reserve cellar pairings.
          </p>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          {/* Exclusive Member Society Box with Quick VIP Demo Login */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FBF7F0] border border-[#FED7AA] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-[#B86B35] tracking-wider">
                <span>👑 EXCLUSIVE MEMBERSHIP</span>
              </span>
              <p className="text-xs text-[#5C4A3E] font-medium">
                10% bill credits & Riserva Gold status at 2,000 pts.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="py-1.5 px-3 rounded-xl bg-[#2B1B17] hover:bg-[#B86B35] text-white font-mono text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
              title="1-click access with verified VIP Member account"
            >
              Demo VIP Access
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#EAE1D5] w-full" />
            <span className="bg-[#FBF9F5] px-3 font-mono text-[10px] uppercase tracking-widest text-[#8C7769]">
              or sign in / enroll below
            </span>
          </div>

          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="grid grid-cols-2 p-1 bg-[#EFE9E2] rounded-xl text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setTab("signin");
                setError("");
              }}
              className={`py-2 rounded-lg font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                tab === "signin"
                  ? "bg-white text-[#2B1B17] shadow-xs"
                  : "text-[#7E6B60] hover:text-[#2B1B17]"
              }`}
            >
              Member Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("signup");
                setError("");
              }}
              className={`py-2 rounded-lg font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                tab === "signup"
                  ? "bg-white text-[#2B1B17] shadow-xs"
                  : "text-[#7E6B60] hover:text-[#2B1B17]"
              }`}
            >
              Enroll (+200 pts)
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] text-xs font-mono">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === "signup" && (
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7769]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Leonardo Moretti"
                    className="w-full bg-white border border-[#EAE1D5] rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7769]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. member@saporiditalia.in"
                  className="w-full bg-white border border-[#EAE1D5] rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                  Password
                </label>
                {tab === "signin" && (
                  <button
                    type="button"
                    onClick={() => setEmail("vip.member@saporiditalia.in")}
                    className="text-[10px] font-mono text-[#B86B35] hover:underline"
                  >
                    Demo Auto-Fill
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7769]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#EAE1D5] rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{isSubmitting ? "Authenticating..." : tab === "signup" ? "Create Club Account" : "Access My Account"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Trust Footnote */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#8C7769]">
            <ShieldCheck size={13} className="text-emerald-700" />
            <span>
              {isFirebaseConfigured
                ? "Secured with Firebase Authentication & SSL encryption"
                : "Protected with Sapori Encrypted Session Store"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
