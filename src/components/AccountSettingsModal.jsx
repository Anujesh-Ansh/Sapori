import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  UtensilsCrossed,
  MapPin,
  CheckCircle2,
  LogOut,
  Crown,
  Sparkles,
  Shield,
  Save,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AccountSettingsModal({
  isOpen,
  onClose,
  onOpenLoyaltyModal,
}) {
  const { user, updateUserProfile, logout, tierInfo } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [dietaryPreference, setDietaryPreference] = useState(user?.dietaryPreference || "Eggitarian");
  const [preferredTable, setPreferredTable] = useState(user?.preferredTable || "Atrium Window View (Table 04)");
  const [anniversaryDate, setAnniversaryDate] = useState(user?.anniversaryDate || "14 February");
  const [notes, setNotes] = useState(user?.notes || "");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      dietaryPreference,
      preferredTable,
      anniversaryDate,
      notes,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B1B17]/75 backdrop-blur-md transition-opacity"
      />

      {/* Main Container */}
      <div className="relative w-full max-w-xl bg-[#FBF9F5] border border-[#DFCBB9] rounded-3xl shadow-2xl overflow-hidden z-10 animate-fadeIn my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#2B1B17] text-white px-6 py-5 flex items-center justify-between border-b border-[#DFCBB9]/30 shrink-0">
          <div>
            <span className="font-serif text-xl text-white font-medium block leading-none">
              Account & Dining Settings
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#DFC2A5] block mt-1">
              Club Privilegio Member Profile • Sapori d'Italia
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#DFC2A5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-grow">
          {/* Membership Mini Ribbon */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#DFC8B2] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B86B35]/15 border border-[#B86B35] flex items-center justify-center text-[#B86B35] shrink-0">
                <Crown size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-bold text-[#2B1B17]">
                    {user.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#B86B35] text-white uppercase">
                    {tierInfo.badgeLabel}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#7E6B60]">
                  Member ID: {user.memberNumber} • {user.points?.toLocaleString()} Sapori Punti
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenLoyaltyModal) onOpenLoyaltyModal();
              }}
              className="px-3 py-1.5 rounded-xl border border-[#B86B35] text-[#B86B35] hover:bg-[#B86B35] hover:text-white transition-colors font-mono text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
            >
              View Card
            </button>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-mono flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>Dining preferences & profile saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            {/* Personal Details */}
            <div className="space-y-3 pt-1">
              <h5 className="font-mono text-xs uppercase tracking-wider text-[#8C7769] font-bold border-b border-[#EAE1D5] pb-1">
                Personal Information
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7769]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#EAE1D5] rounded-xl pl-9 pr-3 py-2 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7769]" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#EAE1D5] rounded-xl pl-9 pr-3 py-2 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7769]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#EAE1D5] rounded-xl pl-9 pr-3 py-2 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35]"
                  />
                </div>
              </div>
            </div>

            {/* Dining & Palate Preferences */}
            <div className="space-y-3 pt-3">
              <h5 className="font-mono text-xs uppercase tracking-wider text-[#8C7769] font-bold border-b border-[#EAE1D5] pb-1 flex items-center justify-between">
                <span>Dining & Table Preferences</span>
                <span className="text-[9px] text-[#B86B35] font-normal">Auto-applied to table reservations</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                    Dietary Standard
                  </label>
                  <select
                    value={dietaryPreference}
                    onChange={(e) => setDietaryPreference(e.target.value)}
                    className="w-full bg-white border border-[#EAE1D5] rounded-xl px-3 py-2 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35] cursor-pointer"
                  >
                    <option value="Vegetarian">🟢 Pure Vegetarian (No Egg)</option>
                    <option value="Eggitarian">🟠 Eggitarian (Vegetarian + Egg)</option>
                    <option value="Non-Veg">🔴 Non-Vegetarian</option>
                    <option value="Seafood">🐟 Seafood Connoisseur</option>
                    <option value="Vegan">🌱 100% Plant-Based Vegan</option>
                    <option value="Gluten-Free">🌾 Gluten-Free Preference</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                    Preferred Table Location
                  </label>
                  <select
                    value={preferredTable}
                    onChange={(e) => setPreferredTable(e.target.value)}
                    className="w-full bg-white border border-[#EAE1D5] rounded-xl px-3 py-2 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35] cursor-pointer"
                  >
                    <option value="Atrium Window View (Table 04)">Atrium Window View (Table 04)</option>
                    <option value="Romantic Arch Alcove">Romantic Arch Alcove</option>
                    <option value="Wood-Fired Hearth Counter">Wood-Fired Hearth Counter</option>
                    <option value="Wine Cellar View Booth">Wine Cellar View Booth</option>
                    <option value="Quiet Private Corner">Quiet Private Corner</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                  Anniversary / Birthday Date
                </label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7769]" />
                  <input
                    type="text"
                    value={anniversaryDate}
                    onChange={(e) => setAnniversaryDate(e.target.value)}
                    placeholder="e.g. 14 February"
                    className="w-full bg-white border border-[#EAE1D5] rounded-xl pl-9 pr-3 py-2 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35]"
                  />
                </div>
                <span className="text-[10px] text-[#8C7769] font-light">
                  Complimentary chef dessert & vintage toast gifted on your anniversary date.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E6B60] font-semibold">
                  Chef & Sommelier Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Allergies, favorite olive oils, preferred wine dryness..."
                  className="w-full bg-white border border-[#EAE1D5] rounded-xl p-2.5 text-xs font-sans text-[#2B1B17] focus:outline-none focus:border-[#B86B35]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-[#EAE1D5]">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Save size={14} />
                <span>Save Dining Preferences</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="py-3 px-5 rounded-xl border border-[#EAE1D5] hover:border-[#FECACA] bg-white hover:bg-[#FEF2F2] text-[#8B2519] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
