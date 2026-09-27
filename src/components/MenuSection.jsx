import React, { useState, useEffect } from "react";
import { Sparkles, Eye, ArrowUpRight, Wine } from "lucide-react";
import DietaryBadges, { VegSymbol, NonVegSymbol } from "./DietaryBadges";

export default function MenuSection({
  menu,
  isMenuZoomed,
  onSelectDish,
  onOpenAiConcierge,
  menuRef,
}) {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [selectedTag, setSelectedTag] = useState("all");
  const [hoveredDish, setHoveredDish] = useState(menu.appetizers[0]);

  const categories = [
    { key: "appetizers", label: "Appetizers & Soups" },
    { key: "pizza", label: "Wood-Fired Pizza" },
    { key: "pasta", label: "Handmade Pasta" },
    { key: "secondi", label: "Main Course" },
    { key: "desserts", label: "Desserts" },
    { key: "cocktails", label: "Cocktails & Bar" },
  ];

  const dietaryFilters = [
    { key: "all", label: "ALL DISHES" },
    { key: "veg", label: "🟢 VEG" },
    { key: "nonveg", label: "🔴 NON-VEG" },
    { key: "vegan", label: "🌱 VEGAN" },
    { key: "gluten-free", label: "🌾 GLUTEN-FREE" },
    { key: "seafood", label: "🐟 SEAFOOD" },
    { key: "egg", label: "🥚 EGG" },
    { key: "keto", label: "🥑 KETO" },
    { key: "spicy", label: "🌶️ SPICY" },
  ];

  // Preload all menu images into memory on initial mount
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

  const rawItems = menu[activeCategory] || [];
  
  const currentItems = rawItems.filter((dish) => {
    if (selectedTag === "all") return true;
    if (selectedTag === "veg") {
      return dish.tags?.includes("veg") || dish.tags?.includes("vegan") || dish.diet === "Vegetarian";
    }
    if (selectedTag === "nonveg") {
      return dish.tags?.includes("nonveg") || dish.diet === "Non-Veg" || dish.diet === "Seafood";
    }
    if (selectedTag === "vegan") {
      return dish.tags?.includes("vegan");
    }
    if (selectedTag === "egg") {
      return dish.tags?.includes("egg");
    }
    return dish.tags?.includes(selectedTag);
  });

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
      className={`py-10 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto border-t border-[#EAE1D5] transition-transform duration-500 bg-[#FBF9F5] ${
        isMenuZoomed ? "scale-[1.015]" : "scale-100"
      }`}
    >
      {/* Section Header - Compact Spacing */}
      <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
        <p className="text-[11px] font-mono text-[#B86B35] tracking-[0.25em] uppercase font-semibold">
          [ 02 // CURATED CULINARY SELECTION ]
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#2B1B17] leading-snug">
          Italian Masterpieces, Crafted Daily
        </h2>
        <p className="text-xs font-mono text-[#7E6B60] tracking-wider">
          Select any dish to inspect artisanal ingredients & sommelier pairings
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            className={`py-1.5 px-4 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
              activeCategory === cat.key
                ? "bg-[#B86B35] text-white border-[#B86B35] font-semibold shadow-2xs"
                : "bg-white text-[#5C4A3E] border-[#EAE1D5] hover:border-[#B86B35] hover:text-[#B86B35]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dietary Filter Chips */}
      <div className="flex flex-wrap justify-center items-center gap-1.5 mb-7 text-[10px] font-mono">
        <span className="text-[#8C7769] tracking-wider uppercase mr-1 hidden sm:inline">
          Filter:
        </span>
        {dietaryFilters.map((df) => (
          <button
            key={df.key}
            onClick={() => setSelectedTag(df.key)}
            className={`py-1 px-2.5 rounded-full border transition-all cursor-pointer ${
              selectedTag === df.key
                ? "bg-[#2B1B17] text-white border-[#2B1B17] font-semibold"
                : "bg-white/80 text-[#7E6B60] border-[#EAE1D5] hover:border-[#B86B35] hover:text-[#B86B35]"
            }`}
          >
            {df.label}
          </button>
        ))}
      </div>

      {/* Dual Layout: Left Dotted-Leader List & Right Live Visual Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Dotted Leader Menu List */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="pb-1.5 border-b border-[#EAE1D5] flex justify-between items-center text-[11px] font-mono text-[#8C7769] tracking-widest uppercase">
            <span>PIATTO // DISH</span>
            <span>PREZZO // INR</span>
          </div>

          <div className="space-y-2">
            {currentItems.length === 0 ? (
              <div className="p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#D8CCC0] space-y-2">
                <p className="text-sm font-serif text-[#2B1B17]">
                  No dishes found matching this filter in {categories.find(c => c.key === activeCategory)?.label}.
                </p>
                <button
                  onClick={() => setSelectedTag("all")}
                  className="text-xs font-mono text-[#B86B35] underline cursor-pointer"
                >
                  Show all dishes in this category
                </button>
              </div>
            ) : (
              currentItems.map((dish) => {
                const isSelected = hoveredDish?.id === dish.id;
                const isNonVeg = dish.tags?.includes("nonveg") || dish.diet === "Non-Veg" || dish.diet === "Seafood";

                return (
                  <div
                    key={dish.id}
                    onMouseEnter={() => setHoveredDish(dish)}
                    onClick={() => {
                      setHoveredDish(dish);
                      onSelectDish(dish);
                    }}
                    className={`group relative p-2.5 rounded-xl cursor-pointer transition-all duration-150 border flex items-center gap-3 ${
                      isSelected
                        ? "bg-white border-[#B86B35]/40 shadow-2xs"
                        : "border-transparent hover:bg-white/70 hover:border-[#EAE1D5]"
                    }`}
                  >
                    {/* Inline Thumbnail for Instant Visual Feedback */}
                    <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#F5EFEB] border border-[#EAE1D5]">
                      <img
                        src={dish.img}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {/* Indian Standard Green / Red Dot Square */}
                          {isNonVeg ? <NonVegSymbol /> : <VegSymbol />}
                          
                          <span
                            className={`font-serif text-base sm:text-lg transition-colors truncate ${
                              isSelected ? "text-[#B86B35]" : "text-[#2B1B17] group-hover:text-[#B86B35]"
                            }`}
                          >
                            {dish.name}
                          </span>

                          {/* Extra dietary tags (Gluten-Free, Keto, Seafood, Egg, Vegan, Spicy) */}
                          <div className="hidden sm:inline-flex items-center gap-1 ml-1.5 shrink-0">
                            <DietaryBadges
                              tags={dish.tags?.filter(t => t !== "veg" && t !== "nonveg")}
                              excludeVegSymbols={true}
                            />
                          </div>
                        </div>

                        {/* Classic Dotted Leader */}
                        <span className="flex-grow mx-2 border-b border-dotted border-[#D8CCC0] group-hover:border-[#B86B35]/50 transition-colors hidden sm:inline" />

                        <span className="font-mono text-sm font-semibold text-[#2B1B17] group-hover:text-[#B86B35] whitespace-nowrap">
                          {dish.price}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-[#7E6B60] font-light mt-0.5">
                        <span className="line-clamp-1">{dish.ingredients}</span>
                        <div className="sm:hidden shrink-0 ml-2">
                          <DietaryBadges
                            tags={dish.tags?.filter(t => t !== "veg" && t !== "nonveg")}
                            excludeVegSymbols={true}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-[#B86B35] uppercase tracking-wider shrink-0 ml-2 hidden sm:inline group-hover:underline">
                          [ DETAILS ↗ ]
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-2 text-[10px] font-mono text-[#8C7769] flex justify-between border-t border-[#EAE1D5]">
            <span>*All prices in INR. Prepared with certified DOP Italian imports.</span>
          </div>
        </div>

        {/* Right: Solitary Dynamic Photography Showcase - Instant Display */}
        <div className="lg:col-span-5 sticky top-20 hidden lg:block">
          <div className="rounded-2xl overflow-hidden border border-[#EAE1D5] bg-white p-3.5 shadow-sm space-y-3">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F5EFEB]">
              {hoveredDish && (
                <img
                  key={hoveredDish.id}
                  src={hoveredDish.img}
                  alt={hoveredDish.name}
                  loading="eager"
                  className="w-full h-full object-cover transition-opacity duration-150 filter contrast-[102%]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-2.5 left-3.5 right-3.5 flex justify-between items-end text-white">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#DFC2A5] uppercase block">
                    {hoveredDish?.calories}
                  </span>
                  <span className="font-serif text-base font-medium block">
                    {hoveredDish?.name}
                  </span>
                  <div className="mt-1">
                    <DietaryBadges tags={hoveredDish?.tags} diet={hoveredDish?.diet} showLabels={true} />
                  </div>
                </div>
                <button
                  onClick={() => onSelectDish(hoveredDish)}
                  className="p-1.5 rounded-full bg-[#B86B35] text-white hover:bg-[#8F4918] transition-colors cursor-pointer"
                  title="Inspect Tasting Notes"
                >
                  <Eye size={14} />
                </button>
              </div>
            </div>

            {hoveredDish && (
              <div className="p-0.5 space-y-1.5 text-xs">
                <p className="text-[#5C4A3E] italic font-serif text-sm">
                  "{hoveredDish.flavor}"
                </p>
                <div className="pt-1.5 border-t border-[#EAE1D5] flex justify-between items-center font-mono text-[10px] text-[#7E6B60]">
                  {hoveredDish.pair ? (
                    <button
                      type="button"
                      onClick={() => onSelectDish({ ...hoveredDish, openPairFirst: true })}
                      className="group/pair text-left flex items-center gap-1.5 hover:text-[#B86B35] transition-colors duration-200 cursor-pointer"
                    >
                      <Wine size={12} className="text-[#B86B35] shrink-0" />
                      <span>Pair with: <strong className="text-[#2B1B17] group-hover/pair:text-[#B86B35] font-serif transition-colors duration-200">{hoveredDish.pair}</strong></span>
                    </button>
                  ) : <span />}
                  <button
                    onClick={() => onSelectDish(hoveredDish)}
                    className="text-[#8C7769] hover:text-[#B86B35] transition-colors duration-200 flex items-center gap-0.5 cursor-pointer font-medium shrink-0 ml-2"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight size={11} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Menu Action CTA */}
      <div className="mt-8 text-center">
        <button
          onClick={onOpenAiConcierge}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase border border-[#B86B35] bg-[#B86B35]/10 text-[#B86B35] hover:bg-[#B86B35] hover:text-white py-2.5 px-6 rounded-full transition-all duration-200 shadow-2xs cursor-pointer"
        >
          <Sparkles size={13} />
          <span>[ ASK AI PALATE CONCIERGE ]</span>
        </button>
      </div>

    </section>
  );
}
