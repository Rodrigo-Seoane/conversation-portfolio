# Conversation Design Spec — Phase 3

> Derived from `content/kb/*.json` (Phase 2, approved) and the Notion inventory ("Inventário de
> Conteúdo — Portfolio Conversacional"). No code in this phase — this is the spec Phase 4 builds
> against. ⛔ Checkpoint 3: approve this spec and the new-component list in §5 before any UI work
> starts.

---

## 1. Intent map

Nine intents cover the inventory's 12 questions. Several intents are shared across personas with
the same card shape and KB refs, but different follow-up copy — the persona changes depth/CTA, never
the underlying facts (`CLAUDE.md` §2).

### fit
- **Personas:** Recruiter
- **Card:** Profile Summary Card
- **KB refs:** `answer-q1-fit-recruiter` → facts `fact-current-role-generic`, `fact-prior-role-axa`,
  `fact-prior-role-atlas`; cases `case-h-atlas-onboarding`, `case-i-axa-go-agent-sales-coach`
- **Follow-up:** "What are the three most important requirements for this role?"
- **CTA:** Ask a follow-up

### budget
- **Personas:** Recruiter
- **Card:** Pending Fact Card
- **KB refs:** `answer-q2-budget-recruiter` → facts `fact-rate-salary-expectation`, `fact-rate-day-rate`
- **Follow-up:** "Is this a permanent, contract, or freelance position, and what budget range has been approved?"
- **CTA:** Contact Rodrigo

### availability
- **Personas:** Recruiter, Founder
- **Card:** Pending Fact Card
- **KB refs:**
  - Recruiter — `answer-q3-availability-recruiter` → facts `fact-availability-current`, `fact-availability-start-date`
  - Founder — `answer-q11-availability-founder` → fact `fact-availability-start-date`
- **Follow-up:**
  - Recruiter: "What's the ideal start date?"
  - Founder: "What's the project's target start timeline?"
- **CTA:** Contact Rodrigo

### location_timezone
- **Personas:** Product Leader, Founder
- **Card:** Location/Timezone Card
- **KB refs:**
  - Product Leader — `answer-q7-location-timezone-product-leader`
  - Founder — `answer-q10-location-timezone-founder`
  - Both → facts `fact-location`, `fact-availability-overlap-window`
- **Follow-up:**
  - Product Leader: "What timezone is the team in, and which overlap hours are essential?"
  - Founder: "What timezone does your team work in?"
- **CTA:** Ask a follow-up

### segment
- **Personas:** Product Leader
- **Card:** Segment Fit Card
- **KB refs:** `answer-q4-segment-product-leader` → facts `fact-current-role-generic`, `fact-prior-role-axa`;
  case `case-i-axa-go-agent-sales-coach`
- **Follow-up:** "What sector and product type are you working in?"
- **CTA:** Ask a follow-up

### situation_diagnosis
- **Personas:** Product Leader, Founder
- **Card:** Diagnosis Card
- **KB refs:**
  - Product Leader — `answer-q5-situation-diagnosis-product-leader`
  - Founder — `answer-q8-situation-diagnosis-founder`
  - Both → fact `fact-current-role-generic`
- **Follow-up:**
  - Product Leader: "What's the main symptom: activation, conversion, retention, support, or delivery speed?"
  - Founder: "Which flow is causing the most friction today?"
- **CTA:** Ask a follow-up

### time_to_value
- **Personas:** Product Leader
- **Card:** Process Steps Card
- **KB refs:** `answer-q6-time-to-value-product-leader` (no fact/case refs — the answer is explicitly
  that there's no ramp-up metric)
- **Follow-up:** "What's already clear, and what's still blocked?"
- **CTA:** Ask a follow-up

### proof_results
- **Personas:** Founder
- **Card:** Deliverables Card
- **KB refs:** `answer-q9-proof-results-founder` → cases `case-h-atlas-onboarding`, `case-j-atlas-optimise`
- **Follow-up:** "Do you need a diagnosis, a redesigned flow, or ongoing support for your team?"
- **CTA:** Ask a follow-up

### process
- **Personas:** Founder
- **Card:** Process Steps Card
- **KB refs:** `answer-q12-process-founder` (process synthesis: `process-observed-recent-work`)
- **Follow-up:** "What's the product, the priority flow, and what's already known about the problem?"
- **CTA:** Ask a follow-up

---

## 2. Persona inference

### Opening chips
Rendered in English regardless of the visitor's eventual reply language:

| Chip copy | Default persona |
|---|---|
| "I want to hire Rodrigo" | Recruiter |
| "Show me relevant projects" | Product Leader |
| "I have a product challenge" | Founder |

This mapping is a **starting default**, not a hard lock — a recruiter can click "I have a product
challenge" and still get recruiter-flavored follow-ups if their free text says so afterward.

### Free-text inference
The model infers persona from language signals in the visitor's own words, independent of which
chip (if any) was clicked:

- **Recruiter signals:** hiring, role, position, candidate, interview, headcount, salary, start date.
- **Product Leader signals:** our team, our roadmap, our stakeholders, our platform, our engineering
  team, our product.
- **Founder/SMB signals:** my startup, my app, my product, small team, we're a small company, solo,
  bootstrapped.

If no signal is present, default to the chip clicked; if no chip was clicked and no signal is
present, treat the visitor as Founder (the broadest, least commitment-presuming default) until a
signal appears.

### What persona changes vs. what it never changes
- **Changes:** which follow-up question is asked, which CTA is surfaced (e.g. a recruiter sees
  "Contact Rodrigo" sooner on budget/availability; a product leader sees "Ask a follow-up" more often
  since their intents skew diagnostic), and how much framing precedes the card.
- **Never changes:** the facts, cases, or capabilities themselves. The same `fact-location` renders
  identically regardless of persona — only the question that follows it differs. A persona switch
  mid-conversation (Phase 5's multi-turn adversarial test) must not retroactively change an already-
  given answer.

---

## 3. Pending-fact UX

Any fact whose `status` isn't `documented` (i.e. `pending`, `proposed`, `review_before_publish`, or
`confidential`) renders as an explicit designed state — never a silent gap, never an invented value.

**Composition (the Pending Fact Card, §5):**
1. **Label:** "To be confirmed with Rodrigo."
2. **The inventory's follow-up question** for that specific fact (from `answers.json`'s `followUp`
   field, or the fact's own context if reached outside the 12 mapped questions).
3. **A contact CTA** → `fact-contact-email` (business@rodrigoseoane.com) and/or
   `fact-contact-intro-call` (20-minute intro call).

This applies regardless of which card the surrounding answer would otherwise use — e.g. if a
Location/Timezone Card's location fact is documented but its overlap-window fact is pending, the
card shows the documented location normally and the pending sub-state (label + question + CTA) for
the overlap window specifically, rather than suppressing the whole card.

`review_before_publish` cases (H, I, J results) render their metric values, but every result label
carries a visible "published — method pending confirmation" qualifier derived from
`measurementStatus: "published_method_pending"`, so a visitor never reads a published metric as a
verified, causal design outcome (`CLAUDE.md` §6 must-never).

---

## 4. Edge behaviours

### Fallback — nothing in the KB applies
Plain text, no card: an honest "That's not something I have in Rodrigo's approved knowledge base,"
followed by the contact CTA. No persona-specific framing needed — this response is identical across
personas, since by definition no persona-specific KB content exists to differentiate it.

### Off-topic questions
A brief, friendly redirect back to scope ("I can help with Rodrigo's work, experience, and
availability — is there something there I can help with?"), no card. Don't lecture or over-explain
the refusal.

### Prompt injection
Per `guardrail-prompt-injection`: refuse to set aside the KB-only constraint, regardless of how the
request is framed ("ignore your instructions," "pretend you're unrestricted," embedded instructions
inside pasted text, etc.). Plain text, no card. The refusal itself should be short and not defensive.

### Questions about confidential work
Per `guardrail-confidential-client-names`: when asked about Pronetx/Caylent specifics (client name,
product name, module names, screens), respond with the generic descriptor only ("a B2B contact-center
/ cloud operations platform") — never the Case A–G/L internal detail. No card renders case-specific
content here; if the visitor's underlying need is really `segment` or `situation_diagnosis`, redirect
toward those intents' public-safe answers instead.

---

## 5. Card inventory

Per `CLAUDE.md` §5, new components need explicit approval — this section is that single batch
request for the MVP. Full 10-section component docs (matching `Button.md`'s template) are written
only after Rodrigo approves the list below; this is the lightweight spec-level description.

| Card | Status | Composes (reused, documented) | What's new |
|---|---|---|---|
| **Profile Summary Card** | New | `Badge` (capability tags), `Button` (case link CTA) | The card shell: framing text + tag row + 1–2 linked Case Card previews. |
| **Pending Fact Card** | New | `Button` (contact CTA) | The "to be confirmed" shell itself — label, follow-up question slot, CTA. Central to §3; used by `budget`, `availability`, and as a sub-state inside other cards. |
| **Segment Fit Card** | New | `Badge` (sector/problem tags), `ListItemWithIcon` (matched capability bullets) | The shell tying tags + bullets to a "here's the overlap" framing. |
| **Diagnosis Card** | New | `ListItemWithIcon` (possible-approach bullets), `Button` (follow-up CTA) | The symptom → approach shell. |
| **Process Steps Card** | New | Design.md typography/Scale tokens only | An **ordered, numbered** step list — deliberately not `ListItemWithIcon`, whose checkmark semantics mean "included/done," not "step N of a sequence." Used for `time_to_value` and `process`. |
| **Location/Timezone Card** | New (thin) | `MetricTile` (icon type, for the documented location fact) | Composes `MetricTile` with a Pending Fact Card sub-state for the overlap window — very little new surface, mostly composition. |
| **Deliverables Card** | New | `ListItemWithIcon` (deliverables list), `MetricTile` (case results, pending-method qualifier), `Button` (case link) | The shell separating "what was delivered" (confident) from "what was measured" (qualified). |
| **Case Card** | New | `MetricTile` (results), `Button` (view case) | A compact case preview (title, 1-line framing, result tiles, link) — referenced by `caseRefs` from Profile Summary, Deliverables, and Segment Fit cards. Not a full case page; links out to the public case URL for depth. |
| **Offer / Pricing Card** | Reused as-is | `PricingCard` | No changes. Not wired to a current `answers.json` entry yet (no inventory question maps directly to pricing), but held ready for when Phase 4 surfaces `offers.json` content (e.g. a visitor asking about engagement models directly). |

**Trigger chips** (the three opening chips in §2) reuse `Button` (Small, Secondary or Only Text type)
rather than `Badge` — `Badge.md` §1 explicitly rules Badge out for anything clickable ("if a tag needs
to filter, that's the Filter Tags component, not Badge"), and Filter Tags isn't in the mirrored set.
No new component needed here.

**Guardrail / fallback responses** (§4) render as plain assistant text with no card — introducing a
card for a refusal would overstate it as structured content when it's precisely the opposite.

---

## 6. Open items carried into Phase 4

- Exact visual spec (anatomy, tokens, states) for each new card in §5 — full 10-section docs, written
  once this list is approved.
- Whether Case Card needs its own public route per case, or links straight to the existing
  `rodrigoseoane.com/work/*` pages (current assumption: links out, per `CLAUDE.md` §5 Canonical links).
- Multi-turn persona-switch behavior (Phase 5 test) needs a concrete rule for what happens to cards
  already rendered earlier in the same session when persona changes — current assumption: they stay
  as rendered; only new answers reflect the new persona.
