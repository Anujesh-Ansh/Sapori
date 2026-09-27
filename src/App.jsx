import React, { useState, useRef } from "react";
import { restaurantData } from "./data/restaurantData";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import SignatureDishes from "./components/SignatureDishes";
import TheExperience from "./components/TheExperience";
import ChefAndAwards from "./components/ChefAndAwards";
import ReservationSection from "./components/ReservationSection";
import LocationContact from "./components/LocationContact";
import DishDetailModal from "./components/DishDetailModal";
import AiConciergeModal from "./components/AiConciergeModal";
import { Sparkles } from "lucide-react";

export default function App() {
  const [selectedDish, setSelectedDish] = useState(null);
  const [isMenuZoomed, setIsMenuZoomed] = useState(false);
  const [preselectedDishForReserve, setPreselectedDishForReserve] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const menuRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (id === "menu") {
        setIsMenuZoomed(true);
        setTimeout(() => setIsMenuZoomed(false), 600);
      }
    }
  };

  const handleReserveForDish = (dish) => {
    setPreselectedDishForReserve(dish);
    scrollToSection("reserve");
  };

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] text-[#2B1B17] font-sans selection:bg-[#E8D5C4] selection:text-[#2B1B17] overflow-x-hidden antialiased">
      
      {/* 1. Header with Clean Mobile Layout (Ambiance in side menu on mobile) */}
      <Header
        brand={restaurantData.brand}
        onNavigate={scrollToSection}
        onOpenAiConcierge={() => setIsAiModalOpen(true)}
      />

      <main className="relative z-10">
        {/* 2. Hero Section: Grand Brand Name & Compact Layout */}
        <Hero
          brand={restaurantData.brand}
          onReserve={() => scrollToSection("reserve")}
          onExploreMenu={() => scrollToSection("menu")}
        />

        {/* 3. Curated Editorial Menu (From Business Proposal Page 6) */}
        <MenuSection
          menu={restaurantData.menu}
          isMenuZoomed={isMenuZoomed}
          onSelectDish={(dish) => setSelectedDish(dish)}
          onOpenAiConcierge={() => setIsAiModalOpen(true)}
          menuRef={menuRef}
        />

        {/* 4. Signature Dishes (3 Items, Clean Spacing) */}
        <SignatureDishes
          signatures={restaurantData.signatures}
          onSelectDish={(dish) => setSelectedDish(dish)}
        />

        {/* 5. The Space & Cellar (Rustic Arches, Wood-Fired Hearth & Wines) */}
        <TheExperience
          onReserve={() => scrollToSection("reserve")}
        />

        {/* 6. Chef Alessandro Rossi & Critical Accolades (Towards the end) */}
        <ChefAndAwards
          chef={restaurantData.chef}
          awards={restaurantData.awards}
        />

        {/* 7. Minimalist Table Reservation */}
        <ReservationSection
          brand={restaurantData.brand}
          preselectedDish={preselectedDishForReserve}
        />

        {/* 8. Location & Contact (Connaught Place, Map, Hours) */}
        <LocationContact brand={restaurantData.brand} />
      </main>

      {/* Floating Quick Action Button for AI Concierge:
          Positioned at bottom-20 on mobile to stay clearly above Netlify badges / mobile navigation */}
      <button
        onClick={() => setIsAiModalOpen(true)}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 inline-flex items-center gap-2 py-2.5 sm:py-3 px-4 sm:px-5 rounded-full bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        title="Open AI Palate Concierge"
      >
        <Sparkles size={14} />
        <span className="hidden sm:inline">AI PALATE CONCIERGE</span>
        <span className="sm:hidden text-[11px]">AI CONCIERGE</span>
      </button>

      {/* Dish Detail Modal Dialog */}
      <DishDetailModal
        dish={selectedDish}
        menu={restaurantData.menu}
        onSelectDish={(dish) => setSelectedDish(dish)}
        onClose={() => setSelectedDish(null)}
        onReserveForDish={handleReserveForDish}
      />

      {/* AI Palate Concierge Dialog Box */}
      <AiConciergeModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        menu={restaurantData.menu}
        onSelectDish={(dish) => setSelectedDish(dish)}
        onReserveForDish={handleReserveForDish}
      />

    </div>
  );
}
