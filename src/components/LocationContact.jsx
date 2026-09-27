import React from "react";
import { MapPin, Clock, Compass, ExternalLink } from "lucide-react";

export default function LocationContact({ brand }) {
  return (
    <footer
      id="contact"
      className="py-10 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto border-t border-[#EAE1D5] text-center font-mono text-xs bg-[#FBF9F5]"
    >
      <p className="text-[#B86B35] tracking-[0.25em] uppercase mb-1 font-semibold text-[11px]">
        [ 07 // LOCATION & HOURS ]
      </p>

      <h3 className="text-2xl sm:text-3xl font-serif text-[#2B1B17] mb-1 font-normal">
        Connaught Place, New Delhi
      </h3>

      <p className="text-[#5C4A3E] mb-4 max-w-lg mx-auto font-light text-xs">
        {brand.address}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[#5C4A3E] mb-5 text-[11px]">
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-[#B86B35]" />
          <span>{brand.hours}</span>
        </div>
        <span className="hidden sm:inline text-[#D8CCC0]">•</span>
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-[#B86B35]" />
          <span>Rajiv Chowk Metro Gate 2</span>
        </div>
        <span className="hidden sm:inline text-[#D8CCC0]">•</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[#B86B35] font-bold">P</span>
          <span>Complimentary Valet Parking</span>
        </div>
      </div>

      {/* Styled Map Container */}
      <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#EAE1D5] mb-5 bg-white relative shadow-2xs">
        <iframe
          title="Sapori d'Italia Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114844781498!2d77.2141544469796!3d28.63273185590928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b027d109%3A0xf67087612f86ee35!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="w-full h-full border-0 filter contrast-[105%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#EAE1D5] flex items-center gap-1.5 text-[#2B1B17] shadow-2xs">
          <Compass size={13} className="text-[#B86B35]" />
          <a
            href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B86B35] text-[10px] font-mono tracking-wider flex items-center gap-1"
          >
            <span>Open in Maps</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Direct Contact Channels */}
      <div className="space-y-1 mb-5 text-[#5C4A3E] text-[11px]">
        <p>
          Concierge: <span className="text-[#2B1B17] font-semibold">{brand.phone}</span> • Email: <a href={`mailto:${brand.email}`} className="text-[#B86B35] hover:underline">{brand.email}</a>
        </p>
        <p className="text-[10px] text-[#8C7769]">
          Dress Code: Smart Casual & Elegant • Average Spend: ₹2,700 / cover
        </p>
      </div>

      {/* Social Links & Copyright */}
      <div className="flex justify-center items-center gap-4 text-[#B86B35] tracking-widest text-[11px] uppercase mb-4 font-semibold">
        <a href="#" className="hover:text-[#2B1B17] transition-colors">Instagram</a>
        <span className="text-[#D8CCC0]">|</span>
        <a href="#" className="hover:text-[#2B1B17] transition-colors">Facebook</a>
        <span className="text-[#D8CCC0]">|</span>
        <a href="#" className="hover:text-[#2B1B17] transition-colors">TripAdvisor</a>
      </div>

      <div className="pt-4 border-t border-[#EAE1D5] text-[#8C7769] text-[10px] flex flex-col sm:flex-row justify-between items-center gap-1.5">
        <p>© 2026 SAPORI D'ITALIA NEW DELHI. ALL RIGHTS RESERVED.</p>
        <p className="tracking-widest uppercase">CRAFTED WITH WARMTH, SERVED WITH ELEGANCE.</p>
      </div>
    </footer>
  );
}
