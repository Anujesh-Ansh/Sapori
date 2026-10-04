import React, { useState, useEffect } from "react";
import { Calendar, Clock, Users, Phone, CheckCircle, Sparkles, Crown, Gift } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ReservationSection({ brand, preselectedDish, appliedReward }) {
  const { user, isLoggedIn, tierInfo, earnPoints } = useAuth();

  const [date, setDate] = useState("2026-10-04");
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState("2 Covers (Intimate)");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [selectedVoucher, setSelectedVoucher] = useState(appliedReward?.code || "");
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (user) {
      if (!name) setName(user.name);
      if (!phone) setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (appliedReward) {
      setSelectedVoucher(appliedReward.code);
    }
  }, [appliedReward]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingId = "SPI-" + Math.floor(1000 + Math.random() * 9000);

    setConfirmedBooking({
      id: bookingId,
      date,
      time,
      guests,
      name: name || user?.name || "Valued Guest",
      phone: phone || user?.phone || brand.phone,
      dishInterest: preselectedDish ? preselectedDish.name : null,
      voucherApplied: selectedVoucher || null,
      billEarningNote: isLoggedIn
        ? `${tierInfo?.badgeLabel || "Member"}: 10% of your dining bill will be credited as Sapori Punti post-dining.`
        : "Sign in or register your mobile number to earn 10% of your bill in Sapori Punti.",
    });
  };

  return (
    <section
      id="reserve"
      className="py-12 sm:py-16 px-4 sm:px-8 md:px-16 max-w-xl mx-auto border-t border-[#EAE1D5] text-center bg-[#FBF9F5]"
    >
      {/* Header */}
      <div className="mb-6 space-y-1">
        <p className="text-[11px] font-mono text-[#B86B35] tracking-[0.25em] uppercase font-semibold">
          [ 07 // RESERVATIONS ]
        </p>
        <h3 className="text-2xl sm:text-4xl font-serif text-[#2B1B17] font-normal">
          Your Table Awaits
        </h3>
        <p className="text-xs font-mono text-[#7E6B60] tracking-wider">
          Experience authentic contemporary Italian fine dining in Connaught Place
        </p>

        {preselectedDish && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B86B35]/10 border border-[#B86B35]/30 text-xs font-mono text-[#B86B35]">
            <Sparkles size={11} />
            <span>Noted for your table: <strong>{preselectedDish.name}</strong></span>
          </div>
        )}

        {isLoggedIn ? (
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[11px] font-mono text-[#B86B35]">
            <Crown size={12} />
            <span>
              <strong>{tierInfo?.badgeLabel || "Member"} Perk:</strong> 10% of your dining bill credited as Punti post-visit
            </span>
          </div>
        ) : (
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFEB] border border-[#EAE1D5] text-[11px] font-mono text-[#7E6B60]">
            <Crown size={12} className="text-[#B86B35]" />
            <span>
              Reserve with your mobile number to earn <strong>10% points</strong> on your final bill
            </span>
          </div>
        )}
      </div>

      {confirmedBooking ? (
        <div className="p-6 rounded-2xl bg-white border border-[#B86B35] text-left space-y-3.5 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5 text-emerald-700">
            <CheckCircle size={22} />
            <div>
              <h4 className="font-serif text-lg text-[#2B1B17]">Reservation Confirmed</h4>
              <p className="font-mono text-xs text-[#7E6B60]">
                Booking Ref: <strong className="text-[#B86B35]">{confirmedBooking.id}</strong>
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EAE1D5] space-y-1.5 font-mono text-xs text-[#4A3B34]">
            <p><strong>Guest:</strong> {confirmedBooking.name}</p>
            <p><strong>Schedule:</strong> {confirmedBooking.date} at {confirmedBooking.time}</p>
            <p><strong>Party Size:</strong> {confirmedBooking.guests}</p>
            {confirmedBooking.dishInterest && (
              <p className="text-[#B86B35]"><strong>Curated Dish:</strong> {confirmedBooking.dishInterest}</p>
            )}
            {confirmedBooking.voucherApplied && (
              <p className="text-[#B86B35] flex items-center gap-1">
                <Gift size={12} />
                <span><strong>Privilegio Voucher:</strong> {confirmedBooking.voucherApplied}</span>
              </p>
            )}
            <div className="mt-2 pt-2 border-t border-[#EAE1D5] text-[#2B1B17] text-[11px] bg-white p-2.5 rounded-lg border">
              <p className="font-semibold text-[#B86B35] flex items-center gap-1">
                <Sparkles size={12} />
                <span>Club Privilegio 10% Bill Return</span>
              </p>
              <p className="text-[#7E6B60] mt-0.5">
                Upon dining, <strong>10% of your food & beverage bill</strong> will be credited directly to your registered mobile (<strong>{confirmedBooking.phone}</strong>) within 6 hours.
              </p>
            </div>
            <p className="text-[#8C7769] text-[10px] pt-1">
              *A confirmation SMS with your booking code has been dispatched.
            </p>
          </div>

          <button
            onClick={() => setConfirmedBooking(null)}
            className="w-full py-2.5 border border-[#EAE1D5] hover:border-[#B86B35] text-[#5C4A3E] hover:text-[#2B1B17] rounded-xl font-mono text-xs uppercase tracking-widest transition-colors bg-white cursor-pointer"
          >
            [ MAKE ANOTHER RESERVATION ]
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left font-mono text-xs bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE1D5] shadow-2xs">
          
          {/* Date Bracket */}
          <div className="flex justify-between items-center border-b border-[#EAE1D5] pb-2.5">
            <label className="text-[#5C4A3E] tracking-wider uppercase flex items-center gap-1.5">
              <Calendar size={13} className="text-[#B86B35]" />
              <span>Date [ ]</span>
            </label>
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent text-right text-[#2B1B17] font-mono focus:outline-none cursor-pointer hover:text-[#B86B35] transition-colors"
            />
          </div>

          {/* Time Bracket */}
          <div className="flex justify-between items-center border-b border-[#EAE1D5] pb-2.5">
            <label className="text-[#5C4A3E] tracking-wider uppercase flex items-center gap-1.5">
              <Clock size={13} className="text-[#B86B35]" />
              <span>Time [ ]</span>
            </label>
            <input
              required
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-transparent text-right text-[#2B1B17] font-mono focus:outline-none cursor-pointer hover:text-[#B86B35] transition-colors"
            />
          </div>

          {/* Guests Bracket */}
          <div className="flex justify-between items-center border-b border-[#EAE1D5] pb-2.5">
            <label className="text-[#5C4A3E] tracking-wider uppercase flex items-center gap-1.5">
              <Users size={13} className="text-[#B86B35]" />
              <span>Guests [ ]</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="bg-[#FBF9F5] text-right text-[#2B1B17] font-mono focus:outline-none cursor-pointer border border-[#EAE1D5] rounded px-2 py-1"
            >
              <option value="1 Cover">1 Cover</option>
              <option value="2 Covers (Intimate)">2 Covers (Intimate)</option>
              <option value="4 Covers (Social)">4 Covers (Social)</option>
              <option value="6 Covers (Family)">6 Covers (Family)</option>
              <option value="8 Covers (Private Dining Room)">8 Covers (Private Dining Room)</option>
            </select>
          </div>

          {/* Guest Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
            <div>
              <label className="text-[10px] text-[#8C7769] uppercase block mb-1">Your Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Leonardo Moretti"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#EAE1D5] rounded-lg px-3 py-2 text-[#2B1B17] font-mono text-xs focus:outline-none focus:border-[#B86B35]"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#8C7769] uppercase block mb-1">Mobile (+91)</label>
              <input
                required
                type="tel"
                placeholder="+91 95555 XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#EAE1D5] rounded-lg px-3 py-2 text-[#2B1B17] font-mono text-xs focus:outline-none focus:border-[#B86B35]"
              />
            </div>
          </div>

          {/* Privilegio Voucher Selection (if user has unlocked rewards) */}
          {user?.rewards && user.rewards.length > 0 && (
            <div className="pt-1">
              <label className="text-[10px] text-[#8C7769] uppercase flex items-center justify-between mb-1">
                <span>Apply Privilegio Reward Code</span>
                <span className="text-[#B86B35] font-semibold">Optional</span>
              </label>
              <select
                value={selectedVoucher}
                onChange={(e) => setSelectedVoucher(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-[#DFC8B2] rounded-lg px-3 py-2 text-[#2B1B17] font-mono text-xs focus:outline-none focus:border-[#B86B35]"
              >
                <option value="">No voucher attached</option>
                {user.rewards.map((r) => (
                  <option key={r.id} value={r.code}>
                    {r.title} ({r.code})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#B86B35] hover:bg-[#8F4918] text-white transition-all duration-200 rounded-xl tracking-[0.2em] uppercase font-mono font-semibold text-xs mt-2 shadow-2xs cursor-pointer"
          >
            [ CONFIRM RESERVATION ]
          </button>
        </form>
      )}

      {/* Phone Notice */}
      <div className="mt-6 text-xs font-mono text-[#7E6B60] space-y-0.5">
        <p className="flex items-center justify-center gap-1.5">
          <Phone size={12} className="text-[#B86B35]" />
          <span>Direct Concierge: <strong className="text-[#2B1B17]">{brand.phone}</strong></span>
        </p>
        <p className="text-[11px] text-[#8C7769]">{brand.location}</p>
      </div>
    </section>
  );
}

