import React from "react";

// Official Indian Food Regulatory Green Dot in Square
export function VegSymbol({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-emerald-600 rounded-[2px] bg-white p-[2px] shrink-0 align-middle shadow-2xs ${className}`}
      title="Vegetarian"
      aria-label="Vegetarian"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
    </span>
  );
}

// Official Indian Food Regulatory Red Dot in Square
export function NonVegSymbol({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-[#8B2519] rounded-[2px] bg-white p-[2px] shrink-0 align-middle shadow-2xs ${className}`}
      title="Non-Vegetarian"
      aria-label="Non-Vegetarian"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#8B2519] block"></span>
    </span>
  );
}

// Official Indian Food Regulatory Orange Dot in Square for Eggitarian (Contains Egg, No Meat)
export function EggSymbol({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-[#EA580C] rounded-[2px] bg-white p-[2px] shrink-0 align-middle shadow-2xs ${className}`}
      title="Eggitarian (Contains Egg)"
      aria-label="Eggitarian"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] block"></span>
    </span>
  );
}

export const EggitarianSymbol = EggSymbol;

// Unified smart dietary indicator symbol (Dot in square)
export function DietarySymbol({ dish, tags = [], diet = "", className = "" }) {
  const allTags = dish ? (dish.tags || []) : tags;
  const dietVal = dish ? (dish.diet || "") : diet;
  const isNonVeg = allTags.includes("nonveg") || dietVal === "Non-Veg" || dietVal === "Seafood";
  const hasEgg = allTags.includes("egg") || allTags.includes("contains-egg") || dietVal === "Eggitarian";

  if (isNonVeg) {
    return <NonVegSymbol className={className} />;
  }
  if (hasEgg) {
    return <EggSymbol className={className} />;
  }
  return <VegSymbol className={className} />;
}

// Blue Fish Icon for Seafood
export function BlueFishIcon({ className = "" }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-sky-600 shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8c3 0 5.7-1.7 7-4.2l3 2.2V6l-3 2.2C17.7 5.7 15 4 12 4zm-4 9c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
    </svg>
  );
}

// White Dhaan (Rice Plant / Ear of Grain) Icon for Gluten-Free
export function WhiteDhaanIcon({ className = "" }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-[#B88746] shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 22 16 8" />
      <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
    </svg>
  );
}

// Orange Egg Icon
export function OrangeEggIcon({ className = "" }) {
  return (
    <svg
      className={`w-3 h-3.5 shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="#EA580C"
    >
      <path d="M12 2C8 2 4 8 4 15a8 8 0 0 0 16 0C20 8 16 2 12 2z" />
    </svg>
  );
}

// Vegan Botanical Sprout Icon
export function VeganLeafIcon({ className = "" }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-emerald-600 shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
    </svg>
  );
}

// Keto Avocado / Nutrition Icon
export function KetoIcon({ className = "" }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-purple-700 shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2a6 6 0 0 0-6 6c0 4 3 14 6 14s6-10 6-14a6 6 0 0 0-6-6z" />
      <circle cx="12" cy="14" r="2.8" fill="#8B5CF6" />
    </svg>
  );
}

export default function DietaryBadges({
  tags = [],
  diet,
  showLabels = true,
  excludeVegSymbols = false,
}) {
  const allTags = [...(tags || [])];

  if (!excludeVegSymbols) {
    if (
      (diet === "Vegetarian" || diet === "veg") &&
      !allTags.includes("veg") &&
      !allTags.includes("eggitarian")
    ) {
      allTags.unshift("veg");
    } else if (
      (diet === "Non-Veg" || diet === "nonveg" || diet === "Seafood") &&
      !allTags.includes("nonveg")
    ) {
      allTags.unshift("nonveg");
    } else if (
      (diet === "Eggitarian" || diet === "eggitarian") &&
      !allTags.includes("egg") &&
      !allTags.includes("eggitarian")
    ) {
      allTags.unshift("eggitarian");
    }
  }

  if (allTags.length === 0) return null;

  const hasEgg = allTags.some((t) => {
    const n = t.toLowerCase().replace(/[\s_]+/g, "-");
    return n === "egg" || n === "contains-egg" || n === "eggitarian";
  }) || diet === "Eggitarian";

  const hasNonVeg = allTags.some((t) => {
    const n = t.toLowerCase().replace(/[\s_]+/g, "-");
    return n === "nonveg" || n === "non-veg";
  }) || diet === "Non-Veg" || diet === "Seafood";

  const isEggitarianDish = hasEgg && !hasNonVeg;
  let renderedEggitarianPrimary = false;

  return (
    <div className="inline-flex items-center flex-wrap gap-1.5">
      {allTags.map((tag, idx) => {
        const normalized = tag.toLowerCase().replace(/[\s_]+/g, "-");

        if (normalized === "veg" || normalized === "vegetarian" || normalized === "eggitarian") {
          if (excludeVegSymbols) return null;

          if (isEggitarianDish) {
            renderedEggitarianPrimary = true;
            return (
              <span
                key={`${tag}-${idx}`}
                className="inline-flex items-center gap-1"
                title="Eggitarian (Contains Egg, No Meat)"
              >
                <EggSymbol />
                {showLabels && (
                  <span className="text-[10px] font-mono font-semibold text-[#EA580C] uppercase tracking-wider">
                    EGGITARIAN
                  </span>
                )}
              </span>
            );
          }

          return (
            <span
              key={`${tag}-${idx}`}
              className="inline-flex items-center gap-1"
              title="100% Pure Vegetarian"
            >
              <VegSymbol />
              {showLabels && (
                <span className="text-[10px] font-mono font-semibold text-emerald-800 uppercase tracking-wider">
                  VEG
                </span>
              )}
            </span>
          );
        }

        if (normalized === "nonveg" || normalized === "non-veg") {
          if (excludeVegSymbols) return null;
          return (
            <span
              key={`${tag}-${idx}`}
              className="inline-flex items-center gap-1"
              title="Non-Vegetarian"
            >
              <NonVegSymbol />
              {showLabels && (
                <span className="text-[10px] font-mono font-semibold text-[#8B2519] uppercase tracking-wider">
                  NON-VEG
                </span>
              )}
            </span>
          );
        }

        // GLUTEN-FREE with white dhaan (rice plant)
        if (
          normalized === "gluten-free" ||
          normalized === "glutenfree" ||
          normalized === "gf"
        ) {
          return (
            <span
              key={`${tag}-${idx}`}
              title="Gluten Free (Prepared with Rice/Ancient Grains)"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#FBF7F0] text-[#7A5328] border border-[#DFCBB9] shadow-2xs"
            >
              <WhiteDhaanIcon />
              <span>GLUTEN-FREE</span>
            </span>
          );
        }

        // SEAFOOD with blue fish
        if (normalized === "seafood") {
          return (
            <span
              key={`${tag}-${idx}`}
              title="Contains Fresh Seafood"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#F0F7FB] text-[#0369A1] border border-[#BAE6FD] shadow-2xs"
            >
              <BlueFishIcon />
              <span>SEAFOOD</span>
            </span>
          );
        }

        // EGG with orange egg
        if (normalized === "egg" || normalized === "contains-egg") {
          if (!excludeVegSymbols && renderedEggitarianPrimary) {
            return null;
          }
          return (
            <span
              key={`${tag}-${idx}`}
              title="Contains Egg"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5] shadow-2xs"
            >
              <OrangeEggIcon />
              <span>EGG</span>
            </span>
          );
        }

        // VEGAN with green plant leaf
        if (normalized === "vegan") {
          return (
            <span
              key={`${tag}-${idx}`}
              title="100% Plant-Based Vegan"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] shadow-2xs"
            >
              <VeganLeafIcon />
              <span>VEGAN</span>
            </span>
          );
        }

        // KETO with avocado / nutrition icon
        if (normalized === "keto") {
          return (
            <span
              key={`${tag}-${idx}`}
              title="Keto Low-Carb High-Fat"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#FAF5FF] text-[#6B21A8] border border-[#E9D5FF] shadow-2xs"
            >
              <KetoIcon />
              <span>KETO</span>
            </span>
          );
        }

        // SPICY with red chili
        if (normalized === "spicy") {
          return (
            <span
              key={`${tag}-${idx}`}
              title="Spicy / Piquant Calabrian Heat"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] shadow-2xs"
            >
              <span>🌶️</span>
              <span>SPICY</span>
            </span>
          );
        }

        return (
          <span
            key={`${tag}-${idx}`}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#F5EFEB] text-[#5C4A3E] border border-[#EAE1D5]"
          >
            {tag.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
}

