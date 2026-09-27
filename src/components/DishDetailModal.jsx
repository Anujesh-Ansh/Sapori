import React, { useState, useEffect } from "react";
import { X, Utensils, Wine } from "lucide-react";
import DietaryBadges, { VegSymbol, NonVegSymbol, EggSymbol, DietarySymbol } from "./DietaryBadges";
import { findPairedDish } from "../utils/pairingHelper";

export default function DishDetailModal({ dish, menu, onClose, onReserveForDish }) {
  if (!dish) return null;

  const [activeDishId, setActiveDishId] = useState(null);
  const [primaryDish, setPrimaryDish] = useState(null);
  const [pairedDish, setPairedDish] = useState(null);

  useEffect(() => {
    if (dish) {
      setPrimaryDish(dish);
      const paired = findPairedDish(dish.pair, menu);
      setPairedDish(paired);
      if (dish.openPairFirst && paired) {
        setActiveDishId(paired.id);
      } else {
        setActiveDishId(dish.id);
      }
    } else {
      setPrimaryDish(null);
      setPairedDish(null);
      setActiveDishId(null);
    }
  }, [dish, menu]);

  const currentDish = (activeDishId === pairedDish?.id && pairedDish) ? pairedDish : primaryDish || dish;
  const otherDish = (currentDish?.id === primaryDish?.id) ? pairedDish : primaryDish;
  const isNonVeg = currentDish?.tags?.includes("nonveg") || currentDish?.diet === "Non-Veg" || currentDish?.diet === "Seafood";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B1B17]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#EAE1D5] rounded-3xl overflow-hidden shadow-2xl z-10 my-8 animate-fadeIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white hover:bg-[#B86B35] text-[#2B1B17] hover:text-white flex items-center justify-center transition-colors border border-[#EAE1D5] shadow-xs cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Dish Image */}
          <div className="md:col-span-6 relative aspect-square md:aspect-auto min-h-[260px] md:min-h-full overflow-hidden bg-[#F5EFEB]">
            <img
              key={currentDish.id || currentDish.name}
              src={currentDish.img}
              alt={currentDish.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {/* Dietary Tags Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl border border-[#EAE1D5] shadow-2xs">
              <DietaryBadges tags={currentDish.tags} diet={currentDish.diet} showLabels={true} />
            </div>
            {currentDish.calories && (
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider text-[#4A3B34] bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#EAE1D5]">
                {currentDish.calories}
              </div>
            )}
          </div>

          {/* Dish Information */}
          <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DietarySymbol dish={currentDish} />
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1B17] leading-snug">
                  {currentDish.name}
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-lg text-[#B86B35] font-semibold">
                  {currentDish.price}
                </span>
                <DietaryBadges tags={currentDish.tags?.filter(t => t !== "veg" && t !== "nonveg")} />
              </div>

              {/* Ingredients & Flavor Profile */}
              <div className="space-y-2.5 text-xs pt-3 border-t border-[#EAE1D5] font-light">
                <div>
                  <span className="font-mono uppercase text-[10px] tracking-wider text-[#8C7769] block font-semibold mb-0.5">
                    Artisanal Ingredients
                  </span>
                  <p className="text-[#4A3B34] leading-relaxed">
                    {currentDish.ingredients}
                  </p>
                </div>

                <div>
                  <span className="font-mono uppercase text-[10px] tracking-wider text-[#8C7769] block font-semibold mb-0.5">
                    Flavor Profile
                  </span>
                  <p className="text-[#4A3B34] leading-relaxed italic font-serif text-sm">
                    "{currentDish.flavor}"
                  </p>
                </div>

                {/* PAIR WITH: Clean minimal card without clutter tags, subtle color change on hover, toggling A to B & B to A */}
                {otherDish && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDishId(otherDish.id);
                    }}
                    className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-[#F7F2EC] border border-[#EAE1D5] hover:border-[#DFC8B2] transition-colors duration-200 flex items-center justify-between gap-3 group cursor-pointer shadow-2xs mt-3"
                    title={otherDish.name}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#B86B35]/10 text-[#B86B35] flex items-center justify-center shrink-0 group-hover:bg-[#B86B35] group-hover:text-white transition-colors duration-200">
                        <Wine size={16} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono uppercase text-[9px] tracking-widest text-[#8C7769] block font-medium">
                          Pair with
                        </span>
                        <span className="text-[#2B1B17] group-hover:text-[#B86B35] text-sm font-serif font-medium transition-colors duration-200 line-clamp-1 mt-0.5 block">
                          {otherDish.name}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#8C7769] group-hover:text-[#B86B35] transition-colors duration-200 shrink-0">
                      {otherDish.price}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onReserveForDish) onReserveForDish(currentDish);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Utensils size={14} />
                <span>Reserve Table to Taste This</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
