// Utility to find or resolve the complete item/beverage for any "pair" recommendation
export function findPairedDish(pairString, menu) {
  if (!pairString) return null;
  const str = pairString.toLowerCase();

  // 1. Check all existing items in menu
  const allDishes = [];
  if (menu) {
    Object.values(menu).forEach((list) => {
      if (Array.isArray(list)) allDishes.push(...list);
    });
  }

  // Exact name or clean substring match
  for (const dish of allDishes) {
    const dishName = dish.name.toLowerCase();
    const cleanPair = str.split("(")[0].trim();
    if (str.includes(dishName) || dishName.includes(cleanPair)) {
      return dish;
    }
  }

  // Keyword-based matches to existing cocktails/dishes
  if (str.includes("negroni")) {
    return allDishes.find((d) => d.id === "negroni");
  }
  if (str.includes("amalfi")) {
    return allDishes.find((d) => d.id === "amalfi_mocktail");
  }
  if (str.includes("martini")) {
    return allDishes.find((d) => d.id === "martini");
  }
  if (str.includes("whisky")) {
    return allDishes.find((d) => d.id === "whisky_sour");
  }
  if (str.includes("margarita")) {
    return allDishes.find((d) => d.id === "margarita");
  }
  if (str.includes("focaccia")) {
    return allDishes.find((d) => d.id === "focaccia");
  }
  if (str.includes("burrata")) {
    return allDishes.find((d) => d.id === "burrata");
  }
  if (str.includes("tagliatelle")) {
    return allDishes.find((d) => d.id === "tagliatelle");
  }
  if (str.includes("agnello")) {
    return allDishes.find((d) => d.id === "agnello");
  }
  if (str.includes("tiramis")) {
    return allDishes.find((d) => d.id === "tiramisu");
  }

  // Curated Italian Wines & Aperitivos from Proposal (Page 6)
  if (str.includes("chianti") || (str.includes("banfi") && str.includes("reserve")) || str.includes("agnello brasato")) {
    if (str.includes("chianti") || (str.includes("banfi") && str.includes("chianti"))) {
      return {
        id: "banfi_chianti",
        name: "Castello Banfi Chianti Classico DOCG",
        price: "₹1,750",
        calories: "145 kcal",
        diet: "Vegetarian",
        tags: ["veg", "vegan", "gluten-free"],
        img: "/images/wine_banfi.jpg",
        ingredients: "Sangiovese, Canaiolo Nero, Cabernet Sauvignon, Aged in Tuscan Oak Casks",
        flavor: "Intense black cherry and violet aromas with subtle leather and velvety tannin finish.",
        palate: "Full-bodied red wine crafted to complement slow-roasted lamb and rich pasta.",
        pair: "Agnello Brasato (₹2,750)"
      };
    }
  }

  if (str.includes("banfi") && !str.includes("chianti")) {
    return {
      id: "banfi_rime",
      name: "Castello Banfi Le Rime IGT",
      price: "₹1,750",
      calories: "130 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_banfi.jpg",
      ingredients: "Chardonnay & Pinot Grigio blend, Montalcino, Tuscany",
      flavor: "Crisp, lively, and floral with aromatic notes of pear, green apple, and white peach.",
      palate: "Refreshing, crisp white wine ideal for delicate seafood and creamy burrata.",
      pair: "Burrata / Filetto di Spigola"
    };
  }

  if (str.includes("rime")) {
    return {
      id: "banfi_rime",
      name: "Castello Banfi Le Rime IGT",
      price: "₹1,750",
      calories: "130 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_banfi.jpg",
      ingredients: "Chardonnay & Pinot Grigio blend, Montalcino, Tuscany",
      flavor: "Crisp, lively, and floral with aromatic notes of pear, green apple, and white peach.",
      palate: "Refreshing, crisp white wine ideal for delicate seafood and creamy burrata.",
      pair: "Burrata / Filetto di Spigola"
    };
  }

  if (str.includes("civ")) {
    return {
      id: "civ_civ",
      name: "Civ & Civ Lambrusco Grasparossa",
      price: "₹1,650",
      calories: "125 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_banfi.jpg",
      ingredients: "Lambrusco Grasparossa di Castelvetro DOP, Modena, Italy",
      flavor: "Sparkling crimson red with vibrant notes of ripe blackberry, raspberry, and wild cherry.",
      palate: "Effervescent Italian red wine that cuts through the richness of stuffed pastas and cheeses.",
      pair: "Bottoni al Salto / Melanzane Parmigiana"
    };
  }

  if (str.includes("principesco")) {
    return {
      id: "principesco",
      name: "Principesco Pinot Grigio DOC",
      price: "₹1,550",
      calories: "120 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/wine_banfi.jpg",
      ingredients: "100% Pinot Grigio, Friuli-Venezia Giulia, Italy",
      flavor: "Delicate straw yellow with bouquet of acacia blossoms, dry crisp minerals, and citrus zest.",
      palate: "Clean, dry Italian white wine pairing effortlessly with salads and light pizzas.",
      pair: "Quinoa Salad / Ortolana Pizza"
    };
  }

  if (str.includes("aperol")) {
    return {
      id: "aperol_spritz",
      name: "Aperol Spritz Veneziano",
      price: "₹1,200",
      calories: "160 kcal",
      diet: "Vegetarian",
      tags: ["veg", "vegan", "gluten-free"],
      img: "/images/amalfi_mocktail.jpg",
      ingredients: "Aperol, Prosecco Superiore DOCG, Splash of Soda Water, Fresh Orange Slice",
      flavor: "Vibrant bittersweet orange perfume with sparkling crisp prosecco effervescence.",
      palate: "The undisputed Venetian aperitivo to awaken the appetite before dinner.",
      pair: "Focaccia Bread al Forno (₹850)"
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
      img: "/images/amalfi_mocktail.jpg",
      ingredients: "Muddled Blackberries & Raspberries, Japanese Yuzu Citrus, Fresh Mint, Tonic",
      flavor: "Zesty tart citrus explosion balanced by sweet wild forest berry pulp.",
      palate: "Refreshing artisanal mocktail pairing with gnocchi and potato dishes.",
      pair: "Gnocchi alla Sorrentina (₹1,700)"
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
      img: "/images/affogato.jpg",
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
      img: "/images/affogato.jpg",
      ingredients: "Distilled Italian Star Anise, Aged Piedmont Nebbiolo Grappa, Lemon Zest",
      flavor: "Intense aromatic elderberry and star anise spice with dry, warming grape pomace finish.",
      palate: "Traditional Italian digestivo served ice-cold with three roasted coffee beans ('con la mosca').",
      pair: "Affogato al Caffè (₹650)"
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

  if (str.includes("fritto") || str.includes("oyster")) {
    const frittoDish = allDishes.find((d) => d.id === "fritto");
    if (frittoDish) return frittoDish;
  }

  if (str.includes("pizza")) {
    const pizzaDish = allDishes.find((d) => d.id === "margherita") || allDishes.find((d) => d.id === "pizza_diavola");
    if (pizzaDish) return pizzaDish;
  }

  if (str.includes("quinoa")) {
    const quinoaDish = allDishes.find((d) => d.id === "quinoa");
    if (quinoaDish) return quinoaDish;
  }

  // Universal fallback for any custom pairing string
  const cleanName = pairString.replace(/\([^)]*\)/g, "").trim();
  const priceMatch = pairString.match(/₹[\d,]+/);
  return {
    id: `pair_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
    name: cleanName || "Sommelier Selection",
    price: priceMatch ? priceMatch[0] : "₹1,450",
    calories: "135 kcal",
    diet: "Vegetarian",
    tags: ["veg", "vegan", "gluten-free"],
    img: "/images/wine_banfi.jpg",
    ingredients: "Certified Italian DOP Reserve Selection, cellared specifically for Sapori d'Italia.",
    flavor: "Harmonious bouquet of aromas tailored to enhance every element of the course.",
    palate: "Handpicked cellar pairing designed to elevate your dining experience.",
    pair: "Chef's Signature Recommendation"
  };
}
