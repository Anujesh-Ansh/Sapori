// Sommelier Pairing Utility: resolves any paired beverage or dish into a full-fidelity object with dedicated unique photography
export function findPairedDish(pairString, menu) {
  if (!pairString) return null;
  const str = pairString.toLowerCase().trim();

  // 1. Gather all dishes from current menu
  const allDishes = [];
  if (menu) {
    Object.values(menu).forEach((list) => {
      if (Array.isArray(list)) allDishes.push(...list);
    });
  }

  // Exact or clean name match against menu items (food or cocktails)
  for (const dish of allDishes) {
    const dishName = dish.name.toLowerCase();
    const cleanPair = str.split("(")[0].trim();
    if (str.includes(dishName) || dishName.includes(cleanPair)) {
      return dish;
    }
  }

  // Keyword matches to cocktail & food items
  if (str.includes("negroni")) {
    const dish = allDishes.find((d) => d.id === "negroni");
    if (dish) return dish;
  }
  if (str.includes("amalfi")) {
    const dish = allDishes.find((d) => d.id === "amalfi_mocktail");
    if (dish) return dish;
  }
  if (str.includes("martini") && !str.includes("espresso")) {
    const dish = allDishes.find((d) => d.id === "martini");
    if (dish) return dish;
  }
  if (str.includes("whisky")) {
    const dish = allDishes.find((d) => d.id === "whisky_sour");
    if (dish) return dish;
  }
  if (str.includes("old fashioned") || str.includes("fashioned")) {
    const dish = allDishes.find((d) => d.id === "old_fashioned");
    if (dish) return dish;
  }
  if (str.includes("margarita")) {
    const dish = allDishes.find((d) => d.id === "margarita");
    if (dish) return dish;
  }
  if (str.includes("focaccia")) {
    const dish = allDishes.find((d) => d.id === "focaccia");
    if (dish) return dish;
  }
  if (str.includes("burrata")) {
    const dish = allDishes.find((d) => d.id === "burrata");
    if (dish) return dish;
  }
  if (str.includes("tagliatelle")) {
    const dish = allDishes.find((d) => d.id === "tagliatelle");
    if (dish) return dish;
  }
  if (str.includes("agnello")) {
    const dish = allDishes.find((d) => d.id === "agnello");
    if (dish) return dish;
  }
  if (str.includes("tiramis")) {
    const dish = allDishes.find((d) => d.id === "tiramisu");
    if (dish) return dish;
  }
  if (str.includes("zuppa")) {
    const dish = allDishes.find((d) => d.id === "zuppa");
    if (dish) return dish;
  }
  if (str.includes("pizza") && !str.includes("diavola")) {
    const dish = allDishes.find((d) => d.id === "margherita");
    if (dish) return dish;
  }
  if (str.includes("diavola")) {
    const dish = allDishes.find((d) => d.id === "diavola");
    if (dish) return dish;
  }
  if (str.includes("fritto") || str.includes("oyster")) {
    const dish = allDishes.find((d) => d.id === "fritto");
    if (dish) return dish;
  }
  if (str.includes("quinoa")) {
    const dish = allDishes.find((d) => d.id === "quinoa");
    if (dish) return dish;
  }

  // 2. Curated Italian Sommelier Cellar & Bar Offerings with Dedicated Unique Photography

  // A. Red Wines
  if (str.includes("primitivo") || str.includes("manduria")) {
    return {
      id: "primitivo_manduria",
      name: "Primitivo di Manduria DOC",
      price: "₹1,850",
      calories: "155 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_primitivo.jpg",
      ingredients: "100% Primitivo, Manduria, Puglia, Aged in Slavonian Oak Casks",
      flavor: "Intense bouquet of wild blackberry jam, ripe plum, dried tobacco, and dark cacao.",
      palate: "Rich, full-bodied Southern Italian red wine crafted to match spicy Calabrian sausage.",
      pair: "Pizza Diavola Piccante (₹1,450)"
    };
  }

  if (str.includes("barolo") || str.includes("massolino")) {
    return {
      id: "barolo_massolino",
      name: "Barolo DOCG Massolino",
      price: "₹2,200",
      calories: "160 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_barolo.jpg",
      ingredients: "100% Nebbiolo, Serralunga d'Alba, Piedmont, Aged 30 Months in Oak",
      flavor: "Ethereal tar and dried rose aromas with violet, truffle, and structured velvety tannins.",
      palate: "The King of Italian wines, providing regal harmony with saffron risotto and truffles.",
      pair: "Risotto 'Al Salto' (₹1,650)"
    };
  }

  if (str.includes("valpolicella") || str.includes("ripasso")) {
    return {
      id: "valpolicella_ripasso",
      name: "Valpolicella Ripasso DOC Superiore",
      price: "₹1,800",
      calories: "150 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_valpolicella.jpg",
      ingredients: "Corvina Veronese, Rondinella, Corvinone, Re-fermented over Amarone Pomace",
      flavor: "Deep ruby nectar bursting with spiced black cherry, dried cranberry, and cinnamon.",
      palate: "Warm, supple red wine pairing effortlessly with baked eggplant parmigiana.",
      pair: "Melanzane Parmigiana (₹1,350)"
    };
  }

  if (str.includes("chianti") || (str.includes("banfi") && str.includes("chianti"))) {
    return {
      id: "banfi_chianti",
      name: "Castello Banfi Chianti Classico DOCG",
      price: "₹1,750",
      calories: "145 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_chianti.jpg",
      ingredients: "Sangiovese, Canaiolo Nero, Cabernet Sauvignon, Aged in Tuscan Oak Casks",
      flavor: "Intense black cherry and violet aromas with subtle leather and velvety tannin finish.",
      palate: "Full-bodied Tuscan red wine crafted to complement slow-roasted lamb and rich ragù.",
      pair: "Pappardelle al Ragù (₹1,750)"
    };
  }

  // B. White Wines
  if (str.includes("soave") || str.includes("pieropan")) {
    return {
      id: "soave_pieropan",
      name: "Soave Classico Pieropan DOC",
      price: "₹1,600",
      calories: "125 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_soave.jpg",
      ingredients: "85% Garganega, 15% Trebbiano di Soave, Volcanic Soils of Verona",
      flavor: "Delicate white blossom perfume with crisp almond finish and stony volcanic minerality.",
      palate: "Vibrant Venetian white wine tailored for rustic minestrone and garden vegetables.",
      pair: "Minestrone Tradizionale (₹950)"
    };
  }

  if (str.includes("gavi") || str.includes("sparina")) {
    return {
      id: "gavi_sparina",
      name: "Gavi di Gavi DOCG Villa Sparina",
      price: "₹1,650",
      calories: "125 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_gavi.jpg",
      ingredients: "100% Cortese, Rovereto di Gavi, Piedmont",
      flavor: "Brilliant straw yellow with scents of green apple, white flowers, and zesty citrus minerals.",
      palate: "Crisp, refreshing northern white wine cutting through garlic, chili, and extra virgin olive oil.",
      pair: "Spaghetti all'Aglio Olio (₹1,400)"
    };
  }

  if (str.includes("vermentino") || str.includes("sardegna")) {
    return {
      id: "vermentino_sardegna",
      name: "Vermentino di Sardegna DOC",
      price: "₹1,700",
      calories: "130 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_vermentino.jpg",
      ingredients: "100% Vermentino, Gallura, Sardinia, Coastal Mediterranean Vineyards",
      flavor: "Sun-drenched Mediterranean saline breeze with aromatic rosemary, pear, and lime zest.",
      palate: "A maritime white wine specifically harvested to accompany pan-seared Chilean seabass.",
      pair: "Filetto di Spigola Cilena (₹2,450)"
    };
  }

  if (str.includes("principesco") || (str.includes("pinot") && str.includes("grigio"))) {
    return {
      id: "principesco",
      name: "Principesco Pinot Grigio DOC",
      price: "₹1,550",
      calories: "120 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_pinot_grigio.jpg",
      ingredients: "100% Pinot Grigio, Friuli-Venezia Giulia, Italy",
      flavor: "Delicate straw yellow with bouquet of acacia blossoms, dry crisp minerals, and citrus zest.",
      palate: "Clean, dry Italian white wine pairing effortlessly with salads and light plates.",
      pair: "Quinoa Salad (₹1,250)"
    };
  }

  if (str.includes("rime") || str.includes("banfi")) {
    return {
      id: "banfi_rime",
      name: "Castello Banfi Le Rime IGT",
      price: "₹1,750",
      calories: "130 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_le_rime.jpg",
      ingredients: "Chardonnay & Pinot Grigio blend, Montalcino, Tuscany",
      flavor: "Crisp, lively, and floral with aromatic notes of pear, green apple, and white peach.",
      palate: "Refreshing, crisp white wine ideal for delicate garden vegetables and wood-fired crusts.",
      pair: "Ortolana Wood-Fired (₹1,350)"
    };
  }

  // C. Sparkling & Beers
  if (str.includes("civ") || str.includes("lambrusco")) {
    return {
      id: "civ_civ",
      name: "Civ & Civ Lambrusco Grasparossa DOP",
      price: "₹1,650",
      calories: "125 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_lambrusco.jpg",
      ingredients: "Lambrusco Grasparossa di Castelvetro DOP, Modena, Italy",
      flavor: "Sparkling crimson red with vibrant notes of ripe blackberry, raspberry, and wild cherry.",
      palate: "Effervescent Italian red wine that cuts through the richness of stuffed pastas and cheeses.",
      pair: "Bottoni al Salto (₹1,450)"
    };
  }

  if (str.includes("peroni")) {
    return {
      id: "peroni",
      name: "Peroni Nastro Azzurro",
      price: "₹500",
      calories: "150 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan"],
      img: "/images/beer_peroni.jpg",
      ingredients: "Italian Two-Row Spring Barley, Nostrano dell'Isola Maize, Saaz-Saaz Hops",
      flavor: "Crisp, clean, refreshing lager with delicate citrus aroma and subtle bitter finish.",
      palate: "Cold Italian premium lager pairing seamlessly with crispy fried calamari and prawns.",
      pair: "Fritto Misto (₹1,500)"
    };
  }

  // D. Aperitivos, Mocktails & Digestivos
  if (str.includes("aperol")) {
    return {
      id: "aperol_spritz",
      name: "Aperol Spritz Veneziano",
      price: "₹1,200",
      calories: "160 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/aperol_spritz.jpg",
      ingredients: "Aperol, Prosecco Superiore DOCG, Splash of Soda Water, Fresh Orange Slice",
      flavor: "Vibrant bittersweet orange perfume with sparkling crisp prosecco effervescence.",
      palate: "The undisputed Venetian aperitivo to awaken the appetite and cut through creamy burrata.",
      pair: "Burrata (₹1,350)"
    };
  }

  if (str.includes("bellini")) {
    return {
      id: "bellini",
      name: "Bellini di Venezia",
      price: "₹850",
      calories: "135 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/drink_bellini.jpg",
      ingredients: "Hand-Crushed White Peach Purée, Valdobbiadene Prosecco Superiore DOCG",
      flavor: "Luscious white peach sweetness lifted by crisp effervescent prosecco bubbles.",
      palate: "Classic Harry's Bar Venetian cocktail pairing with delicate vanilla bean panna cotta.",
      pair: "Panna Cotta alla Vaniglia (₹950)"
    };
  }

  if (str.includes("yuzu") || str.includes("berry")) {
    return {
      id: "berry_yuzu",
      name: "Berry Yuzu Fizz",
      price: "₹450",
      calories: "115 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/drink_berry_yuzu.jpg",
      ingredients: "Muddled Blackberries & Raspberries, Japanese Yuzu Citrus, Fresh Mint, Tonic",
      flavor: "Zesty tart citrus explosion balanced by sweet wild forest berry pulp.",
      palate: "Refreshing artisanal mocktail pairing with gnocchi and potato dishes.",
      pair: "Gnocchi alla Sorrentina (₹1,700)"
    };
  }

  if (str.includes("passito") || str.includes("pantelleria")) {
    return {
      id: "passito_pantelleria",
      name: "Passito di Pantelleria DOC",
      price: "₹950",
      calories: "165 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/drink_passito.jpg",
      ingredients: "Sun-Dried Zibibbo (Moscato d'Alessandria), Volcanic Island of Pantelleria, Sicily",
      flavor: "Opulent amber nectar with candied apricot, orange blossom honey, and dried fig.",
      palate: "The prized Sicilian dessert wine pairing with sheep's milk ricotta and crisp cannoli.",
      pair: "Cannoli Siciliani (₹850)"
    };
  }

  if (str.includes("amaro") || str.includes("montenegro")) {
    return {
      id: "amaro_montenegro",
      name: "Amaro Montenegro con Arancia",
      price: "₹750",
      calories: "140 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/drink_amaro.jpg",
      ingredients: "Secret Blend of 40 Botanicals from 4 Continents, Sweet & Bitter Orange Peel, Vanilla",
      flavor: "Silky bittersweet botanicals with warm baking spices and fragrant orange peel.",
      palate: "Traditional Bolognese herbal digestivo pairing with flourless dark chocolate torte.",
      pair: "Torta Caprese (₹950)"
    };
  }

  if (str.includes("espresso") || str.includes("santo")) {
    return {
      id: "espresso_vin_santo",
      name: "Illy Espresso & Vin Santo del Chianti",
      price: "₹399",
      calories: "90 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/drink_vin_santo.jpg",
      ingredients: "100% Arabica Illy Single Origin Roast, Tuscan Vin Santo Dessert Wine",
      flavor: "Deep crema with roasted cocoa and hazelnut notes alongside honeyed raisin wine.",
      palate: "The authentic Tuscan dessert conclusion for dipping cantucci or pairing with tiramisù.",
      pair: "Tiramisù Tradizionale (₹1,050)"
    };
  }

  if (str.includes("sambuca") || str.includes("grappa")) {
    return {
      id: "sambuca_grappa",
      name: "Artisanal Sambuca Romana & Grappa di Barolo",
      price: "₹750",
      calories: "120 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/drink_sambuca_grappa.jpg",
      ingredients: "Distilled Italian Star Anise, Aged Piedmont Nebbiolo Grappa, Lemon Zest",
      flavor: "Intense aromatic elderberry and star anise spice with dry, warming grape pomace finish.",
      palate: "Traditional Italian digestivo served ice-cold with three roasted coffee beans ('con la mosca').",
      pair: "Affogato al Caffè (₹750)"
    };
  }

  // 3. Dynamic Fallback: generates complete profile for any custom pairing string
  const cleanName = pairString.replace(/\([^)]*\)/g, "").trim();
  const priceMatch = pairString.match(/₹[\d,]+/);
  return {
    id: `pair_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
    name: cleanName || "Sommelier Selection",
    price: priceMatch ? priceMatch[0] : "₹1,450",
    calories: "135 kcal",
    diet: "Vegetarian",
    tags: ["veg", "vegan", "gluten-free"],
    img: "/images/wine_chianti.jpg",
    ingredients: "Certified Italian DOP Reserve Selection, cellared specifically for Sapori d'Italia.",
    flavor: "Harmonious bouquet of aromas tailored to enhance every element of this course.",
    palate: "Handpicked cellar pairing designed to elevate your dining experience.",
    pair: "Chef's Signature Course"
  };
}
