# Design.md — Design System Rules & Guardrails for rodrigoseoane.com

> 🪞 **Mirrored from `rodrigoseoane-2026` @ `aae5036a2d7f20c8a378e6a6298b85dcb36384a6` on 2026-10-12.**
> Figma `SQxK0aLPYfOCGVCUUnjzm6` remains the source of truth. Re-sync from a variable export, never
> by hand-editing values. This copy had known drift fixed on import — see `DRIFT.md` for the full
> list (also backport those fixes to `rodrigoseoane-2026`).

> **What this file is:** the design source of truth an agent reads before writing or changing any UI.
> It defines principles, the token system (color, type, spacing), how to apply them, and — most
> importantly — the **guardrails and anti-patterns** that keep production cycles from drifting.
>
> **Companion docs:** `CLAUDE.md` (business + architecture), `content-inventory.md` (content map),
> `components/*.md` (one per component).
>
> **Source of truth for values:** Figma file **`SQxK0aLPYfOCGVCUUnjzm6`** ("RS 2026 | Design System")
> — the dedicated design-system file, one page per foundation and per component. This is the **single
> source of truth** going forward.
> When Figma and this file disagree, Figma wins for *values* — update this file to match.
>
> 🔄 **Sync protocol (important):** Figma is the source of truth; **this file is a snapshot that must
> be re-synced periodically.** It can drift as the design system evolves. Rules:
> - The reliable way to re-sync color/spacing/type is a **variable export** (Primitives + Semantic +
>   Context collections as JSON), not token-by-token extraction from components.
> - Any structural token change in Figma (new family, new collection/layer, renamed roles) → do a fresh
>   export and reconcile this file. Don't let component docs accumulate un-reconciled token names.
> - Do a "closing" export to lock this file once the component library stabilizes.
> - If a component reveals a token not documented here, that's a signal this snapshot is stale — flag
>   it, don't invent or guess the token's place.
>
> ✅ **Provenance note (updated 2026-10-12, this repo only):** the current single reference file is
> `Figma JSON/figma-export.json` (exported 2026-10-12T11:17:35Z), which **supersedes** the earlier
> 12-09 export — that file is kept for history at `Figma JSON/archived/figma-variables-12-09.json`,
> not deleted. Checked against it line-by-line: all resolved values (Scale, Round Corners, Border
> Thick, Section Padding, Context colors) are identical; the known-open anomalies (body
> "semibold"/"extrabold" weights reporting 700, the `lg-semibold` stray uppercase, the missing
> `xs-extrabold` treatment, the "Defualt" typo) are all still present, unresolved — see
> `figma-fixes.md`. Three collections: Primitives → Semantic → **Context**. Components reference
> Context. Old `Surface/*` naming retired. This export also carries the full `textStyles` array
> (Display/Heading/Body/Caption) and the grid style — see §3.
> ⚠️ Per the sequencing decision (`CLAUDE.md` §7), this reconciliation is a **values sync only** — no
> component code is implemented yet; five Home sections are still undocumented as of this pass.

---

## 1. Design principles

These are decision filters. When a choice isn't covered by an explicit rule below, decide by these.

1. **Proof over decoration.** The audience is in active pain (losing users/revenue). Every screen
   should help them believe Rodrigo can diagnose *their* problem. Metrics, before/after, and outcomes
   earn their space; ornament does not. (Ties to `CLAUDE.md` §3.)
2. **The Context token is the contract.** Never use a raw hex, a Primitive, or (for backgrounds/text)
   a bare Semantic token in a component. Use the Context role (`Surfaces/Section/Primary`,
   `Body/Content/Primary`...). Context → Semantic → Primitives is the reference chain. This is what
   lets an agent — or a theme change — work safely. See §2.
3. **Restraint. Spend boldness in one place.** The accent orange is the signature. Everything around it
   stays quiet. If a section has two things competing for attention, one of them is wrong.
4. **Structure encodes meaning, not mood.** Numbered markers, eyebrows, and dividers are allowed only
   when the content genuinely is a sequence or a category. Don't decorate with them.
5. **Accessibility is a floor, not a feature.** Visible keyboard focus, reduced-motion respected,
   contrast checked (see §5 guardrails). Non-negotiable.

---

## 2. Color tokens

Three-collection system: **Primitives → Semantic → Context**. Components reference **Context**.

### Three-layer system

```
Primitives  →  Semantic  →  Context
(raw ramps)    (roles)       (application: background? text? action?)
```

**Components reference CONTEXT tokens.** Context references Semantic; Semantic references Primitives.
Never use a Primitive, a Semantic token, or a raw hex directly in a component when a Context token
exists for that use. (Semantic is still fine for a component-internal role with no Context equivalent —
e.g. a button fill — but prefer Context for backgrounds and text.)

> **Source:** Figma `SQxK0aLPYfOCGVCUUnjzm6`, variable collections **Primitives**, **Semantic**,
> **Context** (`Figma JSON/figma-export.json`). The old three-tier
> `Surface/*` naming is gone.

### Layer 1 — Primitives (raw ramps; never used directly)

Primitives keep the **descriptive color name** (unlike Semantic, which uses the abstract role name —
see Layer 2). Full ramps, `Default` = the ramp's brand anchor step:

| Family | Steps | Default |
|---|---|---|
| Primary Colors/Vibrant Gold | 50 · 100 · 200 · 300 · 400 · 500 · **Default** · 700 · 800 · 900 · 1000 · 1100 · 1200 (13) | `#FFD115` |
| Primary Colors/Orange Zest | 50 · 100 · 200 · 300 · 400 · 500 · **Default** · 700 · 800 · 900 · 1000 · 1100 · 1200 (13) | `#EF8C48` |
| Primary Colors/Neutral | 50 · 100 · 200 · 300 · 400 · 500 · 600 · 700 (8, no Default step) | — |
| Accent Colors/Success Green | 50 · 100 · 200 · 300 · **Default** · 500 · 600 · 700 (8) | `#67D034` |
| Accent Colors/Warning Orange | 50 · 100 · 200 · 300 · **Default** · 500 · 600 · 700 (8) | `#EAA93C` |
| Accent Colors/Error Red | 50 · 100 · 200 · 300 · **Default** · 500 · 600 · 700 (8) | `#EF2056` |
| Accent Colors/Info Blue | 50 · 100 · 200 · 300 · **Default** · 500 · 600 · 700 (8) | `#2859AB` |

> ⚠️ Figma typo carried through the export: the Vibrant Gold default step is literally named
> `Primary Colors/Vibrant Gold/Defualt` (misspelled) in the variable collection. Cosmetic only — the
> value (`#FFD115`) is correct — but flagged in `figma-fixes.md` so it gets fixed at the source rather
> than propagating into a CSS var name.

### Layer 2 — Semantic (roles; ramps that reference primitives)

Semantic renames the same ramps to their **application role**, dropping the primitive's color name
(e.g. Primitives' "Vibrant Gold" → Semantic's "Content Action/Primary"). Full ramps:

| Semantic family | Role | Steps | Default |
|---|---|---|---|
| Content Action/Primary | gold (brand) | 50 · 100 · 200(`#FFF6D0`) · 300 · 400 · 500 · **Default**(`#FFD115`) · 700 · 800 · 900 · 1000 · 1100 · 1200 | `#FFD115` |
| Content Action/Secondary | dark / neutral | 50(`#F7F7F7`) · 100(`#DFE0DE`) · 200(`#C7C8C6`) · 300(`#979994`) · **Default**(`#686B63`) · 500(`#383C31`) · 600(`#262921`) · 700(`#151612`) | `#686B63` |
| Content Action/Auxiliary | orange accent | 50 · 100 · 200 · 300 · 400 · 500 · **Default**(`#EF8C48`) · 700 · 800 · 900 · 1000 · 1100 · 1200 | `#EF8C48` |
| Accent Colors/Success | state | 50 · 100 · 200 · 300 · **Default**(`#67D034`) · 500 · 600 · 700 | `#67D034` |
| Accent Colors/Error | state | 50 · 100 · 200 · 300 · **Default**(`#EF2056`) · 500 · 600 · 700 | `#EF2056` |
| Accent Colors/Warning | state | 50 · 100 · 200 · 300 · **Default**(`#EAA93C`) · 500 · 600 · 700 | `#EAA93C` |
| Accent Colors/Info | state | 50 · 100 · 200 · 300 · **Default**(`#2859AB`) · 500 · 600 · 700 | `#2859AB` |

Full per-step hex values live in `Figma JSON/figma-export.json` (`collections.Semantic.variables.colors`) — this table is the map from role to ramp, not a hex duplicate.

### Layer 3 — Context (what components actually reference)

The application layer: it says *where* a color is used. Each Context token aliases a Semantic step.

**Surfaces/Section — section & page backgrounds:**
| Context token | → Semantic | Hex |
|---|---|---|
| Surfaces/Section/Primary | Content Action/Primary/Default | `#FFD115` (gold) |
| Surfaces/Section/Secondary | Content Action/Secondary/500 | `#383C31` (dark) |
| Surfaces/Section/Auxiliary | Content Action/Secondary/700 | `#151612` (near-black) |
| Surfaces/Section/Featured | Content Action/Primary/200 | `#FFF6D0` (cream) |
| Surfaces/Section/Form Field | Content Action/Secondary/50 | `#F7F7F7` |

**Body/Content — text colors:**
| Context token | → Semantic | Hex |
|---|---|---|
| Body/Content/Primary | Content Action/Secondary/700 | `#151612` (default text) |
| Body/Content/Secondary | Content Action/Secondary/50 | `#F7F7F7` (light text, for dark backgrounds) |
| Body/Content/Auxiliary | Content Action/Secondary/500 | `#383C31` |
| Body/Content/Accent | Content Action/Auxiliary/Default | `#EF8C48` (orange) |
| Body/Content/Featured | Content Action/Primary/200 | `#FFF6D0` |
| Body/Content/Placeholder | Content Action/Secondary/300 | `#979994` |

**Surfaces/Action (as exported in the Context collection):**
| Context token | → Semantic | Hex |
|---|---|---|
| Surfaces/Action/Destructive/light | Accent Colors/Error/Default | `#EF2056` |

> ⚠️ **Open gap, confirmed in the 12-09 closing export — do not treat as resolved.** The Context
> collection exports **exactly 12 color tokens** (the ones listed in this file). It does **not**
> contain `Surfaces/Action/Primary/light`, `Surfaces/Action/Primary/dark`,
> `Surfaces/Action/Secondary/light`, `Body/On Action/Primary/default`,
> `Body/On Action/Secondary/light`, or any other `Body/On Action/*` token — despite these being used
> throughout `components/Button.md`, `PricingCard.md`, `InnerSectionHeader.md`, `ImgTextCombo.md`, and
> `InnerColumns.md` (pulled per-component via `get_design_context`/`get_variable_defs`, not from this
> collection export). **This means the button/CTA action tokens live somewhere this export doesn't
> reach** — a 4th collection not captured by the export plugin, or they're not real Variables at all
> (could be legacy Styles or per-instance overrides). Until that's resolved, treat every
> `Surfaces/Action/*` / `Body/On Action/*` hex in the component docs as **provisional** — correct as
> observed per-component, but not verified against a canonical named source the way everything else in
> this file is. **Do not silently invent a Context entry for them; ask Rodrigo to export/confirm where
> they actually live before `global.css` locks them in as CSS vars.**

> **Reconciled in the closing export (12-09):** `Body/Content/Secondary` (`#F7F7F7`) is a confirmed
> Context token (light text on dark). Scale expanded (see §4). Display type styles added (see §3).

> ⚠️ **Contrast rule:** `Surfaces/Section/Primary` (gold) and `/Featured` (cream) are light — text on
> them MUST be dark (`Body/Content/Primary`). `Surfaces/Section/Secondary` and `/Auxiliary` are dark —
> text on them is light (`Content Action/Secondary/50`). Never light text on gold/cream.

> **Note on darks:** `#151612` = Content Action/Secondary/700 (Body/Content/Primary, Surfaces/Section/
> Auxiliary). `#383C31` = Secondary/500 (Surfaces/Section/Secondary). `#2E5E5E` never existed.

> **Implementation note:** mirror the three collections as referential CSS vars — Primitives as root
> values, Semantic referencing Primitives, Context referencing Semantic (e.g.
> `--ctx-surfaces-section-primary: var(--sem-content-action-primary-default)`). Components use the
> `--ctx-*` layer. Never inline hex.

---

## 3. Typography

**Families:** **Plus Jakarta Sans** — Hero & headings. **Inter** — body, captions, nav, UI.
(Note: an exported `styles.json` listed Roboto for all styles — that export is **outdated**; the
Figma design and production use Plus Jakarta Sans + Inter.)
**Weights:** Light 300 · Regular 400 · SemiBold 600 · ExtraBold **800** (corrected 09-12 — see flag
below; was documented as 700).
**Values are production px.**

> ⚠️ **Correction (12-09 export):** the earlier claim that body paragraph spacing references
> `Scale/3` (12px) is **not supported by the export** — every Paragraph/Body role (Extra Small through
> Extra Large) reports **0px** paragraph spacing. Only Headings carry non-zero paragraph spacing
> (4–8px, see the Headings table below). Don't add vertical rhythm between body paragraphs via a
> paragraph-spacing token — use section/component spacing (§4) or an explicit margin instead.

### Hero & Headings (Plus Jakarta Sans)

**Display styles (hero / page headers) — larger than H1:**
| Role | Size | Line height | Weight | Family |
|---|---|---|---|---|
| Display/Page Title | 56 | 1.1 | Bold (700) | Plus Jakarta |
| Display/Subtitle | 20 | 1.48 | Bold (700) | Inter |
| Display/Mobile Title | 40 | 1.1 | Bold (700) | Plus Jakarta |
| Display/Mobile Subtitle | 18 | 1.32 | Bold (700) | Inter |

> Mobile Display sizes are the responsive scale-down (Title 56→40, Subtitle 20→18) — this is the
> mobile type adjustment used by Hero and Inner Page Header.

**Headings — all SemiBold (600):**
| Role | Size | Line height | Weight | Letter-spacing | Paragraph spacing |
|---|---|---|---|---|---|
| H1 | 28 | 36 | SemiBold (600) | 0 | 4px |
| H2 | 24 | 30 | SemiBold (600) | 0 | 4px |
| H3 | 20 | 28 | SemiBold (600) | 0 | 8px |
| H4 | 18 | 24 | SemiBold (600) | 0 | 8px |
| H5 | 16 | 24 | SemiBold (600) | 0 | 8px |

> Headings are **SemiBold (600)**, confirmed by the closing export (the Hero/Page Title is a **Display**
> style, not a Heading — see the Display table above; the earlier version of this table incorrectly
> listed it here as a 7th heading row, removed). **Paragraph spacing is now per-role** (space after a
> heading paragraph, distinct from line-height) — H1/H2 use 4px, H3–H5 use 8px. This replaces the
> earlier blanket "Scale/3 (12px)" claim, which the export doesn't support (see the body-text note
> below).

### Body / Paragraph (Inter) — each size has 4 weights
| Role | Size | Line height | Weights available |
|---|---|---|---|
| Extra Large | 18 | 28 | 300 / 400 / 600 / **800** |
| Large | 16 | 24 | 300 / 400 / 600 / **800** |
| Regular | 14 | 20 | 300 / 400 / 600 / **800** |
| Small | 12 | 20 | 300 / 400 / 600 / **800** |
| Extra Small | 10 | 16 | 300 / 400 / 600 / **800** |

> ExtraBold is **800** (Inter's real "ExtraBold" step — Inter's own scale runs Bold=700,
> ExtraBold=800, Black=900), corrected 09-12. `Body/Small/sm-extrabold` already reported 800 in the
> export and was right; `xl-extrabold`/`lg-extrabold`/`regular-extrabold`/`xs-extrabold` reported 700
> and were wrong — build against 800 for all five regardless of what the raw (not-yet-fixed) Figma
> export still shows for those four. See `figma-fixes.md`.

Default body weight is Regular (400); use SemiBold (600) for emphasis, Light (300) sparingly.

> ⚠️ **Still flagged, not resolved:** every "semibold" body style (`xl-semibold`, `lg-semibold`,
> `regular-semibold`, `sm-semibold`) reports raw weight **700** in the export — the same raw value the
> *unfixed* "extrabold" styles currently (wrongly) report too, which is what originally made them look
> indistinguishable. Now that ExtraBold is confirmed to be 800 (not 700, see above), semibold's 700
> reading is a separate, still-open question — it no longer collides with ExtraBold once that's fixed,
> but it still contradicts Headings, where SemiBold correctly reports 600. Keeping "SemiBold = 600" as
> the documented weight here pending Rodrigo checking the actual weight dropdown in Figma. Don't build
> against the raw 700 without confirming first.
> Two more isolated anomalies from the same export, also logged in `figma-fixes.md`: **`Body/Large/
> lg-semibold`** carries a stray `textTransform: upper` (every other semibold style has none — looks
> like a copy-paste from its extrabold sibling), and **`Body/Extra Small/xs-extrabold`** is *missing*
> the letter-spacing/uppercase treatment every other size's ExtraBold has — breaking the "each body
> size has an ExtraBold UPPERCASE variant" rule below for that one size.

> **Label/eyebrow variant:** each body size has an **ExtraBold UPPERCASE** style with letter-spacing
> ~1px (e.g. `body-regular-extrabold`, `body-large-lg-extrabold`) — used for eyebrows, labels, and the
> uppercase metadata seen across cards (Metric Tile title, Services duration, etc.). Prefer these over
> hand-rolling uppercase styling. **Exception:** `Body/Extra Small/xs-extrabold` — see flag above;
> confirm in Figma before using it as an eyebrow at that size.

### Captions (Inter) — all Bold (700), letter-spacing 4%
| Role | Size | Line height | Transform |
|---|---|---|---|
| Large | 12 | 16 | UPPERCASE |
| Regular | 10 | 12 | none |
| Small | 8 | 12 | Title Case |

> **Correction (12-09 export):** Captions are **Bold (700)**, not SemiBold (600) as previously
> documented here — all three sizes report weight 700 consistently (unlike the Body semibold anomaly
> above, there's no sibling "extrabold" caption style to conflict with, so this reading is trusted).

**Rules:** Hero/headings are Plus Jakarta Sans; body/captions/nav are Inter. Pick the role by semantic
level, not by the size that "looks right". Body paragraph spacing is **0px** (the 12-09 export
correction above) — don't add vertical rhythm with a paragraph-spacing token; use section/component
spacing (§4) or an explicit margin instead.

---

## 4. Spacing, sizing & the Scale system

The system is **referential**: spacing, border radius, border thickness, and paragraph spacing all
derive from one **Scale** token set. Other tokens point at Scale rather than hardcoding px. Agents
reference Scale tokens (or the semantic tokens built on them), never raw px.

### The Scale (base-4: `Scale/n` = n × 4px)

| Token | px | | Token | px |
|---|---|---|---|---|
| Scale/0 | 0 | | Scale/7 | 28 |
| Scale/0.25 | 1 | | Scale/8 | 32 |
| Scale/0.5 | 2 | | Scale/9 | 36 |
| Scale/1 | 4 | | Scale/10 | 40 |
| Scale/2 | 8 | | Scale/11 | 44 |
| Scale/2.5 | 10 | | Scale/12 | 48 |
| Scale/3 | 12 | | Scale/13 | 52 |
| Scale/3.5 | 14 | | Scale/14 | 56 |
| Scale/4 | 16 | | Scale/15 | 60 |
| Scale/4.5 | 18 | | Scale/16 | 64 |
| Scale/5 | 20 | | Scale/20 | 80 |
| Scale/6 | 24 | | Scale/24 | 96 |
| | | | Scale/30 | 120 |
| | | | Scale/36 | 144 |

> Confirmed unchanged against the 12-09 closing export — full match, including the granular steps
> (2.5, 3.5, 4.5, 7, 9, 11, 13, 15) and the larger steps (24, 36). Base-4 coherence holds
> (`Scale/n` = n × 4px).

### Border thickness — real Figma names (`Border Thick/*`, Semantic collection)
| Token | px |
|---|---|
| None | 0 |
| small | 1 |
| regular | 2 |
| large | 4 |
| x-large | 8 |

> ⚠️ **Correction (12-09 export):** the previous xs/sm/md/lg naming here was invented and didn't match
> Figma — it also had a duplicate (xs and sm both mapped to 1px) and was missing the `x-large` (8px)
> step entirely. Replaced with the real named tokens (`Border Thick/None|small|regular|large|x-large`).

### Border radius — real Figma names (`Round Corners/*`, Semantic collection)
| Token | px |
|---|---|
| None | 0 |
| x-small | 2 |
| small | 4 |
| regular | 8 |
| large | 12 |
| x-large | 16 |
| round | 64 |

> ⚠️ **Correction (12-09 export):** the previous xs/sm/md/lg/round naming was missing the `large` (12px)
> step entirely and mislabeled the 16px step as "lg" instead of the real name `x-large`. Replaced with
> the real named tokens (`Round Corners/None|x-small|small|regular|large|x-large|round`).

### Layout
- **Design frame dimensions (project convention):** Desktop = **1440px**; Mobile = **440px**
  (iPhone 16 & 17 Pro Max, 440×956). Components are designed at both; document both variants.
- **Content max-width:** desktop frames are 1440px; main content column ~1092–1440px. Keep a
  max-width container; don't let text run full-bleed on wide screens.
- **Grids:** Desktop 12-column, gutter 16, margin 64 — confirmed unchanged against the 12-09 closing
  export (`gridStyles: "Desktop 12 Cols"`). 16-column "wide" for screens ≥ 1440px where used.

### Elevation
| Token | Value |
|---|---|
| Tooltip Shadow | `box-shadow: 0px 4px 24px 0px rgba(5, 3, 38, 0.08)` |

### Motion

**Default transition: `ease-out`, `200ms`.** Use for interactive state changes (hover, active,
focus) unless a component explicitly documents otherwise. Observed consistently across components
(Blog Post Card, Services Cards).

- Animate only cheap properties — `background-color`, `color`, `box-shadow`, `opacity`, `transform`.
  Never animate layout properties (width/height/padding/margin) — causes reflow jank.
- Each component still describes *what* changes on each state; this rule fixes the *timing/easing* so
  they don't diverge. A component may override only with a documented reason.
- Respect `prefers-reduced-motion`: reduce or remove movement (cross-fade or instant), never block
  the state change itself. (See §5.)
- **Icon morphs:** when an icon toggles between two states (e.g. the nav's hamburger↔X), prefer a
  **morph** — animate the icon's own strokes transforming (rotate/translate/scale) rather than
  cross-fading two separate icons. Same ease-out 200ms. Under reduced-motion, snap between states.

### Semantic spacing layer

Two named spacing scales by **context**. Agents choose a named level within the right context — they
do **not** reach into raw Scale for spacing.

**Component spacing** — internal `padding` and `gap` of components (buttons, cards, inputs, icon↔text).
No named Figma tokens exist for this tier (it's not in the Semantic collection export) — this is our
own convention, referencing raw Scale:

| Name | Scale | px | Typical use |
|---|---|---|---|
| none | Scale/0 | 0 | reset |
| 2xs | Scale/0.25 | 1 | hairline, optical nudge |
| xs | Scale/0.5 | 2 | fine detail |
| sm | Scale/1 | 4 | tight icon↔text gap |
| md | Scale/2 | 8 | button vertical padding |
| lg | Scale/4 | 16 | card padding |
| xl | Scale/6 | 24 | generous horizontal padding |
| 2xl | Scale/8 | 32 | large-card padding |

**Section spacing** — section `padding` (internal vertical breathing room) and `margin` between sections.
**Unlike component spacing, this one has real named Figma tokens** (`Section Padding/*`, Semantic
collection) — use these names directly, not an invented xs/sm/md/lg scale:

| Token | px | Typical use |
|---|---|---|
| None | 0 | reset |
| x-small | 16 | gap between items in a section grid |
| small | 24 | medium breathing room |
| regular | 40 | default section vertical padding |
| large | 64 | separation between sections |
| x-large | 80 | wide breathing room, feature sections |
| xx-large | 120 | maximal separation (rare) |

> ⚠️ **Correction (12-09 export):** the previous xs/sm/md/lg/xl/2xl naming here was invented and didn't
> match Figma's real `Section Padding/*` tokens — it was also missing the `xx-large` (120px) step. Note
> the actual section-padding values used across the components documented so far all map onto this
> scale cleanly (e.g. Hero/Featured Case use `large` (64) and `x-large` (80); Pricing Card uses
> `regular` (40)) — this correction doesn't change any already-documented component value, just the
> naming layer.

**Which scale for which property:**
- Component `padding` → component spacing (our convention)
- Component `gap` (icon↔text, list items) → component spacing (our convention)
- Section `padding` (internal vertical) → **Section Padding** (real Figma token)
- `margin` between sections → **Section Padding** (real Figma token)

> **Implementation note:** define Section Padding tokens directly under their real names (e.g.
> `--section-padding-large: var(--scale-16)`), and component spacing as our own separate group (e.g.
> `--space-component-md: var(--scale-2)`). Agents use these names; they never hardcode px and never
> pull raw Scale for spacing decisions.

> **Implementation note:** define Scale once as the root token set, then define spacing/radius/border
> tokens as references to it (e.g. `--radius-small: var(--scale-1)`, the real Figma name — see the
> Border Radius table above). This mirrors the Figma structure and means a change to the base ratio
> propagates everywhere.

---

## 5. Guardrails & anti-patterns (READ BEFORE BUILDING)

The point of this section: stop the drift that happens across production cycles. An agent follows a
positive rule well and guesses badly at what *not* to do. So here is what not to do, explicitly.

### Color
- **Never** use a raw hex, a Primitive, or a scale name (`#EF8C48`, "Orange 500") in a component. Use
  the Context role for backgrounds/text (§2, principle 2 — Context is the contract); Semantic is
  acceptable only for a component-internal role with no Context equivalent (e.g. a button fill — §2).
- **Never** use `Content Action/Auxiliary` (orange) for large background fills. It's an accent —
  reserve it for CTAs, key highlights, and small emphasis. Large fills use the gold/neutral ramps.
- **Never** repurpose `Accent Colors/*` (Success/Error/Warning/Info) for decoration. They mean state
  feedback only.
- **Never** invent a color that isn't in §2. If a real need appears, add it to the Figma + this file
  first, then use it.

### Typography
- **Never** swap the families' jobs (no Plus Jakarta Sans for body, no Inter for headings).
- **Never** pick a type role by visual size alone — pick by semantic level.
- **Never** hardcode paragraph spacing on body text — it references `Scale/3`.

### Layout & structure
- **Never** add numbered markers (01/02/03), eyebrows, or dividers unless the content is a real sequence
  or category. (Principle 4.)
- **Never** let the accent compete with itself — one primary emphasis per section.
- **Never** ship a section without checking it responsive down to mobile.
- **Never** pull raw Scale (or px) for spacing — use the semantic spacing names in the right context
  (component spacing for components, section spacing for sections). See §4.

### Accessibility
- **Never** ship interactive elements without visible keyboard focus states.
- **Never** rely on color alone to convey meaning (pair with text/icon).
- **Contrast caution:** the gold (`Content Action/Primary/Default` `#FFD115`) and the orange
  (`Content Action/Auxiliary/Default` `#EF8C48`) are light mid-tones — neither carries body text
  safely. Put dark Content Action/Secondary roles on them and verify contrast; do not place light
  text on gold/orange.
- **Focus ring (single rule, defined once, globally):** no flat color reaches ≥3:1 against every
  `Surfaces/Section/*` token — a dark ring disappears on `/Secondary` and `/Auxiliary`; a light ring
  disappears on `/Primary`, `/Featured`, and `/Form Field` (same hex). The focus indicator is instead
  a two-ring halo — a dark inner ring (`Content Action/Secondary/700`) plus a light outer ring
  (`Content Action/Secondary/50`), offset from each other — so at least one ring always meets ≥3:1
  against the actual surface. Defined once, in `app/globals.css`'s `:focus-visible` rule; components
  must not define their own competing focus style (this replaces a prior drift where the global rule
  and `Button.tsx` disagreed — see `DRIFT.md`).

### Process
- **Never** create a new component when an existing one (see `content-inventory.md` component table)
  has a variant that fits. Check first.
- **Never** deviate from tokens to "match a screenshot" — if the design needs a value not in the
  system, that's a conversation (per `CLAUDE.md` §5), not a silent override.

---

## 6. Open items (living list)

- [x] ~~Full spacing scale~~ — resolved: base-4 Scale system (§4).
- [x] ~~Border-radius values~~ — resolved: "Round Corners" tokens (§4).
- [x] ~~Font weights~~ — resolved: 300/400/600/700/800, mapped per role (§3; ExtraBold 800 added
      09-12, see the open item below).
- [x] ~~Semantic spacing layer~~ — resolved: component + section spacing (§4).
- [x] ~~Reconcile dark hex / Surface naming~~ — resolved via variable export: `Surface/*` is gone;
      colors now Primitives → Semantic (Content Action + Accent Colors). `#151612` = Content
      Action/Secondary/700. `#2E5E5E` never existed. (§2)
- [x] ~~Body font family~~ — confirmed Plus Jakarta Sans + Inter.
- [x] ~~Background strategy~~ — resolved: Background/Primary = Content Action/Primary/Default (gold,
      dark text); Background/Secondary = Content Action/Secondary/500 (dark, light text). See §2.
- [x] ~~Light-cream role~~ — resolved: `#FFF6D0` = Surfaces/Section/Featured (Content Action/Primary/200),
      used for featured surfaces (e.g. Client Logos tiles). Context layer now documented (§2).
- [x] ~~"Heading+Indent" set~~ — resolved: indentation is a **layout** concern (handled via CSS
      padding/indent), not a separate type token. Don't create indent-specific type styles; reuse the
      standard Heading roles and indent in layout.
- [x] ~~Reconcile against the closing export (12-09)~~ — full pass done (this file, 09-12): Primitives
      + Semantic ramps expanded to full steps (§2); Border Thickness, Border Radius, and Section
      Padding tables corrected to Figma's real names (§4); Captions weight corrected 600→700 (§3);
      body paragraph-spacing claim corrected to 0px, heading paragraph-spacing added (§3). Source file:
      `Figma JSON/figma-variables-12-09.json`. All prior dated exports deleted — this is now the only
      reference file.
- [ ] **Missing Surfaces/Action / Body/On Action token collection** — not in any of the 3 exported
      collections, despite being used throughout Button/PricingCard/InnerSectionHeader/ImgTextCombo/
      InnerColumns docs. Ask Rodrigo where these actually live (a 4th collection? legacy Styles?) before
      `global.css` locks in CSS vars for them (§2).
- [x] ~~ExtraBold body weight~~ — decided 09-12: **800** is correct (Inter's real ExtraBold step;
      `sm-extrabold` already reported it correctly). `xl/lg/regular/xs-extrabold` reported 700 and are
      the ones needing the actual Figma fix (§3, `figma-fixes.md`).
- [ ] **Body "semibold" weight anomaly** — still open. Exported as 700 across all sizes; kept as 600
      here pending Rodrigo confirming the real value in Figma (§3, `figma-fixes.md`). No longer
      confused with the ExtraBold question above, which is now resolved.
- [ ] **Two isolated type-style artifacts** from the 12-09 export: `Body/Large/lg-semibold` has a
      stray uppercase transform; `Body/Extra Small/xs-extrabold` is missing its uppercase/letter-spacing
      treatment (§3, `figma-fixes.md`).
- [ ] **Vibrant Gold "Defualt" typo** in the Primitives collection — cosmetic, flagged so it's fixed
      before it becomes a CSS var name (§2, `figma-fixes.md`).
