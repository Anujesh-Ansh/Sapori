import React from "react";

export function VegSymbol({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-emerald-600 rounded-[2px] bg-white p-[2px] shrink-0 align-middle ${className}`}
      title="Vegetarian"
      aria-label="Vegetarian"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
    </span>
  );
}

export function NonVegSymbol({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-[#8B2519] rounded-[2px] bg-white p-[2px] shrink-0 align-middle ${className}`}
      title="Non-Vegetarian"
      aria-label="Non-Vegetarian"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#8B2519] block"></span>
    </span>
  );
}

export default function DietaryBadges({ tags = [], diet, showLabels = false }) {
  // Build normalized list of tags
  const allTags = [...(tags || [])];
  
  if (diet === "Vegetarian" && !allTags.includes("veg")) {
    allTags.unshift("veg");
  } else if ((diet === "Non-Veg" || diet === "Seafood") && !allTags.includes("nonveg")) {
    allTags.unshift("nonveg");
  }

  if (allTags.length === 0) return null;

  return (
    <div className="inline-flex items-center flex-wrap gap-1.5">
      {allTags.map((tag, idx) => {
        const normalized = tag.toLowerCase().replace(/[\s_]+/g, "-");

        if (normalized === "veg" || normalized === "vegetarian") {
          return (
            <span key={`${tag}-${idx}`} className="inline-flex items-center gap-1">
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
          return (
            <span key={`${tag}-${idx}`} className="inline-flex items-center gap-1">
              <NonVegSymbol />
              {showLabels && (
                <span className="text-[10px] font-mono font-semibold text-[#8B2519] uppercase tracking-wider">
                  NON-VEG
                </span>
              )}
            </span>
          );
        }

        if (normalized === "gluten-free" || normalized === "glutenfree" || normalized === "gf") {
          return (
            <span
              key={`${tag}-${idx}`}
              title="Gluten Free"
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#F5EDE4] text-[#8C5835] border border-[#DFCBB9]"
            >
              GF
            </span>
          );
        }

        if (normalized === "keto") {
          return (
            <span
              key={`${tag}-${idx}`}
              title="Keto Friendly"
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#EFEBF5] text-[#5D3D7A] border border-[#DACFE7]"
            >
              KETO
            </span>
          );
        }

        if (normalized === "seafood") {
          return (
            <span
              key={`${tag}-${idx}`}
              title="Contains Seafood"
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#EBF3F5] text-[#2C6575] border border-[#CFDFE4]"
            >
              SEAFOOD
            </span>
          );
        }

        if (normalized === "spicy") {
          return (
            <span
              key={`${tag}-${idx}`}
              title="Spicy / Piquant"
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase font-semibold bg-[#FBEFEF] text-[#A62C2B] border border-[#F2D0D0]"
            >
              🌶️ SPICY
            </span>
          );
        }

        return (
          <span
            key={`${tag}-${idx}`}
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase bg-[#F5EFEB] text-[#5C4A3E] border border-[#EAE1D5]"
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
