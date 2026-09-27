import React, { useState } from "react";
import { Sparkles, Utensils, Wine, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

export default function AiConcierge({ menu, onSelectDish, onReserveForDish }) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const sampleChips = [
    "Rich, saucy & spicy pasta",
    "Light, fresh burrata & salad",
    "Decadent black truffle pasta",
    "Crisp Mediterranean seafood",
    "Melt-in-mouth gnocchi comfort",
    "Wood-fired smoky pizza"
  ];

  const handleRecommend = (customText) => {
    const query = (customText || prompt).toLowerCase().trim();
    if (!query) return;

    setIsLoading(true);
    setRecommendation(null);

    // Simulate concierge curation with deep matching logic
    setTimeout(() => {
      let matchedDish = menu.pasta[1]; // Tagliatelle al Tartufo default
      let reason = "An opulent Tuscan plate featuring hand-rolled tagliatelle, intense Norcia black truffles, and 36-month Vacche Rosse Parmigiano.";

      if (query.includes("saucy") || query.includes("spicy") || query.includes("diavola") || query.includes("chili") || query.includes("hot")) {
        matchedDish = menu.pizza[2]; // Diavola Piccante
        reason = "A masterclass in heat balance: fiery Calabrian spianata salami cut through by sweet San Marzano DOP reduction and smoked provola.";
      } else if (query.includes("light") || query.includes("burrata") || query.includes("cheese") || query.includes("fresh") || query.includes("salad")) {
        matchedDish = menu.antipasti[0]; // Burrata Pugliese
        reason = "Delicate Puglian burrata with sweet black figs and aged balsamic—refreshing, lactic richness without heaviness.";
      } else if (query.includes("truffle") || query.includes("mushroom") || query.includes("decadent") || query.includes("luxur")) {
        matchedDish = menu.pasta[1]; // Tagliatelle al Tartufo Nero
        reason = "A deep earthy immersion: 30-yolk golden ribbons coated in velvety emulsion and showered in black Norcia truffles.";
      } else if (query.includes("seafood") || query.includes("fish") || query.includes("calamari") || query.includes("prawn") || query.includes("ocean")) {
        matchedDish = menu.antipasti[2]; // Fritto Misto di Mare
        reason = "Crisp, feather-light tempura of baby calamari and tiger prawns with an invigorating Amalfi lemon aioli.";
      } else if (query.includes("gnocchi") || query.includes("potato") || query.includes("comfort") || query.includes("warm")) {
        matchedDish = menu.pasta[2]; // Gnocchi alla Sorrentina
        reason = "Handmade mountain potato pillows baked in slow San Marzano sugo with bubbling stringy fior di latte.";
      } else if (query.includes("lamb") || query.includes("meat") || query.includes("steak") || query.includes("brais")) {
        matchedDish = menu.secondi[0]; // Agnello Brasato
        reason = "Slow-braised New Zealand lamb shank, Jerusalem artichoke mousseline, and a fragrant rosemary jus reduction.";
      } else if (query.includes("dessert") || query.includes("sweet") || query.includes("tiramisu") || query.includes("coffee")) {
        matchedDish = menu.dolci[0]; // Tiramisu
        reason = "Cloud-soft zabaglione mascarpone soaked with roasted Illy espresso and amaretto—the quintessential Italian finale.";
      } else if (query.includes("pizza") || query.includes("margherita") || query.includes("crust")) {
        matchedDish = menu.pizza[0]; // Margherita Verace
        reason = "450°C wood-fired blistered crust with sweet San Marzano DOP tomatoes and fresh Campana buffalo mozzarella.";
      }

      setRecommendation({
        dish: matchedDish,
        reason,
        confidence: "98% Match"
      });
      setIsLoading(false);
    }, 500);
  };

  const handleChipClick = (chipText) => {
    setPrompt(chipText);
    handleRecommend(chipText);
  };

  return (
    <section id="ai-concierge" className="py-24 px-6 md:px-16 max-w-4xl mx-auto border-t border-white/10">
      <div className="bg-[#161616] border border-[#C8A97E]/30 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A97E]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8A97E] animate-pulse" />
          <p className="text-xs font-mono text-[#C8A97E] tracking-[0.3em] uppercase">
            [ 07 // SMART PALATE CONCIERGE ]
          </p>
        </div>

        <h3 className="text-2xl sm:text-4xl font-serif text-white mb-2 leading-tight">
          Tell Us What You Are Craving
        </h3>
        <p className="text-xs sm:text-sm text-white/60 mb-6 font-light max-w-xl">
          Describe your mood, flavors, or dietary desires. Our culinary algorithm consults Chef Alessandro's kitchen notes to recommend your ideal dish and sommelier pairing.
        </p>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sampleChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleChipClick(chip)}
              className="text-[11px] font-mono tracking-wider py-1.5 px-3.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C8A97E] hover:text-[#C8A97E] text-white/70 transition-colors"
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
              placeholder="e.g. rich, saucy and spicy pasta with wood-fired flavor..."
              className="w-full bg-[#111111] border border-white/20 rounded-xl px-5 py-4 text-sm font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#C8A97E] transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="flex-1 py-3.5 px-6 bg-[#C8A97E] hover:bg-[#DFC8A5] disabled:opacity-50 text-[#111111] font-mono text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles size={15} />
              <span>{isLoading ? "Consulting Culinary Concierge..." : "Find Matching Dish"}</span>
            </button>

            {recommendation && (
              <button
                type="button"
                onClick={() => {
                  setPrompt("");
                  setRecommendation(null);
                }}
                className="py-3.5 px-5 border border-white/20 text-white/60 hover:text-white rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </form>

        {/* Recommendation Result Card */}
        {recommendation && (
          <div className="mt-8 p-6 rounded-2xl bg-[#111111] border border-[#C8A97E]/50 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 size={14} />
                <span>Palate Match Found ({recommendation.confidence})</span>
              </span>
              <span className="text-xs font-mono text-white/50">{recommendation.dish.calories}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-4 aspect-square rounded-xl overflow-hidden border border-white/10">
                <img
                  src={recommendation.dish.img}
                  alt={recommendation.dish.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-8 space-y-2 text-left">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-serif text-2xl text-white">
                    {recommendation.dish.name}
                  </h4>
                  <span className="font-mono text-base text-[#C8A97E] font-medium">
                    {recommendation.dish.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {recommendation.reason}
                </p>

                <div className="pt-2 text-xs font-mono text-[#C8A97E] flex items-center gap-2">
                  <Wine size={14} />
                  <span>Sommelier Pairing: <strong className="text-white font-serif italic">{recommendation.dish.pair}</strong></span>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => onSelectDish(recommendation.dish)}
                    className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] uppercase tracking-wider transition-colors"
                  >
                    View Ingredients
                  </button>
                  <button
                    onClick={() => onReserveForDish(recommendation.dish)}
                    className="py-2 px-4 rounded-lg bg-[#C8A97E] text-black font-mono text-[11px] uppercase tracking-wider font-semibold hover:bg-[#DFC8A5] transition-colors"
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
