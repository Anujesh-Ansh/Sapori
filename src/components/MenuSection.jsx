import React, { useState, useEffect } from "react";
import { Sparkles, Eye, ArrowUpRight } from "lucide-react";

export default function MenuSection({
  menu,
  isMenuZoomed,
  onSelectDish,
  onOpenAiConcierge,
  menuRef,
}) {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [hoveredDish, setHoveredDish] = useState(menu.appetizers[0]);

  const categories = [
    { key: "appetizers", label: "Appetizers & Soups" },
    { key: "pizza", label: "Wood-Fired Pizza" },
    { key: "pasta", label: "Handmade Pasta" },
    { key: "secondi", label: "Main Course" },
    { key: "desserts", label: "Desserts" },
  ];

  // Preload all menu images into memory on initial mount for 0ms instant display
  useEffect(() => {
    Object.values(menu).forEach((dishList) => {
      if (Array.isArray(dishList)) {
        dishList.forEach((dish) => {
          if (dish.img) {
            const img = new Image();
            img.src = dish.img;
          }
        });
      }
    });
  }, [menu]);

  const currentItems = menu[activeCategory] || [];

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    if (menu[key] && menu[key].length > 0) {
      setHoveredDish(menu[key][0]);
    }
  };

  return (
    <section
      id="menu"
      ref={menuRef}
      className={`py-20 px-6 md:px-16 max-w-6xl mx-auto border-t border-[#EAE1D5] transition-transform duration-500 bg-[#FBF9F5] ${
        isMenuZoomed ? "scale-[1.015]" : "scale-100"
      }`}
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
        <p className="text-xs font-mono text-[#B86B35] tracking-[0.3em] uppercase font-semibold">
          [ 02 // CURATED CULINARY SELECTION ]
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#2B1B17] leading-tight">
          Italian Masterpieces, Crafted Daily
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#7E6B60] tracking-wider pt-1">
          Select any dish to inspect artisanal ingredients, flavor profile & wine pairings
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            className={`py-2 px-5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
              activeCategory === cat.key
                ? "bg-[#B86B35] text-white border-[#B86B35] font-semibold shadow-xs"
                : "bg-white text-[#5C4A3E] border-[#EAE1D5] hover:border-[#B86B35] hover:text-[#B86B35]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dual Layout: Left Dotted-Leader List & Right Live Visual Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Dotted Leader Menu List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="pb-2 border-b border-[#EAE1D5] flex justify-between items-center text-xs font-mono text-[#8C7769] tracking-widest uppercase">
            <span>PIATTO // DISH</span>
            <span>PREZZO // INR</span>
          </div>

          <div className="space-y-3">
            {currentItems.map((dish) => {
              const isSelected = hoveredDish?.id === dish.id;

              return (
                <div
                  key={dish.id}
                  onMouseEnter={() => setHoveredDish(dish)}
                  onClick={() => {
                    setHoveredDish(dish);
                    onSelectDish(dish);
                  }}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 border flex items-center gap-3.5 ${
                    isSelected
                      ? "bg-white border-[#B86B35]/40 shadow-xs"
                      : "border-transparent hover:bg-white/60 hover:border-[#EAE1D5]"
                  }`}
                >
                  {/* Inline Thumbnail for Instant Mobile & Desktop Feedback */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#F5EFEB] border border-[#EAE1D5]">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`font-serif text-lg sm:text-xl transition-colors truncate ${
                          isSelected ? "text-[#B86B35]" : "text-[#2B1B17] group-hover:text-[#B86B35]"
                        }`}
                      >
                        {dish.name}
                      </span>

                      {/* Classic Dotted Leader */}
                      <span className="flex-grow mx-2 border-b border-dotted border-[#D8CCC0] group-hover:border-[#B86B35]/50 transition-colors hidden sm:inline" />

                      <span className="font-mono text-sm sm:text-base font-semibold text-[#2B1B17] group-hover:text-[#B86B35] whitespace-nowrap">
                        {dish.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-0.5 text-xs text-[#7E6B60] font-light">
                      <span className="line-clamp-1">{dish.ingredients}</span>
                      <span className="font-mono text-[10px] text-[#B86B35] uppercase tracking-wider shrink-0 ml-2 hidden sm:inline group-hover:underline">
                        [ DETAILS ↗ ]
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 text-[11px] font-mono text-[#8C7769] flex justify-between border-t border-[#EAE1D5]">
            <span>*All prices in INR. Prepared with certified DOP Italian ingredients.</span>
          </div>
        </div>

        {/* Right: Solitary Dynamic Photography Showcase - Instant Display */}
        <div className="lg:col-span-5 sticky top-24 hidden lg:block">
          <div className="rounded-2xl overflow-hidden border border-[#EAE1D5] bg-white p-4 shadow-md space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F5EFEB]">
              {hoveredDish && (
                <img
                  key={hoveredDish.id}
                  src={hoveredDish.img}
                  alt={hoveredDish.name}
                  loading="eager"
                  className="w-full h-full object-cover transition-opacity duration-200 filter contrast-[102%]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#DFC2A5] uppercase block">
                    {hoveredDish?.calories}
                  </span>
                  <span className="font-serif text-lg font-medium">
                    {hoveredDish?.name}
                  </span>
                </div>
                <button
                  onClick={() => onSelectDish(hoveredDish)}
                  className="p-2 rounded-full bg-[#B86B35] text-white hover:bg-[#8F4918] transition-colors cursor-pointer"
                  title="Inspect Tasting Notes"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>

            {hoveredDish && (
              <div className="p-1 space-y-2 text-xs">
                <p className="text-[#5C4A3E] italic font-serif text-sm">
                  "{hoveredDish.flavor}"
                </p>
                <div className="pt-2 border-t border-[#EAE1D5] flex justify-between items-center font-mono text-[11px] text-[#7E6B60]">
                  <span>Pair: <strong className="text-[#B86B35]">{hoveredDish.pair}</strong></span>
                  <button
                    onClick={() => onSelectDish(hoveredDish)}
                    className="text-[#B86B35] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Menu Action CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={onOpenAiConcierge}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase border border-[#B86B35] bg-[#B86B35]/10 text-[#B86B35] hover:bg-[#B86B35] hover:text-white py-3 px-8 rounded-full transition-all duration-300 shadow-xs cursor-pointer"
        >
          <Sparkles size={14} />
          <span>[ ASK AI PALATE CONCIERGE ]</span>
        </button>
      </div>

    </section>
  );
}
