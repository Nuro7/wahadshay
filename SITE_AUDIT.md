# Wahad Shay — Website Feature Audit (Include/Exclude Report)

**Scope:** Vite + React 19 app (`src/`), standalone `splash/` page, and `dist/` build output.
**Date:** 2026

---

## 1. Included (Present)

### Pages / sections
| Section | File | Notes |
|---|---|---|
| Preloader | `src/components/layout/Preloader.tsx` | GSAP 4-stage intro before app shows |
| Navbar | `src/components/Navbar.tsx` | Fixed beige/90 header; brand link → `#top`; links Home, About, Menu, Contact; "Order Now" button |
| Hero | `src/components/hero/Hero.tsx` | `CanvasParticles` (12 gold particles, `rgba(245,189,32,…)` slow drift), GSAP, headline + CTA `Button` |
| Menu | `src/components/Menu.tsx` | 2 categories / 8 items, SAR pricing (listed below) |
| Specials | `src/components/Specials.tsx` | 2 pairing cards with images + badges |
| Franchise | `src/components/Franchise.tsx` | "Partner With Us" / "Grow the Wahad Shay Network"; 4 steps |
| FranchiseSection | `src/components/FranchiseSection.tsx` | UAE branch map (SVG pins + connector lines), branch statuses, `GoldParticles` (25), `MapPin` |
| Contact | `src/components/Contact.tsx` | "Flagship HQ" block; react-icons/hi2 (envelope/phone/map/clock); 5-col grid (details 2/5 span + form area) |
| Footer | `src/components/Footer.tsx` | Brand blurb, link list, © copyright line |

### Menu content (confirmed)
**Signature Teas**
- Karak Special — SR 12
- Saffron Infusion — SR 15
- Mint Suleimani — SR 10
- Masala Blend — SR 14

**Artisan Breads**
- Cheese Melt Brioche — SR 22
- Smoked Turkey Croissant — SR 26
- Spicy Herb Focaccia — SR 18
- Honey Butter Scone — SR 14

### Specials (confirmed)
- "Royal Karak & Cheese Brioche" — `wahad_burger.png`, badge **Most Popular**
- "Golden Saffron & Herb Bun" — `wahad_teacup.png`, badge **Chef's Choice**

### Franchise branches (confirmed)
| Location | Status |
|---|---|
| Ajman · Al Jurf | Open |
| Dubai · Al Barsha | Coming Soon |
| Sharjah · Muwaileh | Coming Soon |
| Abu Dhabi · Al Falah | Open |

### Theme / brand (from `src/index.css`)
- Colors: plum `#5E2689`, plum-dark `#2E1A47`, yellow `#F5BD20`, beige `#EFE7DA`, grey `#A5A5A5`
- Fonts: Bricolage Grotesque (display), Manrope (body), Outfit (numerals)
- Base body = plum bg / white text; custom scrollbar (yellow thumb); `float` / `float-delayed` / `steam` keyframes

### Build output (`dist/`)
- `index.html`, brand images (`logo_wahad.png`, `tagline.png`, `wordmark.png`, `icons.svg`, `icon.png`, favicon png/svg)
- Hero animation video `home.mp4`
- `assets/index-BZ8rFvR7.css` (53081 B), `assets/index-C9UGoODs.js` (396653 B)
- `assets/wahad_burger-DdiVsMgR.png`, `assets/wahad_teacup-BD2VZB7o.png`

### Standalone page
- `splash/index.html` + `splash/script.js` + `splash/style.css` — independent static splash (separate from Vite app)

---

## 2. Excluded / Absent — Findings

| # | Severity | Finding |
|---|---|---|
| F1 | High | **"About" link is dead.** Navbar includes *About*, footer does not, and no `About` section/component exists in `src/components/` — clicking it goes nowhere. |
| F2 | High | **"Order Now" is not functional.** It is a styled `Button` with no `href`, `onClick`, cart, or checkout flow. No ordering/basket system exists anywhere. |
| F3 | Medium | **No reservation / booking system** in the catalogued source. |
| F4 | Medium | **No reviews / testimonials / social proof section** present. |
| F5 | Medium | **No blog / news / gallery** sections present. |
| F6 | Low | **Currency/locale inconsistency:** Menu priced in SAR (SR) while branch map uses UAE cities (Ajman, Dubai, Sharjah, Abu Dhabi). |
| F7 | Low | **Brand-home target mismatch:** Footer/FranchiseSection link to `#home`, brand link uses `#top` — verify both anchor id exist on a section. |
| F8 | Low | `src/App.css` is leftover Vite starter CSS (unused) — should be removed. |

---

## 3. Suggested Fixes (priority order)
1. Add an **About** section (or remove the nav link) → resolves F1.
2. Wire **Order Now** to a real flow (cart page / checkout / WhatsApp / contact CTA) or remove → resolves F2.
3. Decide & standardize currency (SAR vs AED) to match target market → F6.
4. Confirm a single anchor id (`#home`) for brand + all nav links → F7.
5. Delete `src/App.css` → F8.