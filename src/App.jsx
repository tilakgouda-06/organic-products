import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const T = {
  primary: "#2D6A4F",
  primaryLight: "#52B788",
  primaryDark: "#1B4332",
  accent: "#D8F3DC",
  secondary: "#8B7355",
  secondaryLight: "#A68B6B",
  bg: "#F8F9FA",
  bgAlt: "#F1F3E9",
  white: "#FFFFFF",
  charcoal: "#2D3436",
  textPrimary: "#2D3436",
  textSecondary: "#636E72",
  textLight: "#B2BEC3",
  border: "#E9ECEF",
  borderLight: "#F1F3F5",
  success: "#27AE60",
  warning: "#F39C12",
  error: "#E74C3C",
  info: "#3498DB",
  shadow: "0 2px 20px rgba(45,106,79,0.08)",
  shadowHover: "0 8px 40px rgba(45,106,79,0.15)",
  shadowCard: "0 1px 12px rgba(0,0,0,0.06)",
  shadowLifted: "0 12px 48px rgba(45,106,79,0.12)",
  fontHeading: "'Playfair Display', Georgia, serif",
  fontBody: "'Inter', 'Poppins', 'Segoe UI', sans-serif",
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 },
  radius: { sm: "8px", md: "12px", lg: "16px", xl: "24px", full: "50%" },
};

// ─── GOOGLE FONTS ────────────────────────────────────────────────────────────
const injectFonts = () => {
  if (document.getElementById("gf-organic")) return;
  const link = document.createElement("link");
  link.id = "gf-organic";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(link);
};

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const injectGlobalStyles = () => {
  if (document.getElementById("global-organic")) return;
  const style = document.createElement("style");
  style.id = "global-organic";
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { 
      font-family: 'Inter', 'Poppins', sans-serif; 
      background: ${T.bg}; 
      color: ${T.textPrimary}; 
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: ${T.bgAlt}; }
    ::-webkit-scrollbar-thumb { background: ${T.primaryLight}; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: ${T.primary}; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes slideDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideInRight { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }
    @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.05);} }
    @keyframes ripple { to { transform:scale(4); opacity:0; } }
    @keyframes spin { to { transform:rotate(360deg); } }
    @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
    @keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
    @keyframes countPulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);} }
    @keyframes float { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-10px);} }
    @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
    .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
    .fade-in { animation: fadeIn 0.4s ease forwards; }
    img { max-width:100%; display:block; }
    button { cursor:pointer; border:none; outline:none; background:none; }
    input, textarea, select { font-family: inherit; outline:none; }
    a { text-decoration:none; color:inherit; }
    .skeleton {
      background: linear-gradient(90deg, ${T.borderLight} 25%, #e8e8e8 50%, ${T.borderLight} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @media(max-width:900px){ .hide-mobile { display:none!important; } }
    @media(min-width:901px){ .hide-desktop { display:none!important; } }
    *:focus-visible { outline: 2px solid ${T.primaryLight}; outline-offset: 2px; }
  `;
  document.head.appendChild(style);
};

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const Icon = {
  leaf: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  cart: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  user: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  search: (s = 18, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  star: (s = 14, c = "#F39C12") => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  starEmpty: (s = 14, c = "#E0E0E0") => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  phone: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  mapPin: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  instagram: (s = 18, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  facebook: (s = 18, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  whatsapp: (s = 24, c = "#fff") => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  chat: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  x: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  minus: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  trash: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  check: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrowRight: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  arrowLeft: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  shield: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  truck: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  award: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  menu: (s = 22, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  send: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  heart: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  eye: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  filter: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  grid: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  camera: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="12" r="4"/></svg>,
  upload: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  fileText: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  clock: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  info: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  bookmark: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  droplet: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  sun: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
};

// ─── IMAGE MAPPING ───────────────────────────────────────────────────────────
const getImageForProduct = (name, category) => {
  const n = name.toLowerCase();
  const imgMap = {
    food: {
      quinoa: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=85",
      honey: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=85",
      "coconut oil": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=85",
      rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=85",
      chia: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=85",
      moringa: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&q=85",
      sugar: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=85",
      ghee: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=85",
      flour: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=85",
      turmeric: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=85",
      pepper: "https://images.unsplash.com/photo-1599909533731-a3d25e87a9e6?w=600&q=85",
      flaxseed: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=85",
      apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=85",
      banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=85",
      orange: "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=85",
      mango: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=85",
      grapes: "https://images.unsplash.com/photo-1537640538965-1756deb656ea?w=600&q=85",
      strawberry: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=85",
      blueberry: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=85",
      pineapple: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=85",
      watermelon: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&q=85",
      papaya: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600&q=85",
      peach: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8a9d?w=600&q=85",
      pear: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=85",
      cherry: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=600&q=85",
      kiwi: "https://images.unsplash.com/photo-1518444065439-e933c0633032?w=600&q=85",
      lemon: "https://images.unsplash.com/photo-1595855709940-5776d62b8b60?w=600&q=85",
      lime: "https://images.unsplash.com/photo-1536304993881-ff86e0c9b785?w=600&q=85",
      coconut: "https://images.unsplash.com/photo-1518444065439-e933c0633032?w=600&q=85",
      pomegranate: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=85",
      fig: "https://images.unsplash.com/photo-1537640538965-1756deb656ea?w=600&q=85",
      carrot: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=85",
      broccoli: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=85",
      spinach: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=85",
      tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=85",
      cucumber: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&q=85",
      bell: "https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?w=600&q=85",
      lettuce: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85",
      celery: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=600&q=85",
      zucchini: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=600&q=85",
      mushroom: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85",
      potato: "https://images.unsplash.com/photo-1518977676601-b53f44aba5a6?w=600&q=85",
      pumpkin: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=600&q=85",
      onion: "https://images.unsplash.com/photo-1518444065439-e933c0633032?w=600&q=85",
      garlic: "https://images.unsplash.com/photo-1518444065439-e933c0633032?w=600&q=85",
    },
    skincare: {
      rose: "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=600&q=85",
      aloe: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=85",
      neem: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85",
      argan: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85",
      turmeric: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=85",
      coconut: "https://images.unsplash.com/photo-1571781926291-dec231879fc3?w=600&q=85",
      sandalwood: "https://images.unsplash.com/photo-1567721913486-6585f069b98a?w=600&q=85",
      "tea tree": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=85",
      saffron: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=85",
      moisturizer: "https://images.unsplash.com/photo-1591019479261-1a103585c559?w=600&q=85",
      clay: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85",
      "vitamin c": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=85",
      hyaluronic: "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=600&q=85",
      retinol: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=85",
      niacinamide: "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=600&q=85",
      sunscreen: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&q=85",
      "eye cream": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=85",
      "lip balm": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&q=85",
      lotion: "https://images.unsplash.com/photo-1571781926291-dec231879fc3?w=600&q=85",
      oil: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85",
    },
    supplements: {
      ashwagandha: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
      triphala: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
      spirulina: "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      collagen: "https://images.unsplash.com/photo-1593726891021-6e8cf4c91963?w=600&q=85",
      probiotics: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&q=85",
      "vitamin d": "https://images.unsplash.com/photo-1600757840960-96beac9cd06d?w=600&q=85",
      "omega-3": "https://images.unsplash.com/photo-1624461050280-4855c25543e1?w=600&q=85",
      iron: "https://images.unsplash.com/photo-1609175432157-c4d2a60ef59e?w=600&q=85",
      magnesium: "https://images.unsplash.com/photo-1556908153-679c2d6b3de0?w=600&q=85",
      zinc: "https://images.unsplash.com/photo-1617817541844-4e3e2e5d26e1?w=600&q=85",
      shilajit: "https://images.unsplash.com/photo-1619864116898-6a1d1aada55c?w=600&q=85",
      brahmi: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
      multivitamin: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
      calcium: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
      biotin: "https://images.unsplash.com/photo-1556908153-679c2d6b3de0?w=600&q=85",
      elderberry: "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      "apple cider": "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      "milk thistle": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
      coq10: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
      melatonin: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
      whey: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=85",
      "plant protein": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=85",
      creatine: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=85",
      bcaa: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=85",
      "green tea": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
    },
    beverages: {
      "green tea": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=85",
      tulsi: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&q=85",
      ashwagandha: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=85",
      moringa: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=85",
      turmeric: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=85",
      hibiscus: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&q=85",
      ginger: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&q=85",
      chamomile: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85",
      matcha: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=85",
      rose: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=85",
      saffron: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=85",
      detox: "https://images.unsplash.com/photo-1498409785966-ab341407de6e?w=600&q=85",
      peppermint: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&q=85",
      "lemongrass": "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&q=85",
      cinnamon: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&q=85",
      cardamom: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&q=85",
      "cold brew": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85",
      kombucha: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&q=85",
      "coconut water": "https://images.unsplash.com/photo-1518444065439-e933c0633032?w=600&q=85",
      aloe: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=85",
      wheatgrass: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&q=85",
      amla: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&q=85",
      pomegranate: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=85",
      "orange juice": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=85",
      "apple juice": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=85",
      mango: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=85",
      berry: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=85",
      "green juice": "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&q=85",
    },
    baby: {
      baby: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=85",
      diaper: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=85",
      wipes: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=85",
      shampoo: "https://images.unsplash.com/photo-1536304993881-ff86e0c9b785?w=600&q=85",
      soap: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=85",
      powder: "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      oil: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85",
      cream: "https://images.unsplash.com/photo-1591019479261-1a103585c559?w=600&q=85",
      sunscreen: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&q=85",
      "lip balm": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&q=85",
    },
    household: {
      detergent: "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      "soap bar": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=85",
      cleaner: "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      candle: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=85",
      incense: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=600&q=85",
      "dish soap": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=85",
      "all-purpose": "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      "glass cleaner": "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      "laundry detergent": "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      "fabric softener": "https://images.unsplash.com/photo-1581607777890-5da76e4c9d30?w=600&q=85",
      "air freshener": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=85",
    },
  };

  const categoryMap = imgMap[category];
  if (!categoryMap) return "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=85";

  // Sort keys by length (descending) to match more specific terms first
  // e.g., "coconut oil" should be checked before "coconut" or "oil"
  const sortedKeys = Object.keys(categoryMap).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    if (n.includes(key)) return categoryMap[key];
  }
  return "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=85";
};

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "food", label: "Organic Food", color: "#2D6A4F", bgColor: "#E8F5E9", icon: "🌾" },
  { id: "skincare", label: "Natural Skincare", color: "#8B7355", bgColor: "#EFEBE9", icon: "🌸" },
  { id: "supplements", label: "Supplements", color: "#1B4332", bgColor: "#E8F5E9", icon: "💊" },
  { id: "beverages", label: "Herbal Drinks", color: "#F39C12", bgColor: "#FFF8E1", icon: "🍵" },
  { id: "baby", label: "Baby Care", color: "#A1887F", bgColor: "#EFEBE9", icon: "👶" },
  { id: "household", label: "Eco Home", color: "#2D6A4F", bgColor: "#E8F5E9", icon: "🏠" },
];

// ─── BRANDS ──────────────────────────────────────────────────────────────────
const BRANDS = [
  { id: 1, name: "PureEarth", tagline: "Farm to Table" },
  { id: 2, name: "GreenRoots", tagline: "Rooted in Nature" },
  { id: 3, name: "VedaHarvest", tagline: "Ancient Wisdom" },
  { id: 4, name: "TerraNova", tagline: "New Earth Organics" },
  { id: 5, name: "SunSprout", tagline: "Sun-Kissed Goodness" },
  { id: 6, name: "HimalayanBliss", tagline: "Mountain Pure" },
  { id: 7, name: "CoastalOrganic", tagline: "Sea & Soil" },
  { id: 8, name: "ForestGems", tagline: "Wild Harvested" },
  { id: 9, name: "OrganicRoots", tagline: "Pure & Natural" },
  { id: 10, name: "NatureBest", tagline: "Nature's Finest" },
];

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const PRODUCT_NAMES = {
  food: [
    "Organic Quinoa", "Pure Wild Honey", "Cold-Pressed Coconut Oil", "Organic Brown Rice",
    "Chia Seeds", "Moringa Powder", "Coconut Sugar", "Organic Ghee", "Almond Flour",
    "Turmeric Root", "Black Pepper", "Golden Flaxseeds", "Fresh Apples", "Organic Bananas",
    "Sweet Oranges", "Alphonso Mangoes", "Red Grapes", "Fresh Strawberries", "Blueberries",
    "Pineapple", "Watermelon", "Papaya", "Juicy Peaches", "Green Pears", "Sweet Cherries",
    "Kiwi Fruit", "Organic Lemons", "Fresh Limes", "Whole Coconut", "Pomegranate",
    "Dried Figs", "Dragon Fruit", "Passion Fruit", "Fresh Guava", "Organic Carrots",
    "Fresh Broccoli", "Spinach Leaves", "Vine Tomatoes", "Cucumber", "Bell Peppers",
    "Iceberg Lettuce", "Fresh Celery", "Zucchini", "Brinjal", "Cauliflower",
    "Green Cabbage", "Beetroot", "Radish", "Asparagus", "Button Mushrooms"
  ],
  skincare: [
    "Rose Face Serum", "Pure Aloe Vera Gel", "Neem Face Wash", "Argan Oil",
    "Turmeric Cream", "Coconut Body Butter", "Sandalwood Scrub", "Tea Tree Toner",
    "Saffron Face Mask", "Herbal Moisturizer", "Clay Cleanser", "Vitamin C Serum",
    "Hyaluronic Acid Serum", "Retinol Night Cream", "Niacinamide Serum", "Snail Mucin Essence",
    "Collagen Cream", "Glycolic Acid Toner", "Salicylic Acid Cleanser", "Centella Cream",
    "Peptide Serum", "Ceramide Moisturizer", "Sunscreen SPF 50", "Eye Cream",
    "Lip Balm", "Body Lotion", "Face Oil", "Micellar Water", "Makeup Remover", "Face Mist"
  ],
  supplements: [
    "Ashwagandha Caps", "Triphala Tablets", "Spirulina Powder", "Collagen Boost",
    "Probiotics Mix", "Vitamin D3", "Omega-3 Oil", "Iron & B12", "Magnesium Gummies",
    "Zinc Immunity", "Shilajit Resin", "Brahmi Capsules", "Multivitamin", "Calcium Tablets",
    "Biotin Gummies", "Elderberry Syrup", "Apple Cider Vinegar", "Turmeric Curcumin",
    "Milk Thistle", "CoQ10", "Lutein", "Melatonin", "Glucosamine", "Chlorella",
    "Whey Protein", "Plant Protein", "Creatine", "BCAA Powder", "Green Tea Extract", "Garlic Pills"
  ],
  beverages: [
    "Darjeeling Green Tea", "Tulsi Holy Basil Chai", "Ashwagandha Latte", "Moringa Leaf Tea",
    "Golden Turmeric Milk", "Hibiscus Cooler", "Ginger Lemon Tea", "Chamomile Blend",
    "Japanese Matcha", "Rose Petal Tea", "Saffron Milk Mix", "Herbal Detox Tea",
    "Peppermint Tea", "Lemon Grass Tea", "Cinnamon Tea", "Cardamom Tea",
    "Cold Brew Coffee", "Kombucha", "Coconut Water", "Aloe Juice",
    "Wheatgrass Shot", "Ginger Shot", "Turmeric Shot", "Amla Juice",
    "Pomegranate Juice", "Orange Juice", "Apple Juice", "Mango Smoothie", "Berry Blast", "Green Juice"
  ],
  baby: [
    "Baby Lotion", "Baby Shampoo", "Baby Soap", "Baby Powder", "Baby Oil",
    "Diaper Cream", "Baby Wash", "Baby Cream", "Baby Sunscreen", "Baby Lip Balm",
    "Baby Wipes", "Baby Massage Oil", "Baby Body Wash", "Baby Face Cream", "Baby Hair Oil",
    "Baby Bubble Bath", "Baby Hand Sanitizer", "Baby Insect Repellent", "Baby Teething Gel"
  ],
  household: [
    "Natural Detergent", "Herbal Soap Bar", "Floor Cleaner", "Soy Candle", "Incense Sticks",
    "Dish Soap", "All-Purpose Cleaner", "Glass Cleaner", "Laundry Detergent", "Fabric Softener",
    "Air Freshener", "Moth Balls", "Drain Cleaner", "Toilet Cleaner", "Kitchen Cleaner",
    "Bathroom Cleaner", "Furniture Polish", "Shoe Polish", "Metal Polish", "Wood Polish"
  ]
};

const PRICING_TIERS = {
  food: { min: 80, max: 400, avg: 200 },
  skincare: { min: 200, max: 800, avg: 450 },
  supplements: { min: 300, max: 900, avg: 550 },
  beverages: { min: 150, max: 500, avg: 280 },
  baby: { min: 150, max: 600, avg: 350 },
  household: { min: 100, max: 400, avg: 220 },
};

const genProducts = (cat, count = 20) => {
  const names = PRODUCT_NAMES[cat] || PRODUCT_NAMES.food;
  const tier = PRICING_TIERS[cat] || PRICING_TIERS.food;
  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length];
    const basePrice = Math.floor(tier.avg + (Math.random() - 0.5) * (tier.max - tier.min) * 0.6);
    const realisticPrice = Math.max(tier.min, Math.min(tier.max, basePrice));
    return {
      id: `${cat}-${i + 1}`,
      name,
      category: cat,
      price: realisticPrice,
      originalPrice: Math.floor(realisticPrice * (1 + Math.random() * 0.3 + 0.1)),
      rating: +(Math.random() * 1 + 4).toFixed(1),
      reviews: Math.floor(Math.random() * 500 + 50),
      discount: Math.floor(Math.random() * 30 + 10),
      image: getImageForProduct(name, cat),
      brand: BRANDS[i % BRANDS.length].name,
      certified: Math.random() > 0.3,
      isNew: Math.random() > 0.7,
      bestseller: Math.random() > 0.6,
      description: `Premium quality ${name.toLowerCase()} sourced directly from certified organic farms. 100% natural and chemical-free. Perfect for health-conscious individuals who value purity and sustainability.`,
      weight: `${Math.floor(Math.random() * 500 + 100)}g`,
      stock: Math.floor(Math.random() * 100 + 10),
      ingredients: ["Natural Extract", "Organic Compounds", "Essential Vitamins", "Minerals"],
      sourcing: `Sourced from organic farms in ${["Karnataka", "Kerala", "Uttarakhand", "Tamil Nadu", "Himachal Pradesh"][i % 5]}, India.`,
      usage: `Take 1-2 servings daily or as directed by your healthcare provider. Store in a cool, dry place.`,
    };
  });
};

const ALL_PRODUCTS = [
  ...genProducts("food", 50),
  ...genProducts("skincare", 30),
  ...genProducts("supplements", 30),
  ...genProducts("beverages", 30),
  ...genProducts("baby", 20),
  ...genProducts("household", 20),
];

const BEST_SELLERS = ALL_PRODUCTS.filter(p => p.bestseller).slice(0, 12);
const NEW_ARRIVALS = ALL_PRODUCTS.filter(p => p.isNew).slice(0, 12);
const DEALS = ALL_PRODUCTS.filter(p => p.discount > 20).slice(0, 12);

// ─── BLOG DATA ───────────────────────────────────────────────────────────────
const BLOGS = [
  {
    id: 1,
    title: "10 Benefits of Organic Food You Need to Know",
    excerpt: "Discover why switching to organic food can transform your health and well-being. From reduced pesticide exposure to better nutrition.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=85",
    category: "Health Tips",
    date: "Dec 15, 2024",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Complete Guide to Ayurvedic Skincare",
    excerpt: "Learn how ancient Ayurvedic principles can help you achieve glowing, healthy skin naturally without harsh chemicals.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85",
    category: "Skincare",
    date: "Dec 12, 2024",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Why Ashwagandha is the Ultimate Stress Buster",
    excerpt: "Explore the science behind ashwagandha and how this ancient herb can help manage stress and improve sleep quality.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85",
    category: "Supplements",
    date: "Dec 10, 2024",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Seasonal Eating: What to Buy This Winter",
    excerpt: "A comprehensive guide to winter produce that's both nutritious and delicious. Support local farmers while eating healthy.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=85",
    category: "Nutrition",
    date: "Dec 8, 2024",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "Natural Baby Care: Safe Products for Your Little One",
    excerpt: "Everything you need to know about choosing safe, organic products for your baby's delicate skin and health.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=85",
    category: "Baby Care",
    date: "Dec 5, 2024",
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "How to Start Your Own Organic Garden",
    excerpt: "Step-by-step guide to growing your own organic vegetables and herbs at home, even in small spaces.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=85",
    category: "Gardening",
    date: "Dec 3, 2024",
    readTime: "10 min read"
  },
];

// ─── CERTIFICATIONS ──────────────────────────────────────────────────────────
const CERTIFICATIONS = [
  { id: 1, name: "India Organic", desc: "Certified by APEDA under National Programme for Organic Production", logo: "🇮🇳" },
  { id: 2, name: "USDA Organic", desc: "Meets strict USDA organic standards for production and handling", logo: "🇺🇸" },
  { id: 3, name: "EU Organic", desc: "Compliant with European Union organic farming regulations", logo: "🇪🇺" },
  { id: 4, name: "Jaivik Bharat", desc: "FSSAI's organic certification for authentic Indian organic products", logo: "🌿" },
  { id: 5, name: "Non-GMO Project", desc: "Verified free from genetically modified organisms", logo: "🧬" },
  { id: 6, name: "Fair Trade", desc: "Ensures fair wages and ethical practices for farmers", logo: "🤝" },
];

// ─── CHATBOT Q&A ─────────────────────────────────────────────────────────────
const CHATBOT_QA = [
  { q: "Are your products 100% organic?", a: "Yes! All our products carry certified organic labels — India Organic, USDA, or both. We test every batch at accredited labs. 🌿" },
  { q: "What is the delivery time?", a: "Within Karnataka: 1–3 days. Pan India: 3–7 days. You'll get a tracking SMS after dispatch. 📦" },
  { q: "Do you have a return policy?", a: "Absolutely! 7-day hassle-free returns on all products. If you're unhappy, we'll refund or replace — no questions asked. ✅" },
  { q: "Do you offer bulk pricing?", a: "Yes! Contact us on WhatsApp for bulk orders above ₹5,000. Special rates for NGOs, clinics & restaurants. 🏪" },
];

// ─── UTILITY HOOKS ────────────────────────────────────────────────────────────
const useLocalStorage = (key, initial) => {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch { return initial; }
  });
  const set = useCallback((v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  }, [val, key]);
  return [val, set];
};

const useCountdown = (target) => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
};

const pad = (n) => String(n).padStart(2, "0");

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

// Stars Rating
const Stars = ({ rating, size = 14 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span style={{ display: "inline-flex", gap: 1, alignItems: "center" }}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return Icon.star(size);
        if (i === full && half) return Icon.star(size, "#F39C1280");
        return Icon.starEmpty(size);
      })}
    </span>
  );
};

// Button
const Btn = ({ children, onClick, variant = "primary", small, full, style: s = {}, disabled, icon, type = "button" }) => {
  const [hover, setHover] = useState(false);
  const [ripple, setRipple] = useState(null);

  const base = {
    position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center",
    justifyContent: "center", gap: 8, fontFamily: T.fontBody, fontWeight: 600,
    borderRadius: T.radius.md, transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
    cursor: disabled ? "not-allowed" : "pointer",
    padding: small ? "8px 18px" : "12px 28px", fontSize: small ? 13 : 14,
    letterSpacing: "0.3px",
    ...(full ? { width: "100%" } : {}),
    ...(disabled ? { opacity: 0.55 } : {}),
  };

  const variants = {
    primary: { background: hover ? T.primaryDark : T.primary, color: "#fff", border: "none", boxShadow: hover ? `0 6px 20px rgba(45,106,79,0.4)` : `0 4px 12px rgba(45,106,79,0.2)` },
    outline: { background: hover ? T.accent : "transparent", color: T.primary, border: `2px solid ${T.primary}`, boxShadow: hover ? `0 4px 12px rgba(45,106,79,0.15)` : "none" },
    ghost: { background: hover ? T.accent : "transparent", color: T.textPrimary, border: "none" },
    danger: { background: hover ? "#c0392b" : T.error, color: "#fff", border: "none" },
    accent: { background: hover ? "#E67E22" : T.warning, color: "#fff", border: "none", boxShadow: hover ? `0 6px 20px rgba(243,156,18,0.4)` : "none" },
    white: { background: hover ? "rgba(255,255,255,0.95)" : "#fff", color: T.primary, border: "none", boxShadow: `0 4px 12px rgba(0,0,0,0.1)` },
  };

  const handleClick = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onClick && onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...s }}
      disabled={disabled}
    >
      {ripple && (
        <span style={{ position: "absolute", left: ripple.x, top: ripple.y, width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.45)", transform: "scale(0)", animation: "ripple 0.6s ease forwards", pointerEvents: "none" }} />
      )}
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
    </button>
  );
};

// Badge
const Badge = ({ children, color = T.primary, bg, size = "sm" }) => {
  const sizes = { xs: { fontSize: 9, padding: "2px 6px" }, sm: { fontSize: 10, padding: "3px 10px" }, md: { fontSize: 12, padding: "4px 14px" } };
  const s = sizes[size];
  return (
    <span style={{ background: bg || color, color: bg ? color : "#fff", fontSize: s.fontSize, fontWeight: 700, padding: s.padding, borderRadius: 50, fontFamily: T.fontBody, letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
};

// Modal
const Modal = ({ open, onClose, children, maxWidth = 600, title }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.white, borderRadius: T.radius.lg, padding: 32, maxWidth, width: "100%", animation: "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)", maxHeight: "90vh", overflowY: "auto", position: "relative", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
        {title && <h3 style={{ fontFamily: T.fontHeading, fontSize: 24, color: T.primary, marginBottom: 20, fontWeight: 700 }}>{title}</h3>}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: T.bgAlt, border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.textSecondary, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.border} onMouseLeave={e => e.currentTarget.style.background = T.bgAlt}>
          {Icon.x(16)}
        </button>
        {children}
      </div>
    </div>
  );
};

// Toast
const Toast = ({ msg, type = "success", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const configs = { success: { bg: T.success, icon: Icon.check(16, "#fff") }, error: { bg: T.error, icon: Icon.x(16, "#fff") }, info: { bg: T.secondary, icon: Icon.leaf(16, "#fff") } };
  const cfg = configs[type] || configs.success;
  return (
    <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: cfg.bg, color: "#fff", padding: "12px 24px", borderRadius: T.radius.md, fontFamily: T.fontBody, fontWeight: 500, fontSize: 14, zIndex: 2000, animation: "slideUp 0.35s ease", boxShadow: "0 8px 30px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 10, maxWidth: "90vw" }}>
      <span style={{ display: "flex", alignItems: "center" }}>{cfg.icon}</span>
      {msg}
    </div>
  );
};

// Product Card
const ProductCard = ({ product, onAddToCart, onView }) => {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const correctImage = getImageForProduct(product.name, product.category);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.white, borderRadius: T.radius.lg, overflow: "hidden",
        boxShadow: hovered ? T.shadowLifted : T.shadowCard,
        transform: hovered ? "translateY(-8px)" : "none",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        cursor: "pointer", position: "relative", height: "100%",
        display: "flex", flexDirection: "column"
      }}
    >
      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 3, display: "flex", flexDirection: "column", gap: 6 }}>
        {product.discount > 15 && <Badge color={T.error} size="xs">-{product.discount}%</Badge>}
        {product.isNew && <Badge color={T.info} size="xs">New</Badge>}
        {product.bestseller && <Badge color={T.warning} size="xs">Best</Badge>}
        {product.certified && <Badge color={T.success} size="xs">Organic</Badge>}
      </div>

      <button
        style={{ position: "absolute", top: 12, right: 12, zIndex: 3, background: T.white, border: "none", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: T.shadowCard, transition: "all 0.2s", opacity: hovered ? 1 : 0 }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {Icon.heart(14, T.error)}
      </button>

      <div style={{ height: 220, overflow: "hidden", background: T.bgAlt, position: "relative" }}>
        {!imgLoaded && <div className="skeleton" style={{ position: "absolute", inset: 0 }} />}
        <img
          src={imgError ? correctImage : product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => { if (!imgError) setImgError(true); setImgLoaded(true); }}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)", transform: hovered ? "scale(1.08)" : "scale(1)", opacity: imgLoaded ? 1 : 0 }}
        />
      </div>

      <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 11, color: T.primaryLight, fontWeight: 600, marginBottom: 4, fontFamily: T.fontBody, letterSpacing: "0.5px", textTransform: "uppercase" }}>{product.brand}</p>
        <h4 style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: 15, color: T.textPrimary, marginBottom: 8, lineHeight: 1.4, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.name}</h4>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Stars rating={product.rating} size={12} />
          <span style={{ fontSize: 11, color: T.textLight, fontFamily: T.fontBody }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: T.primary, fontFamily: T.fontBody }}>₹{product.price}</span>
          <span style={{ fontSize: 13, color: T.textLight, textDecoration: "line-through", fontFamily: T.fontBody }}>₹{product.originalPrice}</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <Btn small onClick={() => onAddToCart(product)} style={{ flex: 1, fontSize: 12 }} icon={Icon.cart(13, "#fff")}>Add</Btn>
          <Btn small variant="outline" onClick={() => onView(product)} style={{ fontSize: 12 }}>View</Btn>
        </div>
      </div>
    </div>
  );
};

// Product Grid
const ProductGrid = ({ products, onAddToCart, onView }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24, width: "100%" }}>
    {products.map((p, idx) => (
      <div key={p.id} className="fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
        <ProductCard product={p} onAddToCart={onAddToCart} onView={onView} />
      </div>
    ))}
  </div>
);

// Section Header
const SectionHeader = ({ title, subtitle, action, onAction, centered }) => (
  <div style={{ display: "flex", justifyContent: centered ? "center" : "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16, textAlign: centered ? "center" : "left" }}>
    <div>
      <h2 style={{ fontFamily: T.fontHeading, fontSize: "clamp(24px,3.5vw,36px)", color: T.primary, marginBottom: 8, fontWeight: 700 }}>{title}</h2>
      {subtitle && <p style={{ color: T.textSecondary, fontFamily: T.fontBody, fontSize: 15, fontWeight: 400, maxWidth: 500 }}>{subtitle}</p>}
    </div>
    {action && <Btn variant="outline" small onClick={onAction} icon={Icon.arrowRight(14)}>{action}</Btn>}
  </div>
);

// Navbar
const Navbar = ({ page, setPage, cartCount, user, setShowCart, setShowProfile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "about", label: "About" },
    { id: "blog", label: "Blog" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, background: scrolled ? "rgba(248,249,250,0.97)" : "rgba(248,249,250,0.95)", backdropFilter: "blur(16px)", borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent", boxShadow: scrolled ? T.shadow : "none", transition: "all 0.3s ease" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryLight} 100%)`, borderRadius: T.radius.sm, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {Icon.leaf(20, "#fff")}
          </div>
          <div>
            <div style={{ fontFamily: T.fontHeading, fontSize: 20, fontWeight: 800, color: T.primary, lineHeight: 1.1 }}>Organic Store</div>
            <div style={{ fontSize: 10, color: T.textLight, fontFamily: T.fontBody, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>Pure & Natural</div>
          </div>
        </div>

        <div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
          {navLinks.map(l => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              style={{ background: page === l.id ? T.accent : "transparent", border: "none", padding: "10px 18px", borderRadius: T.radius.sm, fontFamily: T.fontBody, fontWeight: page === l.id ? 600 : 500, color: page === l.id ? T.primary : T.textSecondary, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { if (page !== l.id) { e.currentTarget.style.color = T.primary; e.currentTarget.style.background = T.accent; } }}
              onMouseLeave={e => { if (page !== l.id) { e.currentTarget.style.color = T.textSecondary; e.currentTarget.style.background = "transparent"; } }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setShowCart(true)} style={{ position: "relative", background: T.bgAlt, border: "none", borderRadius: T.radius.sm, width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.border} onMouseLeave={e => e.currentTarget.style.background = T.bgAlt}>
            {Icon.cart(18, T.primary)}
            {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: T.error, color: "#fff", fontSize: 10, fontWeight: 700, minWidth: 20, height: 20, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", animation: "pulse 2s infinite" }}>{cartCount}</span>}
          </button>

          <button onClick={() => setShowProfile(true)} style={{ background: user ? T.primary : T.bgAlt, border: "none", borderRadius: T.radius.sm, width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.9"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            {Icon.user(18, user ? "#fff" : T.primary)}
          </button>

          <button className="hide-desktop" style={{ background: T.bgAlt, border: "none", borderRadius: T.radius.sm, width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? Icon.x(18, T.primary) : Icon.menu(18, T.primary)}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: T.white, padding: "16px 24px", borderTop: `1px solid ${T.border}`, animation: "slideDown 0.25s ease" }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setMenuOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 0", fontFamily: T.fontBody, fontSize: 15, color: page === l.id ? T.primary : T.textPrimary, borderBottom: `1px solid ${T.borderLight}`, cursor: "pointer", fontWeight: page === l.id ? 600 : 400 }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// Hero Section
const Hero = ({ setPage }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const slides = [
    { img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1800&q=90", headline: "Pure Nature,", highlight: "Pure Life.", sub: "50+ certified organic products from Karnataka's lush forests to your doorstep." },
    { img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1800&q=90", headline: "From the Farm,", highlight: "For You.", sub: "Partnering with 10+ local farmers using regenerative, sustainable agriculture." },
    { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=90", headline: "Ancient Roots,", highlight: "Modern Wellness.", sub: "Bringing Ayurvedic wisdom and certified organic goodness to every home." },
  ];

  useEffect(() => {
    const id = setInterval(() => setImgIdx(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[imgIdx];

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 650, overflow: "hidden", display: "flex", alignItems: "center" }}>
      {slides.map((s, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center", transition: "opacity 1.5s ease", opacity: i === imgIdx ? 1 : 0 }} />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(27,67,50,0.85) 0%, rgba(45,106,79,0.55) 55%, rgba(0,0,0,0.2) 100%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "0 32px", width: "100%" }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", padding: "8px 20px", borderRadius: 50, marginBottom: 24, border: "1px solid rgba(255,255,255,0.25)" }}>
            {Icon.leaf(14, T.primaryLight)}
            <span style={{ color: T.primaryLight, fontSize: 13, fontFamily: T.fontBody, fontWeight: 500 }}>100% Certified Organic · Farm Fresh</span>
          </div>
          <h1 key={imgIdx} style={{ fontFamily: T.fontHeading, fontSize: "clamp(42px,6vw,76px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 16, animation: "fadeUp 0.8s ease both" }}>
            {slide.headline}<br /><span style={{ color: T.primaryLight, fontStyle: "italic" }}>{slide.highlight}</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.8, marginBottom: 40, fontFamily: T.fontBody, fontWeight: 300 }}>{slide.sub}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("shop")} style={{ fontSize: 15, padding: "14px 36px" }} icon={Icon.cart(17, "#fff")}>Shop Now</Btn>
            <Btn variant="white" onClick={() => setPage("about")} style={{ fontSize: 15, padding: "14px 36px" }} icon={Icon.leaf(16, T.primary)}>Our Story</Btn>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
            {[["50+", "Products"], ["10+", "Farmers"], ["500+", "Customers"]].map(([num, lab]) => (
              <div key={lab}>
                <div style={{ fontFamily: T.fontHeading, fontSize: 32, fontWeight: 700, color: T.primaryLight }}>{num}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: T.fontBody }}>{lab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10 }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 32 : 8, height: 8, borderRadius: 4, background: i === imgIdx ? T.primaryLight : "rgba(255,255,255,0.4)", transition: "all 0.35s ease", cursor: "pointer" }} />
        ))}
      </div>
    </section>
  );
};

// Trust Strip
const TrustStrip = () => (
  <div style={{ background: T.primary, padding: "18px 32px" }}>
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(24px,5vw,64px)", flexWrap: "wrap" }}>
      {[
        { icon: Icon.truck(17, "#fff"), text: "Free delivery above ₹499" },
        { icon: Icon.shield(17, "#fff"), text: "100% Certified Organic" },
        { icon: Icon.award(17, "#fff"), text: "USDA & India Organic" },
        { icon: Icon.leaf(17, "#fff"), text: "10+ Farmer Partners" },
      ].map(({ icon, text }) => (
        <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontFamily: T.fontBody, fontSize: 13, fontWeight: 500 }}>
          {icon} {text}
        </div>
      ))}
    </div>
  </div>
);

// Category Strip
const CategoryStrip = ({ setPage, setFilterCat }) => (
  <section style={{ background: T.white, padding: "64px 32px", borderBottom: `1px solid ${T.borderLight}` }}>
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <SectionHeader title="Shop by Category" subtitle="Explore our curated organic collections" centered />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            onClick={() => { setFilterCat(cat.id); setPage("shop"); }}
            style={{
              background: cat.bgColor, borderRadius: T.radius.lg, padding: "32px 24px",
              cursor: "pointer", textAlign: "center", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              border: `2px solid transparent`, position: "relative", overflow: "hidden"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = cat.color;
              e.currentTarget.style.borderColor = cat.color;
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = T.shadowHover;
              e.currentTarget.querySelector(".cat-label").style.color = "#fff";
              e.currentTarget.querySelector(".cat-icon").style.transform = "scale(1.1) rotate(5deg)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = cat.bgColor;
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.querySelector(".cat-label").style.color = cat.color;
              e.currentTarget.querySelector(".cat-icon").style.transform = "scale(1) rotate(0deg)";
            }}
          >
            <div className="cat-icon" style={{ fontSize: 40, marginBottom: 16, transition: "transform 0.3s ease" }}>{cat.icon}</div>
            <div className="cat-label" style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: 14, color: cat.color, transition: "color 0.3s ease" }}>{cat.label}</div>
            <div style={{ fontSize: 11, color: T.textLight, marginTop: 4, fontFamily: T.fontBody }}>{ALL_PRODUCTS.filter(p => p.category === cat.id).length} products</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Deals Section
const DealsSection = ({ onAddToCart, onView }) => {
  const target = useRef(Date.now() + 24 * 3600 * 1000).current;
  const { h, m, s } = useCountdown(target);

  return (
    <section style={{ background: `linear-gradient(135deg, ${T.primaryDark} 0%, ${T.primary} 60%, ${T.primaryLight} 100%)`, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Badge color={T.warning} bg={T.warning} size="md">Flash Sale</Badge>
          <h2 style={{ fontFamily: T.fontHeading, fontSize: "clamp(28px,4vw,48px)", color: "#fff", margin: "20px 0 12px", fontStyle: "italic" }}>Today's Special Deals</h2>
          <p style={{ color: T.primaryLight, fontFamily: T.fontBody, fontSize: 16, fontWeight: 300, marginBottom: 32 }}>Hurry! These prices expire in:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            {[["Hours", h], ["Minutes", m], ["Seconds", s]].map(([label, val]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: T.radius.md, padding: "18px 26px", minWidth: 100, border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
                <div style={{ fontFamily: T.fontHeading, fontSize: 40, fontWeight: 700, color: "#fff", animation: label === "Seconds" ? "countPulse 1s ease infinite" : "none" }}>{pad(val)}</div>
                <div style={{ color: T.primaryLight, fontSize: 11, fontFamily: T.fontBody, marginTop: 4, letterSpacing: "0.5px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <ProductGrid products={DEALS} onAddToCart={onAddToCart} onView={onView} />
      </div>
    </section>
  );
};

// Home Page
const HomePage = ({ setPage, onAddToCart, onView, setFilterCat }) => (
  <div>
    <Hero setPage={setPage} />
    <TrustStrip />
    <CategoryStrip setPage={setPage} setFilterCat={setFilterCat} />

    <section style={{ padding: "80px 32px", background: T.bg }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader title="Best Selling Products" subtitle="Most loved by our customers" action="View All" onAction={() => setPage("shop")} />
        <ProductGrid products={BEST_SELLERS} onAddToCart={onAddToCart} onView={onView} />
      </div>
    </section>

    <DealsSection onAddToCart={onAddToCart} onView={onView} />

    <section style={{ padding: "80px 32px", background: T.bgAlt }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader title="New Arrivals" subtitle="Fresh additions to our organic family" action="Explore Shop" onAction={() => setPage("shop")} />
        <ProductGrid products={NEW_ARRIVALS} onAddToCart={onAddToCart} onView={onView} />
      </div>
    </section>

    {/* Brands Section */}
    <section style={{ padding: "80px 32px", background: T.white }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader title="Our Trusted Brands" subtitle="Quality you can count on" centered />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
          {BRANDS.map(brand => (
            <div
              key={brand.id}
              onClick={() => setFilterCat(null)}
              style={{
                background: T.accent, borderRadius: T.radius.lg, padding: "28px 20px",
                textAlign: "center", cursor: "pointer", transition: "all 0.3s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = T.shadowHover; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontFamily: T.fontHeading, fontSize: 18, fontWeight: 700, color: T.primary, marginBottom: 4 }}>{brand.name}</div>
              <div style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.fontBody }}>{brand.tagline}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section style={{ padding: "80px 32px", background: T.white }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader title="Why Choose Organic Store?" subtitle="What makes us different" centered />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          {[
            { icon: Icon.shield(32, T.primary), title: "Certified Organic", desc: "Every product carries USDA or India Organic certification. Tested before it reaches you." },
            { icon: Icon.truck(32, T.primary), title: "Fast Delivery", desc: "1–3 days within Karnataka. Pan-India delivery in 3–7 days with real-time tracking." },
            { icon: Icon.award(32, T.primary), title: "Farmer-Direct", desc: "We source directly from 200+ local farmers, ensuring freshness and fair wages." },
            { icon: Icon.leaf(32, T.primary), title: "Zero Chemicals", desc: "No synthetic pesticides, no GMOs, no additives. Just nature at its purest." },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{ background: T.accent, borderRadius: T.radius.lg, padding: "36px 32px", transition: "all 0.3s ease", textAlign: "center" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = T.shadowLifted; e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.white, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: T.shadowCard }}>{icon}</div>
              <h3 style={{ fontFamily: T.fontHeading, fontSize: 20, color: T.primary, marginBottom: 12, fontWeight: 700 }}>{title}</h3>
              <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// Shop Page
const ShopPage = ({ onAddToCart, onView, filterCat, setFilterCat }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [certOnly, setCertOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  let prods = ALL_PRODUCTS;
  if (filterCat) prods = prods.filter(p => p.category === filterCat);
  if (certOnly) prods = prods.filter(p => p.certified);
  if (search) prods = prods.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
  prods = prods.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  if (sort === "price-asc") prods = [...prods].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") prods = [...prods].sort((a, b) => b.price - a.price);
  if (sort === "rating") prods = [...prods].sort((a, b) => b.rating - a.rating);
  if (sort === "newest") prods = [...prods].sort((a, b) => b.isNew - a.isNew);

  return (
    <div style={{ padding: "100px 32px 80px", maxWidth: 1400, margin: "0 auto" }}>
      <SectionHeader title="Organic Shop" subtitle={`${prods.length} products found`} />

      <div style={{ background: T.white, borderRadius: T.radius.lg, padding: "24px 28px", marginBottom: 36, boxShadow: T.shadowCard, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 280px" }}>
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: T.textLight }}>{Icon.search(18)}</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products or brands..."
            style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.md, padding: "12px 18px 12px 46px", fontFamily: T.fontBody, fontSize: 14, background: T.bg, color: T.textPrimary, transition: "border 0.2s" }}
            onFocus={e => e.target.style.borderColor = T.primaryLight}
            onBlur={e => e.target.style.borderColor = T.border}
          />
        </div>

        <select value={sort} onChange={e => setSort(e.target.value)} style={{ border: `1.5px solid ${T.border}`, borderRadius: T.radius.md, padding: "12px 18px", fontFamily: T.fontBody, fontSize: 14, background: T.bg, color: T.textPrimary, cursor: "pointer", minWidth: 180 }}>
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest First</option>
        </select>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => setFilterCat(null)} style={{ padding: "10px 20px", borderRadius: T.radius.md, border: `1.5px solid ${!filterCat ? T.primary : T.border}`, background: !filterCat ? T.primary : T.white, color: !filterCat ? "#fff" : T.textSecondary, fontFamily: T.fontBody, fontSize: 13, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>All</button>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setFilterCat(cat.id === filterCat ? null : cat.id)} style={{ padding: "10px 20px", borderRadius: T.radius.md, border: `1.5px solid ${filterCat === cat.id ? cat.color : T.border}`, background: filterCat === cat.id ? cat.color : T.white, color: filterCat === cat.id ? "#fff" : T.textSecondary, fontFamily: T.fontBody, fontSize: 13, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>{cat.label}</button>
          ))}
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: T.fontBody, fontSize: 13, cursor: "pointer", color: T.textSecondary, whiteSpace: "nowrap" }}>
          <input type="checkbox" checked={certOnly} onChange={e => setCertOnly(e.target.checked)} style={{ accentColor: T.primary }} />
          Certified Only
        </label>
      </div>

      {prods.length > 0 ? (
        <ProductGrid products={prods} onAddToCart={onAddToCart} onView={onView} />
      ) : (
        <div style={{ textAlign: "center", padding: "100px 0", color: T.textSecondary, fontFamily: T.fontBody }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>{Icon.search(32, T.primaryLight)}</div>
          <p style={{ fontSize: 20, fontWeight: 600, color: T.textPrimary, marginBottom: 8 }}>No products found</p>
          <p style={{ fontSize: 14 }}>Try a different search term or category</p>
        </div>
      )}
    </div>
  );
};

// Cart Sidebar
const CartSidebar = ({ isOpen, onClose, cart, onUpdateQty, onRemove, onCheckout, user }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1001, opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none", transition: "opacity 0.3s ease", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: 440, background: T.white, zIndex: 1002, transform: isOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)", display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "24px 28px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: T.fontHeading, fontSize: 22, color: T.primary, fontWeight: 700 }}>Your Cart</h2>
            <p style={{ fontSize: 13, color: T.textLight, fontFamily: T.fontBody }}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={onClose} style={{ background: T.bgAlt, border: "none", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.textSecondary, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.border} onMouseLeave={e => e.currentTarget.style.background = T.bgAlt}>
            {Icon.x(18)}
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: T.textLight, fontFamily: T.fontBody }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: T.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>{Icon.cart(32, T.textLight)}</div>
              <p style={{ fontSize: 16, fontWeight: 500, color: T.textSecondary }}>Your cart is empty</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>Add some organic products!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 16, padding: "16px", background: T.bg, borderRadius: T.radius.md }}>
                  <img src={item.image} alt={item.name} style={{ width: 80, height: 80, borderRadius: T.radius.sm, objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: T.fontBody, fontSize: 14, fontWeight: 600, color: T.textPrimary, marginBottom: 4, lineHeight: 1.3 }}>{item.name}</h4>
                    <p style={{ fontSize: 12, color: T.textLight, marginBottom: 8 }}>{item.brand}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${T.border}`, borderRadius: T.radius.sm, overflow: "hidden" }}>
                        <button onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))} style={{ background: T.white, border: "none", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.primary }}>{Icon.minus(12)}</button>
                        <span style={{ padding: "0 12px", fontFamily: T.fontBody, fontWeight: 600, fontSize: 13, color: T.textPrimary }}>{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, item.qty + 1)} style={{ background: T.white, border: "none", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.primary }}>{Icon.plus(12)}</button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: T.primary, fontFamily: T.fontBody }}>₹{item.price * item.qty}</span>
                        <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: T.error, cursor: "pointer", padding: 4 }}>{Icon.trash(14)}</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: "24px 28px", borderTop: `1px solid ${T.borderLight}`, background: T.white }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary }}>Subtotal</span>
              <span style={{ fontFamily: T.fontBody, fontSize: 20, fontWeight: 700, color: T.primary }}>₹{total}</span>
            </div>
            <Btn full onClick={() => { if (user) onCheckout(); else onClose(); }} style={{ padding: "14px 24px", marginBottom: 12 }}>
              Proceed to Checkout
            </Btn>
            {!user && <p style={{ fontSize: 12, color: T.warning, textAlign: "center", fontFamily: T.fontBody }}>Please login to complete your order</p>}
            <p style={{ fontSize: 12, color: T.textLight, textAlign: "center", fontFamily: T.fontBody }}>Free delivery on orders above ₹499</p>
          </div>
        )}
      </div>
    </>
  );
};

// Product Detail Modal
const ProductDetail = ({ product, onAddToCart, onClose }) => {
  const [activeTab, setActiveTab] = useState("description");
  if (!product) return null;

  const tabs = [
    { id: "description", label: "Description", icon: Icon.fileText(14) },
    { id: "ingredients", label: "Ingredients", icon: Icon.droplet(14) },
    { id: "sourcing", label: "Sourcing", icon: Icon.mapPin(14) },
    { id: "usage", label: "Usage", icon: Icon.clock(14) },
  ];

  return (
    <Modal open={!!product} onClose={onClose} maxWidth={900} title="Product Details">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: T.radius.lg, objectFit: "cover", aspectRatio: "1" }} />
        </div>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {product.certified && <Badge color={T.success}>Organic</Badge>}
            {product.bestseller && <Badge color={T.warning}>Best Seller</Badge>}
            {product.isNew && <Badge color={T.info}>New</Badge>}
          </div>
          <p style={{ fontSize: 12, color: T.primaryLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>{product.brand}</p>
          <h2 style={{ fontFamily: T.fontHeading, fontSize: 28, color: T.primary, marginBottom: 16, fontWeight: 700 }}>{product.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Stars rating={product.rating} size={16} />
            <span style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textLight }}>({product.reviews} reviews)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: T.fontBody, fontSize: 28, fontWeight: 700, color: T.primary }}>₹{product.price}</span>
            <span style={{ fontFamily: T.fontBody, fontSize: 16, color: T.textLight, textDecoration: "line-through" }}>₹{product.originalPrice}</span>
            {product.discount > 0 && <Badge color={T.error}>-{product.discount}%</Badge>}
          </div>

          <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${T.border}`, marginBottom: 16 }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, padding: "10px 8px", background: "none", border: "none",
                  fontFamily: T.fontBody, fontSize: 12, fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? T.primary : T.textLight,
                  borderBottom: activeTab === tab.id ? `2px solid ${T.primary}` : "2px solid transparent",
                  marginBottom: -2, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{ minHeight: 100 }}>
            {activeTab === "description" && (
              <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.7 }}>
                {product.description}
              </p>
            )}
            {activeTab === "ingredients" && (
              <div>
                <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.7, marginBottom: 12 }}>
                  <strong>Ingredients:</strong> {product.ingredients.join(", ")}
                </p>
                <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary }}>
                  <strong>Weight:</strong> {product.weight}
                </p>
              </div>
            )}
            {activeTab === "sourcing" && (
              <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.7 }}>
                {product.sourcing} Our farmers use traditional, sustainable farming methods passed down through generations. Every batch is tested for purity and quality.
              </p>
            )}
            {activeTab === "usage" && (
              <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.7 }}>
                {product.usage}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Btn onClick={() => { onAddToCart(product); onClose(); }} style={{ flex: 1 }} icon={Icon.cart(16, "#fff")}>Add to Cart</Btn>
            <Btn variant="outline" style={{ flex: 1 }}>Buy Now</Btn>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// About Page
const AboutPage = () => (
  <div style={{ paddingTop: 70 }}>
    <div style={{ background: `linear-gradient(135deg, ${T.primaryDark} 0%, ${T.primary} 100%)`, padding: "100px 32px 80px", textAlign: "center" }}>
      <h1 style={{ fontFamily: T.fontHeading, fontSize: "clamp(36px,5vw,60px)", color: "#fff", marginBottom: 20, fontStyle: "italic" }}>Our Story</h1>
      <p style={{ color: T.primaryLight, fontFamily: T.fontBody, fontSize: 18, fontWeight: 300, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>From a small farm in Siddapur to 50,000+ happy families across India.</p>
    </div>

    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 32px" }}>
      {[
        { year: "2018", title: "The Beginning", text: "Started with 5 farmer partners in Siddapur, selling organic spices door-to-door across Uttara Kannada district." },
        { year: "2019", title: "First Certifications", text: "Achieved India Organic certification for our flagship products. Expanded to 40+ farmer partners in Karnataka." },
        { year: "2021", title: "Going Digital", text: "Launched our online store, bringing certified organic products to customers across India with doorstep delivery." },
        { year: "2023", title: "USDA Partnership", text: "Secured USDA Organic certification. Expanded to 200+ farmer partners across Karnataka, Kerala & Uttarakhand." },
        { year: "2025", title: "50,000+ Families", text: "Today we serve over 50,000 families, offer 500+ products, and are committed to zero-chemical agriculture." },
      ].map(({ year, title, text }, i) => (
        <div key={year} style={{ display: "flex", gap: 32, marginBottom: 48 }}>
          <div style={{ textAlign: "center", minWidth: 80 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontFamily: T.fontBody, fontWeight: 700, fontSize: 14 }}>{year}</div>
            {i < 4 && <div style={{ width: 2, height: 48, background: T.primaryLight, margin: "0 auto" }} />}
          </div>
          <div style={{ paddingTop: 8 }}>
            <h3 style={{ fontFamily: T.fontHeading, fontSize: 24, color: T.primary, marginBottom: 12 }}>{title}</h3>
            <p style={{ fontFamily: T.fontBody, fontSize: 15, color: T.textSecondary, lineHeight: 1.8 }}>{text}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Farmer Stories */}
    <section style={{ padding: "80px 32px", background: T.bgAlt }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader title="Meet Our Farmers" subtitle="The hearts behind our harvest" centered />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
          {[
            { name: "Ramesh Patil", location: "Siddapur, Karnataka", crop: "Organic Spices", img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=85", story: "3rd generation farmer, committed to chemical-free farming since 2015." },
            { name: "Sunita Devi", location: "Rishikesh, Uttarakhand", crop: "Herbal Plants", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=85", story: "Practices ancient Ayurvedic farming methods passed down through generations." },
            { name: "Thomas George", location: "Kumily, Kerala", crop: "Organic Tea & Spices", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=85", story: "Runs a 50-acre organic plantation with his family, employing 30 local workers." },
          ].map((farmer, i) => (
            <div key={i} style={{ background: T.white, borderRadius: T.radius.lg, overflow: "hidden", boxShadow: T.shadowCard }}>
              <img src={farmer.img} alt={farmer.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              <div style={{ padding: "24px" }}>
                <h4 style={{ fontFamily: T.fontHeading, fontSize: 20, color: T.primary, marginBottom: 4 }}>{farmer.name}</h4>
                <p style={{ fontSize: 12, color: T.primaryLight, marginBottom: 12 }}>{farmer.location} · {farmer.crop}</p>
                <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.6 }}>{farmer.story}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// Certifications Page
const CertificationsPage = () => (
  <div style={{ paddingTop: 70 }}>
    <div style={{ background: `linear-gradient(135deg, ${T.primaryDark} 0%, ${T.primary} 100%)`, padding: "100px 32px 80px", textAlign: "center" }}>
      <h1 style={{ fontFamily: T.fontHeading, fontSize: "clamp(36px,5vw,60px)", color: "#fff", marginBottom: 20 }}>Our Certifications</h1>
      <p style={{ color: T.primaryLight, fontFamily: T.fontBody, fontSize: 18, fontWeight: 300, maxWidth: 600, margin: "0 auto" }}>Every product is rigorously tested and certified to meet the highest organic standards.</p>
    </div>

    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
        {CERTIFICATIONS.map(cert => (
          <div key={cert.id} style={{ background: T.white, borderRadius: T.radius.lg, padding: "36px 28px", textAlign: "center", boxShadow: T.shadowCard, transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = T.shadowLifted; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = T.shadowCard; }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>{cert.logo}</div>
            <h3 style={{ fontFamily: T.fontHeading, fontSize: 20, color: T.primary, marginBottom: 12, fontWeight: 700 }}>{cert.name}</h3>
            <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.6 }}>{cert.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 60, background: T.accent, borderRadius: T.radius.lg, padding: "48px 32px", textAlign: "center" }}>
        <h3 style={{ fontFamily: T.fontHeading, fontSize: 28, color: T.primary, marginBottom: 16 }}>Our Quality Promise</h3>
        <p style={{ fontFamily: T.fontBody, fontSize: 15, color: T.textSecondary, lineHeight: 1.8, maxWidth: 700, margin: "0 auto" }}>
          Every batch of every product undergoes rigorous testing at NABL-accredited laboratories. We test for pesticide residues, heavy metals, and microbial contamination. Only products that pass all quality checks make it to your doorstep.
        </p>
      </div>
    </div>
  </div>
);

// Blog Page
const BlogPage = () => (
  <div style={{ paddingTop: 70 }}>
    <div style={{ background: `linear-gradient(135deg, ${T.primaryDark} 0%, ${T.primary} 100%)`, padding: "100px 32px 80px", textAlign: "center" }}>
      <h1 style={{ fontFamily: T.fontHeading, fontSize: "clamp(36px,5vw,60px)", color: "#fff", marginBottom: 20 }}>Wellness Blog</h1>
      <p style={{ color: T.primaryLight, fontFamily: T.fontBody, fontSize: 18, fontWeight: 300, maxWidth: 600, margin: "0 auto" }}>Tips, insights, and stories for a healthier, more natural life.</p>
    </div>

    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 32 }}>
        {BLOGS.map((blog, i) => (
          <div key={blog.id} className="fade-up" style={{ animationDelay: `${i * 0.1}s`, background: T.white, borderRadius: T.radius.lg, overflow: "hidden", boxShadow: T.shadowCard, transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = T.shadowLifted; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = T.shadowCard; }}
          >
            <img src={blog.image} alt={blog.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <Badge color={T.primaryLight} size="xs">{blog.category}</Badge>
                <span style={{ fontSize: 12, color: T.textLight, fontFamily: T.fontBody }}>{blog.date}</span>
              </div>
              <h3 style={{ fontFamily: T.fontHeading, fontSize: 20, color: T.primary, marginBottom: 12, lineHeight: 1.3, fontWeight: 700 }}>{blog.title}</h3>
              <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>{blog.excerpt}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: T.primaryLight, fontFamily: T.fontBody, display: "flex", alignItems: "center", gap: 4 }}>{Icon.clock(12)} {blog.readTime}</span>
                <button style={{ color: T.primary, fontFamily: T.fontBody, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  Read More {Icon.arrowRight(12)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Contact Page
const ContactPage = ({ onWhatsAppClick }) => (
  <div style={{ paddingTop: 70 }}>
    <div style={{ background: `linear-gradient(135deg, ${T.primaryDark} 0%, ${T.primary} 100%)`, padding: "100px 32px 80px", textAlign: "center" }}>
      <h1 style={{ fontFamily: T.fontHeading, fontSize: "clamp(36px,5vw,60px)", color: "#fff", marginBottom: 20 }}>Get in Touch</h1>
      <p style={{ color: T.primaryLight, fontFamily: T.fontBody, fontSize: 18, fontWeight: 300, maxWidth: 600, margin: "0 auto" }}>We'd love to hear from you. Reach out with any questions or feedback.</p>
    </div>

    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div style={{ background: T.white, borderRadius: T.radius.lg, padding: "40px", boxShadow: T.shadow }}>
          <h3 style={{ fontFamily: T.fontHeading, fontSize: 24, color: T.primary, marginBottom: 24 }}>Send us a Message</h3>
          <form style={{ display: "flex", flexDirection: "column", gap: 20 }} onSubmit={e => { e.preventDefault(); alert("Message sent successfully!"); }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 14, fontWeight: 500, color: T.textPrimary, marginBottom: 8 }}>First Name</label>
                <input type="text" required style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "14px 18px", fontFamily: T.fontBody, fontSize: 14 }} placeholder="John" />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 14, fontWeight: 500, color: T.textPrimary, marginBottom: 8 }}>Last Name</label>
                <input type="text" required style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "14px 18px", fontFamily: T.fontBody, fontSize: 14 }} placeholder="Doe" />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 14, fontWeight: 500, color: T.textPrimary, marginBottom: 8 }}>Email</label>
              <input type="email" required style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "14px 18px", fontFamily: T.fontBody, fontSize: 14 }} placeholder="john@example.com" />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 14, fontWeight: 500, color: T.textPrimary, marginBottom: 8 }}>Phone</label>
              <input type="tel" style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "14px 18px", fontFamily: T.fontBody, fontSize: 14 }} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 14, fontWeight: 500, color: T.textPrimary, marginBottom: 8 }}>Message</label>
              <textarea rows={5} required style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "14px 18px", fontFamily: T.fontBody, fontSize: 14, resize: "vertical" }} placeholder="How can we help you?" />
            </div>
            <Btn type="submit" style={{ padding: "14px 24px" }}>Send Message</Btn>
          </form>
        </div>

        <div>
          <div style={{ background: T.white, borderRadius: T.radius.lg, padding: "32px", boxShadow: T.shadow, marginBottom: 24 }}>
            <h3 style={{ fontFamily: T.fontHeading, fontSize: 20, color: T.primary, marginBottom: 20 }}>Contact Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a href="tel:9483708480" style={{ display: "flex", alignItems: "center", gap: 16, color: T.textPrimary }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icon.phone(18, T.primary)}</div>
                <div>
                  <div style={{ fontSize: 12, color: T.textLight }}>Call Us</div>
                  <div style={{ fontWeight: 600 }}>+91 94837 08480</div>
                </div>
              </a>
              <a href="mailto:organicstoresiddapur@email.com" style={{ display: "flex", alignItems: "center", gap: 16, color: T.textPrimary }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icon.mail(18, T.primary)}</div>
                <div>
                  <div style={{ fontSize: 12, color: T.textLight }}>Email Us</div>
                  <div style={{ fontWeight: 600 }}>organicstoresiddapur@email.com</div>
                </div>
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 16, color: T.textPrimary }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icon.mapPin(18, T.primary)}</div>
                <div>
                  <div style={{ fontSize: 12, color: T.textLight }}>Visit Us</div>
                  <div style={{ fontWeight: 600 }}>Organic Store, Siddapur<br />Uttarakannada, Karnataka 581355</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: T.white, borderRadius: T.radius.lg, padding: "32px", boxShadow: T.shadow, marginBottom: 24 }}>
            <h3 style={{ fontFamily: T.fontHeading, fontSize: 20, color: T.primary, marginBottom: 20 }}>Follow Us</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.primaryLight}>{Icon.instagram(18, T.primary)}</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.primaryLight}>{Icon.facebook(18, T.primary)}</a>
              <button onClick={onWhatsAppClick} style={{ width: 44, height: 44, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}>{Icon.whatsapp(18, "#fff")}</button>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div style={{ borderRadius: T.radius.lg, overflow: "hidden", boxShadow: T.shadow, height: 250 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.848483926854!2d74.5638!3d14.6458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8f0e0c0c0c0c1%3A0x1234567890abcdef!2sSiddapur%2C%20Karnataka%20581355!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, width: "100%", height: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Organic Store Location"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Profile Modal
const ProfileModal = ({ open, onClose, user, onSave, onLogout }) => {
  const [formData, setFormData] = useState({
    name: "", mobile: "", address: "", pin: "", state: "", country: "India", photo: null
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(user);
      setIsEditing(false);
    } else {
      setFormData({ name: "", mobile: "", address: "", pin: "", state: "", country: "India", photo: null });
      setIsEditing(true);
    }
  }, [user, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth={500} title={user && !isEditing ? "My Profile" : "Register / Login"}>
      {user && !isEditing ? (
        <div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: T.accent, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                Icon.user(40, T.primary)
              )}
            </div>
            <h3 style={{ fontFamily: T.fontHeading, fontSize: 22, color: T.primary, marginBottom: 4 }}>{formData.name}</h3>
            <p style={{ fontSize: 14, color: T.textSecondary }}>{formData.mobile}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${T.borderLight}` }}>
              <span style={{ color: T.textLight, fontSize: 14 }}>Address</span>
              <span style={{ fontWeight: 500, fontSize: 14 }}>{formData.address || "Not set"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${T.borderLight}` }}>
              <span style={{ color: T.textLight, fontSize: 14 }}>PIN Code</span>
              <span style={{ fontWeight: 500, fontSize: 14 }}>{formData.pin || "Not set"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${T.borderLight}` }}>
              <span style={{ color: T.textLight, fontSize: 14 }}>State</span>
              <span style={{ fontWeight: 500, fontSize: 14 }}>{formData.state || "Not set"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
              <span style={{ color: T.textLight, fontSize: 14 }}>Country</span>
              <span style={{ fontWeight: 500, fontSize: 14 }}>{formData.country}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Btn variant="outline" full onClick={() => setIsEditing(true)} icon={Icon.user(14)}>Edit Profile</Btn>
            <Btn variant="danger" onClick={onLogout} icon={Icon.x(14)}>Logout</Btn>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: T.accent, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: "pointer", position: "relative" }}>
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                Icon.user(32, T.primary)
              )}
              <label style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", color: "#fff", fontSize: 12, cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                {Icon.camera(14)}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              </label>
            </div>
            <p style={{ fontSize: 12, color: T.textLight }}>Click to upload photo</p>
          </div>

          <div>
            <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 13, fontWeight: 500, color: T.textPrimary, marginBottom: 6 }}>Full Name *</label>
            <input type="text" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} required style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "12px 16px", fontFamily: T.fontBody, fontSize: 14 }} placeholder="Enter your name" />
          </div>

          <div>
            <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 13, fontWeight: 500, color: T.textPrimary, marginBottom: 6 }}>Mobile Number *</label>
            <input type="tel" value={formData.mobile} onChange={e => setFormData(prev => ({ ...prev, mobile: e.target.value }))} required pattern="[0-9]{10}" style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "12px 16px", fontFamily: T.fontBody, fontSize: 14 }} placeholder="Enter 10-digit mobile number" />
          </div>

          <div>
            <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 13, fontWeight: 500, color: T.textPrimary, marginBottom: 6 }}>Address</label>
            <textarea value={formData.address} onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))} rows={2} style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "12px 16px", fontFamily: T.fontBody, fontSize: 14, resize: "vertical" }} placeholder="Enter your address" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 13, fontWeight: 500, color: T.textPrimary, marginBottom: 6 }}>PIN Code</label>
              <input type="text" value={formData.pin} onChange={e => setFormData(prev => ({ ...prev, pin: e.target.value }))} pattern="[0-9]{6}" style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "12px 16px", fontFamily: T.fontBody, fontSize: 14 }} placeholder="6-digit PIN" />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: T.fontBody, fontSize: 13, fontWeight: 500, color: T.textPrimary, marginBottom: 6 }}>State</label>
              <input type="text" value={formData.state} onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))} style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: T.radius.sm, padding: "12px 16px", fontFamily: T.fontBody, fontSize: 14 }} placeholder="State" />
            </div>
          </div>

          <Btn type="submit" full style={{ padding: "14px 24px", marginTop: 8 }}>
            {user ? "Save Changes" : "Register & Continue"}
          </Btn>

          {user && <Btn type="button" variant="ghost" full onClick={() => setIsEditing(false)}>Cancel</Btn>}
        </form>
      )}
    </Modal>
  );
};

// Chatbot
const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! 🌿 I'm your organic assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickQuestion = (q) => {
    const qa = CHATBOT_QA.find(item => item.q.toLowerCase() === q.toLowerCase());
    setMessages(prev => [...prev, { type: "user", text: q }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", text: qa ? qa.a : "Let me connect you with our team!" }]);
      if (qa) {
        setTimeout(() => {
          setMessages(prev => [...prev, { type: "bot", text: "Need more help? Contact us on WhatsApp for personalized assistance! 💬", isWhatsApp: true }]);
        }, 1500);
      }
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { type: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", text: "Thanks for your message! Our team will get back to you soon. For immediate help, please contact us on WhatsApp. 🌿" }]);
    }, 1000);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/919483708480?text=Hello%20manager%2C%20I%20need%20help", "_blank");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 999,
            width: 56, height: 56, borderRadius: "50%",
            background: T.primary, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(45,106,79,0.4)",
            cursor: "pointer", transition: "all 0.3s ease",
            animation: "bounce 2s infinite"
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {Icon.chat(22, "#fff")}
        </button>
      )}

      {open && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 999,
          width: "100%", maxWidth: 380, background: T.white,
          borderRadius: T.radius.lg, boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
          overflow: "hidden", animation: "slideUp 0.3s ease"
        }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDark} 100%)`,
            padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {Icon.leaf(18, "#fff")}
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Organic Assistant</div>
                <div style={{ color: T.primaryLight, fontSize: 11 }}>Online · Usually replies instantly</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: "#fff", opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 1}>
              {Icon.x(18, "#fff")}
            </button>
          </div>

          {/* Messages */}
          <div style={{ height: 300, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%", padding: "10px 16px", borderRadius: 16,
                background: msg.type === "user" ? T.primary : T.bgAlt,
                color: msg.type === "user" ? "#fff" : T.textPrimary,
                fontSize: 13, lineHeight: 1.5,
                fontFamily: T.fontBody,
                borderBottomRightRadius: msg.type === "user" ? 4 : 16,
                borderBottomLeftRadius: msg.type === "bot" ? 4 : 16,
              }}>
                {msg.text}
                {msg.isWhatsApp && (
                  <button
                    onClick={openWhatsApp}
                    style={{
                      display: "flex", alignItems: "center", gap: 6, marginTop: 8,
                      background: "#25D366", color: "#fff", border: "none",
                      padding: "6px 14px", borderRadius: 20, fontSize: 12,
                      fontWeight: 600, cursor: "pointer", fontFamily: T.fontBody
                    }}
                  >
                    {Icon.whatsapp(14, "#fff")} Contact on WhatsApp
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div style={{ padding: "8px 20px", borderTop: `1px solid ${T.borderLight}` }}>
            <div style={{ fontSize: 11, color: T.textLight, marginBottom: 8, fontFamily: T.fontBody }}>Quick questions:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {CHATBOT_QA.map((qa, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(qa.q)}
                  style={{
                    background: T.accent, border: "none", padding: "6px 12px",
                    borderRadius: 20, fontSize: 11, color: T.primary,
                    cursor: "pointer", fontFamily: T.fontBody, fontWeight: 500,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.primaryLight; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = T.primary; }}
                >
                  {qa.q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "12px 20px", borderTop: `1px solid ${T.borderLight}`, display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              style={{
                flex: 1, border: `1px solid ${T.border}`, borderRadius: 20,
                padding: "10px 16px", fontFamily: T.fontBody, fontSize: 13,
                background: T.bg
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: 38, height: 38, borderRadius: "50%", background: T.primary,
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            >
              {Icon.send(14, "#fff")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Footer
const Footer = ({ setPage, setFilterCat }) => (
  <footer style={{ background: T.primaryDark, color: "#fff", padding: "80px 32px 40px" }}>
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 60 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, background: T.primaryLight, borderRadius: T.radius.sm, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {Icon.leaf(20, "#fff")}
            </div>
            <span style={{ fontFamily: T.fontHeading, fontSize: 20, fontWeight: 700 }}>Organic Store</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, fontFamily: T.fontBody }}>
            Bringing certified organic products from Karnataka's lush forests to your doorstep. 100% natural, chemical-free, and sustainably sourced.
          </p>
        </div>

        <div>
          <h4 style={{ fontFamily: T.fontHeading, fontSize: 18, fontWeight: 600, marginBottom: 20, color: T.primaryLight }}>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Home", "Shop", "About", "Blog", "Certifications", "Contact"].map(link => (
              <button key={link} onClick={() => setPage(link.toLowerCase())} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontFamily: T.fontBody, cursor: "pointer", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = T.primaryLight} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>{link}</button>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontFamily: T.fontHeading, fontSize: 18, fontWeight: 600, marginBottom: 20, color: T.primaryLight }}>Categories</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { setFilterCat(cat.id); setPage("shop"); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontFamily: T.fontBody, cursor: "pointer", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = T.primaryLight} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>{cat.label}</button>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontFamily: T.fontHeading, fontSize: 18, fontWeight: 600, marginBottom: 20, color: T.primaryLight }}>Newsletter</h4>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, fontFamily: T.fontBody, marginBottom: 16 }}>Subscribe for exclusive offers and organic tips.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="email" placeholder="Your email" style={{ flex: 1, border: "1px solid rgba(255,255,255,0.2)", borderRadius: T.radius.sm, padding: "12px 16px", background: "rgba(255,255,255,0.1)", color: "#fff", fontFamily: T.fontBody, fontSize: 14 }} />
            <button style={{ background: T.primaryLight, border: "none", borderRadius: T.radius.sm, padding: "12px 16px", cursor: "pointer", color: T.primaryDark }}>{Icon.send(16)}</button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: T.fontBody }}>© 2025 Organic Store. All rights reserved.</p>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.1)", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.primaryLight}>{Icon.facebook(18)}</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.1)", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.primaryLight}>{Icon.instagram(18)}</a>
          <a href="https://wa.me/919483708480" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.1)", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.primaryLight}>{Icon.whatsapp(18, "#fff")}</a>
        </div>
      </div>
    </div>
  </footer>
);

// ─── MAIN APP COMPONENT ─────────────────────────────────────────────────────
function App() {
  useEffect(() => {
    injectFonts();
    injectGlobalStyles();
  }, []);

  const [page, setPage] = useState("home");
  const [cart, setCart] = useLocalStorage("organic-cart", []);
  const [user, setUser] = useLocalStorage("organic-user", null);
  const [filterCat, setFilterCat] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + (product.qty || 1) } : item);
      }
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
    setToast({ msg: `Added ${product.name} to cart!`, type: "success" });
  }, [setCart]);

  const updateCartQty = useCallback((id, qty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  }, [setCart]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    setToast({ msg: "Item removed from cart", type: "info" });
  }, [setCart]);

  const handleCheckout = () => {
    if (!user) {
      setShowProfile(true);
      setToast({ msg: "Please register to complete your order", type: "info" });
      return;
    }
    setShowOrderConfirm(true);
    setCart([]);
    setShowCart(false);
  };

  const handleSaveProfile = (data) => {
    setUser(data);
    setToast({ msg: user ? "Profile updated successfully!" : "Welcome! You're now registered.", type: "success" });
    setShowProfile(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToast({ msg: "Logged out successfully", type: "info" });
    setShowProfile(false);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919483708480?text=Hello%20manager%2C%20I%20need%20help", "_blank");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} onAddToCart={addToCart} onView={setSelectedProduct} setFilterCat={setFilterCat} />;
      case "shop": return <ShopPage onAddToCart={addToCart} onView={setSelectedProduct} filterCat={filterCat} setFilterCat={setFilterCat} />;
      case "about": return <AboutPage />;
      case "blog": return <BlogPage />;
      case "certifications": return <CertificationsPage />;
      case "contact": return <ContactPage onWhatsAppClick={handleWhatsApp} />;
      default: return <HomePage setPage={setPage} onAddToCart={addToCart} onView={setSelectedProduct} setFilterCat={setFilterCat} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} user={user} setShowCart={setShowCart} setShowProfile={setShowProfile} />

      <main>{renderPage()}</main>

      <Footer setPage={setPage} setFilterCat={setFilterCat} />

      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} cart={cart} onUpdateQty={updateCartQty} onRemove={removeFromCart} onCheckout={handleCheckout} user={user} />

      <ProductDetail product={selectedProduct} onAddToCart={addToCart} onClose={() => setSelectedProduct(null)} />

      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} user={user} onSave={handleSaveProfile} onLogout={handleLogout} />

      <Modal open={showOrderConfirm} onClose={() => setShowOrderConfirm(false)} maxWidth={400} title="Order Confirmed! 🎉">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: T.success, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            {Icon.check(36, "#fff")}
          </div>
          <h3 style={{ fontFamily: T.fontHeading, fontSize: 24, color: T.primary, marginBottom: 12, fontWeight: 700 }}>Thank You!</h3>
          <p style={{ fontFamily: T.fontBody, fontSize: 14, color: T.textSecondary, lineHeight: 1.7, marginBottom: 24 }}>
            Your order has been placed successfully. You'll receive a confirmation SMS with tracking details soon.
          </p>
          <p style={{ fontFamily: T.fontBody, fontSize: 13, color: T.primaryLight, marginBottom: 24 }}>
            Order ID: #ORG{Date.now().toString().slice(-8)}
          </p>
          <Btn onClick={() => setShowOrderConfirm(false)} full>Continue Shopping</Btn>
        </div>
      </Modal>

      <Chatbot />

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;