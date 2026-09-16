# Hero Section Redesign Plan

## Context

The user has manually updated the Figma import files for the hero section (`/src/imports/HeroSection/`) and wants the live page to match the design. Three issues exist in the current `HeroSectionNew` component (inline in `HomePage.tsx`):

1. **Background**: Figma uses flat `bg-[#001c26]`. Current code already has this, but the light-beam positioning and style differ slightly.
2. **Layout / spacing**: Globe image and text overlap. Figma separates them as a clear two-column layout — text left, globe right — with no overlap.
3. **Icons**: Current code uses Lucide icons (`PhoneCall`, `Search`, `Shield`, `Zap`). The Figma uses custom SVG icons from `svg-9tldxuhlx4.ts`. User explicitly says to keep the design icons.

---

## What Changes

### File to edit: `src/app/pages/HomePage.tsx`

Only `HeroSectionNew` (lines 30–101) needs to change. All other sections stay untouched.

---

## Layout Fix

Replace the current absolute-positioned image overlay with an explicit **two-column flex** layout:

```
<section relative bg-[#001c26] overflow-hidden>
  <beams />                          ← same cyan beams, absolute background layer

  <div flex items-center min-h-screen>

    {/* LEFT — text content */}
    <div flex-1 pl-[192px] pr-12 py-[200px] max-w-[950px]>
      ... all text, buttons, badges ...
    </div>

    {/* RIGHT — globe image, desktop only */}
    <div hidden xl:block flex-none w-[50%] self-stretch relative>
      <img absolute inset-0 size-full object-cover object-left />
    </div>

  </div>
</section>
```

Key responsive behaviour:
- `xl:` breakpoint shows the two-column layout; below that the image is hidden and text fills full width
- The left column has `max-w-[950px]` so text never pushes into the image territory
- Image uses `object-cover object-left` (same as current), just confined to the right column div

---

## Icon Changes

Import the SVG paths file at the top of `HomePage.tsx`:

```ts
import svgHero from '@/imports/HeroSection/svg-9tldxuhlx4';
import imgGlobe from '@/imports/HeroSection/fb77c512e29ff2115fc5ae6841dbd964da16d875.png';
```

(Remove the old `imgHero` import from `imports/Homepage/` for the hero — the other image imports stay.)

### Trust / Status badge icon (`Fi` component)
Replace the `✦` span with the inline SVG composed of three paths from the import:
- `p1bc0500` (outer shield, fill `#D4F291`)
- `p16acd100` (inner shield fill, fill `#1D3B32`)
- `p1fcb00` (checkmark, fill `#F9F9FB`)
Rendered in a `26×26` container exactly as in the Figma import's `Layer` / `Fi` components.

### "Talk to Sales" button icon
Replace `<PhoneCall />` with inline SVG using `svgHero.p2da76dc0` (headset/customer-service icon), `34×34` container, fill white.

### "Explore Services" button icon
Replace `<Search />` with inline SVG using `svgHero.p20ea56c0` (search-eye icon), `26×26` container, fill `#FCFCFD`.

### Security badge icons
| Badge | Current | New |
|---|---|---|
| PCI DSS Level 1 | `<Shield />` Lucide | SVG `svgHero.p10028c00` (shield-keyhole), fill `#D4F291` |
| 256-bit Encryption | `<Zap />` Lucide | SVG `svgHero.pf91ff00` (flashlight/bolt), fill `#D4F291` |
| ISO 27001 Certified | `<Shield />` + "SSL Certified" text | SVG `svgHero.p384ab480` (shield-check), fill `#D4F291` + fix label |

All security icon containers are `30×30` matching the Figma.

---

## Background Beams

Keep the existing three cyan beam divs. No changes needed — they already approximate the Figma's `Group` component beam effect.

---

## Text / Typography

No changes to text content. Current values already match the Figma:
- Headline: "Payments that / Power the World" ✓
- Subtext: same wording ✓
- Button labels: "Talk to Sales" / "Explore Services" ✓

---

## Verification

1. Visit `http://localhost:5173/` and check:
   - Hero background is flat dark `#001c26` — no gradient tint
   - Globe image is on the right, text is clearly on the left with visible air between them at 1280px+ viewport
   - All three button/badge icons show the custom SVG shapes (shield with checkmark, headset, search-eye, etc.) — **not** Lucide icons
   - Third security badge reads "ISO 27001 Certified"
2. Resize to mobile (< 1280px): image hides, text fills full width
