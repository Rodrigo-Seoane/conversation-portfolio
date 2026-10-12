# Component: Testimonial (Slider + Card)

<!-- Follows the component template established in Button.md (10 sections).
     Two related components share atoms (Client Avatars, Client Company Icon):
       A) Testimonial/Slider — wide, horizontal (for a slider/carousel)
       B) Testimonial Card — narrow, vertical (a standalone quote card) -->

> **Source of truth:** Figma `SQxK0aLPYfOCGVCUUnjzm6` ("RS 2026 | Design System"), section `46:1407`.
> Values extracted, not inferred. Applies `Design.md` Context tokens.
> Note: code shows "Mona Sans" — export artifact; fonts are Plus Jakarta (heading) + Inter (body).

---

## 1. Purpose & when to use

Displays a client testimonial. Two forms, same data source (**Testimonials** Notion DB — reusable,
`content-inventory.md`):

- **Testimonial/Slider** — wide horizontal layout, for a slider/carousel (one quote at a time,
  full-width). Use on Home / About where a rotating testimonial gets prominence.
- **Testimonial Card** — narrow standalone card (342px), for grids or alongside content. Has a
  headline/title and an accent border — more "pull-quote" than the slider.

Both pull from the same people (avatars + company logos are shared atoms), so a testimonial written
once can appear in either form.

---

## 2. Anatomy

**Shared atoms:**
- **Client Avatars** — 96px (slider) / 48px (card) round photo, with a **brand overlay**:
  `rgba(255,209,21,0.61)` yellow at `mix-blend-overlay` (the signature gold tint on faces).
- **Client Company Icon** — company logo (Axa, Urbact, We Tribu, ATS, Bennit, IFC...), 134×64.

**A) Testimonial/Slider** (960×224, horizontal):
```
┌────────────────────────────────────────────┐
│ [avatar]    NAME (H2)                        │
│ [logo]      Position (Body XL semibold)      │
│             Testimonial text (Body Regular)  │
└────────────────────────────────────────────┘
   gap Spacing/large (24), padding 24, avatar+logo column left
```

**B) Testimonial Card** (342 wide, vertical):
```
┌──────────────────────────┐
│ "  (quote mark)          │
│ Title (H4)               │
│ Testimonial (Body Reg)   │
│ [avatar] POSITION        │
│          Name (Body XL)  │
└──────────────────────────┘
   gap 24, padding 20, radius 8, 4px accent border, subtle drop-shadow
```

---

## 3. Variants

- **Slider:** `Photo` = True / False (with or without the avatar).
- **Card:** single form (title + quote + author).
- **Atoms:** Client Avatars (8 people: Pablo, Aurelie, Javi, Stina, Paul, Katherine, Martin, Arnaldo);
  Client Company Icon (6+ companies). In production these are **data** from the Testimonials DB.

---

## 4. Tokens used (Context layer — see `Design.md` §2)

**Slider:**
| Property | Token |
|---|---|
| Text (all) | `Body/Content/Primary` (`#151612`) |
| Name | Heading/H2 (24/30) |
| Position | Body/Extra Large SemiBold (18/28) |
| Testimonial | Body/Regular (14/20) |
| Padding / gap | 24 / Spacing/large (24) |
| Avatar | 96px round, gold overlay |

**Card:**
| Property | Token |
|---|---|
| Background | `Surfaces/Section/Featured` (`#FFF6D0`, cream) |
| Border | `Body/Content/Accent` (`#EF8C48`, orange), 4px |
| Shadow | `0 4px 8px rgba(130,130,130,0.15)` |
| Title | Heading/H4 (18/24) |
| Quote text | Body/Regular (14/20) |
| Position | Body/Small ExtraBold (12, uppercase, ls Scale/0.25) |
| Name | Body/Extra Large SemiBold (18/28) |
| Text color | `Body/Content/Primary` |
| Padding / gap / radius | 20 / 24 / Spacing/small (8) |
| Avatar | 48px round, gold overlay |

> ⚠️ The card's `body/content/primary` showed hex `#1A1502` in code vs `#151612` elsewhere — token is
> correct, value reconciles at export. Use the token, not the hex.

---

## 5. Props / API (proposed — confirm at implementation)

```ts
type TestimonialData = {           // from the Testimonials Notion DB
  name: string;
  position: string;
  quote: string;
  title?: string;                  // card only (the headline pull-quote)
  avatarUrl: string;               // Supabase Storage (NOT raw Notion — 1h expiry)
  companyLogoUrl?: string;         // slider shows a company logo
};

type TestimonialSliderProps = TestimonialData & { photo?: boolean };
type TestimonialCardProps = TestimonialData;  // title used here
```

---

## 6. Behaviour & states

- **Slider:** the rotation/carousel behavior is a layout concern (the slider container), not this
  component — this renders one testimonial. Photo on/off is a variant.
- **Card:** static. (A `Button/hover` drop-shadow effect exists in the file — confirm if the card lifts
  on hover like the Blog Post Card, or stays static.)

---

## 7. Content rules

- Quotes are real client words — never fabricate or heavily edit (`CLAUDE.md`: authenticity).
- Card `title` is a short pulled highlight of the quote ("Immediate value for customers."), not a
  separate claim — derive it from the testimonial's substance.
- Position renders uppercase (card) — don't uppercase in the CMS.
- Keep slider quotes to a readable length; very long quotes suit the slider (more width) over the card.

---

## 8. Accessibility

- Avatar `<img>` needs `alt` = person's name.
- The decorative quote mark (") and the gold overlay are decorative → not announced.
- In the slider/carousel: provide controls, pause-on-focus, and don't auto-advance too fast
  (WCAG — user must be able to stop moving content).
- Company logo needs `alt` = company name.

---

## 9. Never do (component-specific)

- **Never** render raw Notion avatar/logo URLs — use Supabase Storage (1h expiry, `CLAUDE.md`).
- **Never** fabricate or materially edit a quote — testimonials are real proof.
- **Never** drop the gold overlay on avatars — it's the brand treatment tying faces to the palette.
- **Never** auto-advance the slider without a pause/stop control (accessibility).
- **Never** hardcode the accent border / cream bg hex — use `Body/Content/Accent` + `Surfaces/Section/Featured`.

---

## 10. Figma reference

- File: `SQxK0aLPYfOCGVCUUnjzm6`, section `46:1407`.
- Testimonial/Slider (`46:1099`): Photo=True (`46:1100`), Photo=False (`46:1110`).
- Testimonial Card (`46:1391`).
- Atoms: Client Avatars (`46:1335`), Client Company Icon (`46:1282`).

---

## Open items
- [ ] Confirm whether Testimonial Card has a hover-lift (a `Button/hover` shadow effect is present in file).
- [ ] Confirm Slider Photo=False layout (extracted Photo=True).
- [ ] Avatar gold overlay: confirm exact token/recipe (`rgba(255,209,21,0.61)` mix-blend-overlay).
