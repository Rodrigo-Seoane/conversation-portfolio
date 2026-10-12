# Component: List Item With Icon (atom)

<!-- Follows the component template established in Button.md (10 sections).
     This is a reusable ATOM used by Services Cards, Pricing Card, and anywhere a
     checked feature/benefit row appears. -->

> **Source of truth:** Figma `SQxK0aLPYfOCGVCUUnjzm6` ("RS 2026 | Design System"), dedicated page
> "List Item with Icon" (page `51:485`; component frame `48:629`). Values extracted, not inferred.
> Applies `Design.md` Context tokens.
> Note: code shows "Mona Sans" — export artifact; body font is **Inter** (`Design.md` §3).

---

## 1. Purpose & when to use

A single icon + text row — a checked feature/benefit line. Reused wherever a list of features,
inclusions, or benefits appears (Services Cards, Pricing Card, and future benefit lists). It's an
**atom**: compose several into a feature list; don't rebuild the row inline.

---

## 2. Anatomy

```
✓  Feature text goes here…
   16px CheckCircle icon + text, gap Scale/2 (8)
```

- **Icon** — CheckCircle, 16×16, colored by Type (see §3/§4).
- **Text** — Body/Large (16/24), `Body/Content/Primary`.
- **Alignment** — set by Content Size (see §3): center for one line, top for multi-line.

---

## 3. Variants

Two axes: **Type × Content Size**.

| Axis | Options |
|---|---|
| **Type** | Accent (orange icon) · Primary (gold icon) · Secondary (neutral icon) |
| **Content Size** | 1 Line · 2+ Lines |

**Content Size is the recent change** — it controls vertical alignment of the icon to the text:
- **1 Line:** `items-center` — icon vertically centered with the single text line.
- **2+ Lines:** `items-start` — icon aligns to the **top**, next to the first line of wrapping text.

Pick Content Size to match whether the row's text wraps. (An implementation may also derive this
automatically, but the design exposes it as an explicit variant.)

---

## 4. Tokens used (Context layer — see `Design.md` §2)

| Property | Token |
|---|---|
| Text | `Body/Content/Primary` (`#151612`) |
| Icon — Accent | orange (`Body/Content/Accent` / Content Action/Auxiliary) |
| Icon — Primary | gold (Content Action/Primary) |
| Icon — Secondary | neutral (Content Action/Secondary) |
| Gap (icon↔text) | Scale/2 (8) |
| Icon size | 16×16 |
| Text style | Body/Large (16/24) |
| Alignment | 1 Line → items-center · 2+ Lines → items-start |

> The Type (icon color) is what animates in card hovers: cards swap Accent → Primary on hover
> (see `ServicesCards.md` / `PricingCard.md`).

---

## 5. Props / API (proposed — confirm at implementation)

```ts
type ListItemWithIconProps = {
  type?: "accent" | "primary" | "secondary";   // icon color; default "accent"
  children: string;                              // the row text
  multiline?: boolean;                           // true → items-start (2+ lines); default auto/false
  icon?: IconName;                               // default CheckCircle
};
```

Consider deriving `multiline` from actual wrapping rather than a manual prop, but keep the two
alignment behaviors exactly as the design specifies.

---

## 6. Behaviour & states

No interactive states of its own. Its **Type** (icon color) is controlled by the parent — e.g. card
hover flips Accent→Primary across all rows at once.

---

## 7. Content rules

- One benefit/feature per row, parallel phrasing.
- Keep the icon meaning consistent — CheckCircle = included/positive. Don't mix in other icons
  without a reason.
- Match Content Size to the real text length so alignment reads correctly.

---

## 8. Accessibility

- The icon is decorative (the text carries meaning) → `aria-hidden`.
- If a list of these represents "what's included", wrap them in a real `<ul>`/`<li>` for structure.
- Icon color alone must not carry meaning — the text does.

---

## 9. Never do (component-specific)

- **Never** rebuild this row inline in a card — compose this atom (single source for alignment + color).
- **Never** use `items-center` for wrapping (2+ line) text — the icon must top-align to the first line.
- **Never** hardcode the icon color — it comes from Type (which parents animate on hover).
- **Never** hardcode the gap — use Scale/2.

---

## 10. Figma reference

- File: `SQxK0aLPYfOCGVCUUnjzm6`, dedicated page "List Item with Icon" (page `51:485`; frame `48:629`).
- Symbols: Accent 1 Line (`48:1247`) / 2+ Lines (`48:628`); Primary 1 Line (`48:1250`) / 2+ Lines
  (`48:627`); Secondary 1 Line (`48:1253`) / 2+ Lines (`48:626`).
- Used by: Services Cards, Pricing Card.

---

## Open items
- [ ] Confirm exact icon-color tokens per Type (Accent/Primary/Secondary) at implementation.
- [ ] Decide whether `multiline` is a prop or auto-detected in code (design exposes it as a variant).
