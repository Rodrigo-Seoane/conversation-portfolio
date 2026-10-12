# Component: Badge

<!--
═══════════════════════════════════════════════════════════════════════════
  Follows the component template established in Button.md (10 sections).
═══════════════════════════════════════════════════════════════════════════
-->

> **Source of truth:** Figma `SQxK0aLPYfOCGVCUUnjzm6` ("RS 2026 | Design System"), page "Badges"
> (node `19:239`). Values extracted, not inferred. Applies `Design.md` tokens.

---

## 1. Purpose & when to use

A small pill for **status, category, or tag** labels. On this site: case-study tags ("AI & SaaS",
"Optimization"), article categories, and any short status marker.

- **Type = meaning:** Success / Info / Warning / Error carry state meaning; **Secondary** is the
  neutral (default) for non-state tags like case categories.
- Not interactive by default — it's a label, not a button. If a tag needs to filter, that's the
  Filter Tags component, not Badge.

---

## 2. Anatomy

```
┌───────────────────────────┐
│ [icon]  BADGE LABEL  [icon]│   pill
└───────────────────────────┘
   min-height 20px
   padding: Scale/3 (12) horizontal · Scale/1 (4) vertical
   gap (icon↔text): Scale/2 (8)
   radius: Scale/3 (12) — fully rounded pill
```

- **Icon** — optional, 12×12, independent left/right toggles. Defaults CheckCircle (left) / XCircle (right).
- **Text** — Caption/Regular: 10px, SemiBold (600), line-height 12, letter-spacing 4 (~0.4px).

---

## 3. Variants

Matrix: **Type × Color Value** = 5 × 6 = 30.

| Axis | Options |
|---|---|
| **Type** | Info · Success · Warning · Error · Secondary |
| **Color Value** | 100 · 200 · 300 · 400 · 500 · 600 (ramp step of the type's family) |

---

## 4. Tokens used (semantic roles only)

**The pattern:** Type picks the color *family*; Color Value picks the *step*; text is always dark.

| Type | Background family | Example (value 100) |
|---|---|---|
| Info | Accent Colors/Info | `#…` (Info ramp) |
| Success | Accent Colors/Success | `#DDF4D2` |
| Warning | Accent Colors/Warning | `#…` (Warning ramp) |
| Error | Accent Colors/Error | `#…` (Error ramp) |
| Secondary | Content Action/Secondary | `#DFE0DE` |

| Property | Token |
|---|---|
| Background | `{type family}/{colorValue}` (e.g. Accent Colors/Success/100) |
| Text | **always** Content Action/Secondary/700 (`#151612`) |
| Padding X | Scale/3 (12) |
| Padding Y | Scale/1 (4) |
| Gap | Scale/2 (8) |
| Radius | Scale/3 (12) |
| Text style | Caption/Regular (10/12, SemiBold, ls 4) |
| Icon | 12×12 |

> Text is dark (`Secondary/700`) across all types/values because badge backgrounds stay in the light-
> to-mid range (100–600). Verify contrast if using value 600 (darkest) with a saturated family.

---

## 5. Props / API (proposed — confirm at implementation)

```ts
type BadgeProps = {
  type?: "info" | "success" | "warning" | "error" | "secondary";  // default "secondary"
  colorValue?: "100" | "200" | "300" | "400" | "500" | "600";     // default "100"
  showLeftIcon?: boolean;    // default false
  showRightIcon?: boolean;   // default false
  icon?: IconName;           // 12×12
  children: string;          // the label
};
```

---

## 6. Behaviour & states

Static label — no hover/active/disabled states (unlike Button). If interactivity is needed, use
Filter Tags instead.

---

## 7. Content rules

- Short: 1–2 words. It's a tag, not a sentence.
- Caption style is small — keep labels legible, avoid long strings that wrap.
- Case tags use **Secondary** (neutral); reserve Success/Warning/Error/Info for genuine state meaning.

---

## 8. Accessibility

- Decorative icon → `aria-hidden`; the text carries the meaning.
- Don't rely on color alone: a Success/Error badge must also read clearly as text (the label says
  what it means), since the color families are the only visual differentiator.
- Verify contrast of dark text on the chosen family/value, especially higher values (500–600).

---

## 9. Never do (component-specific)

- **Never** use a state Type (Success/Warning/Error/Info) for a non-state tag just for its color —
  use Secondary for neutral categories. State colors must mean state.
- **Never** put light text on a Badge — text is always Content Action/Secondary/700.
- **Never** make a Badge clickable/interactive — that's Filter Tags' job.
- **Never** hardcode the pill radius or padding — use Scale tokens.
- **Never** use body type for the label — it's Caption/Regular.

---

## 10. Figma reference

- File: `SQxK0aLPYfOCGVCUUnjzm6`, page "Badges" (node `19:239`), frame Badge (`25:3288`).
- Symbols extracted: Secondary/100 (`25:3267`), Success/100 (`25:3278`).

---

## Open items
- [ ] Pull exact hex per family/value if needed at implementation (ramps are in figma-export.json).
- [ ] Confirm default icon behaviour (icons shown by default in Figma; likely off by default in code).
