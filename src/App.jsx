/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Organic Store — Premium Luxury Edition
 * Complete UI/UX transformation with cinematic design, full-width layouts,
 * premium imagery, and production-grade React architecture.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * DESIGN PHILOSOPHY:
 *   • Apple-level cleanliness & precision
 *   • Whole Foods premium branding aesthetic
 *   • Cinematic full-bleed sections
 *   • Glassmorphism & organic shadows
 *   • Luxury earthy color palette
 *   • Zero left/right empty spaces on laptop screens
 *
 * TECHNICAL EXCELLENCE:
 *   • React.memo + useMemo + useCallback for performance
 *   • Lazy image loading with skeleton fallbacks
 *   • Accessible (WCAG 2.1 AA compliant)
 *   • Responsive: Mobile → Tablet → Laptop → Desktop → 4K
 *   • Error Boundary for crash resilience
 *   • LocalStorage persistence for cart & user
 */

import {
  useState, useEffect, useRef, useCallback, useMemo,
  useId, memo, Component,
} from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// [1] PREMIUM DESIGN TOKENS & GLOBAL STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap";

const GLOBAL_CSS = `
  /* ═══════════════════════════════════════════════════════════════
     PREMIUM DESIGN TOKENS — Luxury Organic Palette
     ═══════════════════════════════════════════════════════════════ */
  :root {
    /* Primary Greens — Deep, rich, luxurious */
    --primary:        #1a3a2a;
    --primary-dark:   #0d2218;
    --primary-light:  #2d6a4f;
    --primary-pale:   #52b788;
    --primary-glow:   rgba(45, 106, 79, 0.15);

    /* Earth Accents — Warm, natural */
    --accent-gold:    #c9a962;
    --accent-amber:   #d4a574;
    --accent-sand:    #e8dcc8;
    --accent-clay:    #b8860c;
    --accent-warm:    #f5e6d3;

    /* Neutrals — Clean, premium */
    --bg:             #faf9f6;
    --bg-alt:         #f2efe9;
    --bg-card:        rgba(255, 255, 255, 0.85);
    --bg-glass:       rgba(255, 255, 255, 0.72);
    --white:          #ffffff;

    /* Text — High contrast, readable */
    --text-primary:   #1a1a1a;
    --text-secondary: #4a4a4a;
    --text-muted:     #8a8a8a;
    --text-light:     #b0b0b0;

    /* Status */
    --error:          #dc3545;
    --success:        #2d6a4f;
    --warn:           #c9a962;
    --info:           #2b5797;

    /* Borders */
    --border:         #e5e2dc;
    --border-light:   #f0ede8;
    --border-dark:    #d4cfc6;

    /* Shadows — Layered, organic */
    --shadow-xs:  0 2px 8px rgba(26, 58, 42, 0.06);
    --shadow-sm:  0 4px 16px rgba(26, 58, 42, 0.08);
    --shadow-md:  0 8px 32px rgba(26, 58, 42, 0.12);
    --shadow-lg:  0 12px 48px rgba(26, 58, 42, 0.16);
    --shadow-xl:  0 20px 64px rgba(26, 58, 42, 0.22);
    --shadow-glow: 0 0 40px rgba(45, 106, 79, 0.25);

    /* Glassmorphism */
    --glass-bg:     rgba(255, 255, 255, 0.75);
    --glass-border: rgba(255, 255, 255, 0.5);
    --glass-blur:   blur(20px);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

    /* Typography */
    --font-heading: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

    /* Font Sizes — Fluid */
    --fs-hero:   clamp(48px, 8vw, 96px);
    --fs-h1:     clamp(36px, 5vw, 64px);
    --fs-h2:     clamp(28px, 4vw, 48px);
    --fs-h3:     clamp(22px, 3vw, 32px);
    --fs-h4:     clamp(18px, 2.2vw, 24px);
    --fs-body:   15px;
    --fs-small:  13px;
    --fs-xs:     11px;

    /* Spacing — 8px grid, luxury breathing room */
    --space-xs:  4px;
    --space-sm:  8px;
    --space-md:  16px;
    --space-lg:  24px;
    --space-xl:  32px;
    --space-2xl: 48px;
    --space-3xl: 64px;
    --space-4xl: 80px;
    --space-5xl: 104px;
    --space-6xl: 128px;

    /* Section padding — Full width, no side gaps */
    --section-y:      clamp(64px, 8vw, 104px);
    --section-y-sm:   clamp(48px, 6vw, 72px);

    /* Container — Full bleed on laptops */
    --container:      100%;
    --container-max:  1600px;
    --container-pad:  clamp(16px, 3vw, 48px);

    /* Border Radius — Organic, soft */
    --radius-sm:  8px;
    --radius-md:  14px;
    --radius-lg:  20px;
    --radius-xl:  28px;
    --radius-2xl: 40px;
    --radius-full: 9999px;

    /* Transitions */
    --ease-out:    cubic-bezier(0.215, 0.61, 0.355, 1);
    --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
    --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);

    /* Layout */
    --nav-h:     72px;
    --nav-h-mob: 64px;

    /* Z-index layers */
    --z-base:      1;
    --z-dropdown:  100;
    --z-sticky:    200;
    --z-overlay:   300;
    --z-modal:     400;
    --z-toast:     500;
    --z-tooltip:   600;
  }

  /* ═══════════════════════════════════════════════════════════════
     RESET & BASE
     ═══════════════════════════════════════════════════════════════ */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    font-size: 16px;
    scroll-padding-top: var(--nav-h);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  body {
    font-family: var(--font-body);
    font-size: var(--fs-body);
    line-height: 1.6;
    color: var(--text-primary);
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 600;
    line-height: 1.15;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  h1 { font-size: var(--fs-h1); font-weight: 700; }
  h2 { font-size: var(--fs-h2); }
  h3 { font-size: var(--fs-h3); }
  h4 { font-size: var(--fs-h4); }

  p { margin-bottom: 0; }

  a { text-decoration: none; color: inherit; }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  img { max-width: 100%; height: auto; display: block; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-alt); }
  ::-webkit-scrollbar-thumb {
    background: var(--primary-pale);
    border-radius: var(--radius-full);
  }
  ::-webkit-scrollbar-thumb:hover { background: var(--primary-light); }

  /* Focus */
  *:focus-visible {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }

  /* Selection */
  ::selection {
    background: var(--primary-light);
    color: var(--white);
  }

  /* ═══════════════════════════════════════════════════════════════
     ANIMATIONS
     ═══════════════════════════════════════════════════════════════ */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
  @keyframes cartBounce {
    0%, 100% { transform: scale(1); }
    35% { transform: scale(1.25); }
    65% { transform: scale(0.9); }
  }
  @keyframes countPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(45,106,79,0.2); }
    50% { box-shadow: 0 0 40px rgba(45,106,79,0.4); }
  }
  @keyframes typing {
    0%, 80%, 100% { opacity: 0; transform: scale(0.8); }
    40% { opacity: 1; transform: scale(1); }
  }

  .fade-up {
    animation: fadeUp 0.6s var(--ease-out) forwards;
    opacity: 0;
  }

  /* ═══════════════════════════════════════════════════════════════
     SKELETON LOADING
     ═══════════════════════════════════════════════════════════════ */
  .skeleton {
    background: linear-gradient(
      90deg,
      var(--border-light) 25%,
      #eae6df 50%,
      var(--border-light) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  /* ═══════════════════════════════════════════════════════════════
     UTILITY CLASSES
     ═══════════════════════════════════════════════════════════════ */
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }

  .hide-mobile  { display: revert; }
  .hide-desktop { display: none !important; }

  @media (max-width: 900px) {
    .hide-mobile  { display: none !important; }
    .hide-desktop { display: revert !important; }
  }

  /* Touch: disable hover effects */
  @media (hover: none) {
    .card-hover:hover { transform: none !important; box-shadow: var(--shadow-sm) !important; }
  }

  /* Full-width sections — NO LEFT/RIGHT GAPS */
  .full-bleed {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  /* Container with controlled padding */
  .content-wrap {
    width: 100%;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--container-pad);
  }
`;

// Inject styles once
let _stylesInjected = false;
const injectStyles = () => {
  if (_stylesInjected || typeof document === "undefined") return;
  _stylesInjected = true;
  if (!document.getElementById("og-font")) {
    const link = document.createElement("link");
    link.id = "og-font"; link.rel = "stylesheet"; link.href = FONT_URL;
    document.head.appendChild(link);
  }
  if (!document.getElementById("og-global")) {
    const style = document.createElement("style");
    style.id = "og-global"; style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }
};
injectStyles();

// ═══════════════════════════════════════════════════════════════════════════════
// [2] IMAGE SYSTEM — Import from centralized products.js
// ═══════════════════════════════════════════════════════════════════════════════

import { getProductImage, getGlobalFallback } from "./data/products.js";
const FALLBACK_IMG = getGlobalFallback();

// ═══════════════════════════════════════════════════════════════════════════════
// [3] DATA LAYER
// ═══════════════════════════════════════════════════════════════════════════════

const SITE_STATS = {
  products: "180+", farmers: "10+", customers: "500+",
  certifications: "5", farmerDesc: "Farmer Partners", customerDesc: "Happy Families",
};

const CATEGORIES = [
  { id: "food",        label: "Organic Food",    color: "#2d6a4f", bgColor: "#e8f5e9", icon: "🌾" },
  { id: "skincare",    label: "Natural Skincare", color: "#b8860c", bgColor: "#fdf0e8", icon: "🌸" },
  { id: "supplements", label: "Supplements",      color: "#1a3a2a", bgColor: "#f1f8e9", icon: "💊" },
  { id: "beverages",   label: "Herbal Drinks",    color: "#8b4513", bgColor: "#fff3e0", icon: "🍵" },
  { id: "baby",        label: "Baby Care",        color: "#6a1b9a", bgColor: "#f3e5f5", icon: "👶" },
  { id: "household",   label: "Eco Home",         color: "#00695c", bgColor: "#e0f2f1", icon: "🏠" },
];

const BRANDS = [
  { id:1, name:"PureEarth",       tagline:"Farm to Table" },
  { id:2, name:"GreenRoots",      tagline:"Rooted in Nature" },
  { id:3, name:"VedaHarvest",     tagline:"Ancient Wisdom" },
  { id:4, name:"TerraNova",       tagline:"New Earth Organics" },
  { id:5, name:"SunSprout",       tagline:"Sun-Kissed Goodness" },
  { id:6, name:"HimalayanBliss",  tagline:"Mountain Pure" },
  { id:7, name:"CoastalOrganic",  tagline:"Sea & Soil" },
  { id:8, name:"ForestGems",      tagline:"Wild Harvested" },
  { id:9, name:"OrganicRoots",    tagline:"Pure & Natural" },
  { id:10,name:"NatureBest",      tagline:"Nature's Finest" },
];

const PRODUCT_NAMES = {
  food:["Organic Quinoa","Pure Wild Honey","Cold-Pressed Coconut Oil","Organic Brown Rice","Chia Seeds","Moringa Powder","Coconut Sugar","Organic Ghee","Almond Flour","Turmeric Root","Black Pepper","Golden Flaxseeds","Fresh Apples","Organic Bananas","Sweet Oranges","Alphonso Mangoes","Red Grapes","Fresh Strawberries","Blueberries","Pineapple","Watermelon","Papaya","Juicy Peaches","Green Pears","Sweet Cherries","Kiwi Fruit","Organic Lemons","Fresh Limes","Whole Coconut","Pomegranate","Dragon Fruit","Fresh Guava","Organic Carrots","Fresh Broccoli","Spinach Leaves","Vine Tomatoes","Cucumber","Bell Peppers","Iceberg Lettuce","Button Mushrooms","Organic Potatoes","Beetroot","Asparagus","Cauliflower","Green Cabbage"],
  skincare:["Rose Hip Oil","Aloe Vera Gel","Neem Face Wash","Argan Hair Oil","Turmeric Face Mask","Coconut Body Lotion","Sandalwood Soap","Tea Tree Serum","Saffron Moisturizer","Clay Face Pack","Vitamin C Serum","Rose Water Toner","Aloe Face Cream","Neem Lip Balm","Sunscreen SPF 50","Anti-Aging Serum","Glow Oil","Brightening Mask"],
  supplements:["Ashwagandha Capsules","Triphala Powder","Spirulina Tablets","Collagen Peptides","Probiotics Daily","Omega-3 Fish Oil","Vitamin D3","Shilajit Resin","Brahmi Extract","Whey Protein","Magnesium Citrate","Iron Supplement","B-Complex Vitamins","Zinc Lozenges","CoQ10 Supplement","Melatonin Sleep Aid","Elderberry Extract","Apple Cider Vinegar","Plant Protein","Calcium Forte"],
  beverages:["Tulsi Green Tea","Ashwagandha Chai","Moringa Detox Tea","Turmeric Latte Mix","Hibiscus Herbal Tea","Fresh Ginger Tea","Chamomile Sleep Tea","Matcha Green Powder","Rose Petal Tea","Daily Detox Blend","Kombucha Starter","Mango Lassi Mix","Cold Brew Coffee","Pomegranate Juice","Aloe Vera Juice","Peppermint Tea","Lemongrass Herbal","Cinnamon Spice Tea"],
  baby:["Organic Baby Shampoo","Natural Baby Soap","Baby Body Lotion","Baby Massage Oil","Organic Baby Powder","Gentle Baby Wipes","Baby Face Cream","Natural Baby Wash","Baby Skin Oil","Organic Diaper Cream"],
  household:["Eco Laundry Detergent","Natural Dish Soap","All-Purpose Cleaner","Soy Wax Candle","Organic Incense Sticks","Fabric Softener","Glass Cleaner","Bamboo Dish Cloth","Air Freshener","Toilet Cleaner"],
};

const PRICING = {
  food:{min:80,max:400,avg:200},skincare:{min:200,max:800,avg:450},
  supplements:{min:300,max:900,avg:550},beverages:{min:150,max:500,avg:280},
  baby:{min:150,max:600,avg:350},household:{min:100,max:400,avg:220},
};

const DESC_TEMPLATES = {
  food:[(n)=>`Farm-fresh ${n.toLowerCase()} sourced directly from certified organic growers in Karnataka. Free from pesticides, GMOs, and synthetic additives. Packed at peak freshness.`,(n)=>`Our ${n.toLowerCase()} is carefully handpicked and sun-dried by partner farmers using traditional methods. 100% natural, chemical-free, and NABL lab-tested.`,(n)=>`Bring nature's best to your kitchen with our ${n.toLowerCase()}. Grown without harmful chemicals on regenerative farms, retaining full nutritional value.`,(n)=>`Experience authentic taste and nutrition of organically grown ${n.toLowerCase()}. Certified organic, fairly traded, and delivered farm-fresh within days of harvest.`],
  skincare:[(n)=>`Our ${n.toLowerCase()} is formulated with pure botanical extracts, free from parabens, sulfates, and synthetic fragrances. Dermatologist-tested and certified organic for all skin types.`,(n)=>`Harness Ayurveda with ${n.toLowerCase()}. Cold-processed to preserve active compounds. No mineral oils, no artificial dyes — pure skin nourishment.`,(n)=>`${n} combines ancient herbal wisdom with modern skincare science. Sourced from certified organic ingredients, formulated without harmful chemicals.`,(n)=>`Luxury meets nature in our ${n.toLowerCase()}. Every ingredient is ethically sourced, cruelty-free, and tested for potency.`],
  supplements:[(n)=>`Clinically formulated ${n.toLowerCase()} using pure Ayurvedic extracts. Third-party tested for purity, potency, and safety. Free from fillers and synthetic additives.`,(n)=>`Premium grade ${n.toLowerCase()} sourced from certified organic farms. Each batch is NABL lab-tested. Ideal for daily wellness routines.`,(n)=>`Ancient wisdom meets modern science in our ${n.toLowerCase()}. Sustainably harvested and cold-processed to preserve bioactive compounds.`,(n)=>`Trusted by wellness practitioners, our ${n.toLowerCase()} delivers consistent results. No artificial colors, flavors, or preservatives.`],
  beverages:[(n)=>`Sip wellness with our ${n.toLowerCase()}. Blended from certified organic botanicals, each cup delivers antioxidants and phytonutrients for a healthier you.`,(n)=>`Our ${n.toLowerCase()} is sourced from small-batch organic farms and slow-dried to preserve aroma and therapeutic properties.`,(n)=>`Experience the purity of nature in every cup of ${n.toLowerCase()}. Certified organic, caffeine-conscious, and crafted for daily wellness.`,(n)=>`${n} blends time-honored herbal recipes with modern quality standards. FSSAI certified, chemical-free, and bursting with natural goodness.`],
  baby:[(n)=>`Specially formulated ${n.toLowerCase()} for delicate baby skin. Uses only the gentlest natural ingredients, hypoallergenic, dermatologist-tested, and certified organic.`,(n)=>`Our ${n.toLowerCase()} is made without parabens, alcohol, or harsh chemicals. Safe from birth, pH-balanced, and enriched with soothing organic botanicals.`,(n)=>`Protect your baby's sensitive skin with ${n.toLowerCase()}. Crafted from certified organic plant extracts with zero artificial fragrances or dyes.`,(n)=>`${n} meets the highest safety standards for infant care. Pediatrician-approved, organic-certified, and gentle enough for everyday use.`],
  household:[(n)=>`Our ${n.toLowerCase()} is made from plant-based, biodegradable ingredients. Tough on dirt, gentle on the environment, and safe for families and pets.`,(n)=>`Switch to eco-friendly living with our ${n.toLowerCase()}. No harsh chemicals, no toxic fumes — just effective, sustainable cleaning powered by nature.`,(n)=>`${n} harnesses the natural cleaning power of organic compounds. Free from phosphates, chlorine, and synthetic additives. Eco-certified and family-safe.`,(n)=>`Make your home safer and greener with ${n.toLowerCase()}. Formulated with natural actives, this product cleans effectively while leaving zero harmful residue.`],
};

const genProducts = (cat, count = 20) => {
  const names = PRODUCT_NAMES[cat] || PRODUCT_NAMES.food;
  const tier = PRICING[cat] || PRICING.food;
  const templates = DESC_TEMPLATES[cat] || DESC_TEMPLATES.food;
  return Array.from({ length: Math.min(count, names.length) }, (_, i) => {
    const name = names[i];
    const basePrice = Math.floor(tier.avg + (Math.sin(i * 3.7) * 0.4) * (tier.max - tier.min) * 0.6);
    const price = Math.max(tier.min, Math.min(tier.max, basePrice));
    const originalPrice = Math.floor(price * (1.15 + (i % 5) * 0.05));
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    const rating = +(4 + ((i * 17 + cat.charCodeAt(0)) % 12) * 0.08).toFixed(1);
    return {
      id:`${cat}-${i+1}`, name, category:cat, price, originalPrice, discount, rating,
      reviews:50+(i*37)%450, image:getProductImage(name),
      brand:BRANDS[i%BRANDS.length].name,
      certified:i%4!==3, isNew:i%5===0, bestseller:i%3===0,
      description:templates[i%templates.length](name),
      weight:`${150+(i*73)%400}g`, stock:15+(i*17)%90,
      ingredients:["Natural Extract","Organic Compounds","Essential Vitamins","Minerals"],
      sourcing:`Sourced from organic farms in ${["Karnataka","Kerala","Uttarakhand","Tamil Nadu","Himachal Pradesh"][i%5]}, India.`,
      usage:"Take 1–2 servings daily or as directed. Store in a cool, dry place.",
    };
  });
};

const ALL_PRODUCTS = [
  ...genProducts("food",45),...genProducts("skincare",18),
  ...genProducts("supplements",20),...genProducts("beverages",18),
  ...genProducts("baby",10),...genProducts("household",10),
];
const BEST_SELLERS = ALL_PRODUCTS.filter(p=>p.bestseller).slice(0,12);
const NEW_ARRIVALS  = ALL_PRODUCTS.filter(p=>p.isNew).slice(0,12);
const DEALS         = ALL_PRODUCTS.filter(p=>p.discount>18).slice(0,12);
const CATEGORY_COUNTS = Object.fromEntries(
  CATEGORIES.map(cat=>[cat.id,ALL_PRODUCTS.filter(p=>p.category===cat.id).length])
);

const HERO_SLIDES = [
  { img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90", headline:"Pure Nature,", highlight:"Pure Life.", sub:`${SITE_STATS.products} certified organic products from Karnataka's lush forests, delivered to your doorstep.` },
  { img:"https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=90", headline:"From the Farm,", highlight:"For You.", sub:`Partnering with ${SITE_STATS.farmers} local farmers using regenerative, sustainable agriculture.` },
  { img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1920&q=90", headline:"Ancient Roots,", highlight:"Modern Wellness.", sub:"Bringing Ayurvedic wisdom and certified organic goodness to every Indian home." },
];

const BLOGS = [
  {id:1,title:"10 Benefits of Organic Food You Need to Know",excerpt:"Discover why switching to organic food can transform your health and well-being. From reduced pesticide exposure to better nutrition.",image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=85",category:"Health Tips",date:"Apr 15, 2026",readTime:"5 min read"},
  {id:2,title:"The Complete Guide to Ayurvedic Skincare",excerpt:"Learn how ancient Ayurvedic principles can help you achieve glowing, healthy skin naturally without harsh chemicals.",image:"https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=85",category:"Skincare",date:"Apr 12, 2026",readTime:"7 min read"},
  {id:3,title:"Why Ashwagandha is the Ultimate Stress Buster",excerpt:"Explore the science behind ashwagandha and how this ancient herb can help manage stress and improve sleep quality.",image:"https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=800&q=85",category:"Supplements",date:"Apr 10, 2026",readTime:"6 min read"},
  {id:4,title:"Seasonal Eating: What to Buy This Spring",excerpt:"A comprehensive guide to spring produce that's both nutritious and delicious. Support local farmers while eating healthy.",image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=85",category:"Nutrition",date:"Apr 8, 2026",readTime:"4 min read"},
  {id:5,title:"Natural Baby Care: Safe Products for Your Little One",excerpt:"Everything you need to know about choosing safe, organic products for your baby's delicate skin and health.",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",category:"Baby Care",date:"Apr 5, 2026",readTime:"8 min read"},
  {id:6,title:"How to Start Your Own Organic Garden",excerpt:"Step-by-step guide to growing your own organic vegetables and herbs at home, even in small spaces.",image:"https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=85",category:"Gardening",date:"Apr 3, 2026",readTime:"10 min read"},
];

const CERTIFICATIONS = [
  {id:1,name:"India Organic",    desc:"Certified by APEDA under National Programme for Organic Production",logo:"🇮🇳"},
  {id:2,name:"USDA Organic",     desc:"Meets strict USDA organic standards for production and handling",logo:"🇺🇸"},
  {id:3,name:"EU Organic",       desc:"Compliant with European Union organic farming regulations",logo:"🇪🇺"},
  {id:4,name:"Jaivik Bharat",    desc:"FSSAI's organic certification for authentic Indian organic products",logo:"🌿"},
  {id:5,name:"Non-GMO Project",  desc:"Verified free from genetically modified organisms",logo:"🧬"},
  {id:6,name:"Fair Trade",       desc:"Ensures fair wages and ethical practices for farmers",logo:"🤝"},
];

const CHATBOT_RESPONSES = [
  {triggers:["fruit","fruits","apple","banana","mango","orange"],response:"Great choice! 🍎 We have fresh organic apples, bananas, mangoes, and 15+ more fruits. All farm-fresh and pesticide-free! Want me to show you our Fruits section?",action:{label:"Browse Fruits",cat:"food"}},
  {triggers:["vegetable","vegetables","veggie","carrot","spinach","tomato"],response:"Love that! 🥦 We carry 20+ varieties of organic vegetables — from leafy greens to root vegetables. All sourced directly from Karnataka farmers.",action:{label:"Shop Vegetables",cat:"food"}},
  {triggers:["skin","skincare","face","cream","serum","glow"],response:"Our skincare range is amazing! ✨ We have rose hip oils, turmeric masks, aloe serums — all 100% natural. No parabens, no sulfates.",action:{label:"Explore Skincare",cat:"skincare"}},
  {triggers:["tea","coffee","drink","juice","beverage"],response:"We have 18+ herbal teas and drinks! 🍵 Tulsi green tea, moringa detox, turmeric latte mix... perfect for every mood.",action:{label:"Browse Drinks",cat:"beverages"}},
  {triggers:["supplement","vitamin","protein","ashwagandha","health"],response:"Our supplements are pure and tested! 💪 Ashwagandha, spirulina, collagen, omega-3 — certified organic formulations.",action:{label:"Shop Supplements",cat:"supplements"}},
  {triggers:["baby","infant","child","diaper","gentle"],response:"Baby safety is our priority! 👶 Our baby range uses only the gentlest natural ingredients, dermatologist tested and certified organic.",action:{label:"Baby Products",cat:"baby"}},
  {triggers:["organic","certified","chemical","safe","pure"],response:"Yes! 😊 Every single product is 100% organic and chemical-free. We hold USDA, India Organic, and EU certifications. No shortcuts!",action:null},
  {triggers:["delivery","shipping","time","dispatch","courier"],response:"📦 Karnataka: 1–3 days. Pan India: 3–7 days. Free delivery on orders above ₹499. You'll get a tracking SMS after dispatch!",action:null},
  {triggers:["return","refund","policy","money back","exchange"],response:"We have a 7-day hassle-free return policy ✅ Not happy? We'll refund or replace — no questions asked.",action:null},
  {triggers:["price","cheap","offer","discount","sale","deal"],response:"Great news! 🏷️ We currently have Flash Sale deals with up to 30% off. Plus, orders above ₹499 get free delivery!",action:{label:"See Deals",cat:"deals"}},
  {triggers:["bulk","wholesale","restaurant","clinic","ngo"],response:"Yes! We offer special bulk pricing for orders above ₹5,000 🏪 Contact us on WhatsApp for NGOs, clinics & restaurants.",action:null,whatsapp:true},
  {triggers:["hello","hi","hey","namaste","good morning","good evening"],response:"Hello! 👋 Welcome to Organic Store! I'm Priya, your wellness assistant. What are you looking for today — fruits, skincare, herbal teas, or supplements?",action:null},
  {triggers:["help","support","assist","guide"],response:"Of course! I'm here to help 😊 You can ask me about products, delivery, returns, certifications, or anything else. What's on your mind?",action:null},
  {triggers:["thanks","thank you","great","awesome","perfect"],response:"You're so welcome! 🌿 Let me know if you need anything else. Happy healthy shopping! 😊",action:null},
];

const getBotResponse = (input) => {
  const lower = input.toLowerCase();
  for (const item of CHATBOT_RESPONSES) {
    if (item.triggers.some(t => lower.includes(t))) return item;
  }
  return { response:"Thanks for asking! 😊 Could you be a bit more specific? Ask about our fruits, skincare, supplements, delivery, or anything else!", action:null };
};

// ═══════════════════════════════════════════════════════════════════════════════
// [4] UTILITY HOOKS
// ═══════════════════════════════════════════════════════════════════════════════

const useLocalStorage = (key, initial) => {
  const [val, setVal] = useState(() => {
    if (typeof window === "undefined") return initial;
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch { return initial; }
  });
  const set = useCallback((v) => {
    setVal(prev => {
      const next = typeof v === "function" ? v(prev) : v;
      try { if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [val, set];
};

const pad = (n) => String(n).padStart(2, "0");

const useCountdown = (target) => {
  const [time, setTime] = useState({ h:0, m:0, s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({ h:Math.floor(diff/3600000), m:Math.floor((diff%3600000)/60000), s:Math.floor((diff%60000)/1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
};

const useScrolled = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
};

const scrollLock = { count:0 };
const lockScroll = () => { scrollLock.count++; document.body.style.overflow = "hidden"; };
const unlockScroll = () => {
  scrollLock.count = Math.max(0, scrollLock.count - 1);
  if (scrollLock.count === 0) document.body.style.overflow = "";
};

// ═══════════════════════════════════════════════════════════════════════════════
// [5] SVG ICON SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const Ic = {
  leaf:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  cart:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  user:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  search:(s=18,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  star:(s=14,c="#c9a962")=><svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  starEmpty:(s=14,c="#e5e2dc")=><svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  phone:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  mapPin:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  instagram:(s=18,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  facebook:(s=18,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  whatsapp:(s=24,c="#fff")=><svg width={s} height={s} viewBox="0 0 24 24" fill={c} aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  chat:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  x:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  minus:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  trash:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  check:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>,
  arrowRight:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  shield:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  truck:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  award:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  menu:(s=22,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  send:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  heart:(s=16,c="currentColor",f="none")=><svg width={s} height={s} viewBox="0 0 24 24" fill={f} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  eye:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  filter:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  clock:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  info:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  upload:(s=16,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  chevUp:(s=18,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>,
};

// ═══════════════════════════════════════════════════════════════════════════════
// [6] PRIMITIVE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const Stars = memo(({ rating, size = 14 }) => {
  const id = useId();
  const clipId = `hc-${id}`;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const HalfStar = () => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs><clipPath id={clipId}><rect x="0" y="0" width="12" height="24"/></clipPath></defs>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#e5e2dc"/>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#c9a962" clipPath={`url(#${clipId})`}/>
    </svg>
  );
  return (
    <span style={{ display:"inline-flex", gap:2, alignItems:"center" }} aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({length:5},(_,i)=>
        i < full ? <span key={i}>{Ic.star(size)}</span> :
        (i === full && half ? <HalfStar key={i}/> : <span key={i}>{Ic.starEmpty(size)}</span>)
      )}
    </span>
  );
});

const Btn = memo(({ children, onClick, variant="primary", small, full, style:s={}, disabled, icon, type="button" }) => {
  const [hov, setHov] = useState(false);
  const [ripple, setRipple] = useState(null);
  const rippleTimer = useRef(null);
  useEffect(() => () => { if (rippleTimer.current) clearTimeout(rippleTimer.current); }, []);

  const vars = {
    primary:{ bg:hov?"var(--primary-dark)":"var(--primary)", color:"#fff", border:"none", shadow:hov?"0 12px 32px rgba(26,58,42,0.4)":"0 6px 20px rgba(26,58,42,0.25)" },
    outline:{ bg:hov?"var(--accent-warm)":"transparent", color:"var(--primary)", border:"2px solid var(--primary)", shadow:"none" },
    ghost:{ bg:hov?"rgba(26,58,42,0.06)":"transparent", color:"var(--text-primary)", border:"none", shadow:"none" },
    danger:{ bg:hov?"#b02a37":"var(--error)", color:"#fff", border:"none", shadow:"none" },
    white:{ bg:hov?"rgba(255,255,255,0.95)":"#fff", color:"var(--primary)", border:"none", shadow:"0 6px 20px rgba(0,0,0,0.12)" },
    accent:{ bg:hov?"#a67c00":"var(--accent-gold)", color:"#fff", border:"none", shadow:hov?"0 8px 24px rgba(201,169,98,0.4)":"none" },
    glass:{ bg:hov?"rgba(255,255,255,0.85)":"var(--glass-bg)", color:"var(--primary)", border:"1px solid var(--glass-border)", shadow:"var(--glass-shadow)", backdropFilter:"var(--glass-blur)" },
  };
  const v = vars[variant] || vars.primary;

  const handleClick = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x:e.clientX-rect.left, y:e.clientY-rect.top });
    if (rippleTimer.current) clearTimeout(rippleTimer.current);
    rippleTimer.current = setTimeout(()=>setRipple(null), 600);
    onClick && onClick(e);
  };

  return (
    <button type={type} onClick={handleClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      disabled={disabled} aria-disabled={disabled}
      style={{ position:"relative", overflow:"hidden", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        fontFamily:"var(--font-body)", fontWeight:600, borderRadius:"var(--radius-md)",
        transition:"all 0.25s var(--ease-smooth)", cursor:disabled?"not-allowed":"pointer",
        padding:small?"10px 22px":"14px 32px", fontSize:small?13:14, letterSpacing:"0.3px",
        ...(full?{width:"100%"}:{}), ...(disabled?{opacity:0.55}:{}),
        background:v.bg, color:v.color, border:v.border||"none", boxShadow:v.shadow, ...s }}>
      {ripple && <span aria-hidden="true" style={{ position:"absolute", left:ripple.x, top:ripple.y, width:10, height:10, borderRadius:"50%", background:"rgba(255,255,255,0.4)", transform:"scale(0)", animation:"ripple 0.6s ease forwards", pointerEvents:"none" }}/>}
      {icon && <span style={{display:"flex"}} aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
});

const Badge = memo(({ children, color="var(--white)", bg, size="sm" }) => {
  const sizes = { xs:{fontSize:9,padding:"3px 8px"}, sm:{fontSize:10,padding:"4px 12px"}, md:{fontSize:11,padding:"6px 16px"} };
  const sz = sizes[size] || sizes.sm;
  return <span style={{ background:bg||"var(--primary)", color:color, fontSize:sz.fontSize, fontWeight:700, padding:sz.padding, borderRadius:50, fontFamily:"var(--font-body)", letterSpacing:"0.5px", textTransform:"uppercase", whiteSpace:"nowrap", display:"inline-block" }}>{children}</span>;
});

const Modal = memo(({ open, onClose, children, maxWidth=600, title }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    lockScroll();
    const t = setTimeout(()=>modalRef.current?.focus(), 50);
    return () => { clearTimeout(t); unlockScroll(); };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key==="Escape") onClose();
      if (e.key==="Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
        const first = focusable[0], last = focusable[focusable.length-1];
        if (!e.shiftKey && document.activeElement===last) { e.preventDefault(); first?.focus(); }
        if (e.shiftKey && document.activeElement===first) { e.preventDefault(); last?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={title||"Dialog"}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease", backdropFilter:"blur(6px)" }}>
      <div ref={modalRef} tabIndex={-1} onClick={e=>e.stopPropagation()}
        style={{ background:"var(--white)", borderRadius:"var(--radius-xl)", padding:"clamp(24px,4vw,40px)", maxWidth, width:"100%", animation:"scaleIn 0.3s var(--ease-out)", maxHeight:"90dvh", overflowY:"auto", position:"relative", boxShadow:"var(--shadow-xl)", outline:"none" }}>
        {title && <h2 style={{ fontFamily:"var(--font-heading)", fontSize:26, color:"var(--primary)", marginBottom:20, fontWeight:600 }}>{title}</h2>}
        <button onClick={onClose} aria-label="Close dialog"
          style={{ position:"absolute", top:16, right:16, background:"var(--bg-alt)", border:"none", width:36, height:36, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--text-secondary)", transition:"all 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.background="var(--border)"}
          onMouseLeave={e=>e.currentTarget.style.background="var(--bg-alt)"}>
          {Ic.x(16)}
        </button>
        {children}
      </div>
    </div>
  );
});

const Toast = memo(({ msg, type="success", onClose }) => {
  const onCloseRef = useRef(onClose);
  useEffect(()=>{ onCloseRef.current=onClose; },[onClose]);
  useEffect(()=>{ const t=setTimeout(()=>onCloseRef.current(),3200); return ()=>clearTimeout(t); },[]);
  const cfg = {
    success:{bg:"var(--success)",icon:Ic.check(16,"#fff")},
    error:{bg:"var(--error)",icon:Ic.x(16,"#fff")},
    info:{bg:"var(--info)",icon:Ic.info(16,"#fff")},
  };
  const c = cfg[type]||cfg.success;
  return (
    <div role="status" aria-live="polite"
      style={{ position:"fixed", bottom:32, left:"50%", transform:"translateX(-50%)", background:c.bg, color:"#fff", padding:"14px 28px", borderRadius:"var(--radius-md)", fontFamily:"var(--font-body)", fontWeight:500, fontSize:14, zIndex:500, animation:"slideUp 0.35s var(--ease-out)", boxShadow:"0 12px 40px rgba(0,0,0,0.25)", display:"flex", alignItems:"center", gap:10, maxWidth:"min(90vw,440px)", wordBreak:"break-word" }}>
      {c.icon} {msg}
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// [7] PRODUCT COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const ProductCard = memo(({ product, onAddToCart, onView }) => {
  const [hov, setHov] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [liked, setLiked] = useState(false);
  const [addAnim, setAddAnim] = useState(false);
  const addAnimTimer = useRef(null);
  const src = imgErr ? FALLBACK_IMG : product.image;

  useEffect(()=>()=>{ if(addAnimTimer.current) clearTimeout(addAnimTimer.current); },[]);

  const handleAdd = useCallback((e) => {
    e.stopPropagation();
    setAddAnim(true);
    if (addAnimTimer.current) clearTimeout(addAnimTimer.current);
    addAnimTimer.current = setTimeout(()=>setAddAnim(false), 600);
    onAddToCart(product);
  }, [onAddToCart, product]);

  const handleLike = useCallback((e) => { e.stopPropagation(); setLiked(l=>!l); }, []);
  const handleView = useCallback(()=>onView(product), [onView, product]);

  const badges = [];
  if (product.discount>15) badges.push({text:`-${product.discount}%`,bg:"var(--error)"});
  if (product.bestseller) badges.push({text:"Bestseller",bg:"var(--accent-gold)"});
  else if (product.isNew) badges.push({text:"New",bg:"var(--info)"});
  if (product.certified) badges.push({text:"Organic",bg:"var(--primary-light)"});

  return (
    <article
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="card-hover"
      style={{ background:"var(--white)", borderRadius:"var(--radius-lg)", overflow:"hidden", boxShadow:hov?"var(--shadow-xl)":"var(--shadow-sm)", transform:hov?"translateY(-6px)":"none", transition:"all 0.35s var(--ease-out)", cursor:"pointer", position:"relative", height:"100%", display:"flex", flexDirection:"column" }}>
      {badges.length>0 && (
        <div style={{ position:"absolute", top:12, left:12, zIndex:3, display:"flex", flexDirection:"column", gap:5 }}>
          {badges.map((b,i)=><Badge key={i} bg={b.bg} size="xs">{b.text}</Badge>)}
        </div>
      )}
      <button onClick={handleLike} aria-label={liked?"Remove from wishlist":"Add to wishlist"} aria-pressed={liked}
        style={{ position:"absolute", top:12, right:12, zIndex:3, background:"var(--white)", border:"none", width:34, height:34, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"var(--shadow-md)", transition:"all 0.25s", opacity:hov||liked?1:0, transform:liked?"scale(1.12)":"scale(1)", color:liked?"var(--error)":"var(--text-muted)" }}>
        {Ic.heart(15, liked?"var(--error)":"var(--text-muted)", liked?"var(--error)":"none")}
      </button>
      <div role="button" tabIndex={0} aria-label={`View details for ${product.name}`}
        onClick={handleView} onKeyDown={e=>e.key==="Enter"&&handleView()}
        style={{ height:230, overflow:"hidden", background:"var(--bg-alt)", position:"relative" }}>
        {!imgLoaded && <div className="skeleton" style={{ position:"absolute", inset:0 }} aria-hidden="true"/>}
        <img src={src} alt={product.name} loading="lazy"
          onLoad={()=>setImgLoaded(true)} onError={()=>{setImgErr(true);setImgLoaded(true);}}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s var(--ease-out)", transform:hov?"scale(1.08)":"scale(1)", opacity:imgLoaded?1:0 }}/>
      </div>
      <div style={{ padding:"18px", flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between", gap:10 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <p style={{ fontSize:10, color:"var(--primary-light)", fontWeight:700, margin:0, letterSpacing:"1px", textTransform:"uppercase" }}>{product.brand}</p>
          <h3 role="button" tabIndex={0} onClick={handleView} onKeyDown={e=>e.key==="Enter"&&handleView()}
            style={{ fontFamily:"var(--font-body)", fontWeight:600, fontSize:15, color:"var(--text-primary)", margin:0, lineHeight:1.4, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", cursor:"pointer" }}>
            {product.name}
          </h3>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <Stars rating={product.rating} size={12}/>
            <span style={{ fontSize:12, color:"var(--text-muted)" }}>({product.reviews})</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:20, fontWeight:700, color:"var(--primary)" }}>₹{product.price.toLocaleString("en-IN")}</span>
            <span style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"line-through" }}>₹{product.originalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <button onClick={handleAdd}
          style={{ width:"100%", background:hov?"var(--primary)":"var(--accent-warm)", border:"none", borderRadius:"var(--radius-md)", padding:"11px 18px", fontSize:13, fontWeight:600, cursor:"pointer", color:hov?"#fff":"var(--primary)", transition:"all 0.25s", display:"flex", alignItems:"center", justifyContent:"center", gap:8, animation:addAnim?"cartBounce 0.5s ease":"none", fontFamily:"var(--font-body)" }}>
          {Ic.cart(15, hov?"#fff":"var(--primary)")} Add to Cart
        </button>
      </div>
    </article>
  );
});

const ProductGrid = memo(({ products, onAddToCart, onView, cols }) => (
  <div style={{ display:"grid", gridTemplateColumns:cols||"repeat(auto-fill, minmax(250px, 1fr))", gap:24, width:"100%" }}>
    {products.map((p,idx)=>(
      <div key={p.id} className="fade-up" style={{ animationDelay:`${Math.min(idx*0.05,0.4)}s`, animationFillMode:"forwards" }}>
        <ProductCard product={p} onAddToCart={onAddToCart} onView={onView}/>
      </div>
    ))}
  </div>
));

const SectionHeader = memo(({ title, subtitle, action, onAction, centered }) => (
  <div style={{ display:"flex", justifyContent:centered?"center":"space-between", alignItems:"flex-end", marginBottom:44, flexWrap:"wrap", gap:20, textAlign:centered?"center":"left" }}>
    <div>
      <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(28px,4vw,48px)", color:"var(--primary)", marginBottom:10, fontWeight:600, lineHeight:1.15 }}>{title}</h2>
      {subtitle && <p style={{ color:"var(--text-secondary)", fontSize:15, maxWidth:520, margin:0, lineHeight:1.6 }}>{subtitle}</p>}
    </div>
    {action && <Btn variant="outline" small onClick={onAction} icon={Ic.arrowRight(14)}>{action}</Btn>}
  </div>
));

// Product Detail Modal
const ProductDetail = memo(({ product, onAddToCart, onClose, onCheckout }) => {
  const [tab, setTab] = useState("description");
  const [qty, setQty] = useState(1);
  useEffect(()=>{ setTab("description"); setQty(1); },[product?.id]);
  if (!product) return null;
  const tabs = [{id:"description",label:"Description"},{id:"ingredients",label:"Ingredients"},{id:"sourcing",label:"Sourcing"},{id:"usage",label:"Usage"}];
  return (
    <Modal open={!!product} onClose={onClose} maxWidth={900}>
      <div className="product-detail-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.1fr", gap:"clamp(20px,4vw,32px)", alignItems:"start" }}>
        <div>
          <img src={product.image} alt={product.name}
            onError={e=>{e.target.src=FALLBACK_IMG;}}
            style={{ width:"100%", borderRadius:"var(--radius-lg)", objectFit:"cover", aspectRatio:"1", display:"block", boxShadow:"var(--shadow-md)" }}/>
        </div>
        <div>
          <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
            {product.certified && <Badge bg="var(--primary-light)">Organic</Badge>}
            {product.bestseller && <Badge bg="var(--accent-gold)">Best Seller</Badge>}
            {product.isNew && <Badge bg="var(--info)">New</Badge>}
          </div>
          <p style={{ fontSize:11, color:"var(--primary-light)", fontWeight:700, textTransform:"uppercase", letterSpacing:"1px", marginBottom:6 }}>{product.brand}</p>
          <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(24px,3vw,32px)", color:"var(--primary)", marginBottom:14, fontWeight:600, lineHeight:1.2 }}>{product.name}</h2>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <Stars rating={product.rating} size={16}/>
            <span style={{ fontSize:14, color:"var(--text-muted)" }}>({product.reviews} reviews)</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24, flexWrap:"wrap" }}>
            <span style={{ fontSize:"clamp(26px,3.5vw,34px)", fontWeight:700, color:"var(--primary)", fontFamily:"var(--font-body)" }}>₹{product.price.toLocaleString("en-IN")}</span>
            <span style={{ fontSize:16, color:"var(--text-muted)", textDecoration:"line-through" }}>₹{product.originalPrice.toLocaleString("en-IN")}</span>
            {product.discount>0 && <Badge bg="var(--error)">-{product.discount}%</Badge>}
          </div>
          {/* Tab nav */}
          <div style={{ display:"flex", gap:0, borderBottom:"2px solid var(--border-light)", marginBottom:20 }} role="tablist" aria-label="Product details">
            {tabs.map(t=>(
              <div key={t.id} style={{ position:"relative", flex:1 }}>
                <button role="tab" aria-selected={tab===t.id} onClick={()=>setTab(t.id)}
                  style={{ width:"100%", padding:"12px 4px", background:"none", border:"none", fontFamily:"var(--font-body)", fontSize:13, fontWeight:tab===t.id?600:400, color:tab===t.id?"var(--primary)":"var(--text-muted)", cursor:"pointer", transition:"color 0.25s" }}>
                  {t.label}
                </button>
                {tab===t.id && <span style={{ position:"absolute", bottom:-2, left:0, right:0, height:2, background:"var(--primary)", borderRadius:2 }}/>}
              </div>
            ))}
          </div>
          <div role="tabpanel" style={{ minHeight:90, marginBottom:22, fontSize:14, color:"var(--text-secondary)", lineHeight:1.75 }}>
            {tab==="description" && <p>{product.description}</p>}
            {tab==="ingredients" && <p><strong>Ingredients:</strong> {product.ingredients.join(", ")}<br/><br/><strong>Weight:</strong> {product.weight}</p>}
            {tab==="sourcing" && <p>{product.sourcing} Our farmers use sustainable methods passed through generations.</p>}
            {tab==="usage" && <p>{product.usage}</p>}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
            <span style={{ fontSize:14, color:"var(--text-secondary)" }}>Qty:</span>
            <div style={{ display:"flex", alignItems:"center", border:"1.5px solid var(--border)", borderRadius:"var(--radius-sm)", overflow:"hidden" }}>
              <button aria-label="Decrease quantity" onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ background:"var(--bg-alt)", border:"none", width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--primary)" }}>{Ic.minus(14)}</button>
              <span style={{ padding:"0 18px", fontWeight:600, fontSize:15 }}>{qty}</span>
              <button aria-label="Increase quantity" onClick={()=>setQty(q=>q+1)} style={{ background:"var(--bg-alt)", border:"none", width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--primary)" }}>{Ic.plus(14)}</button>
            </div>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Btn onClick={()=>onAddToCart({...product,qty})} icon={Ic.cart(16,"#fff")} style={{flex:1, minWidth:150}}>Add to Cart</Btn>
            <Btn variant="outline" onClick={()=>{onAddToCart({...product,qty});onClose();onCheckout();}} style={{flex:1, minWidth:150}}>Buy Now</Btn>
          </div>
        </div>
      </div>
    </Modal>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// [8] LAYOUT COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const Navbar = memo(({ page, setPage, cartCount, user, setShowCart, setShowProfile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(30);
  const navLinks = [
    {id:"home",label:"Home"},{id:"shop",label:"Shop"},{id:"about",label:"About"},
    {id:"blog",label:"Blog"},{id:"certifications",label:"Certifications"},{id:"contact",label:"Contact"},
  ];
  useEffect(()=>setMenuOpen(false),[page]);
  useEffect(()=>{
    if (!menuOpen) return;
    const fn=(e)=>{ if(e.key==="Escape") setMenuOpen(false); };
    document.addEventListener("keydown",fn);
    return ()=>document.removeEventListener("keydown",fn);
  },[menuOpen]);

  return (
    <header>
      <nav role="navigation" aria-label="Main navigation"
        style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:scrolled?"rgba(250,249,246,0.96)":"rgba(250,249,246,0.92)", backdropFilter:"blur(24px)", borderBottom:scrolled?"1px solid var(--border-light)":"1px solid transparent", boxShadow:scrolled?"var(--shadow-sm)":"none", transition:"all 0.3s var(--ease-out)" }}>
        <div style={{ width:"100%", padding:"0 var(--container-pad)", display:"flex", alignItems:"center", justifyContent:"space-between", height:"var(--nav-h)" }}>
          {/* Logo */}
          <button onClick={()=>setPage("home")} aria-label="Organic Store — go to home"
            style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer", flexShrink:0, background:"none", border:"none" }}>
            <div style={{ width:40, height:40, background:"linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)", borderRadius:"var(--radius-sm)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 4px 12px rgba(26,58,42,0.2)" }}>
              {Ic.leaf(20,"#fff")}
            </div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontFamily:"var(--font-heading)", fontSize:22, fontWeight:700, color:"var(--primary)", lineHeight:1 }}>Organic Store</div>
              <div style={{ fontSize:9, color:"var(--text-muted)", letterSpacing:"2px", textTransform:"uppercase", fontWeight:600 }}>Pure & Natural</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hide-mobile" style={{ display:"flex", gap:4 }} role="list">
            {navLinks.map(l=>(
              <button key={l.id} role="listitem" onClick={()=>setPage(l.id)} aria-current={page===l.id?"page":undefined}
                style={{ background:page===l.id?"rgba(26,58,42,0.08)":"transparent", border:"none", padding:"10px 18px", borderRadius:"var(--radius-sm)", fontFamily:"var(--font-body)", fontWeight:page===l.id?600:500, color:page===l.id?"var(--primary)":"var(--text-secondary)", fontSize:14, cursor:"pointer", transition:"all 0.25s" }}
                onMouseEnter={e=>{ if(page!==l.id){e.currentTarget.style.color="var(--primary)";e.currentTarget.style.background="rgba(26,58,42,0.04)";} }}
                onMouseLeave={e=>{ if(page!==l.id){e.currentTarget.style.color="var(--text-secondary)";e.currentTarget.style.background="transparent";} }}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <button aria-label={`Open cart, ${cartCount} items`} onClick={()=>setShowCart(true)}
              style={{ position:"relative", background:"var(--bg-alt)", border:"none", borderRadius:"var(--radius-sm)", width:44, height:44, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--primary)", transition:"all 0.25s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(26,58,42,0.08)"}
              onMouseLeave={e=>e.currentTarget.style.background="var(--bg-alt)"}>
              {Ic.cart(18,"var(--primary)")}
              {cartCount>0 && <span aria-hidden="true" style={{ position:"absolute", top:-4, right:-4, background:"var(--accent-gold)", color:"#fff", fontSize:10, fontWeight:700, minWidth:20, height:20, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 5px", animation:"cartBounce 0.4s ease" }}>{cartCount}</span>}
            </button>
            <button aria-label={user?"My profile":"Sign in"} onClick={()=>setShowProfile(true)}
              style={{ background:user?"var(--primary)":"var(--bg-alt)", border:"none", borderRadius:"var(--radius-sm)", width:44, height:44, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.25s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {user?.name ? <span style={{ fontFamily:"var(--font-body)", fontSize:14, fontWeight:700, color:"#fff" }}>{user.name.charAt(0).toUpperCase()}</span> : Ic.user(18,user?"#fff":"var(--primary)")}
            </button>
            <button aria-label="Toggle mobile menu" aria-expanded={menuOpen} aria-controls="mobile-menu"
              className="hide-desktop"
              style={{ background:"var(--bg-alt)", border:"none", borderRadius:"var(--radius-sm)", width:44, height:44, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
              onClick={()=>setMenuOpen(o=>!o)}>
              {menuOpen ? Ic.x(20,"var(--primary)") : Ic.menu(20,"var(--primary)")}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div id="mobile-menu" role="menu" style={{ background:"var(--white)", padding:"12px var(--container-pad) 24px", borderTop:"1px solid var(--border-light)", animation:"slideDown 0.25s ease" }}>
            {navLinks.map(l=>(
              <button key={l.id} role="menuitem" aria-current={page===l.id?"page":undefined}
                onClick={()=>setPage(l.id)}
                style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", padding:"14px 0", fontFamily:"var(--font-body)", fontSize:15, color:page===l.id?"var(--primary)":"var(--text-primary)", borderBottom:"1px solid var(--border-light)", cursor:"pointer", fontWeight:page===l.id?600:400 }}>
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
});

const CartSidebar = memo(({ isOpen, onClose, cart, onUpdateQty, onRemove, onCheckout, user }) => {
  const count = cart.reduce((s,item)=>s+item.qty,0);
  const firstBtnRef = useRef(null);

  useEffect(()=>{
    if (!isOpen) return;
    lockScroll();
    setTimeout(()=>firstBtnRef.current?.focus(),100);
    return ()=>unlockScroll();
  },[isOpen]);

  useEffect(()=>{
    if (!isOpen) return;
    const fn=(e)=>{ if(e.key==="Escape") onClose(); };
    document.addEventListener("keydown",fn);
    return ()=>document.removeEventListener("keydown",fn);
  },[isOpen,onClose]);

  const subtotal = useMemo(()=>cart.reduce((s,i)=>s+i.price*i.qty,0),[cart]);
  const delivery = subtotal>=499?0:49;
  const gst = Math.round(subtotal*0.05);
  const grand = subtotal+delivery+gst;

  return (
    <>
      <div onClick={onClose} aria-hidden="true"
        style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:300, opacity:isOpen?1:0, pointerEvents:isOpen?"auto":"none", transition:"opacity 0.3s ease", backdropFilter:"blur(4px)" }}/>
      <div role="dialog" aria-modal="true" aria-label={`Shopping cart with ${count} items`}
        style={{ position:"fixed", top:0, right:0, bottom:0, width:"100%", maxWidth:460, background:"var(--white)", zIndex:400, transform:isOpen?"translateX(0)":"translateX(100%)", transition:"transform 0.35s var(--ease-out)", display:"flex", flexDirection:"column", boxShadow:"var(--shadow-xl)" }}>
        {/* Header */}
        <div style={{ padding:"24px 28px", borderBottom:"1px solid var(--border-light)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h2 style={{ fontFamily:"var(--font-heading)", fontSize:24, color:"var(--primary)", fontWeight:600 }}>Your Cart</h2>
            <p style={{ fontSize:13, color:"var(--text-muted)" }}>{count} {count===1?"item":"items"}</p>
          </div>
          <button ref={firstBtnRef} onClick={onClose} aria-label="Close cart"
            style={{ background:"var(--bg-alt)", border:"none", width:38, height:38, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--text-secondary)", transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background="var(--border)"}
            onMouseLeave={e=>e.currentTarget.style.background="var(--bg-alt)"}>
            {Ic.x(16)}
          </button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 28px" }}>
          {cart.length===0 ? (
            <div style={{ textAlign:"center", padding:"64px 0", color:"var(--text-muted)" }}>
              <div style={{ width:80, height:80, borderRadius:"50%", background:"var(--bg-alt)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                {Ic.cart(32,"var(--text-muted)")}
              </div>
              <p style={{ fontSize:17, fontWeight:600, color:"var(--text-secondary)" }}>Your cart is empty</p>
              <p style={{ fontSize:13, marginTop:6 }}>Discover our organic collection</p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {cart.map(item=>(
                <div key={item.id} style={{ display:"flex", gap:16, padding:16, background:"var(--bg)", borderRadius:"var(--radius-md)", animation:"fadeIn 0.3s ease" }}>
                  <img src={item.image} alt={item.name} loading="lazy"
                    onError={e=>{e.target.src=FALLBACK_IMG;}}
                    style={{ width:80, height:80, borderRadius:"var(--radius-sm)", objectFit:"cover", flexShrink:0 }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <h4 style={{ fontSize:14, fontWeight:600, color:"var(--text-primary)", marginBottom:4, lineHeight:1.3 }}>{item.name}</h4>
                    <p style={{ fontSize:11, color:"var(--text-muted)", marginBottom:10 }}>{item.brand}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ display:"flex", alignItems:"center", border:"1px solid var(--border)", borderRadius:"var(--radius-sm)", overflow:"hidden" }}>
                        <button aria-label={`Decrease quantity for ${item.name}`} onClick={()=>onUpdateQty(item.id,Math.max(1,item.qty-1))}
                          style={{ background:"var(--white)", border:"none", width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--primary)" }}>
                          {Ic.minus(12)}
                        </button>
                        <span style={{ padding:"0 12px", fontWeight:600, fontSize:13 }}>{item.qty}</span>
                        <button aria-label={`Increase quantity for ${item.name}`} onClick={()=>onUpdateQty(item.id,item.qty+1)}
                          style={{ background:"var(--white)", border:"none", width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--primary)" }}>
                          {Ic.plus(12)}
                        </button>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:15, fontWeight:700, color:"var(--primary)" }}>₹{(item.price*item.qty).toLocaleString("en-IN")}</span>
                        <button aria-label={`Remove ${item.name} from cart`} onClick={()=>onRemove(item.id)}
                          style={{ background:"none", border:"none", color:"var(--error)", cursor:"pointer", padding:4 }}>
                          {Ic.trash(14)}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length>0 && (
          <div style={{ padding:"24px 28px", borderTop:"1px solid var(--border-light)", background:"var(--bg)" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
              {[["Subtotal",`₹${subtotal.toLocaleString("en-IN")}`],["GST (5%)",`₹${gst.toLocaleString("en-IN")}`]].map(([l,v])=>(
                <div key={l} style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:13, color:"var(--text-secondary)" }}>{l}</span>
                  <span style={{ fontSize:13, fontWeight:500 }}>{v}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>Delivery</span>
                <span style={{ fontSize:13, fontWeight:500, color:delivery===0?"var(--primary)":"var(--text-primary)" }}>{delivery===0?"FREE":`₹${delivery}`}</span>
              </div>
              <div style={{ borderTop:"1px solid var(--border-light)", paddingTop:10, display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:15, fontWeight:700 }}>Total</span>
                <span style={{ fontSize:24, fontWeight:700, color:"var(--primary)", fontFamily:"var(--font-body)" }}>₹{grand.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Btn full onClick={onCheckout} style={{ padding:"15px 24px", marginBottom:10 }}>Proceed to Checkout</Btn>
            {!user && <p style={{ fontSize:12, color:"var(--warn)", textAlign:"center" }}>Please login to complete your order</p>}
            {delivery>0 && <p style={{ fontSize:12, color:"var(--primary)", textAlign:"center", marginTop:8 }}>Add ₹{(499-subtotal).toLocaleString("en-IN")} more for free delivery!</p>}
          </div>
        )}
      </div>
    </>
  );
});

const Footer = memo(({ setPage, setFilterCat }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const timer = useRef(null);
  useEffect(()=>()=>{ if(timer.current) clearTimeout(timer.current); },[]);

  const handleSubscribe = () => {
    if (!email.trim()||!/\S+@\S+\.\S+/.test(email)) return;
    setSubscribed(true);
    setEmail("");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(()=>setSubscribed(false),4000);
  };

  return (
    <footer style={{ background:"var(--primary-dark)", color:"#fff", padding:"80px var(--container-pad) 40px" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:48, marginBottom:56 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:42, height:42, background:"rgba(165,214,167,0.18)", borderRadius:"var(--radius-sm)", display:"flex", alignItems:"center", justifyContent:"center" }}>{Ic.leaf(20,"#a5d6a7")}</div>
              <span style={{ fontFamily:"var(--font-heading)", fontSize:22, fontWeight:700 }}>Organic Store</span>
            </div>
            <p style={{ color:"rgba(255,255,255,0.75)", fontSize:14, lineHeight:1.75, maxWidth:280 }}>Bringing certified organic products from Karnataka's lush forests to your doorstep. 100% natural, chemical-free, and sustainably sourced.</p>
          </div>
          <div>
            <h3 style={{ fontFamily:"var(--font-heading)", fontSize:18, fontWeight:600, marginBottom:20, color:"#a5d6a7" }}>Quick Links</h3>
            <nav aria-label="Footer navigation">
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {["Home","Shop","About","Blog","Certifications","Contact"].map(l=>(
                  <button key={l} onClick={()=>setPage(l.toLowerCase())}
                    style={{ background:"none", border:"none", color:"rgba(255,255,255,0.75)", fontSize:14, cursor:"pointer", textAlign:"left", transition:"color 0.25s", fontFamily:"var(--font-body)" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#a5d6a7"}
                    onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.75)"}>
                    {l}
                  </button>
                ))}
              </div>
            </nav>
          </div>
          <div>
            <h3 style={{ fontFamily:"var(--font-heading)", fontSize:18, fontWeight:600, marginBottom:20, color:"#a5d6a7" }}>Categories</h3>
            <nav aria-label="Product categories">
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {CATEGORIES.map(cat=>(
                  <button key={cat.id} onClick={()=>{setFilterCat(cat.id);setPage("shop");}}
                    style={{ background:"none", border:"none", color:"rgba(255,255,255,0.75)", fontSize:14, cursor:"pointer", textAlign:"left", transition:"color 0.25s", fontFamily:"var(--font-body)" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#a5d6a7"}
                    onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.75)"}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
          <div>
            <h3 style={{ fontFamily:"var(--font-heading)", fontSize:18, fontWeight:600, marginBottom:20, color:"#a5d6a7" }}>Newsletter</h3>
            <p style={{ color:"rgba(255,255,255,0.75)", fontSize:14, lineHeight:1.7, marginBottom:16 }}>Subscribe for exclusive offers and organic wellness tips.</p>
            {subscribed ? (
              <div style={{ background:"rgba(165,214,167,0.15)", border:"1px solid #a5d6a7", borderRadius:"var(--radius-sm)", padding:"14px 18px", color:"#a5d6a7", fontSize:13, display:"flex", alignItems:"center", gap:8 }}>
                {Ic.check(14,"#a5d6a7")} Subscribed! Thank you 🌿
              </div>
            ) : (
              <div style={{ display:"flex", gap:10 }}>
                <label htmlFor="footer-email" className="sr-only">Email address for newsletter</label>
                <input id="footer-email" type="email" placeholder="Your email address" value={email}
                  onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubscribe()}
                  style={{ flex:1, border:"1px solid rgba(255,255,255,0.15)", borderRadius:"var(--radius-sm)", padding:"12px 16px", background:"rgba(255,255,255,0.06)", color:"#fff", fontSize:13 }}
                  onFocus={e=>e.target.style.borderColor="#a5d6a7"}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.15)"}/>
                <button aria-label="Subscribe to newsletter" onClick={handleSubscribe}
                  style={{ background:"#a5d6a7", border:"none", borderRadius:"var(--radius-sm)", padding:"12px 16px", cursor:"pointer", color:"var(--primary-dark)", display:"flex", alignItems:"center", flexShrink:0 }}>
                  {Ic.send(15,"var(--primary-dark)")}
                </button>
              </div>
            )}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:32, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
          <p style={{ color:"rgba(255,255,255,0.55)", fontSize:13 }}>© 2026 Organic Store, Siddapur. All rights reserved.</p>
          <div style={{ display:"flex", gap:14 }}>
            {[["https://facebook.com",Ic.facebook(17,"#fff"),"Visit our Facebook page"],["https://instagram.com",Ic.instagram(17,"#fff"),"Visit our Instagram profile"],["https://wa.me/919483708480",Ic.whatsapp(17,"#fff"),"Chat on WhatsApp"]].map(([href,ico,label])=>(
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ background:"rgba(255,255,255,0.06)", width:36, height:36, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", transition:"all 0.25s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(165,214,167,0.25)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}>
                {ico}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// [9] FEATURE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const Chatbot = memo(({ setPage, setFilterCat }) => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{id:0,role:"bot",text:"Hello! 👋 I'm Priya, your organic wellness assistant. Ask me about products, delivery, or anything else!"}]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const msgId = useRef(1);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,typing]);
  useEffect(()=>{ if(open) setTimeout(()=>inputRef.current?.focus(),200); },[open]);
  useEffect(()=>{
    if(!open) return;
    const fn=(e)=>{ if(e.key==="Escape") setOpen(false); };
    document.addEventListener("keydown",fn);
    return ()=>document.removeEventListener("keydown",fn);
  },[open]);

  const send = useCallback(() => {
    const text = input.trim(); if(!text) return;
    setMsgs(m=>[...m,{id:msgId.current++,role:"user",text}]);
    setInput(""); setTyping(true);
    setTimeout(()=>{
      const r = getBotResponse(text);
      setTyping(false);
      setMsgs(m=>[...m,{id:msgId.current++,role:"bot",text:r.response,action:r.action,whatsapp:r.whatsapp}]);
    },900+Math.random()*400);
  },[input]);

  return (
    <>
      <button aria-label="Open chat assistant" onClick={()=>setOpen(o=>!o)}
        style={{ position:"fixed", bottom:96, right:28, zIndex:998, width:56, height:56, borderRadius:"50%", background:"var(--primary)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"var(--shadow-xl)", cursor:"pointer", transition:"all 0.3s", animation:"float 3.5s var(--ease-in-out) infinite" }}
        onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.12)";e.currentTarget.style.animation="none";}}
        onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.animation="float 3.5s var(--ease-in-out) infinite";}}>
        {open ? Ic.x(22,"#fff") : Ic.chat(22,"#fff")}
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Chat with Priya"
          style={{ position:"fixed", bottom:160, right:28, zIndex:997, width:"min(380px,calc(100vw - 56px))", background:"var(--white)", borderRadius:"var(--radius-xl)", boxShadow:"var(--shadow-xl)", animation:"scaleIn 0.28s var(--ease-out)", display:"flex", flexDirection:"column", overflow:"hidden", border:"1px solid var(--border-light)" }}>
          <div style={{ background:"linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)", padding:"18px 22px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🌿</div>
              <div>
                <div style={{ color:"#fff", fontWeight:600, fontSize:15, fontFamily:"var(--font-body)" }}>Priya</div>
                <div style={{ color:"rgba(255,255,255,0.75)", fontSize:11 }}>Organic Wellness Guide</div>
              </div>
            </div>
            <button aria-label="Close chat" onClick={()=>setOpen(false)}
              style={{ background:"rgba(255,255,255,0.15)", border:"none", width:34, height:34, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff" }}>
              {Ic.x(14,"#fff")}
            </button>
          </div>
          <div style={{ height:280, overflowY:"auto", padding:18, display:"flex", flexDirection:"column", gap:12 }}>
            {msgs.map(m=>(
              <div key={m.id} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", flexDirection:"column", alignItems:m.role==="user"?"flex-end":"flex-start", gap:6 }}>
                <div style={{ background:m.role==="user"?"var(--primary)":"var(--bg-alt)", color:m.role==="user"?"#fff":"var(--text-primary)", borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", padding:"12px 16px", maxWidth:"82%", fontSize:13, lineHeight:1.55 }}>
                  {m.text}
                </div>
                {m.action && (
                  <button onClick={()=>{ setFilterCat(m.action.cat); setPage("shop"); setOpen(false); }}
                    style={{ fontSize:12, background:"var(--accent-warm)", border:"1px solid var(--primary)", color:"var(--primary)", borderRadius:"var(--radius-sm)", padding:"6px 14px", cursor:"pointer", fontWeight:600, fontFamily:"var(--font-body)" }}>
                    {m.action.label} →
                  </button>
                )}
                {m.whatsapp && (
                  <a href="https://wa.me/919483708480" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:12, background:"#25D366", color:"#fff", borderRadius:"var(--radius-sm)", padding:"6px 14px", display:"flex", alignItems:"center", gap:5, fontWeight:600 }}>
                    {Ic.whatsapp(14,"#fff")} Chat on WhatsApp
                  </a>
                )}
              </div>
            ))}
            {typing && (
              <div style={{ display:"flex", gap:5, padding:"12px 16px", background:"var(--bg-alt)", borderRadius:"18px 18px 18px 4px", width:"fit-content" }}>
                {[0,1,2].map(i=><span key={i} style={{ width:8, height:8, borderRadius:"50%", background:"var(--primary-pale)", display:"block", animation:`typing 1.3s ease ${i*0.2}s infinite` }}/>)}
              </div>
            )}
            <div ref={endRef}/>
          </div>
          <div style={{ padding:"14px 18px", borderTop:"1px solid var(--border-light)", display:"flex", gap:10 }}>
            <label htmlFor="chat-input" className="sr-only">Message Priya</label>
            <input id="chat-input" ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),send())}
              placeholder="Ask about products, delivery…"
              style={{ flex:1, border:"1.5px solid var(--border)", borderRadius:"var(--radius-md)", padding:"11px 16px", fontSize:13, background:"var(--bg)", outline:"none" }}
              onFocus={e=>e.target.style.borderColor="var(--primary-light)"}
              onBlur={e=>e.target.style.borderColor="var(--border)"}/>
            <button aria-label="Send message" onClick={send}
              style={{ background:"var(--primary)", border:"none", borderRadius:"var(--radius-md)", width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
              {Ic.send(16,"#fff")}
            </button>
          </div>
        </div>
      )}
    </>
  );
});

const ProfileModal = memo(({ open, onClose, user, onSave, onLogout }) => {
  const [name, setName] = useState(user?.name||"");
  const [phone, setPhone] = useState(user?.phone||"");
  const [email, setEmail] = useState(user?.email||"");
  const [address, setAddress] = useState(user?.address||"");
  const [avatar, setAvatar] = useState(user?.avatar||null);
  const [err, setErr] = useState("");
  const fileRef = useRef(null);

  useEffect(()=>{
    setName(user?.name||"");setPhone(user?.phone||"");
    setEmail(user?.email||"");setAddress(user?.address||"");
    setAvatar(user?.avatar||null);setErr("");
  },[user,open]);

  const handleFile = (e) => {
    const file=e.target.files?.[0]; if(!file) return;
    if(file.size>2*1024*1024){setErr("Image must be under 2 MB");return;}
    const r=new FileReader();
    r.onload=()=>setAvatar(r.result);
    r.readAsDataURL(file);
  };

  const handleSave = () => {
    if(!name.trim()||!phone.trim()){setErr("Name and phone are required.");return;}
    if(!/^\d{10}$/.test(phone.replace(/\s/g,""))){setErr("Enter a valid 10-digit phone number.");return;}
    onSave({name:name.trim(),phone:phone.trim(),email:email.trim(),address:address.trim(),avatar},!user);
  };

  const field=(label,id,val,set,type="text",placeholder="")=>(
    <div key={id} style={{marginBottom:18}}>
      <label htmlFor={id} style={{display:"block",fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:8}}>{label}</label>
      <input id={id} type={type} value={val} onChange={e=>set(e.target.value)} placeholder={placeholder}
        style={{width:"100%",border:"1.5px solid var(--border)",borderRadius:"var(--radius-md)",padding:"12px 16px",fontSize:14,background:"var(--bg)",color:"var(--text-primary)",transition:"border 0.25s",outline:"none"}}
        onFocus={e=>e.target.style.borderColor="var(--primary-light)"}
        onBlur={e=>e.target.style.borderColor="var(--border)"}/>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title={user?"My Profile":"Welcome! Create Account"} maxWidth={520}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <div style={{width:96,height:96,borderRadius:"50%",background:"var(--accent-warm)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",overflow:"hidden",border:"3px solid var(--primary-pale)"}}>
            {avatar?<img src={avatar} alt="Profile" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"var(--font-heading)",fontSize:38,color:"var(--primary)",fontWeight:700}}>{name?name.charAt(0).toUpperCase():"?"}</span>}
          </div>
          <button onClick={()=>fileRef.current?.click()} aria-label="Upload profile photo"
            style={{position:"absolute",bottom:4,right:0,width:28,height:28,borderRadius:"50%",background:"var(--primary)",border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            {Ic.upload(12,"#fff")}
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}} aria-label="Choose profile photo file"/>
      </div>
      {field("Full Name *","pf-name",name,setName,"text","Your full name")}
      {field("Phone Number *","pf-phone",phone,setPhone,"tel","10-digit mobile number")}
      {field("Email Address","pf-email",email,setEmail,"email","Optional")}
      <div style={{marginBottom:18}}>
        <label htmlFor="pf-addr" style={{display:"block",fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:8}}>Delivery Address</label>
        <textarea id="pf-addr" value={address} onChange={e=>setAddress(e.target.value)} placeholder="House/Flat, Street, City, PIN" rows={3}
          style={{width:"100%",border:"1.5px solid var(--border)",borderRadius:"var(--radius-md)",padding:"12px 16px",fontSize:14,background:"var(--bg)",resize:"vertical",outline:"none"}}
          onFocus={e=>e.target.style.borderColor="var(--primary-light)"}
          onBlur={e=>e.target.style.borderColor="var(--border)"}/>
      </div>
      {err && <p role="alert" style={{color:"var(--error)",fontSize:13,marginBottom:16}}>{err}</p>}
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <Btn full onClick={handleSave} icon={Ic.check(15,"#fff")} style={{flex:1,minWidth:130}}>{user?"Save Changes":"Create Account"}</Btn>
        {user && <Btn variant="danger" onClick={onLogout} style={{flex:"0 0 auto"}}>Logout</Btn>}
      </div>
    </Modal>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// [10] PAGE SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const Hero = memo(({ setPage }) => {
  const [idx, setIdx] = useState(0);
  const prevIdx = useRef(0);

  useEffect(()=>{
    const id=setInterval(()=>{
      setIdx(i=>{ prevIdx.current=i; return (i+1)%HERO_SLIDES.length; });
    },6000);
    return ()=>clearInterval(id);
  },[]);

  const heroStats = [
    [SITE_STATS.products,"Products"],
    [SITE_STATS.farmers,SITE_STATS.farmerDesc],
    [SITE_STATS.customers,SITE_STATS.customerDesc],
  ];

  return (
    <section aria-label="Hero banner" style={{ position:"relative", height:"100dvh", minHeight:600, overflow:"hidden", display:"flex", alignItems:"center" }}>
      {HERO_SLIDES.map((s,i)=>(
        <div key={i} aria-hidden="true"
          style={{ position:"absolute", inset:0, backgroundImage:`url(${s.img})`, backgroundSize:"cover", backgroundPosition:"center", transition:"opacity 2s var(--ease-out)", opacity:i===idx?1:0, zIndex:i===idx?2:(i===prevIdx.current?1:0) }}/>
      ))}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(110deg, rgba(13,34,24,0.92) 0%, rgba(26,58,42,0.7) 50%, rgba(0,0,0,0.2) 100%)", zIndex:3 }}/>
      <div style={{ position:"relative", zIndex:4, width:"100%", padding:"0 var(--container-pad)", display:"flex", alignItems:"center", minHeight:"100%" }}>
        <div style={{ maxWidth:720, paddingTop:"var(--nav-h)" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.1)", backdropFilter:"blur(16px)", padding:"8px 20px", borderRadius:50, marginBottom:32, border:"1px solid rgba(255,255,255,0.2)" }}>
            {Ic.leaf(14,"#a5d6a7")}
            <span style={{ color:"#a5d6a7", fontSize:12, fontWeight:500, letterSpacing:"0.5px" }}>100% Certified Organic · Farm Fresh</span>
          </div>
          <h1 key={idx} style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(48px,7vw,96px)", fontWeight:700, color:"#fff", lineHeight:1.05, marginBottom:24, animation:"fadeUp 1s var(--ease-out) both" }}>
            {HERO_SLIDES[idx].headline}<br/>
            <span style={{ color:"#a5d6a7", fontStyle:"italic" }}>{HERO_SLIDES[idx].highlight}</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"clamp(15px,1.5vw,18px)", lineHeight:1.8, marginBottom:48, fontWeight:300, maxWidth:580 }}>{HERO_SLIDES[idx].sub}</p>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            <Btn onClick={()=>setPage("shop")} style={{ fontSize:15, padding:"16px 40px" }} icon={Ic.cart(18,"#fff")}>Shop Now</Btn>
            <Btn variant="glass" onClick={()=>setPage("about")} style={{ fontSize:15, padding:"16px 40px" }} icon={Ic.leaf(17,"var(--primary)")}>Our Story</Btn>
          </div>
          <div style={{ display:"flex", gap:"clamp(32px,5vw,64px)", marginTop:64, flexWrap:"wrap" }}>
            {heroStats.map(([num,lab])=>(
              <div key={lab}>
                <div style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"#a5d6a7", lineHeight:1 }}>{num}</div>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:6 }}>{lab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Slide dots */}
      <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", gap:10, zIndex:5 }} role="group" aria-label="Hero slides">
        {HERO_SLIDES.map((_,i)=>(
          <button key={i} aria-label={`Go to slide ${i+1} of ${HERO_SLIDES.length}`} aria-pressed={i===idx}
            onClick={()=>{ prevIdx.current=idx; setIdx(i); }}
            style={{ width:i===idx?32:8, height:8, borderRadius:4, background:i===idx?"#a5d6a7":"rgba(255,255,255,0.3)", border:"none", transition:"all 0.35s var(--ease-out)", cursor:"pointer", padding:0 }}/>
        ))}
      </div>
    </section>
  );
});

const TrustStrip = () => (
  <div style={{ background:"var(--primary)", padding:"18px 0" }}>
    <div style={{ width:"100%", padding:"0 var(--container-pad)" }}>
      <div style={{ display:"flex", justifyContent:"center", gap:"clamp(24px,5vw,64px)", flexWrap:"wrap" }}>
        {[{icon:Ic.truck(16,"#fff"),text:"Free delivery above ₹499"},{icon:Ic.shield(16,"#fff"),text:"100% Certified Organic"},{icon:Ic.award(16,"#fff"),text:"USDA & India Organic"},{icon:Ic.leaf(16,"#fff"),text:`${SITE_STATS.farmers} Farmer Partners`}].map(({icon,text})=>(
          <div key={text} style={{ display:"flex", alignItems:"center", gap:8, color:"#fff", fontSize:13, fontWeight:500, whiteSpace:"nowrap" }}>{icon} {text}</div>
        ))}
      </div>
    </div>
  </div>
);

const CategoryStrip = memo(({ setPage, setFilterCat }) => {
  const [hovCat, setHovCat] = useState(null);
  return (
    <section style={{ background:"var(--white)", padding:"var(--section-y) var(--container-pad)", borderBottom:"1px solid var(--border-light)" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto" }}>
        <SectionHeader title="Shop by Category" subtitle="Explore our curated organic collections" centered/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(170px, 1fr))", gap:20 }}>
          {CATEGORIES.map(cat=>{
            const h=hovCat===cat.id;
            return (
              <button key={cat.id} aria-label={`Browse ${cat.label}, ${CATEGORY_COUNTS[cat.id]} products`}
                onClick={()=>{setFilterCat(cat.id);setPage("shop");}}
                onMouseEnter={()=>setHovCat(cat.id)} onMouseLeave={()=>setHovCat(null)}
                style={{ background:h?cat.color:cat.bgColor, borderRadius:"var(--radius-lg)", padding:"32px 20px", cursor:"pointer", textAlign:"center", transition:"all 0.3s var(--ease-out)", border:"none", transform:h?"translateY(-6px)":"none", boxShadow:h?"var(--shadow-lg)":"var(--shadow-xs)", display:"block", width:"100%" }}>
                <div style={{ fontSize:40, marginBottom:16, display:"block", transition:"transform 0.3s var(--ease-out)", transform:h?"scale(1.15) rotate(5deg)":"scale(1) rotate(0deg)" }}>{cat.icon}</div>
                <div style={{ fontWeight:600, fontSize:14, color:h?"#fff":cat.color, transition:"color 0.3s" }}>{cat.label}</div>
                <div style={{ fontSize:11, color:h?"rgba(255,255,255,0.75)":"var(--text-muted)", marginTop:6 }}>{CATEGORY_COUNTS[cat.id]} products</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
});

const DealsSection = memo(({ onAddToCart, onView }) => {
  const [target] = useState(()=>{
    if(typeof window==="undefined") return Date.now()+24*3600000;
    try{
      const s=localStorage.getItem("flash-sale-end");
      if(s){const t=parseInt(s,10);if(t>Date.now())return t;}
      const f=Date.now()+24*3600000;
      localStorage.setItem("flash-sale-end",String(f));
      return f;
    }catch{return Date.now()+24*3600000;}
  });
  const {h,m,s}=useCountdown(target);
  return (
    <section aria-label="Flash sale deals" style={{ background:"linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, #2d6a4f 100%)", padding:"var(--section-y) var(--container-pad)" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <Badge bg="var(--accent-gold)" size="md" color="#fff">⚡ Flash Sale</Badge>
          <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(32px,5vw,56px)", color:"#fff", margin:"20px 0 12px", fontStyle:"italic" }}>Today's Special Deals</h2>
          <p style={{ color:"rgba(165,214,167,0.85)", fontSize:16, fontWeight:300, marginBottom:32 }}>Hurry! These prices expire in:</p>
          <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
            {[["Hours",h],["Minutes",m],["Seconds",s]].map(([lab,val])=>(
              <div key={lab} style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(12px)", borderRadius:"var(--radius-lg)", padding:"20px 28px", minWidth:100, border:"1px solid rgba(255,255,255,0.15)", textAlign:"center" }}>
                <div style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(36px,5vw,50px)", fontWeight:700, color:"#fff", animation:lab==="Seconds"?"countPulse 1s var(--ease-in-out) infinite":"none" }}>{pad(val)}</div>
                <div style={{ color:"rgba(165,214,167,0.85)", fontSize:11, marginTop:4, letterSpacing:"0.5px" }}>{lab}</div>
              </div>
            ))}
          </div>
        </div>
        <ProductGrid products={DEALS} onAddToCart={onAddToCart} onView={onView} cols="repeat(auto-fill, minmax(240px, 1fr))"/>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// [11] PAGES
// ═══════════════════════════════════════════════════════════════════════════════

const HomePage = memo(({ setPage, onAddToCart, onView, setFilterCat }) => (
  <div>
    <Hero setPage={setPage}/>
    <TrustStrip/>
    <CategoryStrip setPage={setPage} setFilterCat={setFilterCat}/>
    <section style={{ padding:"var(--section-y) var(--container-pad)", background:"var(--bg)" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto" }}>
        <SectionHeader title="Best Selling Products" subtitle="Most loved by our community" action="View All" onAction={()=>setPage("shop")}/>
        <ProductGrid products={BEST_SELLERS} onAddToCart={onAddToCart} onView={onView}/>
      </div>
    </section>
    <DealsSection onAddToCart={onAddToCart} onView={onView}/>
    <section style={{ padding:"var(--section-y) var(--container-pad)", background:"var(--bg-alt)" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto" }}>
        <SectionHeader title="New Arrivals" subtitle="Fresh additions to our organic family" action="Explore Shop" onAction={()=>setPage("shop")}/>
        <ProductGrid products={NEW_ARRIVALS} onAddToCart={onAddToCart} onView={onView}/>
      </div>
    </section>
    <section style={{ padding:"var(--section-y) var(--container-pad)", background:"var(--white)" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto" }}>
        <SectionHeader title="Our Trusted Brands" subtitle="Quality you can count on" centered/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:20 }}>
          {BRANDS.map(b=>(
            <div key={b.id} style={{ background:"var(--accent-warm)", borderRadius:"var(--radius-lg)", padding:"30px 22px", textAlign:"center", cursor:"default", transition:"all 0.3s var(--ease-out)" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="var(--shadow-lg)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="none";}}>
              <div style={{ fontFamily:"var(--font-heading)", fontSize:18, fontWeight:700, color:"var(--primary)", marginBottom:6 }}>{b.name}</div>
              <div style={{ fontSize:12, color:"var(--text-secondary)" }}>{b.tagline}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section style={{ padding:"var(--section-y) var(--container-pad)", background:"var(--bg)" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto" }}>
        <SectionHeader title="Why Choose Us?" subtitle="What sets us apart" centered/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px, 1fr))", gap:28 }}>
          {[
            {icon:Ic.shield(32,"var(--primary)"),title:"Certified Organic",desc:"Every product carries USDA or India Organic certification. Tested before it reaches you."},
            {icon:Ic.truck(32,"var(--primary)"),title:"Fast Delivery",desc:"1–3 days within Karnataka. Pan-India delivery in 3–7 days with real-time tracking."},
            {icon:Ic.award(32,"var(--primary)"),title:"Farmer-Direct",desc:`We source directly from ${SITE_STATS.farmers} local farmer partners, ensuring freshness and fair wages.`},
            {icon:Ic.leaf(32,"var(--primary)"),title:"Zero Chemicals",desc:"No synthetic pesticides, no GMOs, no additives. Just nature at its purest."},
          ].map(({icon,title,desc})=>(
            <article key={title} style={{ background:"var(--white)", borderRadius:"var(--radius-lg)", padding:"40px 32px", transition:"all 0.3s var(--ease-out)", textAlign:"center", boxShadow:"var(--shadow-sm)" }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--shadow-xl)";e.currentTarget.style.transform="translateY(-6px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--shadow-sm)";e.currentTarget.style.transform="";}}>
              <div style={{ width:68, height:68, borderRadius:"50%", background:"var(--accent-warm)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 22px" }}>{icon}</div>
              <h3 style={{ fontFamily:"var(--font-heading)", fontSize:22, color:"var(--primary)", marginBottom:12, fontWeight:600 }}>{title}</h3>
              <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.7 }}>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>
));

const ShopPage = memo(({ onAddToCart, onView, filterCat, setFilterCat }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [certOnly, setCertOnly] = useState(false);

  const prods = useMemo(()=>{
    let list = ALL_PRODUCTS;
    if (filterCat) list=list.filter(p=>p.category===filterCat);
    if (certOnly) list=list.filter(p=>p.certified);
    if (search) {
      const q=search.toLowerCase();
      list=list.filter(p=>p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q));
    }
    if (sort==="price-asc") return [...list].sort((a,b)=>a.price-b.price);
    if (sort==="price-desc") return [...list].sort((a,b)=>b.price-a.price);
    if (sort==="rating") return [...list].sort((a,b)=>b.rating-a.rating);
    if (sort==="newest") return [...list].sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));
    return list;
  },[filterCat,certOnly,search,sort]);

  return (
    <div style={{ padding:"var(--section-y) var(--container-pad)", paddingTop:"calc(var(--nav-h) + var(--section-y))", maxWidth:"var(--container-max)", margin:"0 auto" }}>
      <SectionHeader title="Organic Shop" subtitle={`${prods.length} products found`}/>
      {/* Filters */}
      <div style={{ background:"var(--white)", borderRadius:"var(--radius-lg)", padding:"22px 28px", marginBottom:36, boxShadow:"var(--shadow-sm)", display:"flex", gap:16, flexWrap:"wrap", alignItems:"center", border:"1px solid var(--border-light)" }}>
        <div style={{ position:"relative", flex:"1 1 280px" }}>
          <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)", pointerEvents:"none" }}>{Ic.search(18)}</span>
          <label htmlFor="shop-search" className="sr-only">Search products</label>
          <input id="shop-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products or brands…"
            style={{ width:"100%", border:"1.5px solid var(--border)", borderRadius:"var(--radius-md)", padding:"12px 18px 12px 48px", fontSize:14, background:"var(--bg)", color:"var(--text-primary)", transition:"border 0.25s", outline:"none" }}
            onFocus={e=>e.target.style.borderColor="var(--primary-light)"}
            onBlur={e=>e.target.style.borderColor="var(--border)"}/>
        </div>
        <label htmlFor="shop-sort" className="sr-only">Sort products</label>
        <select id="shop-sort" value={sort} onChange={e=>setSort(e.target.value)}
          style={{ border:"1.5px solid var(--border)", borderRadius:"var(--radius-md)", padding:"12px 18px", fontSize:14, background:"var(--bg)", color:"var(--text-primary)", cursor:"pointer", minWidth:180, outline:"none" }}>
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest First</option>
        </select>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }} role="group" aria-label="Filter by category">
          <button aria-pressed={!filterCat} onClick={()=>setFilterCat(null)}
            style={{ padding:"10px 20px", borderRadius:"var(--radius-md)", border:`1.5px solid ${!filterCat?"var(--primary)":"var(--border)"}`, background:!filterCat?"var(--primary)":"var(--white)", color:!filterCat?"#fff":"var(--text-secondary)", fontSize:13, cursor:"pointer", fontWeight:600, transition:"all 0.25s" }}>
            All
          </button>
          {CATEGORIES.map(cat=>(
            <button key={cat.id} aria-pressed={filterCat===cat.id} onClick={()=>setFilterCat(cat.id===filterCat?null:cat.id)}
              style={{ padding:"10px 20px", borderRadius:"var(--radius-md)", border:`1.5px solid ${filterCat===cat.id?cat.color:"var(--border)"}`, background:filterCat===cat.id?cat.color:"var(--white)", color:filterCat===cat.id?"#fff":"var(--text-secondary)", fontSize:13, cursor:"pointer", fontWeight:600, transition:"all 0.25s" }}>
              {cat.label}
            </button>
          ))}
        </div>
        <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, cursor:"pointer", color:"var(--text-secondary)", whiteSpace:"nowrap" }}>
          <input type="checkbox" checked={certOnly} onChange={e=>setCertOnly(e.target.checked)} style={{ accentColor:"var(--primary)" }}/>
          Certified Only
        </label>
      </div>
      {prods.length>0 ? <ProductGrid products={prods} onAddToCart={onAddToCart} onView={onView}/> : (
        <div style={{ textAlign:"center", padding:"100px 0", color:"var(--text-secondary)" }}>
          <div style={{ width:88, height:88, borderRadius:"50%", background:"var(--accent-warm)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px" }}>{Ic.search(36,"var(--primary-pale)")}</div>
          <p style={{ fontSize:20, fontWeight:600, color:"var(--text-primary)", marginBottom:10 }}>No products found</p>
          <p style={{ fontSize:14 }}>Try a different search term or category</p>
        </div>
      )}
    </div>
  );
});

const AboutPage = () => (
  <div style={{ paddingTop:"var(--nav-h)" }}>
    <section style={{ background:"linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)", padding:"clamp(72px,12vw,120px) var(--container-pad)", textAlign:"center" }}>
      <Badge bg="rgba(165,214,167,0.2)" color="#a5d6a7" size="md">Our Story</Badge>
      <h1 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(36px,5vw,68px)", color:"#fff", margin:"20px auto 18px", fontWeight:700, maxWidth:760, fontStyle:"italic" }}>
        From Karnataka's Forests to Your Home
      </h1>
      <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"clamp(15px,1.8vw,18px)", maxWidth:660, margin:"0 auto", lineHeight:1.8, fontWeight:300 }}>
        Founded with a vision to make organic living accessible to every Indian family, we bridge the gap between certified farmers and health-conscious consumers.
      </p>
    </section>
    <section style={{ padding:"var(--section-y) var(--container-pad)", background:"var(--white)" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto" }}>
        <div className="about-story-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(32px,5vw,72px)", alignItems:"center" }}>
          <div>
            <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(28px,4vw,44px)", color:"var(--primary)", marginBottom:24, fontWeight:600 }}>Why We Started</h2>
            {["Growing up in rural Karnataka, our founders witnessed the stark contrast between chemical-heavy commercial farming and the pure, nourishing produce from their grandparents' organic fields.","This inspired a mission: to create a platform where certified organic farmers could reach urban families, while consumers could trust the authenticity and purity of every product they buy.","Today, we partner with over 10 small-scale farmers across Karnataka, Kerala, and Uttarakhand — preserving traditional farming wisdom while meeting modern quality standards."].map((t,i)=>(
              <p key={i} style={{ fontSize:15, color:"var(--text-secondary)", lineHeight:1.8, marginBottom:18 }}>{t}</p>
            ))}
          </div>
          <div style={{ borderRadius:"var(--radius-xl)", overflow:"hidden", boxShadow:"var(--shadow-xl)" }}>
            <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=85" alt="Organic farm in Karnataka with lush green fields" loading="lazy" style={{ width:"100%", objectFit:"cover", aspectRatio:"4/3" }}/>
          </div>
        </div>
      </div>
    </section>
    <section style={{ background:"var(--accent-warm)", padding:"var(--section-y) var(--container-pad)" }}>
      <div style={{ maxWidth:"var(--container-max)", margin:"0 auto", textAlign:"center" }}>
        <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(28px,4vw,44px)", color:"var(--primary)", marginBottom:48, fontWeight:600 }}>Our Impact</h2>
        <div className="about-stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:24 }}>
          {[[SITE_STATS.products,"Products","Organic","🌿"],[SITE_STATS.farmers,"Farmer","Partners","🧑‍🌾"],[SITE_STATS.customers,"Happy","Families","❤️"],[SITE_STATS.certifications,"Active","Certifications","🏆"]].map(([num,label,sublabel,em])=>(
            <div key={label} style={{ background:"var(--white)", borderRadius:"var(--radius-xl)", padding:"clamp(24px,3vw,40px) 24px", boxShadow:"var(--shadow-sm)" }}>
              <div style={{ fontSize:"clamp(32px,4vw,52px)", marginBottom:10 }}>{em}</div>
              <div style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(32px,4vw,52px)", fontWeight:700, color:"var(--primary)", lineHeight:1 }}>{num}</div>
              <div style={{ fontSize:14, color:"var(--text-secondary)", marginTop:10, fontWeight:500 }}>{label}<br/>{sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const BlogPage = () => (
  <div style={{ padding:"var(--section-y) var(--container-pad)", paddingTop:"calc(var(--nav-h) + var(--section-y))", maxWidth:"var(--container-max)", margin:"0 auto" }}>
    <SectionHeader title="Organic Living Blog" subtitle="Tips, guides, and wellness wisdom from our experts"/>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))", gap:32 }}>
      {BLOGS.map(b=>(
        <article key={b.id} style={{ background:"var(--white)", borderRadius:"var(--radius-xl)", overflow:"hidden", boxShadow:"var(--shadow-sm)", transition:"all 0.3s var(--ease-out)", cursor:"pointer" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="var(--shadow-xl)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}>
          <div style={{ height:210, overflow:"hidden" }}>
            <img src={b.image} alt={b.title} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s var(--ease-out)" }}
              onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
          </div>
          <div style={{ padding:28 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <Badge bg="var(--accent-warm)" color="var(--primary)" size="xs">{b.category}</Badge>
              <span style={{ fontSize:12, color:"var(--text-muted)", display:"flex", alignItems:"center", gap:4 }}>{Ic.clock(13,"var(--text-muted)")} {b.readTime}</span>
            </div>
            <h3 style={{ fontFamily:"var(--font-heading)", fontSize:22, color:"var(--text-primary)", marginBottom:12, fontWeight:600, lineHeight:1.3 }}>{b.title}</h3>
            <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.7, marginBottom:18 }}>{b.excerpt}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:12, color:"var(--text-muted)" }}>{b.date}</span>
              <button style={{ background:"none", border:"none", color:"var(--primary)", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                Read More {Ic.arrowRight(14,"var(--primary)")}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const CertificationsPage = () => (
  <div style={{ padding:"var(--section-y) var(--container-pad)", paddingTop:"calc(var(--nav-h) + var(--section-y))", maxWidth:"var(--container-max)", margin:"0 auto" }}>
    <div style={{ textAlign:"center", marginBottom:60 }}>
      <h1 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(32px,4vw,54px)", color:"var(--primary)", marginBottom:18, fontWeight:600 }}>Our Certifications</h1>
      <p style={{ fontSize:16, color:"var(--text-secondary)", maxWidth:600, margin:"0 auto", lineHeight:1.75 }}>Every product in our store meets rigorous international and national organic standards. Here's what we're certified for:</p>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:24, marginBottom:60 }}>
      {CERTIFICATIONS.map(c=>(
        <article key={c.id} style={{ background:"var(--white)", borderRadius:"var(--radius-xl)", padding:"clamp(28px,3vw,40px)", boxShadow:"var(--shadow-sm)", border:"1px solid var(--border-light)", display:"flex", gap:22, alignItems:"flex-start", transition:"all 0.3s var(--ease-out)" }}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--shadow-lg)";e.currentTarget.style.transform="translateY(-4px)";}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--shadow-sm)";e.currentTarget.style.transform="";}}>
          <div style={{ fontSize:48, flexShrink:0 }}>{c.logo}</div>
          <div>
            <h3 style={{ fontFamily:"var(--font-heading)", fontSize:22, color:"var(--primary)", marginBottom:10, fontWeight:600 }}>{c.name}</h3>
            <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.65 }}>{c.desc}</p>
          </div>
        </article>
      ))}
    </div>
    <div style={{ background:"var(--accent-warm)", borderRadius:"var(--radius-xl)", padding:"clamp(32px,4vw,52px)", textAlign:"center", boxShadow:"var(--shadow-md)" }}>
      <div style={{ fontSize:48, marginBottom:18 }}>🌿</div>
      <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(24px,3vw,36px)", color:"var(--primary)", marginBottom:18, fontWeight:600 }}>Our Quality Promise</h2>
      <p style={{ fontSize:15, color:"var(--text-secondary)", maxWidth:680, margin:"0 auto", lineHeight:1.75 }}>Every product undergoes third-party lab testing before reaching you. We publish batch-level test reports on request. Our zero-tolerance policy on pesticides and GMOs is non-negotiable.</p>
    </div>
  </div>
);

const ContactPage = () => {
  const [form, setForm] = useState({name:"",email:"",phone:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const set = (f) => (e) => setForm(p=>({...p,[f]:e.target.value}));
  const handleSubmit = () => {
    if(!form.name.trim()||!form.phone.trim()||!form.message.trim()){setErr("Please fill in all required fields.");return;}
    setSent(true);setErr("");
  };

  const inputStyle = { width:"100%", border:"1.5px solid var(--border)", borderRadius:"var(--radius-md)", padding:"13px 16px", fontSize:14, background:"var(--bg)", color:"var(--text-primary)", outline:"none", transition:"border 0.25s" };
  const onFocus = (e)=>e.target.style.borderColor="var(--primary-light)";
  const onBlur  = (e)=>e.target.style.borderColor="var(--border)";

  return (
    <div style={{ padding:"var(--section-y) var(--container-pad)", paddingTop:"calc(var(--nav-h) + var(--section-y))", maxWidth:"var(--container-max)", margin:"0 auto" }}>
      <SectionHeader title="Contact Us" subtitle="We'd love to hear from you. Reach out any time!"/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:48 }}>
        {/* Form */}
        <div>
          {sent ? (
            <div style={{ background:"var(--accent-warm)", borderRadius:"var(--radius-xl)", padding:48, textAlign:"center" }}>
              <div style={{ width:80, height:80, borderRadius:"50%", background:"var(--primary)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>{Ic.check(34,"#fff")}</div>
              <h3 style={{ fontFamily:"var(--font-heading)", fontSize:26, color:"var(--primary)", marginBottom:12 }}>Message Sent!</h3>
              <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.75 }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <Btn onClick={()=>{setSent(false);setForm({name:"",email:"",phone:"",subject:"",message:""}); }} style={{marginTop:28}}>Send Another</Btn>
            </div>
          ) : (
            <div style={{ background:"var(--white)", borderRadius:"var(--radius-xl)", padding:"clamp(28px,3vw,44px)", boxShadow:"var(--shadow-md)" }}>
              <h2 style={{ fontFamily:"var(--font-heading)", fontSize:28, color:"var(--primary)", marginBottom:28, fontWeight:600 }}>Send a Message</h2>
              {[["Name *","name","text","Your full name"],["Email","email","email","your@email.com"],["Phone *","phone","tel","10-digit number"],["Subject","subject","text","How can we help?"]].map(([label,field,type,ph])=>(
                <div key={field} style={{marginBottom:18}}>
                  <label htmlFor={`c-${field}`} style={{display:"block",fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:8}}>{label}</label>
                  <input id={`c-${field}`} type={type} value={form[field]} onChange={set(field)} placeholder={ph} style={inputStyle} onFocus={onFocus} onBlur={onBlur}/>
                </div>
              ))}
              <div style={{marginBottom:18}}>
                <label htmlFor="c-message" style={{display:"block",fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:8}}>Message *</label>
                <textarea id="c-message" value={form.message} onChange={set("message")} placeholder="Write your message here…" rows={5}
                  style={{...inputStyle,resize:"vertical"}} onFocus={onFocus} onBlur={onBlur}/>
              </div>
              {err && <p role="alert" style={{color:"var(--error)",fontSize:13,marginBottom:16}}>{err}</p>}
              <Btn full onClick={handleSubmit} icon={Ic.send(15,"#fff")}>Send Message</Btn>
            </div>
          )}
        </div>
        {/* Info */}
        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          {[[Ic.phone(22,"var(--primary)"),"+91 94837 08480","Mon–Sat 9AM–7PM"],[Ic.mail(22,"var(--primary)"),"hello@organicstore.in","We reply within 24h"],[Ic.mapPin(22,"var(--primary)"),"Siddapur, Karnataka 581355","Near Forest Range Office"]].map(([icon,main,sub],i)=>(
            <div key={i} style={{ background:"var(--white)", borderRadius:"var(--radius-xl)", padding:"24px 30px", boxShadow:"var(--shadow-md)", display:"flex", gap:18, alignItems:"center" }}>
              <div style={{ width:50, height:50, borderRadius:"50%", background:"var(--accent-warm)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
              <div>
                <p style={{ fontWeight:600, fontSize:15, color:"var(--text-primary)", marginBottom:4 }}>{main}</p>
                <p style={{ fontSize:13, color:"var(--text-muted)" }}>{sub}</p>
              </div>
            </div>
          ))}
          <div style={{ background:"var(--white)", borderRadius:"var(--radius-xl)", padding:"24px 30px", boxShadow:"var(--shadow-md)", marginBottom:24 }}>
            <h3 style={{ fontFamily:"var(--font-heading)", fontSize:18, color:"var(--primary)", marginBottom:14 }}>Business Hours</h3>
            {[["Mon – Sat","9:00 AM – 7:00 PM"],["Sunday","10:00 AM – 5:00 PM"]].map(([day,time])=>(
              <div key={day} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--border-light)" }}>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>{day}</span>
                <span style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)" }}>{time}</span>
              </div>
            ))}
          </div>
          <div style={{ borderRadius:"var(--radius-xl)", overflow:"hidden", boxShadow:"var(--shadow-md)", height:240 }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.848483926854!2d74.5638!3d14.6458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8f0e0c0c0c0c1%3A0x1234567890abcdef!2sSiddapur%2C%20Karnataka%20581355!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" title="Organic Store location in Siddapur, Karnataka"/>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderConfirmContent = memo(({ onClose }) => {
  const orderId = useMemo(()=>{
    try{ return crypto.randomUUID().replace(/-/g,"").slice(0,8).toUpperCase(); }
    catch{ return Math.random().toString(36).slice(2,10).toUpperCase(); }
  },[]);
  return (
    <div style={{ textAlign:"center", padding:"20px 0 10px" }}>
      <div style={{ width:84, height:84, borderRadius:"50%", background:"var(--primary)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
        {Ic.check(36,"#fff")}
      </div>
      <h3 style={{ fontFamily:"var(--font-heading)", fontSize:24, color:"var(--primary)", marginBottom:12 }}>Thank You!</h3>
      <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.75, marginBottom:20 }}>Your order has been placed successfully. You'll receive a confirmation SMS with tracking details soon.</p>
      <p style={{ fontSize:13, color:"var(--primary-light)", marginBottom:24 }}>Order ID: #ORG{orderId}</p>
      <Btn onClick={onClose} full>Continue Shopping</Btn>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// [12] ERROR BOUNDARY + APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state={hasError:false,error:null}; }
  static getDerivedStateFromError(error){ return {hasError:true,error}; }
  componentDidCatch(error,info){ console.error("App error:",error,info); }
  render(){
    if (this.state.hasError) {
      return (
        <div style={{ minHeight:"100dvh", display:"flex", alignItems:"center", justifyContent:"center", padding:24, textAlign:"center" }}>
          <div>
            <div style={{ fontSize:64, marginBottom:20 }}>🌿</div>
            <h1 style={{ fontFamily:"var(--font-heading)", fontSize:32, color:"var(--primary)", marginBottom:12 }}>Something went wrong</h1>
            <p style={{ color:"var(--text-secondary)", marginBottom:24, maxWidth:400 }}>We encountered an unexpected error. Please refresh the page to try again.</p>
            <button onClick={()=>window.location.reload()}
              style={{ background:"var(--primary)", color:"#fff", border:"none", borderRadius:"var(--radius-md)", padding:"14px 32px", fontSize:14, fontWeight:600, cursor:"pointer" }}>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useLocalStorage("organic-cart-v3", []);
  const [user, setUser] = useLocalStorage("organic-user-v3", null);
  const [filterCat, setFilterCat] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[page]);

  useEffect(()=>{
    const fn=()=>setShowBackToTop(window.scrollY>400);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const addToCart = useCallback((product)=>{
    setCart(prev=>{
      const existing=prev.find(i=>i.id===product.id);
      if(existing) return prev.map(i=>i.id===product.id?{...i,qty:i.qty+(product.qty||1)}:i);
      return [...prev,{...product,qty:product.qty||1}];
    });
    setToast({msg:`${product.name} added to cart! 🛒`,type:"success"});
  },[setCart]);

  const updateCartQty = useCallback((id,qty)=>{
    setCart(prev=>prev.map(i=>i.id===id?{...i,qty}:i));
  },[setCart]);

  const removeFromCart = useCallback((id)=>{
    setCart(prev=>prev.filter(i=>i.id!==id));
    setToast({msg:"Item removed from cart",type:"info"});
  },[setCart]);

  const handleCheckout = useCallback(()=>{
    if(!user){ setShowCart(false); setShowProfile(true); setToast({msg:"Please login to complete your order",type:"info"}); return; }
    setShowCart(false); setShowOrderConfirm(true);
  },[user]);

  const handleSaveProfile = useCallback((data,isNew)=>{
    setUser(data);
    setToast({msg:isNew?"Welcome! You're registered 🌿":"Profile updated! ✓",type:"success"});
    setShowProfile(false);
  },[setUser]);

  const handleLogout = useCallback(()=>{
    setUser(null);
    setToast({msg:"Logged out",type:"info"});
    setShowProfile(false);
  },[setUser]);

  const cartCount = useMemo(()=>cart.reduce((s,i)=>s+i.qty,0),[cart]);

  const renderedPage = useMemo(()=>{
    switch(page){
      case "home":          return <HomePage setPage={setPage} onAddToCart={addToCart} onView={setSelectedProduct} setFilterCat={setFilterCat}/>;
      case "shop":          return <ShopPage onAddToCart={addToCart} onView={setSelectedProduct} filterCat={filterCat} setFilterCat={setFilterCat}/>;
      case "about":         return <AboutPage/>;
      case "blog":          return <BlogPage/>;
      case "certifications":return <CertificationsPage/>;
      case "contact":       return <ContactPage/>;
      default:              return <HomePage setPage={setPage} onAddToCart={addToCart} onView={setSelectedProduct} setFilterCat={setFilterCat}/>;
    }
  },[page,addToCart,filterCat]);

  return (
    <ErrorBoundary>
      <div style={{ minHeight:"100dvh", background:"var(--bg)", overflowX:"hidden" }}>
        <Navbar page={page} setPage={setPage} cartCount={cartCount} user={user} setShowCart={setShowCart} setShowProfile={setShowProfile}/>
        <main id="main-content">{renderedPage}</main>
        <Footer setPage={setPage} setFilterCat={setFilterCat}/>

        {/* Overlays */}
        <CartSidebar isOpen={showCart} onClose={()=>setShowCart(false)} cart={cart} onUpdateQty={updateCartQty} onRemove={removeFromCart} onCheckout={handleCheckout} user={user}/>
        <ProductDetail product={selectedProduct} onAddToCart={addToCart} onClose={()=>setSelectedProduct(null)} onCheckout={handleCheckout}/>
        <ProfileModal open={showProfile} onClose={()=>setShowProfile(false)} user={user} onSave={handleSaveProfile} onLogout={handleLogout}/>
        <Modal open={showOrderConfirm} onClose={()=>{setShowOrderConfirm(false);setCart([]);}} maxWidth={420} title="Order Confirmed! 🎉">
          <OrderConfirmContent onClose={()=>{setShowOrderConfirm(false);setCart([]);}}/>
        </Modal>

        {/* Floating actions */}
        <Chatbot setPage={setPage} setFilterCat={setFilterCat}/>

        <a href="https://wa.me/919483708480?text=Hello%20Organic%20Store%2C%20I%20need%20help"
          target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
          style={{ position:"fixed", bottom:28, right:28, zIndex:998, width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 24px rgba(37,211,102,0.45)", transition:"all 0.3s", animation:"float 3s var(--ease-in-out) infinite" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.12)";e.currentTarget.style.animation="none";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.animation="float 3s var(--ease-in-out) infinite";}}>
          {Ic.whatsapp(28,"#fff")}
        </a>

        {showBackToTop && (
          <button aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
            style={{ position:"fixed", bottom:96, right:28, zIndex:998, width:48, height:48, borderRadius:"50%", background:"var(--primary)", color:"#fff", border:"none", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 20px rgba(26,58,42,0.35)", cursor:"pointer", transition:"all 0.25s", animation:"fadeIn 0.3s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.background="var(--primary-dark)";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="var(--primary)";e.currentTarget.style.transform="translateY(0)";}}>
            {Ic.chevUp(20,"#fff")}
          </button>
        )}

        {/* Toast notifications */}
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      </div>
    </ErrorBoundary>
  );
}