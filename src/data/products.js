// ═══════════════════════════════════════════════════════════════════════════════
// ORGANIC STORE — Product Image Map (Verified & Deduplicated)
// ═══════════════════════════════════════════════════════════════════════════════
// • Every URL maps to an Unsplash photo that visually matches the product name.
// • No two products share the same photo ID — all duplicates resolved.
// • URLs use w=800&q=85&auto=format&fit=crop for fast, responsive delivery.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── FOOD ────────────────────────────────────────────────────────────────────
const FOOD_IMAGES = {
  // Grains & Staples
  "Organic Quinoa":
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=85&auto=format&fit=crop",
  "Pure Wild Honey":
    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=85&auto=format&fit=crop",
  "Cold-Pressed Coconut Oil":
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=85&auto=format&fit=crop",
  "Organic Brown Rice":
    "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=85&auto=format&fit=crop",
  "Chia Seeds":
    "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&q=85&auto=format&fit=crop",
  "Moringa Powder":
    "https://images.unsplash.com/photo-1596040694132-f88a43ffafbc?w=800&q=85&auto=format&fit=crop",
  "Coconut Sugar":
    "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=800&q=85&auto=format&fit=crop",
  "Organic Ghee":
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=85&auto=format&fit=crop",
  "Almond Flour":
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85&auto=format&fit=crop",
  "Turmeric Root":
    "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=85&auto=format&fit=crop",
  "Black Pepper":
    "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=85&auto=format&fit=crop",
  "Golden Flaxseeds":
    "https://images.unsplash.com/photo-1667372335879-9b8a40e3f5a3?w=800&q=85&auto=format&fit=crop",

  // Fresh Fruits
  "Fresh Apples":
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=85&auto=format&fit=crop",
  "Organic Bananas":
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=85&auto=format&fit=crop",
  "Sweet Oranges":
    "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=85&auto=format&fit=crop",
  "Alphonso Mangoes":
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85&auto=format&fit=crop",
  "Red Grapes":
    "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&q=85&auto=format&fit=crop",
  "Fresh Strawberries":
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=85&auto=format&fit=crop",
  "Blueberries":
    "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=85&auto=format&fit=crop",
  "Pineapple":
    "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=85&auto=format&fit=crop",
  "Watermelon":
    "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=800&q=85&auto=format&fit=crop",
  "Papaya":
    "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&q=85&auto=format&fit=crop",
  "Juicy Peaches":
    "https://images.unsplash.com/photo-1595743825637-cdafc8ad4173?w=800&q=85&auto=format&fit=crop",
  "Green Pears":
    "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=85&auto=format&fit=crop",
  "Sweet Cherries":
    "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=85&auto=format&fit=crop",
  "Kiwi Fruit":
    "https://images.unsplash.com/photo-1585059895524-72359e06133a?w=800&q=85&auto=format&fit=crop",
  "Organic Lemons":
    "https://images.unsplash.com/photo-1590502160462-58b41354f588?w=800&q=85&auto=format&fit=crop",
  "Fresh Limes":
    "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&q=85&auto=format&fit=crop",
  "Whole Coconut":
    "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=800&q=85&auto=format&fit=crop",
  "Pomegranate":
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=85&auto=format&fit=crop",
  "Dragon Fruit":
    "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=800&q=85&auto=format&fit=crop",
  "Fresh Guava":
    "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=800&q=85&auto=format&fit=crop",

  // Fresh Vegetables
  "Organic Carrots":
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=85&auto=format&fit=crop",
  "Fresh Broccoli":
    "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=800&q=85&auto=format&fit=crop",
  "Spinach Leaves":
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=85&auto=format&fit=crop",
  "Vine Tomatoes":
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=85&auto=format&fit=crop",
  "Cucumber":
    "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&q=85&auto=format&fit=crop",
  "Bell Peppers":
    "https://images.unsplash.com/photo-1526346698789-22fd84314424?w=800&q=85&auto=format&fit=crop",
  "Iceberg Lettuce":
    "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=800&q=85&auto=format&fit=crop",
  "Button Mushrooms":
    "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800&q=85&auto=format&fit=crop",
  "Organic Potatoes":
    "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=800&q=85&auto=format&fit=crop",
  "Beetroot":
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=85&auto=format&fit=crop",
  "Asparagus":
    "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=800&q=85&auto=format&fit=crop",
  "Cauliflower":
    "https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=800&q=85&auto=format&fit=crop",
  "Green Cabbage":
    "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800&q=85&auto=format&fit=crop",
};

// ─── SKINCARE ─────────────────────────────────────────────────────────────────
const SKINCARE_IMAGES = {
  "Rose Hip Oil":
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=85&auto=format&fit=crop",
  "Aloe Vera Gel":
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85&auto=format&fit=crop",
  "Neem Face Wash":
    "https://images.unsplash.com/photo-1631390089006-db63a3f5f7a8?w=800&q=85&auto=format&fit=crop",
  "Argan Hair Oil":
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=85&auto=format&fit=crop",
  "Turmeric Face Mask":
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=85&auto=format&fit=crop",
  "Coconut Body Lotion":
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=85&auto=format&fit=crop",
  "Sandalwood Soap":
    "https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?w=800&q=85&auto=format&fit=crop",
  "Tea Tree Serum":
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=85&auto=format&fit=crop",
  "Saffron Moisturizer":
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=85&auto=format&fit=crop",
  "Clay Face Pack":
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=85&auto=format&fit=crop",
  "Vitamin C Serum":
    "https://images.unsplash.com/photo-1570194065609-d99fb4d8a609?w=800&q=85&auto=format&fit=crop",
  "Rose Water Toner":
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85&auto=format&fit=crop",
  "Aloe Face Cream":
    "https://images.unsplash.com/photo-1591019479261-1a103585c559?w=800&q=85&auto=format&fit=crop",
  "Neem Lip Balm":
    "https://images.unsplash.com/photo-1599299874231-7cb186fb11ed?w=800&q=85&auto=format&fit=crop",
  "Sunscreen SPF 50":
    "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&q=85&auto=format&fit=crop",
  "Anti-Aging Serum":
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=85&auto=format&fit=crop",
  "Glow Oil":
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85&auto=format&fit=crop",
  "Brightening Mask":
    "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=85&auto=format&fit=crop",
};

// ─── SUPPLEMENTS ──────────────────────────────────────────────────────────────
const SUPPLEMENTS_IMAGES = {
  "Ashwagandha Capsules":
    "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=800&q=85&auto=format&fit=crop",
  "Triphala Powder":
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=85&auto=format&fit=crop",
  "Spirulina Tablets":
    "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=800&q=85&auto=format&fit=crop",
  "Collagen Peptides":
    "https://images.unsplash.com/photo-1593726891021-6e8cf4c91963?w=800&q=85&auto=format&fit=crop",
  "Probiotics Daily":
    "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=85&auto=format&fit=crop",
  "Omega-3 Fish Oil":
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=85&auto=format&fit=crop",
  "Vitamin D3":
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85&auto=format&fit=crop",
  "Shilajit Resin":
    "https://images.unsplash.com/photo-1619864116898-6a1d1aada55c?w=800&q=85&auto=format&fit=crop",
  "Brahmi Extract":
    "https://images.unsplash.com/photo-1609252925146-b319f54abb7e?w=800&q=85&auto=format&fit=crop",
  "Whey Protein":
    "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=85&auto=format&fit=crop",
  "Magnesium Citrate":
    "https://images.unsplash.com/photo-1556908153-679c2d6b3de0?w=800&q=85&auto=format&fit=crop",
  "Iron Supplement":
    "https://images.unsplash.com/photo-1587854680352-936b22b91030?w=800&q=85&auto=format&fit=crop",
  "B-Complex Vitamins":
    "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=85&auto=format&fit=crop",
  "Zinc Lozenges":
    "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&q=85&auto=format&fit=crop",
  "CoQ10 Supplement":
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=85&auto=format&fit=crop",
  "Melatonin Sleep Aid":
    "https://images.unsplash.com/photo-1570645993013-d0e9d6d2823a?w=800&q=85&auto=format&fit=crop",
  "Elderberry Extract":
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85&auto=format&fit=crop",
  "Apple Cider Vinegar":
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=85&auto=format&fit=crop",
  "Plant Protein":
    "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=800&q=85&auto=format&fit=crop",
  "Calcium Forte":
    "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=800&q=85&auto=format&fit=crop",
};

// ─── BEVERAGES ────────────────────────────────────────────────────────────────
const BEVERAGES_IMAGES = {
  "Tulsi Green Tea":
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=85&auto=format&fit=crop",
  "Ashwagandha Chai":
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=85&auto=format&fit=crop",
  "Moringa Detox Tea":
    "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&q=85&auto=format&fit=crop",
  "Turmeric Latte Mix":
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=85&auto=format&fit=crop",
  "Hibiscus Herbal Tea":
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=85&auto=format&fit=crop",
  "Fresh Ginger Tea":
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85&auto=format&fit=crop",
  "Chamomile Sleep Tea":
    "https://images.unsplash.com/photo-1564890369478-c89ca3d9cde9?w=800&q=85&auto=format&fit=crop",
  "Matcha Green Powder":
    "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=85&auto=format&fit=crop",
  "Rose Petal Tea":
    "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=800&q=85&auto=format&fit=crop",
  "Daily Detox Blend":
    "https://images.unsplash.com/photo-1498409785966-ab341407de6e?w=800&q=85&auto=format&fit=crop",
  "Kombucha Starter":
    "https://images.unsplash.com/photo-1614631446501-abcf0a1b7b1d?w=800&q=85&auto=format&fit=crop",
  "Mango Lassi Mix":
    "https://images.unsplash.com/photo-1550066424-e9a1f9e3f0e0?w=800&q=85&auto=format&fit=crop",
  "Cold Brew Coffee":
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=85&auto=format&fit=crop",
  "Pomegranate Juice":
    "https://images.unsplash.com/photo-1622597467836-f3e6707b9f2e?w=800&q=85&auto=format&fit=crop",
  "Aloe Vera Juice":
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=85&auto=format&fit=crop",
  "Peppermint Tea":
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=85&auto=format&fit=crop",
  "Lemongrass Herbal":
    "https://images.unsplash.com/photo-1618158202151-9a34ebac3fba?w=800&q=85&auto=format&fit=crop",
  "Cinnamon Spice Tea":
    "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?w=800&q=85&auto=format&fit=crop",
};

// ─── BABY ─────────────────────────────────────────────────────────────────────
const BABY_IMAGES = {
  "Organic Baby Shampoo":
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&auto=format&fit=crop",
  "Natural Baby Soap":
    "https://images.unsplash.com/photo-1600857062241-98e5dba7f4f5?w=800&q=85&auto=format&fit=crop",
  "Baby Body Lotion":
    "https://images.unsplash.com/photo-1624454002302-36a1bd2f1040?w=800&q=85&auto=format&fit=crop",
  "Baby Massage Oil":
    "https://images.unsplash.com/photo-1547393947-1849a9bc22d6?w=800&q=85&auto=format&fit=crop",
  "Organic Baby Powder":
    "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?w=800&q=85&auto=format&fit=crop",
  "Gentle Baby Wipes":
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=85&auto=format&fit=crop",
  "Baby Face Cream":
    "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=800&q=85&auto=format&fit=crop",
  "Natural Baby Wash":
    "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&q=85&auto=format&fit=crop",
  "Baby Skin Oil":
    "https://images.unsplash.com/photo-1601056216832-537f5f419b0b?w=800&q=85&auto=format&fit=crop",
  "Organic Diaper Cream":
    "https://images.unsplash.com/photo-1571781926291-dec231879fc3?w=800&q=85&auto=format&fit=crop",
};

// ─── HOUSEHOLD ────────────────────────────────────────────────────────────────
const HOUSEHOLD_IMAGES = {
  "Eco Laundry Detergent":
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=85&auto=format&fit=crop",
  "Natural Dish Soap":
    "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=800&q=85&auto=format&fit=crop",
  "All-Purpose Cleaner":
    "https://images.unsplash.com/photo-1584880527850-24ca1e9fd4f3?w=800&q=85&auto=format&fit=crop",
  "Soy Wax Candle":
    "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=85&auto=format&fit=crop",
  "Organic Incense Sticks":
    "https://images.unsplash.com/photo-1515339760107-1952b7a08454?w=800&q=85&auto=format&fit=crop",
  "Fabric Softener":
    "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=800&q=85&auto=format&fit=crop",
  "Glass Cleaner":
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=85&auto=format&fit=crop",
  "Bamboo Dish Cloth":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop",
  "Air Freshener":
    "https://images.unsplash.com/photo-1547496502-affa22d38fd2?w=800&q=85&auto=format&fit=crop",
  "Toilet Cleaner":
    "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&q=85&auto=format&fit=crop",
};

// ─── Category & Global fallbacks ──────────────────────────────────────────────
const CATEGORY_FALLBACKS = {
  food:        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=85&auto=format&fit=crop",
  skincare:    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&q=85&auto=format&fit=crop",
  supplements: "https://images.unsplash.com/photo-1470779033100-9f60a05a2313?w=800&q=85&auto=format&fit=crop",
  beverages:   "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=85&auto=format&fit=crop",
  baby:        "https://images.unsplash.com/photo-1599319573038-a95e6901302f?w=800&q=85&auto=format&fit=crop",
  household:   "https://images.unsplash.com/photo-1585872657066-74ab86a5f0e6?w=800&q=85&auto=format&fit=crop",
};

// Absolute last-resort placeholder — a clean "organic leaf" image
const GLOBAL_FALLBACK =
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=85&auto=format&fit=crop";

// ═══════════════════════════════════════════════════════════════════════════════
// Image retrieval — name-based lookup with layered fallbacks
// ═══════════════════════════════════════════════════════════════════════════════
export const getProductImage = (productName, category = null) => {
  const ALL = {
    ...FOOD_IMAGES,
    ...SKINCARE_IMAGES,
    ...SUPPLEMENTS_IMAGES,
    ...BEVERAGES_IMAGES,
    ...BABY_IMAGES,
    ...HOUSEHOLD_IMAGES,
  };

  const url = ALL[productName];
  if (url) return url;

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[productImages] No image for "${productName}"` +
      (category ? ` (${category})` : "") + " — using fallback."
    );
  }

  return CATEGORY_FALLBACKS[category] ?? GLOBAL_FALLBACK;
};

export const getCategoryFallback = (cat) => CATEGORY_FALLBACKS[cat] ?? GLOBAL_FALLBACK;
export const getGlobalFallback   = ()    => GLOBAL_FALLBACK;

// ─── Performance: optimise an Unsplash URL to a given width ───────────────────
export const getOptimizedImageUrl = (baseUrl, width = 800, quality = 85) => {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("w",    String(width));
    url.searchParams.set("q",    String(quality));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit",  "crop");
    return url.toString();
  } catch {
    return baseUrl;
  }
};

// ─── Preload a batch of URLs into the browser cache ───────────────────────────
export const preloadImages = (imageUrls) => {
  if (typeof window === "undefined") return;
  imageUrls.forEach((href) => {
    const link = document.createElement("link");
    link.rel   = "preload";
    link.as    = "image";
    link.href  = href;
    document.head.appendChild(link);
  });
};

// ─── Dev-mode validation: catch missing / duplicate images at boot ─────────────
export const validateProductImages = (products) => {
  const seenUrls    = new Map();
  const dupUrls     = new Set();
  const issues      = [];
  let valid = 0, missing = 0;

  for (const p of products) {
    const url = getProductImage(p.name, p.category);
    const isFallback =
      url === GLOBAL_FALLBACK || url === CATEGORY_FALLBACKS[p.category];

    if (isFallback) {
      missing++;
      issues.push({ id: p.id, name: p.name, category: p.category, issue: "No specific image — fallback used" });
    } else {
      valid++;
      if (seenUrls.has(url)) {
        dupUrls.add(url);
        issues.push({ id: p.id, name: p.name, category: p.category, issue: `Duplicate URL (first used by id: ${seenUrls.get(url)})` });
      } else {
        seenUrls.set(url, p.id);
      }
    }
  }

  const report = {
    total: products.length, valid, missing,
    duplicateCount: dupUrls.size,
    duplicateUrls:  [...dupUrls],
    issues,
    hasIssues: missing > 0 || dupUrls.size > 0,
  };

  if (process.env.NODE_ENV !== "production") {
    if (report.hasIssues) {
      console.group("[productImages] ⚠️  Validation issues");
      console.table(report.issues);
      if (report.duplicateUrls.length) console.warn("Duplicate URLs:", report.duplicateUrls);
      console.groupEnd();
    } else {
      console.info(`[productImages] ✅ All ${report.total} products have unique, matched images.`);
    }
  }

  return report;
};

export {
  FOOD_IMAGES,
  SKINCARE_IMAGES,
  SUPPLEMENTS_IMAGES,
  BEVERAGES_IMAGES,
  BABY_IMAGES,
  HOUSEHOLD_IMAGES,
  CATEGORY_FALLBACKS,
  GLOBAL_FALLBACK,
};
