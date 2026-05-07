# Design System Documentation: The Film Room

## 1. Overview & Creative North Star

### Creative North Star: "The Film Room"

This design system rejects flat, generic portfolio aesthetics in favor of a **dark cinematic** identity. It is built for a software developer's portfolio — the UI must feel like stepping into a private screening room: intimate, high-contrast, editorial, and deliberate.

We blend **Cinematic Darkness** — deep black surfaces, grain overlays, gradient fades — with **Warm Cream Typography** — `#DEDBC8` text that reads like projected light on a dark wall. The layout breathes like a film: slow reveals, staggered entrances, scroll-linked opacity. Every motion is intentional. Every surface whispers depth through glass and grain, never through flat color.

The guiding tension is **Macro vs. Micro**: oversized display type pushed to viewport-width extremes against tight, understated body text. The asterisk on the hero name. The pill navbar floating like a projector lens. The scroll-reveal paragraph that illuminates character by character. This is not a page — it's a sequence.

---

## 2. Colors

Our palette is rooted in projected light and darkened surfaces. `Primary` is our light; `Surface` variants are our darkness.

### Token Catalog

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#DEDBC8` | Primary text, CTA backgrounds, accent elements |
| `primary-secondary` | `#E1E0CC` | Full-brightness headings, navbar hover, card titles |
| `surface-base` | `#000000` | Page background, hero section |
| `surface-elevated` | `#101010` | About card background |
| `surface-card` | `#212121` | Project card backgrounds |

### Opacity Tiers (Text)

These are not arbitrary — each tier serves a purpose:

| Tier | Token | opacity | Usage |
|---|---|---|---|
| Full | `text-[#E1E0CC]` | 1.0 | Card titles, video overlay text |
| Secondary | `rgba(225,224,204,0.8)` | 0.8 | Navbar links (default state) |
| Muted | `rgba(225,224,204,0.7)` / `text-primary/70` | 0.7 | Body copy, social links, secondary descriptions |
| Dimmed | `text-primary/50` | 0.5 | Section numbers, de-emphasized labels |
| Ghost | `text-primary/40` | 0.4 | Footer attribution |
| Disabled | `text-gray-400` / `text-gray-500` | — | Bullet-point text, secondary heading segments |

### Ghost Borders & Inset Highlights

The system never uses visible borders for section separation. Boundaries are defined by:
- **Ghost Borders:** `border border-white/[0.04]` on cards, `border-white/[0.06]` on navbar pill and footer divider
- **Inset Highlights:** `shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]` on cards, `shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]` on navbar — a 1px top edge that catches "projected light"
- **The "No-Line" Rule:** Prohibit visible 1px solid borders for general sectioning. Depth is achieved through surface shifts (`#000` → `#101010`) and ghost borders that are felt, not seen.

### Gradients

| Usage | Value |
|---|---|
| Hero overlay | `bg-gradient-to-b from-black/30 via-transparent to-black/60` |
| Video card overlay | `bg-gradient-to-t from-black/60 via-transparent to-transparent` |

---

## 3. Typography

The system uses a dual-font hierarchy to balance geometric clarity with editorial accent.

### Font Assignments

| Role | Font | Weight | Usage |
|---|---|---|---|
| Global Default | **Almarai** | 300 / 400 / 700 / 800 | Everything: body, buttons, labels, navigation |
| Accent / Italic | **Instrument Serif** | Italic | Heading accent segments ("a developer who builds with precision.", "something together.") |

### Type Scale

| Element | Size | Tracking | Leading |
|---|---|---|---|
| Hero Name | `text-[26vw]` → `2xl:text-[20vw]` | `tracking-[-0.07em]` | `leading-[0.85]` |
| Section Heading | `3xl` → `7xl` (responsive) | default | `leading-[0.95]` → `leading-[0.9]` |
| Body (Hero) | `xs` → `base` | default | `1.2` |
| Body (About) | `xs` → `base` | default | default |
| Body (Contact) | `sm` → `lg` | default | `1.6` |
| Label (About) | `10px` → `xs` | `tracking-widest uppercase` | default |
| Navbar | `10px` → `sm` | default | default |
| Card Title | `sm` → `base` | default | default |
| Bullet Text | `xs` → `sm` | default | default |

### Typographic Rules

- **Display Tightness:** Hero text uses `tracking-[-0.07em]` and `leading-[0.85]` to create dense, oversized type at viewport width.
- **Baseline Alignment:** Multi-weight display text uses `items-baseline` on flex containers with `leading-none` on motion spans to prevent "r" and "i" misalignment.
- **Smart Wrapping:** `text-wrap: balance` on headings (`h1, h2, h3`), `text-wrap: pretty` on body text (`p, li`).
- **Font Smoothing:** `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` are globally enforced.

---

## 4. Elevation & Depth

In a dark cinematic system, traditional drop shadows feel artificial. We use **Liquid Glass**, **Noise Grain**, and **Surface Stacking**.

### Liquid Glass

Used exclusively for the navbar — a floating, translucent element:

```css
background: rgba(0, 0, 0, 0.85);
backdrop-filter: blur(24px); /* backdrop-blur-xl */
border: 1px solid rgba(255, 255, 255, 0.06);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 2px 16px rgba(0, 0, 0, 0.4);
border-radius: 9999px; /* full pill */
```

### Noise Grain

Two noise utilities provide cinematic texture. Both use inline SVG `feTurbulence` to avoid external assets:

| Class | baseFrequency | numOctaves | opacity | Location |
|---|---|---|---|---|
| `.noise-overlay` | 0.85 | 3 | `0.7` with `mix-blend-overlay` | Hero video overlay |
| `.bg-noise` | 0.9 | 4 | `0.15` | Projects section background |

Both must include `pointer-events-none` to prevent interaction blocking.

### Surface Stacking

Depth without shadows:
1. **Base:** `bg-black` / `#000000` — page canvas
2. **Elevated:** `bg-[#101010]` — About card, slight lift from base
3. **Card:** `bg-[#212121]` — Project cards, floating above sections

Each surface level pairs with its ghost border (`white/[0.04]` or `white/[0.06]`) and inset highlight to create "edge light" without shadow.

### The One Shadow Exception

The navbar uses a diffused shadow: `0 2px 16px rgba(0,0,0,0.4)` — acceptable because it's a floating, detached element. Cards and sections never use drop shadows.

---

## 5. Motion

Motion in this system is cinematic — slow, staggered, scroll-linked. Nothing snaps. Everything eases out with an exponential curve.

### Standard Ease Curve

All entrances and reveals use the **Expo Out** cubic bezier:

```
cubic-bezier(0.16, 1, 0.3, 1)  /* [0.16, 1, 0.3, 1] */
```

This creates a decelerating feel: fast start, gentle settle — like a film reel slowing to a stop.

### Animation Catalog

| Animation | Duration | Delay | Trigger | Component |
|---|---|---|---|---|
| WordsPullUp (char) | 0.35s | `(wordIdx × wordLen + charIdx) × 0.05s` | `useInView({ once: true })` | Hero name |
| WordsPullUpMultiStyle (word) | 0.4s | `wordIdx × 0.07s` | `useInView({ once: true })` | Section headings |
| ScrollChar (opacity) | mapped | per-char scroll range | `useScroll` progress | About bio paragraph |
| Card Scale Entrance | 0.6s | `index × 0.15s` | `useInView({ once: true, margin: "-100px" })` | Project cards |
| Fade-Up (generic) | 0.6s | 0.5s–0.7s stagger | `useInView({ once: true, margin: "-100px" })` | Contact section |
| Hero Description | 0.6s | 0.5s | `initial/animate` on mount | Hero paragraph |
| Hero CTA | 0.6s | 0.7s | `initial/animate` on mount | Hero button |

### Press Feedback

All interactive elements use **scale-on-press**:

```tsx
whileTap={{ scale: 0.96 }}
// CSS fallback:
active:scale-[0.96]
```

Transitions use specific properties — never `transition-all`:
- Buttons: `transition-[gap,transform] duration-300`
- Links: `transition-[gap,transform] duration-200`
- Colors: `transition-colors duration-200`

### GPU Hinting

Animated elements declare `will-change: transform, opacity` or `willChange: "transform, opacity"` to promote GPU layers. This is applied on:
- All framer-motion spans in `WordsPullUp` and `WordsPullUpMultiStyle`
- Project card containers (`style={{ willChange: "transform" }}`)

---

## 6. Components

### Navbar — "The Projector Lens"

```
Position:    absolute, top-4 md:top-8, centered (left-1/2 -translate-x-1/2), z-30
Shape:       Rounded pill (rounded-full)
Surface:     Liquid glass (bg-black/85, backdrop-blur-xl)
Border:      1px solid rgba(255,255,255,0.06)
Highlight:   Inset top light (shadow inset 0 1px 0 rgba(255,255,255,0.06))
Outer shadow: 0 2px 16px rgba(0,0,0,0.4)
Links:       5 items (About, Projects, Skills, Experience, Contact)
Link text:   10px → sm, color rgba(225,224,204,0.8), hover #E1E0CC
Gaps:        8px → 32px responsive (gap-2 sm:gap-4 md:gap-6 lg:gap-8)
```

### Hero — "The Opening Shot"

```
Layout:      min-h-[100dvh], flex flex-col, p-3 md:p-5
Inner:        flex-1, rounded-2xl md:rounded-[2rem], overflow-hidden
Background:  Full-bleed <video> with noise overlay (0.7 mix-blend-overlay)
Gradient:     bg-gradient-to-b from-black/30 via-transparent to-black/60
Content:     12-column grid, bottom-anchored
  Name:      col-span-8, text-[26vw]→[20vw], tracking-[-0.07em], leading-[0.85]
  Description + CTA: col-span-4
  CTA:       Pill button, bg-primary, text-black, arrow icon in black circle
```

### About — "The Character Reveal"

```
Layout:      Centered max-w-6xl card on bg-black
Surface:     bg-[#101010], rounded-2xl md:rounded-3xl
Border:      border-white/[0.04], shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
Padding:     p-8 sm:p-12 md:p-16
Label:       "Software Developer", 10px, tracking-widest, uppercase, text-primary
Heading:     WordsPullUpMultiStyle with mixed styles
  Segment 1: font-normal (Almarai)
  Segment 2: italic font-serif (Instrument Serif)
  Segment 3: font-normal (Almarai)
Body:        ScrollChar opacity reveal, 0.2 → 1.0 per character, mapped to scroll progress
```

### Projects — "The Film Strip"

```
Layout:      max-w-7xl, 4-column grid (lg), min-h-screen
Background:  bg-noise at 0.15 opacity, pointer-events-none
Heading:     WordsPullUpMultiStyle, two segments (primary + gray-500)
Cards:       rounded-2xl, scale entrance (0.95 → 1, stagger 0.15s)
  Video card: Full-bleed video + gradient overlay + bottom title
  Text cards: bg-[#212121], ghost border, inset highlight
    Icon:     rounded, outline outline-1 -outline-offset-1 outline-white/10
    Number:   text-primary/50, text-xs
    Title:    text-[#E1E0CC], font-medium
    Bullets:  Check icon (text-primary) + gray-400 text
    CTA:      text-primary, arrow rotated -45deg, hover:gap-3
```

### Contact — "The Credits"

```
Layout:      Centered max-w-4xl, text-align center
Heading:     WordsPullUpMultiStyle, "Let's build" (normal) + "something together." (italic serif)
Body:        text-primary/70, max-w-lg, line-height 1.6
CTA:         Pill button (bg-primary, text-black) + icon circle (bg-black, text-primary)
Social links: 3 items (GitHub, LinkedIn, Twitter), rgba(225,224,204,0.7), hover #E1E0CC
Footer:      border-t border-white/[0.06], text-primary/40, text-xs
```

---

## 7. Layout Rules

### Viewport Height

**Always use `min-h-[100dvh]`, never `h-screen` or `h-[100vh]`.** The `dvh` unit accounts for mobile browser chrome and prevents content from being hidden behind address bars. The hero section uses `flex flex-col` with `flex-1` on the inner container to fill available space.

### Concentric Border Radii

When nesting rounded containers, inner elements use progressively smaller radii:

| Outer | Inner |
|---|---|
| `rounded-2xl` (1rem) | default radius |
| `md:rounded-[2rem]` | `rounded-2xl` for inner cards |

### Responsive Spacing Scale

| Context | Mobile | sm | md | lg/xl |
|---|---|---|---|---|
| Section padding Y | py-20 | py-28 | py-36 | — |
| Section padding X | px-4 | sm:px-6 | — | — |
| Card padding | p-5 | sm:p-6 | — | — |
| Hero outer padding | p-3 | — | md:p-5 | — |
| Hero inner padding | p-4 | sm:p-6 | md:p-8 | — |

### Image Outlines

All project icons and images use:
```
outline outline-1 -outline-offset-1 outline-white/10
```
This creates a subtle "frame" effect consistent with the cinematic aesthetic — an inner stroke without `box-shadow` or `border`.

---

## 8. Do's and Don'ts

### Do

- **DO** use `min-h-[100dvh]` for full-viewport sections — never `h-screen`.
- **DO** use specific transition properties: `transition-[gap,transform]` or `transition-colors` — never `transition-all`.
- **DO** apply `active:scale-[0.96]` or `whileTap={{ scale: 0.96 }}` to all interactive elements for press feedback.
- **DO** use `-webkit-font-smoothing: antialiased` globally — the dark palette demands sub-pixel rendering control.
- **DO** use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.
- **DO** set `will-change` on animated elements for GPU promotion.
- **DO** use `items-baseline` + `leading-none` for multi-weight display text to prevent baseline misalignment.
- **DO** use `pointer-events-none` on all noise and gradient overlays.
- **DO** use the Expo Out ease `[0.16, 1, 0.3, 1]` for all entrance animations — it creates the cinematic "slow settle."
- **DO** use `mix-blend-overlay` on the hero noise to blend grain into the video without blocking it.

### Don't

- **DON'T** use `h-screen` — it ignores mobile browser chrome and causes layout overflow.
- **DON'T** use `transition-all` — it triggers layout thrashing on every property. Always specify which properties animate.
- **DON'T** use `#000000` for text — use `#E1E0CC`, `#DEDBC8`, or `primary` with opacity modifiers instead. True black text on true black surfaces is invisible; true black on dark surfaces feels harsh.
- **DON'T** use visible 1px solid borders for sectioning — use surface color shifts (`#000` → `#101010`) and ghost borders (`white/[0.04]`–`white/[0.06]`).
- **DON'T** use traditional `box-shadow` for card elevation — use surface stacking and inset highlights.
- **DON'T** center-align large blocks of body text — keep descriptions flush with the grid for an editorial feel.
- **DON'T** use `overflow-hidden` on inline character animation spans — it clips ascenders/descenders on letters like "g", "y", "p".
- **DON'T** use `border-radius` without concentric nesting — inner elements should always have smaller radii than their container.