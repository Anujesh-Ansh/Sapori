import React, { useState } from "react";
import { Calendar, Clock, Users, Phone, CheckCircle, Sparkles } from "lucide-react";

export default function ReservationSection({ brand, preselectedDish }) {
  const [date, setDate] = useState("2026-09-28");
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState("2 Covers");
  const [area, setArea] = useState("Main Dining Hall");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingId = "SPI-" + Math.floor(1000 + Math.random() * 9000);
    setConfirmedBooking({
      id: bookingId,
      date,
      time,
      guests,
      area,
      name: name || "Valued Guest",
      phone: phone || brand.phone,
      dishInterest: preselectedDish ? preselectedDish.name : null
    });
  };

  return (
    <section
      id="reserve"
      className="py-20 px-6 md:px-16 max-w-2xl mx-auto border-t border-[#EAE1D5] text-center bg-[#FBF9F5]"
    >
      {/* Header */}
      <div className="mb-8 space-y-2">
        <p className="text-xs font-mono text-[#B86B35] tracking-[0.3em] uppercase font-semibold">
          [ 06 // RESERVATIONS ]
        </p>
        <h3 className="text-3xl sm:text-5xl font-serif text-[#2B1B17] font-normal">
          Your Table Awaits
        </h3>
        <p className="text-xs sm:text-sm font-mono text-[#7E6B60] tracking-wider">
          Experience authentic contemporary Italian fine dining in Connaught Place
        </p>

        {preselectedDish && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B86B35]/10 border border-[#B86B35]/30 text-xs font-mono text-[#B86B35]">
            <Sparkles size={12} />
            <span>Noted for your table: <strong>{preselectedDish.name}</strong></span>
          </div>
        )}
      </div>

      {confirmedBooking ? (
        <div className="p-8 rounded-3xl bg-white border border-[#B86B35] text-left space-y-4 shadow-md animate-fadeIn">
          <div className="flex items-center gap-3 text-emerald-700">
            <CheckCircle size={24} />
            <div>
              <h4 className="font-serif text-xl text-[#2B1B17]">Reservation Confirmed</h4>
              <p className="font-mono text-xs text-[#7E6B60]">Booking Reference: <strong className="text-[#B86B35]">{confirmedBooking.id}</strong></p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#EAE1D5] space-y-1.5 font-mono text-xs text-[#4A3B34]">
            <p><strong>Guest:</strong> {confirmedBooking.name}</p>
            <p><strong>Date & Time:</strong> {confirmedBooking.date} at {confirmedBooking.time}</p>
            <p><strong>Party Size:</strong> {confirmedBooking.guests} ({confirmedBooking.area})</p>
            {confirmedBooking.dishInterest && (
              <p className="text-[#B86B35]"><strong>Curated Dish:</strong> {confirmedBooking.dishInterest}</p>
            )}
            <p className="text-[#8C7769] text-[11px] pt-1">
              *A confirmation SMS has been dispatched to {confirmedBooking.phone}.
            </p>
          </div>

          <button
            onClick={() => setConfirmedBooking(null)}
            className="w-full py-3 border border-[#EAE1D5] hover:border-[#B86B35] text-[#5C4A3E] hover:text-[#2B1B17] rounded-xl font-mono text-xs uppercase tracking-widest transition-colors bg-white"
          >
            [ MAKE ANOTHER RESERVATION ]
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-left font-mono text-xs bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE1D5] shadow-xs">
          
          {/* Date Bracket */}
          <div className="flex justify-between items-center border-b border-[#EAE1D5] pb-3">
            <label className="text-[#5C4A3E] tracking-wider uppercase flex items-center gap-2">
              <Calendar size={14} className="text-[#B86B35]" />
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
          <div className="flex justify-between items-center border-b border-[#EAE1D5] pb-3">
            <label className="text-[#5C4A3E] tracking-wider uppercase flex items-center gap-2">
              <Clock size={14} className="text-[#B86B35]" />
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
          <div className="flex justify-between items-center border-b border-[#EAE1D5] pb-3">
            <label className="text-[#5C4A3E] tracking-wider uppercase flex items-center gap-2">
              <Users size={14} className="text-[#B86B35]" />
              <span>Guests [ ]</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="bg-[#FBF9F5] text-right text-[#2B1B17] font-mono focus:outline-none cursor-pointer border border-[#EAE1D5] rounded px-2 py-1"
            >
              <option value="1 Cover">1 Cover</option>
              <option value="2 Covers">2 Covers (Intimate)</option>
              <option value="4 Covers">4 Covers (Social)</option>
              <option value="6 Covers">6 Covers (Family Table)</option>
              <option value="8 Covers">8 Covers (Max Salon)</option>
            </select>
          </div>

          {/* Guest Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-[10px] text-[#8C7769] uppercase block mb-1">Your Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Aaroh Anuraj"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#EAE1D5] rounded-xl px-3 py-2 text-[#2B1B17] font-mono text-xs focus:outline-none focus:border-[#B86B35]"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#8C7769] uppercase block mb-1">Mobile (+91)</label>
              <input
                required
                type="tel"
                placeholder="+91 98110 XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#EAE1D5] rounded-xl px-3 py-2 text-[#2B1B17] font-mono text-xs focus:outline-none focus:border-[#B86B35]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#B86B35] hover:bg-[#8F4918] text-white transition-all duration-300 rounded-xl tracking-[0.2em] uppercase font-mono font-semibold text-xs mt-4 shadow-sm"
          >
            [ CONFIRM RESERVATION ]
          </button>
        </form>
      )}

      {/* Phone Notice */}
      <div className="mt-8 text-xs font-mono text-[#7E6B60] space-y-1">
        <p className="flex items-center justify-center gap-2">
          <Phone size={13} className="text-[#B86B35]" />
          <span>Direct Concierge: <strong className="text-[#2B1B17]">{brand.phone}</strong></span>
        </p>
        <p className="text-[#8C7769]">{brand.location}</p>
      </div>
    </section>
  );
}
