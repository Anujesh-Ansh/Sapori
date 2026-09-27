import React, { useState } from "react";
import { X, Sparkles, Utensils, Wine, CheckCircle2, RotateCcw } from "lucide-react";

export default function AiConciergeModal({ isOpen, onClose, menu, onSelectDish, onReserveForDish }) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  if (!isOpen) return null;

  const sampleChips = [
    "Rich, comforting pasta",
    "Light, fresh burrata salad",
    "Wood-fired blistered pizza",
    "Crisp golden calamari & seafood",
    "Slow-braised tender lamb",
    "Classic espresso tiramisu"
  ];

  const handleRecommend = (customText) => {
    const query = (customText || prompt).toLowerCase().trim();
    if (!query) return;

    setIsLoading(true);
    setRecommendation(null);

    setTimeout(() => {
      let matchedDish = menu.pasta[1]; // Tagliatelle default
      let reason = "Egg ribbon tagliatelle coated in shaved Norcia black truffles and 24-month Vacche Rosse Parmigiano.";

      if (query.includes("pizza") || query.includes("crust") || query.includes("wood")) {
        matchedDish = menu.pizza[0]; // Margherita
        reason = "A 450°C wood-fired blistered crust with sweet San Marzano DOP tomatoes and fresh Campana mozzarella.";
      } else if (query.includes("light") || query.includes("burrata") || query.includes("salad") || query.includes("cheese")) {
        matchedDish = menu.appetizers[0]; // Burrata
        reason = "Delicate Puglian burrata with ripe tomatoes, sweet figs, and aged balsamic—refreshing, lactic richness.";
      } else if (query.includes("crisp") || query.includes("seafood") || query.includes("calamari") || query.includes("prawn")) {
        matchedDish = menu.appetizers[1]; // Fritto Misto
        reason = "Feather-light golden tempura of baby calamari and tiger prawns with an invigorating Amalfi lemon aioli.";
      } else if (query.includes("lamb") || query.includes("meat") || query.includes("brais") || query.includes("roast")) {
        matchedDish = menu.secondi[2]; // Agnello
        reason = "Slow-braised New Zealand lamb shank with natural rosemary jus and silky artichoke puree.";
      } else if (query.includes("comfort") || query.includes("potato") || query.includes("gnocchi")) {
        matchedDish = menu.pasta[2]; // Gnocchi
        reason = "Handmade mountain potato pillows baked in slow San Marzano pomodoro with stringy melted mozzarella.";
      } else if (query.includes("sweet") || query.includes("dessert") || query.includes("tiramisu")) {
        matchedDish = menu.desserts[0]; // Tiramisu
        reason = "Illy espresso soaked savoiardi ladyfingers layered with velvety sabayon mascarpone.";
      }

      setRecommendation({
        dish: matchedDish,
        reason,
        confidence: "98% Palate Match"
      });
      setIsLoading(false);
    }, 450);
  };

  const handleChipClick = (chip) => {
    setPrompt(chip);
    handleRecommend(chip);
  };

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
        className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#EAE1D5] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 animate-fadeIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white hover:bg-[#B86B35] text-[#2B1B17] hover:text-white flex items-center justify-center transition-colors border border-[#EAE1D5] shadow-xs"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B86B35] animate-pulse" />
          <p className="text-[11px] font-mono text-[#B86B35] tracking-[0.25em] uppercase font-semibold">
            SMART PALATE CONCIERGE
          </p>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif text-[#2B1B17] mb-2 leading-tight">
          What are you craving today?
        </h3>
        <p className="text-xs sm:text-sm text-[#7E6B60] mb-5 font-light">
          Describe your taste or mood to receive an instant chef recommendation and sommelier pairing.
        </p>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {sampleChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleChipClick(chip)}
              className="text-[11px] font-mono tracking-wider py-1 px-3 rounded-full bg-white border border-[#EAE1D5] hover:border-[#B86B35] hover:text-[#B86B35] text-[#5C4A3E] transition-colors"
            >
              + {chip}
            </button>
          ))}
        </div>

        {/* Search Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRecommend();
          }}
          className="space-y-4"
        >
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. rich pasta with truffles and fresh cheese..."
              className="w-full bg-white border border-[#EAE1D5] rounded-xl px-4 py-3 text-sm font-mono text-[#2B1B17] placeholder-[#8C7769]/50 focus:outline-none focus:border-[#B86B35] shadow-xs"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="flex-1 py-3 px-5 bg-[#B86B35] hover:bg-[#8F4918] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>{isLoading ? "Consulting Chef..." : "Find Matching Dish"}</span>
            </button>

            {recommendation && (
              <button
                type="button"
                onClick={() => {
                  setPrompt("");
                  setRecommendation(null);
                }}
                className="py-3 px-4 border border-[#EAE1D5] bg-white text-[#5C4A3E] hover:text-[#2B1B17] rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-1"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </form>

        {/* Recommendation Result Card */}
        {recommendation && (
          <div className="mt-6 p-5 rounded-2xl bg-white border border-[#B86B35]/40 space-y-4 animate-fadeIn shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE1D5]">
              <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1.5 uppercase font-medium">
                <CheckCircle2 size={14} />
                <span>{recommendation.confidence}</span>
              </span>
              <span className="text-xs font-mono text-[#8C7769]">{recommendation.dish.calories}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-4 aspect-square rounded-xl overflow-hidden border border-[#EAE1D5]">
                <img
                  src={recommendation.dish.img}
                  alt={recommendation.dish.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-8 space-y-2 text-left">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-serif text-xl sm:text-2xl text-[#2B1B17]">
                    {recommendation.dish.name}
                  </h4>
                  <span className="font-mono text-sm sm:text-base text-[#B86B35] font-semibold">
                    {recommendation.dish.price}
                  </span>
                </div>

                <p className="text-xs text-[#5C4A3E] font-light leading-relaxed">
                  {recommendation.reason}
                </p>

                <div className="pt-1 text-xs font-mono text-[#B86B35] flex items-center gap-1.5">
                  <Wine size={13} />
                  <span>Pair with: <strong className="text-[#2B1B17] font-serif italic">{recommendation.dish.pair}</strong></span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectDish(recommendation.dish);
                    }}
                    className="py-1.5 px-3 rounded-lg border border-[#EAE1D5] bg-white hover:bg-[#F5EFEB] text-[#2B1B17] font-mono text-[11px] uppercase tracking-wider transition-colors"
                  >
                    View Ingredients
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onReserveForDish(recommendation.dish);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-[#B86B35] text-white font-mono text-[11px] uppercase tracking-wider font-semibold hover:bg-[#8F4918] transition-colors"
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
