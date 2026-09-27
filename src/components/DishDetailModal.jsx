import React from "react";
import { X, Utensils, Wine } from "lucide-react";
import DietaryBadges, { VegSymbol, NonVegSymbol } from "./DietaryBadges";

export default function DishDetailModal({ dish, onClose, onReserveForDish }) {
  if (!dish) return null;

  const isNonVeg = dish.tags?.includes("nonveg") || dish.diet === "Non-Veg" || dish.diet === "Seafood";

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
          <div className="md:col-span-6 relative aspect-square md:aspect-auto min-h-[240px] md:min-h-full overflow-hidden bg-[#F5EFEB]">
            <img
              src={dish.img}
              alt={dish.name}
              className="w-full h-full object-cover object-center"
            />
            {/* Dietary Tags Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl border border-[#EAE1D5] shadow-2xs">
              <DietaryBadges tags={dish.tags} diet={dish.diet} showLabels={true} />
            </div>
            {dish.calories && (
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider text-[#4A3B34] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#EAE1D5]">
                {dish.calories}
              </div>
            )}
          </div>

          {/* Dish Information */}
          <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {isNonVeg ? <NonVegSymbol /> : <VegSymbol />}
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1B17] leading-snug">
                  {dish.name}
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-lg text-[#B86B35] font-semibold">
                  {dish.price}
                </span>
                <DietaryBadges tags={dish.tags?.filter(t => t !== "veg" && t !== "nonveg")} />
              </div>

              {/* Ingredients & Flavor Profile */}
              <div className="space-y-2.5 text-xs pt-3 border-t border-[#EAE1D5] font-light">
                <div>
                  <span className="font-mono uppercase text-[10px] tracking-wider text-[#8C7769] block font-semibold mb-0.5">
                    Artisanal Ingredients
                  </span>
                  <p className="text-[#4A3B34] leading-relaxed">
                    {dish.ingredients}
                  </p>
                </div>

                <div>
                  <span className="font-mono uppercase text-[10px] tracking-wider text-[#8C7769] block font-semibold mb-0.5">
                    Flavor Profile
                  </span>
                  <p className="text-[#4A3B34] leading-relaxed italic font-serif text-sm">
                    "{dish.flavor}"
                  </p>
                </div>

                {dish.pair && (
                  <div className="p-2.5 rounded-xl bg-white border border-[#EAE1D5] flex items-start gap-2 shadow-2xs">
                    <Wine size={15} className="text-[#B86B35] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono uppercase text-[10px] tracking-wider text-[#8C7769] block font-semibold">
                        Sommelier Pairing
                      </span>
                      <span className="text-[#2B1B17] text-xs font-serif font-medium">
                        {dish.pair}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onReserveForDish) onReserveForDish(dish);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#B86B35] hover:bg-[#8F4918] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
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
