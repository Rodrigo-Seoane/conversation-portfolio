# Component: Button

<!--
═══════════════════════════════════════════════════════════════════════════
  TEMPLATE — every component doc in components/ follows this exact structure.
  Copy this file, keep the section headings, replace the content.
  Sections, in order:
    1. Purpose & when to use
    2. Anatomy
    3. Variants (the full matrix)
    4. Tokens used (ties to Design.md — semantic roles only)
    5. Props / API
    6. Behaviour & states
    7. Content rules
    8. Accessibility
    9. Never do (component-specific anti-patterns)
   10. Figma reference
  Keep "Never do" concrete and specific — it's what stops production drift.
═══════════════════════════════════════════════════════════════════════════
-->

> **Source of truth:** Figma `SQxK0aLPYfOCGVCUUnjzm6` ("RS 2026 | Design System"), page "Button"
> (node `19:221`). Values extracted, not inferred. Applies `Design.md` tokens.

---

## 1. Purpose & when to use

The primary action control. Carries the conversion paths named in `CLAUDE.md` §2 — treat as
load-bearing, not decoration.

**Size — pick by prominence (default: Medium):**
- **Large** (64px) — the main CTA of a view / hero actions.
- **Medium** (48px) — the default for most cases. Use unless there's a reason not to.
- **Small** (28px) — dense areas, inline, compact UI.

**Type — pick by emphasis (highest → lowest):**
1. **Primary** — the single most important action in a view.
2. **Secondary** — an alternative action alongside a primary.
3. **Only Text** — low-emphasis action, no background (a text button).
4. **No Padding** — lowest emphasis: an inline link inside body text (no padding, sits in the text flow).
- **Destructive** — *not* a hierarchy level: use for destructive actions (delete, remove) regardless
  of emphasis. Signals danger.

**Theme — pick by the surface the button sits on:**
- **Light** — for buttons on a light surface.
- **Dark** — for buttons on a dark surface (e.g. the Surface/Secondary hero).

At most **one Primary button per view/section** (`Design.md` §1, "one emphasis per section").

---

## 2. Anatomy

```
┌─────────────────────────────────┐
│  [icon]   Button Text   [icon]  │   ← optional left icon + text + optional right icon
└─────────────────────────────────┘
   height: 64 (Large) / 48 (Medium) / 28 (Small)
   padding: Spacing/large (24) horizontal · Spacing/small (8) vertical
   radius: Spacing/xs = Scale/1 (4)
   text container: additional 16px horizontal padding
```

- **Icon** — optional, 24×24, from the Icon Family. Independent left/right toggles (`showLeftIcon`,
  `showRightIcon`) — both, one, or none.
- **Text** — Body Extra Large, SemiBold (600), 18/28.
- **No Padding** type: no padding, no fixed height — it's inline text (16px line box).

---

## 3. Variants

Full matrix: **size × type × state × theme**.

| Axis | Options |
|---|---|
| **size** | Large (64) · Medium (48) · Small (28) |
| **type** | Primary · Secondary · Destructive · Only Text · No Padding |
| **state** | Default · Hover · Active · Disabled |
| **theme** | Light · Dark |

Not every type ships every theme: Primary, Only Text, and No Padding have explicit Light **and** Dark;
Secondary and Destructive are defined on Light (confirm dark handling in Figma before using them on a
dark surface).

---

## 4. Tokens used (semantic roles only — see `Design.md` §2 / §4)

Colors reference the new **Semantic** collection (Content Action + Accent Colors). The dark used
throughout is `Content Action/Secondary/700` (`#151612`) — the reconciled dark (see `Design.md` §2).

**Backgrounds & text by type (Large, Default state):**

| Type | Background | Text |
|---|---|---|
| Primary / Light (on light bg) | Content Action/Secondary/700 (`#151612`) | Content Action/Primary/Default (`#FFD115`) |
| Primary / Dark (on dark bg) | Content Action/Primary/Default (`#FFD115`) | Content Action/Secondary/700 (`#151612`) |
| Secondary | Content Action/Auxiliary/Default (`#EF8C48`, orange) | Content Action/Secondary/700 (`#151612`) |
| Destructive | Accent Colors/Error/Default (`#EF2056`, red) | Content Action/Secondary/700 (`#151612`) |
| Only Text | none (transparent) | Content Action/Secondary/Default (`#686B63`, muted) |
| No Padding | none (transparent, inline) | Content Action/Secondary/Default (`#686B63`, muted) |

**Shared structural tokens:**

| Property | Token |
|---|---|
| Padding X (except No Padding) | Spacing/large (24) |
| Padding Y (except No Padding) | Spacing/small (8) |
| Radius | Spacing/xs = Scale/1 (4) |
| Text style | Body Extra Large SemiBold (18/28, weight 600) |
| Icon size | 24px (No Padding: 16px) |

> **No Padding specifics:** padding `Scale/0` (0), `min-height 16px`, no fixed height, 16px icon — it's
> an inline text link, not a boxed button.

**State pattern (extracted from Primary; confirm the analogous step per other types):**
- **Default:** fill only, no border.
- **Hover:** background lightens one ramp step — Primary `Secondary/700` (`#151612`) →
  `Secondary/500` (`#383C31`); text unchanged.
- **Active:** returns to the dark fill **and adds a 1px border** (`Border Thick/small`) — Primary/Active
  border is gold (`Content Action/Primary/Default`); Secondary/Active border is dark (`Secondary/700`).
- **Disabled:** muted Content Action/Secondary steps (confirm exact step in Figma).

> Always reference the semantic token, never the raw hex. The hex only identifies the role.

---

## 5. Props / API (proposed — confirm at implementation)

```ts
type ButtonProps = {
  size?: "large" | "medium" | "small";                 // default "medium"
  type?: "primary" | "secondary" | "destructive"
       | "onlyText" | "noPadding";                      // default "primary"
  theme?: "light" | "dark";                             // default "light"; pick by surface
  showLeftIcon?: boolean;                               // default false
  showRightIcon?: boolean;                              // default false
  icon?: IconName;                                      // from Icon Family, 24×24
  disabled?: boolean;
  children: string;                                     // the button label
  // + onClick or href for link-buttons
};
```

---

## 6. Behaviour & states

Four states per variant: **Default · Hover · Active · Disabled**.
- **Hover / Active:** confirm exact token shifts from Figma per type before implementing.
- **Disabled:** use `Content/Disable` roles; not clickable (no hover, `cursor: not-allowed`,
  `aria-disabled`).
- **Theme is chosen by surface, not state** — a button on the dark hero uses `theme="dark"`.

---

## 7. Content rules

- Label says exactly what happens: "Book a discovery call", "Explore work" — active voice, sentence
  case, no filler.
- Same wording through the flow (a "Book a call" button leads to a "Book a call" screen).
- ~1–3 words; never a full sentence (except No Padding, which is an inline text link and may sit mid-sentence).

---

## 8. Accessibility

- Real `<button>` or `<a>` — never a clickable `<div>`.
- Visible keyboard focus state (required, `Design.md` §5).
- Icon paired with text is decorative → `aria-hidden`; icon-only needs `aria-label`.
- Disabled uses `aria-disabled`, not just styling.
- **Contrast:** Primary inverts by theme so text always contrasts its own background — but verify any
  button placed on Surface/Primary (yellow) or Accent (orange) uses a dark foreground (`Design.md` §5).
- Destructive must not rely on color alone — pair with a clear label/icon.

---

## 9. Never do (component-specific)

- **Never** put more than one Primary button in a single view/section.
- **Never** use `theme="light"` on a dark surface (or vice-versa) — the inversion breaks and contrast fails.
- **Never** use Destructive for non-destructive actions to "add color" — it signals danger only.
- **Never** use No Padding as a standalone CTA — it's an inline text link; use Only Text or higher for buttons.
- **Never** render a button as a `<div>` with onClick.
- **Never** hardcode the dark hex (`#151612`/`#1A1502`/`#2E5E5E`) — use `content-action/secondary`.
- **Never** hardcode padding/radius px — use the Spacing/Scale tokens.

---

## 10. Figma reference

- File: `SQxK0aLPYfOCGVCUUnjzm6` ("RS 2026 | Design System"), page "Button" (node `19:221`).
- Frames: Button/Large (`21:150325`), Button/Medium (`22:108`), Button/Small (`24:466`).
- Symbols extracted: Primary/Default/Light (`21:150324`), Primary/Default/Dark (`21:150303`).

---

## Open items
- [x] ~~Token roles for Secondary, Destructive, Only Text, No Padding~~ — all extracted (§4).
- [x] ~~Reconcile the dark hex~~ — `#151612` = Content Action/Secondary/700 (`Design.md` §2).
- [x] ~~Confirm body font~~ — Plus Jakarta + Inter.
- [x] ~~Hover + Active state pattern~~ — Hover lightens ramp (700→500); Active adds 1px border (§4).
- [ ] Confirm the exact Disabled step per type (pattern is muted Secondary ramp; step not yet pulled).
- [ ] Confirm Secondary/Destructive Dark-theme versions (Primary/Only Text/No Padding have explicit Dark).
