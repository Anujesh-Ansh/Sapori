export const restaurantData = {
  brand: {
    name: "Sapori d'Italia",
    tagline: "Crafted with Warmth, Served with Elegance",
    positioning: "PREMIUM ITALIAN DINING",
    subheading: "Authentic Italian Fine Dining • Connaught Place, New Delhi",
    location: "Connaught Place, New Delhi",
    address: "Atrium 4, Inner Circle, Block D, Connaught Place, New Delhi 110001",
    hours: "Open Daily: 12:00 PM – Midnight",
    phone: "+91 95555 69018",
    email: "concierge@saporiditalia.in",
    instagram: "@saporiditalia.delhi",
    facebook: "SaporiDItaliaDelhi",
  },

  quickFacts: [
    { label: "Space Planning", value: "3,200 sq. ft." },
    { label: "Guest Covers", value: "80 Covers" },
    { label: "Operational Hours", value: "12 PM – Midnight" },
    { label: "Dining Concept", value: "Modern Premium Twist" }
  ],

  // Real Menu directly from Business Proposal PDF (Page 6) with local instant-load images
  menu: {
    appetizers: [
      {
        id: "burrata",
        name: "Burrata",
        price: "₹1,350",
        calories: "440 kcal",
        diet: "Vegetarian",
        tags: ["veg", "gluten-free"],
        img: "/images/burrata.jpg",
        ingredients: "Ripened Tomatoes, Fresh Rucola, Black Mission Figs, Basil Pesto, EVOO",
        flavor: "Creamy lactic sweetness balanced by fresh herb acid and balsamic glaze.",
        palate: "Light, refreshing Italian starter for cheese purists.",
        pair: "Castello Banfi Le Rime (₹1,750)"
      },
      {
        id: "fritto",
        name: "Fritto Misto",
        price: "₹1,500",
        calories: "590 kcal",
        diet: "Seafood",
        tags: ["nonveg", "seafood"],
        img: "/images/fritto_misto.jpg",
        ingredients: "Crisp Baby Calamari, Tiger Prawns, Soft Shell Crab, Amalfi Lemon Mayo",
        flavor: "Feather-light golden crunch with ocean brininess and citrus punch.",
        palate: "Crispy seafood lovers seeking ocean freshness.",
        pair: "Peroni Nastro Azzurro / Civ & Civ"
      },
      {
        id: "quinoa",
        name: "Quinoa Salad",
        price: "₹1,250",
        calories: "350 kcal",
        diet: "Vegetarian",
        tags: ["vegan", "gluten-free", "keto"],
        img: "/images/quinoa_salad.jpg",
        ingredients: "Organic Andean Quinoa, Avocado, Toasted Hazelnut, Baby Tuscan Kale",
        flavor: "Nutty, crisp, refreshing with citrus-herb vinaigrette.",
        palate: "Health-conscious gourmands wanting a light, crunchy plate.",
        pair: "Principesco Pinot Grigio (₹1,550)"
      },
      {
        id: "minestrone",
        name: "Minestrone Tradizionale",
        price: "₹950",
        calories: "390 kcal",
        diet: "Vegetarian",
        tags: ["vegan", "gluten-free"],
        img: "/images/minestrone.jpg",
        ingredients: "Conserve Style Broth, Seasonal Italian Garden Vegetables, Basil Genovese Pesto",
        flavor: "Deep aromatic vegetable broth with fragrant herb finish.",
        palate: "Traditional soup lovers craving warm Italian rustic comfort.",
        pair: "Civ & Civ (₹1,650)"
      },
      {
        id: "zuppa",
        name: "Zuppa Di Mare",
        price: "₹1,250",
        calories: "430 kcal",
        diet: "Seafood",
        tags: ["nonveg", "seafood", "spicy", "gluten-free"],
        img: "/images/zuppa_di_mare.jpeg",
        ingredients: "San Marzano Broth, Chili Prawns, Tender Scallops, Garlic Bruschetta",
        flavor: "Rich seafood tomato bouillon with gentle chili warmth and garlic crunch.",
        palate: "Seafood lovers wanting a hearty, spicy Mediterranean broth.",
        pair: "Castello Banfi Le Rime (₹1,750)"
      }
    ],

    pizza: [
      {
        id: "margherita",
        name: "Signature Margherita",
        price: "₹1,150",
        calories: "480 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/margherita.jpg",
        ingredients: "450°C Wood-Fired Crust, San Marzano DOP, Campana Mozzarella, Fresh Basil, EVOO",
        flavor: "Smoky wood-fired blister, sweet tomato acid, melted mozzarella velvet.",
        palate: "Purist pizza lovers who value authentic Neapolitan crust and fresh basil.",
        pair: "Castello Banfi Chianti (₹1,750)"
      },
      {
        id: "ortolana",
        name: "Ortolana Wood-Fired",
        price: "₹1,350",
        calories: "480 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/ortolana.jpg",
        ingredients: "Tomato Sauce, Fior di Latte, Grilled Bell Peppers, Red Onion, Mushrooms, Asparagus",
        flavor: "Charred sweet garden vegetables with herb-infused olive oil and melted cheese.",
        palate: "Vegetarian diners desiring colorful, earthy wood-charred toppings.",
        pair: "Principesco (₹1,550)"
      },
      {
        id: "diavola",
        name: "Pizza Diavola Piccante",
        price: "₹1,450",
        calories: "540 kcal",
        diet: "Non-Veg",
        tags: ["nonveg", "spicy"],
        img: "/images/pizza_diavola.jpg",
        ingredients: "San Marzano DOP, Spicy Calabrian Salame, Fior di Latte, Chili Honey, Sweet Basil",
        flavor: "Fiery smoky salami blister with molten cheese and a drizzle of sweet chili honey.",
        palate: "Meat lovers desiring authentic Italian spicy pepperoni heat.",
        pair: "Castello Banfi Chianti (₹1,750)"
      },
      {
        id: "italiana",
        name: "Pizza Italiana",
        price: "₹1,150",
        calories: "490 kcal",
        diet: "Non-Veg",
        tags: ["nonveg", "seafood", "spicy"],
        img: "/images/italiana.jpg",
        ingredients: "Tomato Sauce, Fresh Mozzarella, Anchovies, Ricotta Cheese, Wild Rocket Leaves",
        flavor: "Briny savory anchovies balanced with creamy ricotta and peppery wild rocket.",
        palate: "Bold palate diners who appreciate savory Mediterranean seafood notes.",
        pair: "Classic Negroni (₹950)"
      },
      {
        id: "focaccia",
        name: "Focaccia Bread al Forno",
        price: "₹850",
        calories: "400 kcal",
        diet: "Vegetarian",
        tags: ["vegan"],
        img: "/images/focaccia.jpg",
        ingredients: "Sea Salt Rosemary Focaccia, Blistered Cherry Tomatoes, Wild Mountain Oregano, EVOO",
        flavor: "Crisp golden crust, airy crumb, fragrant rosemary and olive oil perfume.",
        palate: "Ideal table starter to pair with wine and aperitivos.",
        pair: "Aperol Spritz (₹1,200)"
      }
    ],

    pasta: [
      {
        id: "bottoni",
        name: "Bottoni al Salto",
        price: "₹1,450",
        calories: "490 kcal",
        diet: "Vegetarian",
        tags: ["veg", "egg"],
        img: "/images/bottoni.jpg",
        ingredients: "Handmade Raviolini Pillows, Mountain Fontina Fondue, Leeks, Browned Sage Butter",
        flavor: "Velvety molten cheese center with nutty browned butter and sweet leeks.",
        palate: "Handmade artisanal pasta lovers who adore rich cheese fondue.",
        pair: "Civ & Civ (₹1,650)"
      },
      {
        id: "pappardelle",
        name: "Pappardelle al Ragù",
        price: "₹1,750",
        calories: "620 kcal",
        diet: "Non-Veg",
        tags: ["nonveg", "egg"],
        img: "/images/pappardelle_ragu.jpg",
        ingredients: "Hand-Cut Silk Ribbon Pappardelle, 8-Hour Chianti Braised Lamb Ragù, Aged Pecorino Romano",
        flavor: "Rich, slow-simmered savory braised lamb coating delicate wide ribbon egg pasta.",
        palate: "Hearty pasta lovers seeking deep, comforting Tuscan meat sauce richness.",
        pair: "Civ & Civ Red (₹1,650)"
      },
      {
        id: "tagliatelle",
        name: "Tagliatelle al Tartufo",
        price: "₹1,800",
        calories: "580 kcal",
        diet: "Vegetarian",
        tags: ["veg", "egg"],
        img: "/images/tagliatelle.jpg",
        ingredients: "Egg Ribbon Tagliatelle, Shaved Norcia Black Truffles, Vacche Rosse Parmigiano Reggiano",
        flavor: "Opulent forest truffle perfume with rich golden egg yolk coating and aged cheese umami.",
        palate: "Truffle connoisseurs desiring luxury decadence.",
        pair: "Castello Banfi (₹1,750)"
      },
      {
        id: "gnocchi",
        name: "Gnocchi alla Sorrentina",
        price: "₹1,700",
        calories: "510 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/gnocchi.jpg",
        ingredients: "Handmade Potato Pillows, Slow San Marzano Pomodoro, Pulled Fior di Latte, Basil",
        flavor: "Melt-in-mouth pillow texture wrapped in sweet tomato comfort and molten mozzarella.",
        palate: "Diners craving cozy, warm, comforting Southern Italian warmth.",
        pair: "Berry Yuzu Fizz (₹450)"
      },
      {
        id: "spaghetti",
        name: "Spaghetti all'Aglio Olio",
        price: "₹1,400",
        calories: "450 kcal",
        diet: "Vegetarian",
        tags: ["vegan", "spicy"],
        img: "/images/spaghetti.jpg",
        ingredients: "Bronze-Die Extruded Spaghetti, Confit Garlic, Calabrian Chili, Cold Pressed EVOO, Parsley",
        flavor: "Silky emulsified olive oil sheen with piquant chili warmth and aromatic confit garlic.",
        palate: "Classic Italian purists who appreciate the elegance of simple perfection.",
        pair: "Principesco (₹1,550)"
      }
    ],

    secondi: [
      {
        id: "parmigiana",
        name: "Melanzane Parmigiana",
        price: "₹1,350",
        calories: "870 kcal",
        diet: "Vegetarian",
        tags: ["veg", "gluten-free"],
        img: "/images/parmigiana.jpg",
        ingredients: "Baked Violet Eggplant, Slow San Marzano Pomodoro, Buffalo Mozzarella, Fresh Basil",
        flavor: "Savory baked umami with melting cheese crust, sweet basil, and rich tomato sauce.",
        palate: "Vegetarian comfort food lovers looking for a hearty, baked main course.",
        pair: "Civ & Civ (₹1,650)"
      },
      {
        id: "risotto",
        name: "Risotto 'Al Salto'",
        price: "₹1,650",
        calories: "450 kcal",
        diet: "Vegetarian",
        tags: ["veg", "gluten-free"],
        img: "/images/risotto.jpg",
        ingredients: "Golden Saffron Risotto Cake, Fontina Fondue, Pan-Roasted Oyster Mushrooms, Leeks",
        flavor: "Delicate saffron fragrance with crisp golden crust and creamy fondue core.",
        palate: "Artisanal risotto lovers who appreciate Milanese crispy technique.",
        pair: "Castello Banfi Le Rime (₹1,750)"
      },
      {
        id: "spigola",
        name: "Filetto di Spigola Cilena",
        price: "₹2,450",
        calories: "480 kcal",
        diet: "Non-Veg",
        tags: ["nonveg", "seafood", "gluten-free"],
        img: "/images/spigola.jpg",
        ingredients: "Pan-Seared Chilean Seabass, Saffron Potato Confit, Braised Baby Fennel, Lemon Caper Emulsion",
        flavor: "Crispy skin with buttery, flakey tender white fish and bright citrus-caper notes.",
        palate: "Fine-dining seafood enthusiasts seeking delicate Mediterranean elegance.",
        pair: "Castello Banfi Le Rime (₹1,750)"
      },
      {
        id: "agnello",
        name: "Agnello Brasato",
        price: "₹2,750",
        calories: "760 kcal",
        diet: "Non-Veg",
        tags: ["nonveg", "keto", "gluten-free"],
        img: "/images/agnello.jpg",
        ingredients: "Roasted New Zealand Lamb Loin, Natural Herb Jus, Artichokes, Velvet Mashed Potatoes",
        flavor: "Tender roasted lamb loin, gelatinous herb reduction, and silky artichoke puree.",
        palate: "Meat connoisseurs seeking fall-off-the-bone slow-braised richness.",
        pair: "Castello Banfi (₹1,750)"
      },
      {
        id: "valdostana",
        name: "Valdostana al Tartufo",
        price: "₹2,500",
        calories: "950 kcal",
        diet: "Non-Veg",
        tags: ["nonveg", "keto", "gluten-free"],
        img: "/images/valdostana.jpg",
        ingredients: "Corn-fed Chicken Breast, Melted Alpine Fontina, Shaved Black Truffles, Onion Potatoes",
        flavor: "Succulent poultry glazed in nutty cheese fondue and earthy truffle aroma.",
        palate: "Diners seeking a luxurious, cheese-crusted Alpine specialty.",
        pair: "Castello Banfi (₹1,750)"
      }
    ],

    desserts: [
      {
        id: "tiramisu",
        name: "Tiramisù Tradizionale",
        price: "₹1,050",
        calories: "410 kcal",
        diet: "Vegetarian",
        tags: ["veg", "egg"],
        img: "/images/tiramisu.jpg",
        ingredients: "Savoiardi Ladyfingers, Roasted Illy Espresso, Mascarpone Sabayon, Dutch Valrhona Cocoa",
        flavor: "Velvety bittersweet espresso cream with cloud-soft texture and rich chocolate dust.",
        palate: "The definitive Italian sweet finale for coffee and dessert lovers.",
        pair: "Italian Espresso / Vin Santo"
      },
      {
        id: "pannacotta",
        name: "Panna Cotta alla Vaniglia",
        price: "₹950",
        calories: "360 kcal",
        diet: "Vegetarian",
        tags: ["veg", "gluten-free"],
        img: "/images/pannacotta.jpg",
        ingredients: "Madagascar Vanilla Bean Cream, Macerated Forest Berry Coulis, Micro Mint",
        flavor: "Silky, delicate vanilla custard with tart berry contrast and floral sweetness.",
        palate: "Guests seeking a cool, light, elegant fruit-and-cream finish.",
        pair: "Amalfi Classic Mocktail (₹450)"
      },
      {
        id: "cannoli",
        name: "Cannoli Siciliani",
        price: "₹850",
        calories: "380 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/cannoli.jpg",
        ingredients: "Crispy Fried Pastry Shells, Sweet Sheep's Milk Ricotta, Candied Orange Peel, Bronte Pistachio Crumb",
        flavor: "Crisp golden shell giving way to cloud-sweet citrus ricotta and nutty pistachio crunch.",
        palate: "Classic Italian pastry lovers craving traditional Sicilian sweetness.",
        pair: "Illy Espresso / Vin Santo"
      },
      {
        id: "torta_caprese",
        name: "Torta Caprese",
        price: "₹950",
        calories: "420 kcal",
        diet: "Vegetarian",
        tags: ["veg", "gluten-free", "egg"],
        img: "/images/torta_caprese.jpg",
        ingredients: "Flourless Valrhona Dark Chocolate Torte, Roasted Almond Meal, Vanilla Bean Gelato, Berry Coulis",
        flavor: "Fudge-like decadent molten chocolate interior with delicate roasted almond aroma.",
        palate: "Chocolate connoisseurs desiring an authentic gluten-free Italian bake.",
        pair: "Castello Banfi (₹1,750)"
      },
      {
        id: "affogato",
        name: "Affogato al Caffè",
        price: "₹750",
        calories: "260 kcal",
        diet: "Vegetarian",
        tags: ["veg", "gluten-free"],
        img: "/images/affogato.jpg",
        ingredients: "Double Scoop Madagascar Vanilla Bean Gelato, Freshly Pulled Illy Espresso Shot, Amaretti Crumb",
        flavor: "Dramatic hot-and-cold contrast of bitter roasted espresso melting over velvety sweet gelato.",
        palate: "Espresso and ice cream aficionados wanting an unhurried Italian finale.",
        pair: "Sambuca / Grappa"
      }
    ],

    cocktails: [
      {
        id: "negroni",
        name: "Negroni Classico",
        price: "₹950",
        calories: "195 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/negroni.jpg",
        ingredients: "Campari, Carpano Antica Sweet Red Vermouth, Tanqueray Gin, Flamed Orange Peel",
        flavor: "Bittersweet herbal complexity, botanical gin spine, and vibrant citrus zest.",
        palate: "The quintessential Italian aperitivo for cocktail connoisseurs.",
        pair: "Burrata / Focaccia Bread"
      },
      {
        id: "martini",
        name: "Classic Dry Martini",
        price: "₹950",
        calories: "180 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/martini.jpg",
        ingredients: "Tanqueray No. Ten Gin, Noilly Prat Dry Vermouth, Cerignola Olives or Lemon Twist",
        flavor: "Crisp, icy botanical elegance with silky olive or bright citrus finish.",
        palate: "Cocktail purists seeking timeless sophistication.",
        pair: "Fritto Misto / Oysters"
      },
      {
        id: "whisky_sour",
        name: "Whisky Sour",
        price: "₹950",
        calories: "210 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/whisky_sour.jpg",
        ingredients: "Bourbon Whiskey, Fresh Amalfi Lemon Juice, Simple Cane Syrup, Angostura Bitters, Silky Froth",
        flavor: "Oak and vanilla warmth with bright refreshing citrus snap and velvety mouthfeel.",
        palate: "Whisky lovers who adore balanced sweet and tart perfection.",
        pair: "Tagliatelle al Tartufo"
      },
      {
        id: "old_fashioned",
        name: "Old Fashioned",
        price: "₹950",
        calories: "200 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/old_fashioned.jpg",
        ingredients: "Muddled Demerara Sugar, Aromatic Bitters, Premium Bourbon Whiskey, Maraschino Cherry, Orange Zest",
        flavor: "Deep rich caramel and toasted oak with lingering aromatic spice.",
        palate: "Guests desiring a slow-sipping, rich, sophisticated digestivo.",
        pair: "Agnello Brasato / Tiramisù"
      },
      {
        id: "margarita",
        name: "Italian Margarita",
        price: "₹950",
        calories: "220 kcal",
        diet: "Vegetarian",
        tags: ["veg"],
        img: "/images/margarita.jpg",
        ingredients: "Tequila Blanco, Disaronno Amaretto, Fresh Lime Juice, Agave Nectar, Sea Salt Rim",
        flavor: "Nutty almond sweetness complementing agave brightness and zesty lime.",
        palate: "Guests seeking a playful Italian twist on the classic Mexican cocktail.",
        pair: "Wood-Fired Pizza"
      },
      {
        id: "amalfi_mocktail",
        name: "Amalfi Classic Mocktail",
        price: "₹450",
        calories: "110 kcal",
        diet: "Vegetarian",
        tags: ["veg", "gluten-free"],
        img: "/images/amalfi_mocktail.jpg",
        ingredients: "Amalfi Lemon Confit, Fresh Sweet Basil, Sparkling San Pellegrino Soda, Elderflower Mist",
        flavor: "Effervescent, sparkling citrus freshness with fragrant aromatic basil.",
        palate: "Non-alcoholic guests seeking a refreshing Mediterranean aperitivo.",
        pair: "Quinoa Salad / Burrata"
      }
    ]
  },

  // 3 Signature Dishes (Complete tasting notes for modal dialogs)
  signatures: [
    {
      id: "margherita",
      name: "Signature Woodfire Margherita",
      title: "Signature Margherita",
      category: "WOOD FIRE OVEN",
      price: "₹1,150",
      calories: "480 kcal",
      diet: "Vegetarian",
      tags: ["veg"],
      desc: "450°C wood-fired blistered crust with San Marzano DOP tomatoes and fresh Campana buffalo mozzarella.",
      img: "/images/margherita.jpg",
      ingredients: "Caputo 00 Flour, San Marzano DOP Tomatoes, Fresh Buffalo Mozzarella, Sweet Basil, EVOO",
      flavor: "Smoky wood-fired blister, sweet volcanic tomato acidity, and melted dairy sweetness.",
      palate: "Neapolitan pizza purists and lovers of Italian simplicity.",
      pair: "Castello Banfi Chianti (₹1,750)"
    },
    {
      id: "bottoni",
      name: "Handcrafted Bottoni al Salto",
      title: "Handcrafted Bottoni",
      category: "PASTA FRESCA",
      price: "₹1,450",
      calories: "490 kcal",
      diet: "Vegetarian",
      tags: ["veg"],
      desc: "Hand-pinched pasta pillows stuffed with mountain fontina, glazed in leek fondue and crisp sage butter.",
      img: "/images/bottoni.jpg",
      ingredients: "Hand-rolled Silk Pasta, Alpine Fontina Cheese, Sweet Leek Fondue, Browned Sage Butter",
      flavor: "Burst of warm molten alpine fontina wrapped in nutty sage butter and sweet leeks.",
      palate: "Artisanal pasta enthusiasts seeking rich, delicate handcrafted pillows.",
      pair: "Civ & Civ Red (₹1,650)"
    },
    {
      id: "agnello",
      name: "Agnello Brasato al Rosmarino",
      title: "Agnello Brasato",
      category: "SECONDI",
      price: "₹2,750",
      calories: "760 kcal",
      diet: "Non-Veg",
      tags: ["nonveg", "keto", "gluten-free"],
      desc: "Roasted New Zealand lamb loin, natural rosemary jus, braised artichokes, and velvet mashed potatoes.",
      img: "/images/agnello.jpg",
      ingredients: "Prime New Zealand Lamb Loin, 12-Hour Natural Rosemary Glaze, Braised Artichokes, Mashed Potatoes",
      flavor: "Deep fall-apart savory lamb loin reduction, fragrant rosemary herb notes, and silky mash.",
      palate: "Connoisseurs desiring slow-braised, melt-in-mouth culinary craftsmanship.",
      pair: "Castello Banfi Reserve (₹1,750)"
    }
  ],

  chef: {
    name: "Alessandro Rossi",
    role: "Executive Head Chef",
    quote: "Cooking is about crafting an experience. We honor Italian tradition and embrace innovation, using the finest DOP ingredients to tell a story with every plate.",
    experience: "14+ Years",
    awardsCount: "20+ Honors",
    photo: "/images/chef.jpg"
  },

  awards: [
    { name: "3 Michelin Stars Guide", subtitle: "Culinary Recommendation" },
    { name: "Les Grandes Tables du Monde", subtitle: "Gastronomic Excellence" },
    { name: "Forbes Travel Guide", subtitle: "Four-Star Award 2024" },
    { name: "TripAdvisor Travelers' Choice", subtitle: "Best of the Best" },
    { name: "BBC Food & Travel", subtitle: "Top 10 Tables" },
    { name: "Yahoo! News", subtitle: "Best Italian Dining" },
    { name: "CNN Travel", subtitle: "Delhi's Authentic Italian Jewel" },
    { name: "CNBC Luxury", subtitle: "Exceptional Cellar & Hospitality" }
  ]
};
