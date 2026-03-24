```markdown
# Design System: Editorial Noir & Luminous Luxury

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Midnight Gala."** 

This is not a standard utility interface; it is a digital editorial experience designed to evoke the high-drama and emotional weight of a luxury perfume campaign. We move away from the "grid-of-boxes" mentality, opting instead for a layered, atmospheric approach where content emerges from the shadows. 

The aesthetic relies on **intentional asymmetry**, where large-scale serif typography breaks across container boundaries, and **tonal depth**, where elements are separated by light and glow rather than rigid lines. This system prioritizes the "feeling" of the interface—expensive, romantic, and slightly mysterious.

---

## 2. Colors: The Palette of the Night
The color strategy mimics a moonlit room: deep shadows, vibrant neon highlights, and the warm touch of gold.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited.** To define sections, use shifts in surface tokens. A section transitioning from `surface` (#15121A) to `surface_container_low` (#1D1A23) creates a sophisticated, "felt" boundary that feels architectural rather than technical.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-translucent plates. 
- **Base:** `surface` (#15121A).
- **Secondary Content:** `surface_container` (#221E27).
- **Floating/Interactive Elements:** `surface_container_highest` (#37333C).
Always nest a "Higher" container inside a "Lower" one to create a natural, logical progression of importance.

### Signature Textures & The "Glass" Rule
- **Ambient Glow:** Use blurred radial gradients of `primary_container` (#FF4F8B) and `secondary_container` (#6F00BE) at 10-15% opacity behind key headlines to create a "halo" effect.
- **Glassmorphism:** For floating menus or modals, use `surface_bright` with a 20% opacity and a `24px` backdrop blur. This allows the dark romantic background to bleed through, maintaining the "Midnight" atmosphere.

---

## 3. Typography: Editorial Authority
We pair the high-contrast elegance of **Playfair Display** (Display/Headline) with the clean, modern functionality of **DM Sans** (Body/Labels).

*Note: The design tokens refer to `newsreader` and `manrope`; for this specific identity, we implement the aesthetics of Playfair and DM Sans respectively.*

- **Display-LG (Playfair Display):** Use for "Big Numbers" or singular, romantic words. It should feel like a masthead.
- **Headline-MD (Playfair Display):** Used for section titles. Ensure generous letter-spacing (tracking) for a more "expensive" look.
- **Body-LG (DM Sans):** The workhorse. Keep line-heights generous (1.6x) to ensure the text breathes against the dark background.
- **Label-MD (DM Sans):** Always Uppercase with 0.1rem letter spacing to denote metadata or small UI hints.

---

## 4. Elevation & Depth: Tonal Layering
In this system, light is the only structural material.

- **The Layering Principle:** Avoid shadows on static cards. Instead, place a `surface_container_lowest` (#100D15) card on a `surface_container` (#221E27) background to create a "sunken" or "embedded" effect.
- **Ambient Shadows:** When an element must float (like a Primary CTA), use a shadow color derived from `on_secondary` (#490080) at 15% opacity with a `48px` blur. This creates a purple "aura" rather than a grey shadow.
- **The "Ghost Border":** If accessibility requires a stroke, use `outline_variant` (#594045) at **15% opacity**. It should be barely felt, acting more as a guide than a wall.

---

## 5. Components

### Buttons: The "Jewel" Elements
- **Primary:** Background `primary_container` (#FF4F8B), Text `on_primary` (#66002D). Apply a subtle top-down gradient transitioning into `secondary_container` (#6F00BE) for a "lit-from-within" look.
- **Secondary:** Transparent background with a `tertiary` (#EEC13C) "Ghost Border" at 20% opacity. Text in `tertiary`.
- **Corner Radius:** Use `xl` (0.75rem) for a modern, softened luxury feel.

### Cards & Lists: The No-Divider Rule
- **Cards:** Never use a border. Use a transition from `surface_container` to `surface_container_high` on hover.
- **Lists:** Forbid divider lines. Use `Spacing-6` (2rem) of vertical white space to separate items. If separation is needed, use a soft background tint of `surface_container_lowest`.

### Inputs: The "Underline" Aesthetic
- **Text Fields:** Instead of a four-sided box, use a bottom-border only (`outline_variant` at 30% opacity). When focused, the border transforms into a `tertiary` (#EEC13C) glow.

### Signature Component: The "Lume-Chip"
- For categories or tags, use a dark `surface_container_highest` background with a 2px left-border of `tertiary` (Gold) to mimic a gold leaf accent.

---

## 6. Do's and Don'ts

### Do:
- **Use "Scale" as a tool:** Make your Playfair Display headlines uncomfortably large or elegantly small. Avoid "medium."
- **Embrace Negative Space:** Let the `surface` background occupy 40% of the layout to maintain the "luxury perfume" vibe.
- **Overlap Elements:** Let a product image or a high-end photo bleed over a container edge.

### Don't:
- **Don't use pure white:** Use `on_surface` (#E8E0EC) for text. Pure white (#FFFFFF) is too harsh for the "Midnight" aesthetic.
- **Don't use standard icons:** Use thin-stroke (1px or 1.5px) icons. Thick, rounded icons will break the sophisticated editorial tone.
- **Don't use 100% Opaque Borders:** This immediately "cheapens" the design. Always use lowered opacities for outlines.

### Accessibility Note:
While the aesthetic is dark and dramatic, ensure all `body-md` and `body-sm` text maintains a 4.5:1 contrast ratio against their respective surface tokens. Use the `tertiary` (Gold) for critical highlights to ensure they pop against the midnight background.