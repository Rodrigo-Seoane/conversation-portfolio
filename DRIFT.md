# DRIFT.md — fixes applied when mirroring the design system into this repo

> **Purpose:** this repo's copy of the design system (`Design.md`, `styles/tokens.css`,
> `components/ui/*.tsx`, `app/globals.css`) was mirrored from `rodrigoseoane-2026` @
> `aae5036a2d7f20c8a378e6a6298b85dcb36384a6` (2026-10-12). The kickoff brief listed seven known
> drifts between `tokens.css`/components and `Design.md` to fix on import. This file logs exactly
> what changed, so the same fixes can be backported to `rodrigoseoane-2026` (which is read-only for
> this project — nothing there was modified).

---

## 1. Body paragraph spacing — removed `margin-bottom: var(--scale-3)`

**Was:** `styles/tokens.css` — `.type-body-xl/lg/md/sm/xs` each had `margin-bottom: var(--scale-3)`.
**Problem:** `Design.md` §3 (the 12-09 export correction) says body paragraph spacing is **0px** —
every Paragraph/Body role reports 0px in the Figma export. Only Headings carry non-zero paragraph
spacing.
**Fix:** removed `margin-bottom` from all five `.type-body-*` classes in this repo's
`styles/tokens.css`. Vertical rhythm between paragraphs should come from section/component spacing
or an explicit margin, not a type-role default.
**Backport:** remove the same five `margin-bottom` declarations in
`rodrigoseoane-2026/styles/tokens.css`.

## 2. Missing ExtraBold (800) weight token — added

**Was:** `styles/tokens.css` only defined `--font-weight-light/regular/semibold/bold` (300/400/600/700).
**Problem:** `Design.md` §3 specifies ExtraBold **800** (the body eyebrow/label variant used by, e.g.,
`MetricTile`'s title and `TestimonialCard`'s role label) — there was no CSS var for it at all.
**Fix:** added `--font-weight-extrabold: 800;` to this repo's `styles/tokens.css`. Also set Inter's
`next/font` `weight` array to include `"800"` in `app/layout.tsx` (loading the 800 font file is
required for the weight to render as drawn, not faked-bold by the browser).
**Backport:** add the same var to `rodrigoseoane-2026/styles/tokens.css`, and `"800"` to Inter's
weight array in its `app/layout.tsx`.

## 3. Missing Scale steps — added 2.5, 3.5, 7, 9, 11, 13, 14, 15

**Was:** `styles/tokens.css`'s Scale layer had: 0, 0.25, 0.5, 1, 2, 3, 4, 4.5, 5, 6, 8, 10, 12, 16,
20, 24, 30, 36.
**Problem:** `Design.md` §4 lists a fuller Scale, including 2.5 (10px), 3.5 (14px), 7 (28px), 9
(36px), 11 (44px), 13 (52px), 14 (56px), and 15 (60px) — none of these existed as CSS vars.
**Fix:** added `--scale-2-5`, `--scale-3-5`, `--scale-7`, `--scale-9`, `--scale-11`, `--scale-13`,
`--scale-14`, `--scale-15` to this repo's `styles/tokens.css` (values per Design.md §4's base-4
table). `--scale-7` (28px) and `--scale-2-5`/`--scale-4-5` turned out to be exactly what `Button.tsx`
needed to replace its arbitrary px (see #5).
**Backport:** add the same eight vars to `rodrigoseoane-2026/styles/tokens.css`.

## 4. Invented radius/border names — renamed to the real Figma names

**Was:** `styles/tokens.css` used invented names: `--radius-none/xs/sm/md/lg/xl/round` and
`--border-none/xs/sm/md/lg/xl` — the latter had a duplicate (`xs` and `sm` both mapped to 1px).
**Problem:** `Design.md` §4 documents the real Figma names: `Round Corners/None|x-small|small|
regular|large|x-large|round` and `Border Thick/None|small|regular|large|x-large` — a 5-step scale,
not 6, and not the names used in code.
**Fix:** renamed in this repo's `styles/tokens.css`:
  - Radius: `xs→x-small` (2px), `sm→small` (4px), `md→regular` (8px), `lg→large` (12px),
    `xl→x-large` (16px); `none` and `round` unchanged.
  - Border: `xs`/`sm` (both 1px, duplicate) collapsed into one `small` (1px); `md→regular` (2px),
    `lg→large` (4px), `xl→x-large` (8px); `none` unchanged.
  Because Tailwind v4 auto-generates utilities from `@theme inline` var names (`--radius-foo` →
  `rounded-foo`), every component that used the old utility classes had to be updated too, or it
  would have silently fallen back to Tailwind's *default* (unrelated) radius scale instead of
  erroring. Updated: `Button.tsx`, `MetricTile.tsx`, `PricingCard.tsx`, `TestimonialCard.tsx`,
  `Input.tsx` — `rounded-md`→`rounded-regular`, `rounded-sm`→`rounded-small` throughout (same pixel
  values, new names only; `rounded-full`/`rounded-none`, which are Tailwind's own native utilities,
  were left alone). `app/globals.css`'s `:focus-visible` rule and the new dual-ring halo (#6) also
  reference the renamed `--border-regular`.
  Also updated one illustrative example in `Design.md`'s §4 implementation note that still showed
  the invented `--radius-md` name, to `--radius-small` — consistency only, not a rule change.
**Backport:** same renames in `rodrigoseoane-2026/styles/tokens.css`, plus the same
class-name updates in every component there that references `rounded-md`/`rounded-sm` (a wider set
than the eight components copied into this repo — audit the full `components/ui/` and `sections/`
trees there before renaming the vars, or those components will silently regress to Tailwind's
default radius scale).

## 5. Action-token gap — left open, not invented

**Status:** `Design.md` §2 documents an open gap: the exported Context collection has no
`Surfaces/Action/*` or `Body/On Action/*` tokens, despite being referenced in several component
docs. Per the brief, this repo does **not** invent those Context entries or add provisional CSS vars
for them.
**Note:** none of the eight components copied into this repo (`Button`, `Badge`, `MetricTile`,
`ListItemWithIcon`, `PricingCard`, `TestimonialCard`, `Input`, `BrandIcon`) actually reference a
`Surfaces/Action/*` or `Body/On Action/*` token in code — `Button.tsx`'s fills use the existing
Semantic/Context tokens directly (`content-action-primary`, `content-action-secondary-700`, etc.),
which §2's own nuance permits for a component-internal role with no Context equivalent. So there was
nothing in the copied code to mark `/* PROVISIONAL */` — the gap is purely a documentation one
(components whose docs assume the missing tokens, per `Design.md` §2's list: `Button.md`,
`PricingCard.md`, `InnerSectionHeader.md`, `ImgTextCombo.md`, `InnerColumns.md`). Flagging here so it
isn't silently closed later: if a future component actually needs an Action-token value, treat it as
provisional and ask, per the brief — don't invent a Context entry.

## 6. Inconsistent focus ring — unified into one rule

**Was:** the global `:focus-visible` rule (`globals.css`) used orange
(`content-action-auxiliary`); `Button.tsx` had its own competing `focus-visible:*` Tailwind classes
using gold (`content-action-primary`). A gold ring on a gold (`Surfaces/Section/Primary`) or cream
(`/Featured`) surface is invisible — fails contrast outright.
**Fix:** removed `Button.tsx`'s own focus-visible classes; there is now exactly one
`:focus-visible` rule, in this repo's `app/globals.css`, applied globally. It's a two-ring halo (dark
inner ring + light outer ring, offset) rather than a flat color, because no single flat token clears
≥3:1 against every `Surfaces/Section/*` token — dark fails on `/Secondary` and `/Auxiliary`; light
fails on `/Primary`, `/Featured`, and is the same hex as `/Form Field`. The contrast table and
rationale are documented in `Design.md` §5 and inline in `app/globals.css`.
**Backport:** apply the same halo rule in `rodrigoseoane-2026/app/globals.css`, remove
`Button.tsx`'s competing classes there, and audit other components there for their own bespoke
focus-visible styles (only this repo's copy of `Button.tsx` was in scope here).

## 7. Design.md self-contradictions — fixed so the file agrees with itself

Three places where `Design.md` contradicted its own corrections elsewhere in the file:

1. **§3 "Rules" line** still said body paragraph spacing references `Scale/3`, after §3's own
   12-09-export correction a few paragraphs above established it's 0px. Fixed the Rules line to say
   0px and point at section/component spacing instead.
2. **§5 Color guardrail** said "Semantic role only," while §1–§2 establish Context as the contract
   (Semantic allowed only for a component-internal role with no Context equivalent). Fixed to name
   Context for backgrounds/text, with the Semantic exception spelled out per §2 — not flattened to
   "Context only," which would have overcorrected into a new contradiction with §2's own nuance.
3. **§6 open-items list** still said font weights were "300/400/600/700," after §3 resolved
   ExtraBold to 800. Fixed to "300/400/600/700/800."

**Backport:** the same three text fixes apply to `rodrigoseoane-2026/Design.md` (which currently has
the same three contradictions — they predate this mirror).

---

## Not fixed here (out of scope for this pass, flagged for awareness)

- `MetricTile.tsx`, `PricingCard.tsx`, `TestimonialCard.tsx`, and `Input.tsx` all still contain
  arbitrary-px Tailwind values (`w-[380px]`, `text-[14px]`, `h-[40px]`, etc.) beyond the radius
  rename above. The brief's drift item #5 named only `Button.tsx` for the arbitrary-px → token fix;
  the others were left as mirrored, not rewritten, to stay inside the stated scope. Worth a dedicated
  pass before these ship in the chat UI (Phase 4).
- The seven open items already tracked in `Design.md` §6 and `figma-fixes.md` (body "semibold"
  weight anomaly, two isolated type-style artifacts, the Vibrant Gold "Defualt" typo, etc.) are
  Figma-side fixes, not code drift — left exactly as documented, not duplicated here.
