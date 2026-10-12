# Figma Fixes — divergences to correct in the source of truth

> **Purpose:** track small inconsistencies found while documenting components that should be fixed in
> the Figma file (`SQxK0aLPYfOCGVCUUnjzm6`, "RS 2026 | Design System") — the single source of truth.
> These are cases where the Figma has an off-system value, a stale artifact, or an inconsistency that
> the `.md` docs have already resolved. Fix in Figma so Figma and the docs converge.
>
> **How to use:** when you fix one in Figma, check it off (and ideally re-export variables so the docs
> re-sync). Keep this list short — it's a to-do against Figma, not a design log.

---

## Open fixes

- [ ] **Duplicate/near-duplicate text style names** (found 09-11, documenting Inner Section Header,
      node `87:1609`). This node's own "Caption/Large", "Header/H2", and "Body/Regular" styles don't
      match the values of same-named (or similarly-named) styles used elsewhere in the file:
      - "Caption/Large" here = Inter Bold 16px/1/tracking 4. Elsewhere ("Text Size/Captions/Large") =
        12px.
      - "Header/H2" here = Plus Jakarta Bold 28px/1.1. Elsewhere "Heading/H2" = Plus Jakarta **Semi**Bold
        24px/30.
      - "Body/Regular" here = Inter Regular 16px/1.32. Elsewhere "Body/Regular/regular-md" = Inter
        Regular 14px/20.
      **Fix:** confirm with Rodrigo which value is canonical per role, then consolidate to one named
      style so "Header/H2" ≠ "Heading/H2" stops being a trap for whoever implements this later.
      (`components/InnerSectionHeader.md` §4.)

- [ ] **Missing button/CTA action token collection** (found 09-12, reconciling `Design.md` against the
      closing variable export). The exported **Context** collection has exactly 12 color tokens — no
      `Surfaces/Action/Primary/*`, `Surfaces/Action/Secondary/*`, or `Body/On Action/*` tokens at all,
      despite these being used throughout Button, Pricing Card, Inner Section Header, IMG+Text Combo,
      and Inner Columns. **Fix:** find out where these variables actually live (a 4th collection the
      export plugin didn't pick up? legacy Styles?) and get them into a proper export so `global.css`
      isn't built on provisional per-component hex readings. (`Design.md` §2.)

- [ ] **Body "semibold" reports weight 700, same as "extrabold"** (found 09-12). Every
      `Body/*/*-semibold` style (xl, lg, regular, sm) has raw weight `700` in the export — identical to
      its `-extrabold` sibling, which would make them visually indistinguishable. Headings' SemiBold
      correctly reports 600, so this looks like a body-scale-specific data bug, not an intentional
      change. **Fix:** check the actual weight dropdown for each `-semibold` body style in Figma; if
      it's really meant to be 600, re-set it (may have been bulk-edited to 700 by accident). (`Design.md`
      §3.)

- [ ] **ExtraBold body styles should be weight 800, not 700 — decided 09-12.** Related to the item
      above: `Body/Small/sm-extrabold` already correctly reports weight **800** (Inter's real
      "ExtraBold" — Inter's own scale is Bold=700, ExtraBold=800, Black=900). The other four
      ExtraBold styles (`xl-extrabold`, `lg-extrabold`, `regular-extrabold`, `xs-extrabold`) report
      **700** in the export — those are the ones that are wrong, not `sm-extrabold`. **Fix:** in
      Figma, set `xl-extrabold`, `lg-extrabold`, `regular-extrabold`, and `xs-extrabold` to weight
      **800**, matching `sm-extrabold`. Once fixed, re-export and update `Design.md` §3 and
      `components/BlogPostCard.md` §4 (which currently still document/flag the pre-fix values).
      (`Design.md` §3, `components/BlogPostCard.md` §4.)

- [ ] **Two isolated body-style artifacts** (found 09-12): `Body/Large/lg-semibold` carries a stray
      `textTransform: upper` that no other semibold style has (looks copy-pasted from `lg-extrabold`).
      `Body/Extra Small/xs-extrabold` is missing the letter-spacing/uppercase treatment every other
      size's ExtraBold has, breaking the "every body size has an ExtraBold UPPERCASE eyebrow variant"
      pattern for that one size. **Fix:** check both directly in Figma — remove the stray transform on
      `lg-semibold`; add the missing letter-spacing/uppercase to `xs-extrabold` if that's the intent.
      (`Design.md` §3.)

- [ ] **"Defualt" typo on Vibrant Gold's default step** (found 09-12). Primitives collection: the token
      is literally named `Primary Colors/Vibrant Gold/Defualt` (misspelled "Default"). Value is correct
      (`#FFD115`), cosmetic only, but will propagate into a CSS var name if not fixed first. **Fix:**
      rename the variable in Figma. (`Design.md` §2.)

- [ ] **"Embeded Designer" typo in the Contact Form dropdown** (found 09-12, documenting the Dropdown
      component, node `59:3084`). The service-selector dropdown's first option reads "Embeded
      Designer" — missing a 'd'. The real offer name is **"Embedded Designer"** (`CLAUDE.md` §2).
      **Fix:** correct the layer text in Figma (and wherever this option list ends up content-managed —
      likely Notion once the Contact form is wired up). (`components/Input.md` §3b.)

- [ ] **Undocumented color `#080D00` on form field labels** (found 09-12, documenting the Contact Form
      Block, node `60:1006`). Field labels and the required-field `*` use a color the export reports as
      `Content/Active/Primary` / `"Dark 900"` = `#080D00` — not in any of the three Design.md
      collections (Primitives/Semantic/Context), and not the same hex as the near-identical
      `Body/Content/Primary` (`#151612`) used everywhere else for dark text. **Fix:** confirm with
      Rodrigo whether this is an intentional distinct "label" role or a stray/duplicate value that
      should just be `Body/Content/Primary`; if intentional, add it to the Context collection with a
      real name. (`components/Input.md` §2, `Design.md` §2.)

- [ ] **Portuguese placeholder copy in the Blog Grid sidebar — English text decided 09-12.** The
      newsletter-signup widget in the Full List sidebar (node `96:1432`) reads "Deixe seu email." and
      "Inscreva-se" (Portuguese) — every other string in the file is English. Rodrigo confirmed (09-12)
      this is placeholder-only for now (not final copy) but should read in English. **Decided
      placeholder strings:** email field placeholder → **"Your email"** (matches the Contact form's
      placeholder convention, `components/Input.md`); button label → **"Subscribe"**. **Fix:** set
      these two text layers in Figma. (`sections/BlogGrid.md` §6.)

- [ ] **Off-scale image radius (`2.545px`) on all Blog Post Cards — confirmed wrong, correct value
      decided 09-12.** Every card image (node `97:5364`) uses a corner radius of `2.545px` — not a
      Round Corners token. Rodrigo confirmed (09-12): **it should be `Scale/1` (4px)**, i.e.
      `Round Corners/small` — not `x-small` (2px) as originally guessed in this doc. **Fix:** in
      Figma, set every card-image frame's corner radius to bind to `Round Corners/small` (4px) across
      all types/states (Recent, Latest, Popular thumbnail, Full List — Default and Hover).
      (`components/BlogPostCard.md` §4.)

---

## Fixed

- [x] **"Mona Sans" in type styles** (fixed 12-08) — Rodrigo repassed all text styles one by one; no
      more Mona Sans / Roboto. All type is Plus Jakarta Sans (headings/display) + Inter (body/caption).
      "Heading+Indent" set also removed (redundant; handled as layout).
- [x] **Pricing Card — price color** (fixed & confirmed 09-11) — the price (€490 / €1,490) now binds
      to `Body/Content/Primary` (`#151612`) instead of the off-system `#21272A` ("CoolGray/90").
      Verified against node `51:406` across all four Type×State variants. (`components/PricingCard.md`.)
