# Component: Pricing Card

<!-- Follows the component template established in Button.md (10 sections). -->

> **Source of truth:** Figma `SQxK0aLPYfOCGVCUUnjzm6` ("RS 2026 | Design System"), page "Pricing Cards"
> (node `51:406`). Values extracted, not inferred. Applies `Design.md` Context tokens.
> Note: code shows "Mona Sans" — export artifact; fonts are Plus Jakarta (heading) + Inter (body).

---

## 1. Purpose & when to use

The productized-offer cards (e.g. UX Audit packages) with a fixed price. Sibling of **Services Cards** —
same layout skeleton, plus a **price** and (for Best Deal) a highlight badge. Drives "Request your
estimate" (day-rate model, `CLAUDE.md`).

Composes two documented components: **Badge** (the "Best Deal" flag) and **Button** (the CTA), and the
**List Item With Icon** atom (feature rows).

---

## 2. Anatomy

```
        ┌── Badge "Best Deal" (Best Deal type only, overlaps top edge) ──┐
┌───────────────────────────┐
│  3-5 BUSINESS DAYS        │  duration eyebrow (Caption Large, orange, uppercase)
│  UX Audit Essentials      │  title (H1)
│  Ideal For: Startups…     │  "Ideal For:" (bold) + text
│                           │
│         €490              │  price (Plus Jakarta SemiBold 54, leading 1.1)
│                           │
│  ✓ Heuristic analysis…    │  feature list (List Item With Icon × N)
│  ✓ Conversion leak…       │
│  ✓ …                      │
│  [ Request your estimate ]│  Button/Large (Primary)
└───────────────────────────┘
   bg Surfaces/Section/Featured (cream) · bottom border 4px · radius 8 · px24 py40 gap32
```

Structurally the same shell as Services Cards, with a **Price** block inserted between the header and
the feature list.

---

## 3. Variants

| Axis | Options |
|---|---|
| **Type** | Default · Best Deal |
| **State** | Default · Hover |

**Best Deal differences:** a "Best Deal" **Badge** overlapping the top edge (Accent Colors/Warning,
dark text); slightly taller; often one extra (bolded) feature; whole card is a `<button>` (clickable).

---

## 4. Tokens used (Context layer — see `Design.md` §2)

| Property | Token |
|---|---|
| Card bg — Default | `Surfaces/Section/Featured` (`#FFF6D0`, cream) |
| Card bg — Hover | `Surfaces/Section/Form Field` (`#F7F7F7`, white) |
| Bottom border | `Body/Content/Auxiliary` (`#383C31`), 4px |
| Duration eyebrow | `Body/Content/Accent` (orange) — Caption/Large |
| Title | Heading/H1 (28/36) |
| Price | Plus Jakarta SemiBold, 54px, leading 1.1 — color `Body/Content/Primary` (`#151612`) |
| Feature text | Body/Large (16/24) |
| "Best Deal" badge | Badge component — `Accent Colors/Warning/Default` (`#EAA93C`) bg, dark text |
| CTA | Button/Large Primary |
| Padding / gap / radius | px24 · py section-padding/small (40) · gap Scale/8 (32) · radius Spacing/small (8) |

> ✅ **Price color (fixed in Figma, confirmed 09-11):** the price is bound to `Body/Content/Primary`
> (`#151612`), consistent with all other text. Re-checked node `51:406` via `get_design_context` /
> `get_variable_defs` — all four variants (Default/Best Deal × Default/Hover) now render the price
> with `--body/content/primary,#151612`; the old off-system `#21272A` is gone. Docs and Figma agree.

---

## 5. Props / API (proposed — confirm at implementation)

```ts
type PricingCardProps = {
  type?: "default" | "best-deal";        // default "default"
  duration: string;                       // "3-5 business days"
  title: string;                          // "UX Audit Essentials"
  idealFor: string;
  price: string;                          // "€490"
  features: string[];                     // → List Item With Icon rows
  badgeLabel?: string;                    // "Best Deal" (best-deal type)
  ctaLabel?: string;                      // default "Request your estimate"
  ctaHref: string;
};
```

---

## 6. Behaviour & states — animation

Same hover transition as Services Cards (the card family shares it):

| Property | Default | Hover |
|---|---|---|
| Card background | cream (`Surfaces/Section/Featured`) | white (`Surfaces/Section/Form Field`) |
| Feature check icons | orange (Accent) | gold (Primary) |

- **Timing: `ease-out`, `200ms`** (system default motion — `Design.md` §4 Motion). Color-only, no lift.
- Best Deal card is itself a `<button>` — the whole card is clickable (confirm intended vs CTA-only).

---

## 7. Content rules

- Real prices, clearly formatted with currency ("€490", "€1,490").
- Duration eyebrow = turnaround time, uppercase (don't uppercase in source).
- Feature lists: parallel phrasing; "Best Deal" can lead with "Everything in [lower tier]" then add-ons.
- Keep to the day-rate/estimate framing — the CTA is "Request your estimate", not "Subscribe" (`CLAUDE.md`).
- Use "Best Deal" badge sparingly — one highlighted tier only.

---

## 8. Accessibility

- If the whole card is a `<button>`/link, don't nest the CTA as a second focusable target — pick one
  interaction model (whole-card OR button), don't duplicate.
- Badge text ("Best Deal") must be real text, not an image.
- Feature checks decorative → `aria-hidden`.
- Price must be readable text (not an image) for screen readers and SEO.

---

## 9. Never do (component-specific)

- **Never** hardcode `#21272A` for the price — use `Body/Content/Primary` (the decided token).
- **Never** frame pricing as a subscription — day-rate/estimate model (`CLAUDE.md`).
- **Never** add a lift/shadow on hover — color-only, like Services Cards.
- **Never** hardcode cream/white bg or check colors — use Context tokens + the List Item atom.
- **Never** show multiple "Best Deal" badges — defeats the highlight.

---

## 10. Figma reference

- File: `SQxK0aLPYfOCGVCUUnjzm6`, page "Pricing Cards" (node `51:406`).
- Symbols: Default/Default (`51:405`), Default/Hover (`51:404`), Best Deal/Default (`51:403`),
  Best Deal/Hover (`51:402`).
- Composes: Badge (`Best Deal`), Button/Large, List Item With Icon atom (see `ListItemWithIcon.md`;
  use its Content Size variant — 1 Line vs 2+ Lines — per feature row).

---

## Open items
- [x] ~~Price color~~ — fixed in Figma and confirmed (09-11): bound to `Body/Content/Primary`
      (`#151612`) on all four variants. Use the token in code.
- [ ] Confirm whole-card-clickable (Best Deal is a `<button>`) vs CTA-only interaction.
- [ ] Confirm Best Deal badge exact placement token (overlaps top, left ~158px in the 410 card).
