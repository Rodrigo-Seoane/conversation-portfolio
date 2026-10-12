# Component: Metric Tile

<!-- Follows the component template established in Button.md (10 sections). -->

> **Source of truth:** Figma `SQxK0aLPYfOCGVCUUnjzm6` ("RS 2026 | Design System"), page "Metric Tile"
> (node `19:241`). Values extracted, not inferred. Applies `Design.md` Context tokens.
> Note: code shows "Mona Sans" — export artifact; body font is **Inter** (`Design.md` §3).

---

## 1. Purpose & when to use

Displays a single proof metric — a big number (or icon) plus a title and short description. This is
the site's core "proof over decoration" unit (`Design.md` §1, `CLAUDE.md` §3): case-study outcomes
like "+120% internal recognition". Used in case studies and featured cases on the Home.

Composed of an atom **`.MetricValue`** (the highlighted number/icon) wrapped with a text block
(title + description).

---

## 2. Anatomy

```
┌──────────────────────────────┐
│  ┌─────────┐                  │   .MetricValue (the number, optionally on a colored chip)
│  │ 120 %   │                  │
│  └─────────┘                  │
│  INTERNAL RECOGNITION         │   Title (uppercase, extrabold)
│  Won awards for innovation…   │   Description
└──────────────────────────────┘
   tile padding: Scale/4 (16) · gap Scale/6 (24) · radius Scale/2 (8)
   text block gap: Scale/3 (12)
```

- **.MetricValue** — number in Heading/H1 (28, Plus Jakarta SemiBold) + unit (%) in Body/Large.
  Optional colored chip behind it (Golden/Orange) with padding Scale/2, radius Scale/1.
- **Title** — Body/Regular ExtraBold (14, weight 800), UPPERCASE, letter-spacing Scale/0.25 (1px).
- **Description** — Body/Regular (14/20).

---

## 3. Variants

Three axes × two orientations:

| Axis | Options |
|---|---|
| **Orientation** | Vertical · Horizontal |
| **Type** | Numeric · Icon (the MetricValue is a number or an icon) |
| **Metric Value** (chip behind number) | Golden · Orange · Transparent |
| **Background** (tile container) | Primary (gold) · Secondary (dark) · Featured (cream) · Transparent |

Common combos: Featured bg + Golden chip (prominent); Transparent bg + Transparent chip (clean, text-only).

**Orientation layout difference:**
- **Vertical** — `flex-col`: MetricValue chip stacked above the text block.
- **Horizontal** — `flex row`: chip beside the text block (text gets `flex-1` to fill).

**Icon-type chip sizing differs by orientation (important):**
- **Vertical / Icon:** chip `min-width 72px` (rectangular, 72×48).
- **Horizontal / Icon:** chip `min-width 48px` (square, 48×48).
- The icon itself is **32×32 in both**; only the chip's min-width changes.
- Chip padding: `Spacing/xs` (4) vertical; radius `Spacing/xs` (4).

---

## 4. Tokens used (Context layer — see `Design.md` §2)

| Property | Token |
|---|---|
| Tile bg — Featured | `Surfaces/Section/Featured` (`#FFF6D0`) |
| Tile bg — Primary | `Surfaces/Section/Primary` (`#FFD115`) |
| Tile bg — Secondary | `Surfaces/Section/Secondary` (`#383C31`) |
| Tile bg — Transparent | none |
| MetricValue chip — Golden | `Surfaces/Section/Primary` (`#FFD115`), text dark |
| MetricValue chip — Orange | `Surfaces/Action/Secondary/light` (`#EF8C48`), text dark |
| Text on light bg (Featured/Primary/Transparent) | `Body/Content/Primary` (`#151612`) |
| Text on dark bg (Secondary) | `Body/Content/Secondary` (`#F7F7F7`, light) |
| Tile padding | Scale/4 (16) |
| Tile gap | Scale/6 (24) |
| Tile radius | Scale/2 (8) |
| Text block gap | Scale/3 (12) |
| Number style | Heading/H1 (28/36) + unit Body/Large (16) |
| Icon size (Icon type) | 32×32 (both orientations) |
| Icon chip min-width | 72 (Vertical) · 48 (Horizontal) |
| Title style | Body/Regular ExtraBold (14, uppercase, ls Scale/0.25) |
| Description style | Body/Regular (14/20) |

> **Dark-bg text pairing (confirmed):** on Secondary (dark `#383C31`) background, title and description
> switch to `Body/Content/Secondary` (`#F7F7F7`, light). The Golden/Orange chip keeps dark text
> regardless, because the chip itself is a light color.

---

## 5. Props / API (proposed — confirm at implementation)

```ts
type MetricTileProps = {
  orientation?: "vertical" | "horizontal";        // default "vertical"
  type?: "numeric" | "icon";                       // default "numeric"
  value: string;                                   // "120", or icon name if type="icon"
  unit?: string;                                   // "%", "x", etc.
  chip?: "golden" | "orange" | "transparent";      // MetricValue background; default "transparent"
  background?: "primary" | "secondary" | "featured" | "transparent";  // default "transparent"
  title: string;                                   // uppercased by style
  description?: string;
};
```

In production, values come from the Case Studies Notion DB (metrics sub-list).

---

## 6. Behaviour & states

Static display component — no interactive states.

---

## 7. Content rules

- The number is the hero — keep it short and punchy ("+120%", "3x", "−40%").
- Title: 1–4 words, it's a label. It renders uppercase — don't type it uppercase in the CMS, let the
  style handle it.
- Description: one line of context, not a paragraph.
- Only use real, verifiable metrics (`CLAUDE.md`: no fabricated metrics).

---

## 8. Accessibility

- The number + unit should read as one value to assistive tech (group them).
- Don't rely on chip color for meaning — the number and label carry it.
- On colored backgrounds, verify text contrast (esp. Secondary dark bg needs light text).

---

## 9. Never do (component-specific)

- **Never** put light text on Featured/Primary (cream/gold) backgrounds — use `Body/Content/Primary`
  (dark). On Secondary (dark) use `Body/Content/Secondary` (light).
- **Never** fabricate or round metrics misleadingly — proof must be real (`CLAUDE.md`).
- **Never** type the title in uppercase in the CMS — the style uppercases it.
- **Never** hardcode padding/radius/colors — use Scale + Context tokens.
- **Never** let the description grow into a paragraph — it's a one-liner.

---

## 10. Figma reference

- File: `SQxK0aLPYfOCGVCUUnjzm6`, page "Metric Tile" (node `19:241`).
- Atom: `.MetricValue` (`46:330`). Vertical (`46:638`), Horizontal (`46:708`).
- Symbols extracted: Vertical/Numeric/Golden/Primary (`46:637`), Vertical/Transparent (`46:635`).

---

## Open items
- [x] ~~Orange chip token~~ — `Surfaces/Action/Secondary/light` (`#EF8C48`).
- [x] ~~Light text for Secondary dark bg~~ — `Body/Content/Secondary` (`#F7F7F7`).
- [x] ~~Icon-type sizing~~ — icon 32×32 both; chip min-width 72 (Vertical) / 48 (Horizontal).

_All items resolved. Component fully documented._
