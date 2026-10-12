# Component: Input (Form family)

<!-- Follows the component template established in Button.md (10 sections).
     This documents a FAMILY: Label, Form Field, Text Area, Dropdown, Controls, and their compositions. -->

> **Source of truth:** Figma `SQxK0aLPYfOCGVCUUnjzm6` ("RS 2026 | Design System"). Two source pages:
> "Input" (section `44:578` — Label, Form Field, Text Area) and "Controls" (`59:2969` Controls,
> `59:3012` Controls with Label, `96:1128` Dropdown) — a separate, later page covering
> checkbox/radio/toggle and the select dropdown. Values extracted, not inferred. Applies `Design.md`
> tokens. Confirmed still current (09-12) via the live Contact Form Block (`60:1006`), which
> instantiates this whole family.
> Note: component code shows "Mona Sans" — that's an export artifact; body font is **Inter** (`Design.md` §3).

---

## 1. Purpose & when to use

The form input family for the contact form ("Ready to transform...", `sections/ContactSection.md`) and
any data entry. It's a **family of atoms that compose**:

- **Label** — the field label (Required / Optional).
- **Form Field** — single-line input (the atom).
- **Text Area** — multi-line input (the atom).
- **Dropdown** — select input: a Form Field trigger + an item list (new atom, §3b).
- **Controls** — Checkbox / Radio / Toggle (new atom, §3c).
- **Input Field** — composition: Label + Form Field.
- **Message Field** — composition: Label + Text Area.
- **Controls with Label** — composition: Controls + inline label text (new, §3c).

Use the compositions (Input Field / Message Field / Controls with Label) in real forms; the atoms
exist for building them.

---

## 2. Anatomy

```
Label:        Your Name (i) *          10px SemiBold, gap Scale/2 (8) to icon, "*" superscript
Form Field:   ┌────────────────────────┐
              │ [icon] Placeholder [icon]│   min-height 36
              └────────────────────────┘
   padding: Scale/2 (8) X · Scale/3 (12) Y · gap Scale/3 (12) · radius Scale/1 (4)
```

- **Label text** — `Body/Extra Small/xs-semibold` (10/16, Inter SemiBold), confirmed live in the
  Contact Form Block. Followed by an optional info icon (10×10, tooltip/help affordance) and, for
  required fields, a `*` positioned as a small superscript to the upper-left of the label text
  (absolute-positioned in Figma, not inline — replicate visually, not literally).
- **Field text** — Body/Regular (14/20, Inter).
- **Icons** — optional left/right (Type axis), 24×24.
- **Text Area** — same styling, taller (min-height 108), multi-line.

> ⚠️ **Off-system color, not in `Design.md`:** the Label text and the required `*` both use a color
> reported as `Content/Active/Primary` / `"Dark 900"` = **`#080D00`** — not `Body/Content/Primary`
> (`#151612`), and not present in any of the three Design.md color collections (Primitives/Semantic/
> Context). It's extremely close to `#151612` visually but is a distinct, undocumented hex. Logged in
> `figma-fixes.md` — don't hardcode `#080D00`; use `Body/Content/Primary` until Rodrigo confirms
> whether this is intentional or a stray value.

---

## 3. Variants

**Label** — Type: Required · Optional.

**Form Field** — Type × State:
| Axis | Options |
|---|---|
| Type | No Icons · Icon Left · Icon Right · Combo (both) |
| State | Initial · Focus · Filled · Error · Success |

= 4 × 5 = 20. **Text Area / Message Field** — State: Initial · Focus · Filled · Error · Success (5).

### 3b. Dropdown (new atom — select input)

A Form Field acting as a trigger (placeholder text + `CaretDown` icon, right-aligned) that opens an
item list on interaction.

```
Trigger:  ┌────────────────────────────┐
          │ Select a Service        ⌄  │   same Form Field styling as text inputs
          └────────────────────────────┘
List:     ┌────────────────────────────┐
          │ Embeded Designer           │   Default: bg Surfaces/Section/Form Field (#F7F7F7)
          │ Advisory Retainer          │ ← Active/hover: bg Surfaces/Section/Featured (#FFF6D0),
          │ Workshop Facilitation      │   text goes SemiBold
          │ Other                      │
          └────────────────────────────┘
   list border 1px Body/Content/Featured (#FFF6D0) · radius Scale/2 (8) · item padding Scale/2 (8) X · Scale/3 (12) Y
```

- **Trigger** — identical Form Field shell as a text input, plus a `CaretDown` icon.
- **Item — Default state** — `Surfaces/Section/Form Field` bg, `Body/Content/Primary` text, Regular weight.
- **Item — Active/hover state** — `Surfaces/Section/Featured` bg (cream), text goes SemiBold (same
  color). This is both the hover affordance and the "currently selected" indicator in the extracted
  example.
- **Options seen in the live Contact Form:** "Embeded Designer" *(sic — see flag below)*, "Advisory
  Retainer", "Workshop Facilitation", "Other" — these map to Rodrigo's three service offers
  (`CLAUDE.md` §2: Embedded Designer, Advisory Retainer, Workshop Facilitation) plus a catch-all.

> ⚠️ **Typo in Figma content, not a token issue:** the dropdown option reads **"Embeded Designer"**
> (missing a 'd') — the real offer name is **"Embedded Designer"** (`CLAUDE.md` §2). Logged in
> `figma-fixes.md`. Fix the Figma layer text (or fix it in the Notion source once the dropdown options
> are content-managed) before shipping — don't propagate the typo.

### 3c. Controls (new atom — Checkbox / Radio / Toggle)

| Axis | Options |
|---|---|
| type | Checkbox · Radio · Toggle |
| selected | true · false |
| indeterminate | true · false (Checkbox & Radio only) |
| disabled | true · false |

- **Checkbox** — 20×20 hit area, 16×16 visual box. Selected = filled orange square with a white
  checkmark; Indeterminate = filled orange square with a dash.
- **Radio** — 20×20 hit area, 16×16 visual circle. Selected = orange dot in an outlined circle.
- **Toggle** — 32×20 hit area, 32×16 track. Selected = orange track, thumb right; Unselected = neutral
  track, thumb left.
- **Disabled** (any type) — desaturates to a light neutral gray regardless of selected state.

**Controls with Label** — composition: one Control + label text, `gap Scale/2 (8)`.
- Label text: Body/Regular (14/20, Inter Regular), color `Body/On Action/Secondary/light` (`#151612`).
- Disabled label: `Body/On Action/Secondary/light-disabled` (`#C7C8C6`).

---

## 4. Tokens used (semantic roles only)

| Property | Token |
|---|---|
| Field background | `Surfaces/Section/Form Field` (`#F7F7F7`, Context) |
| Placeholder text | `Body/Content/Placeholder` (`#979994`, Context) |
| Active text | `Body/Content/Auxiliary` (`#383C31`, Context) |
| Focus border | `Body/Content/Primary` (`#151612`, Context), 1px |
| Padding X | Scale/2 (8) |
| Padding Y | Scale/3 (12) |
| Gap (icon↔text) | Scale/3 (12) |
| Radius | Scale/1 (4) |
| Min height | 36 |
| Text style | Body/Regular (14/20, Inter) |

**State pattern:**
- **Initial:** no border, placeholder text (`#979994`).
- **Focus:** adds 1px dark border (`body/content/primary`), text becomes active (`#383C31`).
- **Filled:** active text, no error/success color.
- **Error:** border + message in `Accent Colors/Error`.
- **Success:** border + affordance in `Accent Colors/Success`.

> ⚠️ New token family: `Surfaces/Section/Form Field` (`#F7F7F7`, Context), `body/content/*` (placeholder,
> auxiliary, primary). Flag for `Design.md` §2 reconciliation.

**Controls & Dropdown tokens:**

| Property | Token |
|---|---|
| Checkbox/Radio/Toggle selected fill | `Surfaces/Action/Secondary/light` (`#EF8C48`, orange) |
| Toggle/Checkbox selected border/dark accents | `Body/On Action/Primary/dark-default` (`#151612`) |
| Disabled fill (Toggle/Checkbox track) | `Surfaces/Action/Primary/light-disabled` (`#979994`) |
| Disabled label text | `Body/On Action/Secondary/light-disabled` (`#C7C8C6`) |
| Disabled thumb/fill accent | `Body/On Action/Primary/disabled` (`#686B63`) |
| Dropdown item — Default bg | `Surfaces/Section/Form Field` (`#F7F7F7`) |
| Dropdown item — Active/hover bg | `Surfaces/Section/Featured` (`#FFF6D0`, cream) |
| Dropdown list border | `Body/Content/Featured` (`#FFF6D0`) |

> ⚠️ These `Surfaces/Action/*` / `Body/On Action/*` tokens are the **same unresolved gap** flagged in
> `Design.md` §2 — they don't appear in the exported Context collection. Treat as provisional (per
> `Design.md`'s open item) until Rodrigo confirms where they actually live.

---

## 5. Props / API (proposed — confirm at implementation)

```ts
type InputFieldProps = {
  label: string;
  required?: boolean;                              // Label Required vs Optional
  iconLeft?: IconName;
  iconRight?: IconName;
  state?: "initial" | "focus" | "filled" | "error" | "success";
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  multiline?: boolean;                             // true → Text Area / Message Field
};

type DropdownProps = {
  label: string;
  required?: boolean;
  placeholder?: string;                             // e.g. "Select a Service"
  options: { value: string; label: string }[];
  value?: string;
  state?: "initial" | "focus" | "filled" | "error" | "success";
};

type ControlsWithLabelProps = {
  type: "checkbox" | "radio" | "toggle";
  label: string;
  checked?: boolean;
  indeterminate?: boolean;                          // checkbox/radio only
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};
```

---

## 6. Behaviour & states

Five states (see §4). State is driven by interaction + validation, not set manually. Focus is a real
`:focus` (keyboard + click). Error/Success come from validation and pair with a message.

---

## 7. Content rules

- Labels: short, sentence case. Mark optional explicitly ("(optional)"); required is the default.
- Placeholder is a hint, not a label — never rely on placeholder alone for the field's meaning.
- Error messages: specific and actionable ("Enter a valid email", not "Invalid").

---

## 8. Accessibility

- Every field has a real `<label>` tied to the input (not just placeholder).
- Focus state must be visible (the 1px border) — never remove focus outline without replacement.
- Error state: don't rely on color alone — pair with an error message and `aria-invalid`/`aria-describedby`.
- Placeholder contrast (`#979994` on `#F7F7F7`) is low by design — never put essential info only in placeholder.

---

## 9. Never do (component-specific)

- **Never** use placeholder as the label (accessibility failure).
- **Never** convey error/success by color alone — pair with text.
- **Never** remove the focus border without an equivalent visible focus state.
- **Never** hardcode the field background/border hex — use the semantic tokens.
- **Never** use body type other than Body/Regular for field text.
- **Never** hardcode `#080D00` for label text — use `Body/Content/Primary` (`#151612`) pending the
  color flag above.
- **Never** ship the "Embeded Designer" dropdown option as-is — it's a typo for "Embedded Designer".
- **Never** implement Dropdown as a native `<select>` if the design needs the custom item-list styling
  (Default/Active bg) — but do keep it keyboard-operable and screen-reader correct either way (§8).
- **Never** convey Toggle/Checkbox/Radio state by color alone in a context where color-blindness matters
  — the shape difference (checkbox square vs radio circle vs toggle track) already helps; don't strip it.

---

## 10. Figma reference

- File: `SQxK0aLPYfOCGVCUUnjzm6`.
- Page "Input" (section `44:578`) — Atoms: Label (`44:109`), Form Field (`44:298`), Text Area
  (`44:507`). Compositions: Input Field (`44:330`), Message Field (`44:497`). Symbols extracted:
  No Icons/Initial (`44:294`), No Icons/Focus (`44:291`).
- Page "Controls" — Controls atom (`59:2969`: Checkbox/Radio/Toggle × selected × indeterminate ×
  disabled). Controls with Label (`59:3012`). Dropdown (`96:1128`: trigger `59:3085`, item list
  `59:3084`, items `59:3076`–`59:3082`).
- Confirmed live and current via Contact Form Block (`60:1006`, see `sections/ContactSection.md`),
  which instantiates Input Field ×3, Message Field, Controls with Label (checkbox), and Dropdown.

---

## Open items
- [ ] Pull exact Error/Success border tokens (pattern known: Accent Colors/Error|Success; step TBC).
- [ ] Confirm Filled state text token (likely body/content/primary).
- [x] ~~Reconcile surfaces/section + body/content~~ — done: Context layer, Design.md §2.
- [x] ~~Dropdown & Controls documented~~ — done 09-12 (§3b, §3c), sourced from `59:2969`, `59:3012`,
      `96:1128`.
- [ ] Resolve the `#080D00` label-color flag (§2) and the "Embeded Designer" typo (§3b) — both logged
      in `figma-fixes.md`.
- [ ] Confirm Radio's actual use in the product — only Checkbox (consent) and Dropdown are used in the
      live Contact Form; Radio and Toggle exist in the Controls atom but no confirmed usage yet.
