# KB Pending Items — Phase 2

Generated 2026-10-12 from `content/kb/*.json` and the Notion inventory
("Inventário de Conteúdo — Portfolio Conversacional"). Grouped by the inventory's §8 priorities.
Nothing here has been filled in or guessed — per the kickoff brief, filling a `pending` value,
upgrading a claim, or inferring availability/rate/dates is Rodrigo's call, not the agent's.

## Priority 1 — Authorization and detail for recent (Pronetx/Caylent) work

- [ ] Which parts of the Pronetx/Caylent work can be mentioned publicly, including the client/product name?
- [ ] For each recent case (A–G), what was Rodrigo's role — lead, co-owner, contributor, or reviewer?
- [ ] Which Figma files, prototypes, specs, or research pages can serve as public evidence?
- [ ] What exactly did "deployed" mean for the Design System Portal (`case-a-design-system-pronetx-caylent`): environment, scope, users, release?
- [ ] Were the Figma-documentation / Jira-management AI agents used in production? What did they do, and what benefit was observed?
- [ ] Was the DFC sandbox proposal (`case-c-dfc-discovery-safe-onboarding`) adopted? What happened to the Path Tester dependency?

*Blocks:* publishing any detail about Cases A–G or L (`content/kb/internal/cases-internal.json`) outside the server.

## Priority 2 — Evidence of impact

- [ ] Are there validated metrics for onboarding, the Design System, WFM, CxAssist, Campaigns, or the AI-assisted workflow (Cases A–G)?
- [ ] For Atlas (`case-h-atlas-onboarding`) and Atlas Optimise (`case-j-atlas-optimise`): what is the methodology, baseline, period, sample, and attribution behind the published metrics (+10.2 SUS, +53% sales, -40% UI debates, +31% retention, 16% leads)?
- [ ] What exactly does the "43%" metric in the AXA case (`case-i-axa-go-agent-sales-coach`) measure?
- [ ] What is the authorized, approved wording for each public result?

*Current state:* all three public cases (H, I, J) carry `status: "review_before_publish"` and every result carries `measurementStatus: "published_method_pending"` — the pending-fact UX (Phase 3) must render these results as published-but-unverified, never as proven causal outcomes (CLAUDE.md §6 must-never).

## Priority 3 — Commercial and positioning

- [ ] Primary positioning: Senior Product Designer, Design Lead, or Product Design & Strategy? How should "Revenue Recovery Specialist" (if at all) be framed? (`fact-positioning-headline`, currently `status: "proposed"`)
- [ ] Current day rate / hourly or monthly rate and accepted currencies (`fact-rate-day-rate`)
- [ ] Salary expectation for permanent employment (`fact-rate-salary-expectation`)
- [ ] Current availability (`fact-availability-current`)
- [ ] Start date (`fact-availability-start-date`)
- [ ] Daily collaboration / overlap window (`fact-availability-overlap-window`)
- [ ] Conditions, taxes, scope, and real availability of the published engagement models (Embedded Designer, Advisory Retainer, Workshop Facilitation)
- [ ] Are the UX Pulse Check prices and turnaround times (`offer-ux-pulse-check`) still valid? What is the correct delivery promise — the page's "3 days" claim conflicts with the per-package turnaround (3–5 / 7–10 business days)?
- [ ] Is the 15–30% "recovery range" in UX Pulse Check a hypothesis, an observation, or a proven result?
- [ ] Which cases should be prioritized for recruiters, Product Leaders, and founders respectively?
- [ ] Does the public location stay "Barcelona"? (`fact-location`, currently `status: "documented"` based on the current public site — flagged in CLAUDE.md §8 as one of Rodrigo's open decisions)

## All `pending` facts (public KB)

| id | key | source |
|---|---|---|
| `fact-availability-current` | `availability.current` | Inventário §6, §8 P3 |
| `fact-availability-start-date` | `availability.startDate` | Inventário §6, §8 P3 |
| `fact-availability-overlap-window` | `availability.overlapWindow` | Inventário §6, §8 P3 |
| `fact-rate-day-rate` | `rate.dayRate` | Inventário §5, §8 P3 |
| `fact-rate-salary-expectation` | `rate.salaryExpectation` | Inventário §5, §8 P3 |

## All `pending` items (internal KB — never committed)

| id | key | source |
|---|---|---|
| `fact-internal-pronetx-caylent-publication-authorization` | `confidential.pronetxCaylentPublicationAuthorization` | Inventário §6, §8 P1 |

## All `review_before_publish` items

| id | item | what needs resolving |
|---|---|---|
| `case-h-atlas-onboarding` | Atlas Onboarding results | SUS/+53%/-40% claims — method, baseline, causality |
| `case-i-axa-go-agent-sales-coach` | AXA GO results, incl. "43%" | role attribution in this specific case; metric definition |
| `case-j-atlas-optimise` | Atlas Optimise results | +31% retention, 16% leads — method, attribution |
| `offer-ux-pulse-check` | Pricing/turnaround/claims | "3 days" vs. per-package turnaround conflict; 15–30% range status |

## All `proposed` items (editorial wording awaiting approval)

- `fact-positioning-headline` — recommended positioning headline (not yet approved).
- `process-observed-recent-work` — the 7-step process is an editorial synthesis of monthly summaries, not yet confirmed as Rodrigo's standard process.
- All 12 entries in `answers.json` — every "Resposta proposta" from the inventory's question map, translated to English and normalized to third person. None are approved yet.

## Translation notes (per the "flag meaning-changing translations" rule)

The following source sentences were first person ("eu", "posso", "precisamos") in the inventory and
were normalized to third person ("Rodrigo's assistant" voice) for `answers.json`, per the kickoff
brief's explicit instruction to normalize first-person slips (it names Q12 as the example, but Q2,
Q4, Q5, Q6, and Q9 also slip into first person in the source):

- **Q2** (budget/recruiter): "Ainda não tenho..." → "There's no confirmed current salary expectation yet." No factual change — only grammatical person.
- **Q4** (segment/PL): "Posso comparar... mas não afirmar" → "Similar problems and workflows can be compared, but experience in a specific sector won't be claimed without evidence." Also omitted the inventory's named workflow areas (WFM, DFC, Campaigns) per CLAUDE.md §6 — the internal module names must not appear in a public-committed file, even as context.
- **Q5** (situation/PL): "Posso mapear o sintoma..." → "The symptom can be mapped to an example..." No factual change.
- **Q6** (time-to-value/PL): "Eu combinaria marcos..." → "Rodrigo would agree on milestones..." No factual change.
- **Q9** (proof/founder): "precisamos de métricas..." → "clear metrics...are needed" (passive, avoids a first-person-plural claim on Rodrigo's behalf). No factual change.
- **Q12** (process/founder), flagged explicitly by the kickoff brief: "Eu começaria alinhando..." → "Rodrigo would start by aligning..." No factual change.

No translation introduced a change in meaning beyond person/voice; all other sentences translate directly.

## Open note for Checkpoint 2

- `answers.json`'s `card` values (e.g. `profile-summary-card`, `diagnosis-card`, `location-timezone-card`) are **provisional labels**, not an approved component list — Phase 3 (`docs/conversation-spec.md`) is the actual card-inventory exercise and may rename, merge, or split these.
- Cases A–G and L live only in `content/kb/internal/cases-internal.json` (gitignored). The only public statements about this recent work are the generic platform descriptor and the capability list (`capabilities.json`) — consistent with CLAUDE.md §3 and §6.
