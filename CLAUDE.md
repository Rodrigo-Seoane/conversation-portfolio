# CLAUDE.md — Operating Manual for conversational-portfolio

> **What this file is:** the root context an AI agent reads before working in this repository.
> It defines the business, the audience, the stack, the architecture rules, and what the agent
> may and may not do on its own. Read this first, every session.
>
> **Companion docs:** `Design.md` (design principles + guardrails, mirrored from `rodrigoseoane-2026`
> — see its header for the sync protocol), `DRIFT.md` (fixes applied to the mirrored design system
> on import), `kickoff-conversational-portfolio.md` (the full project brief — this file is derived
> from it; the brief is authoritative on scope and phasing), `components/*.md` (one per reused
> design-system component), `docs/conversation-spec.md` (Phase 3, intent/persona/card map).

---

## 1. The project in one paragraph

A conversational portfolio for Rodrigo Seoane (Senior Product Designer / Design Lead, 25+ years,
B2B SaaS). A visitor asks a question in a chat; the site answers with a short text framing plus a
**structured UI card chosen for that intent** — a case-study card is not a pricing card, and neither
is a location/timezone card. **This is not a chatbot.** The LLM's job is strictly: (1) classify
intent and infer the visitor's profile, (2) pick a card (a tool call), (3) fill that card from an
approved knowledge base (KB) and write at most three sentences of framing. It never states a fact
about Rodrigo that isn't in the KB; when the KB has no approved answer, it says so and offers a way
to contact Rodrigo. The guardrails are themselves part of the demo — a portfolio that visibly
refuses to invent is the point.

## 2. Business goals

Two goals, both real, neither subordinate to the other:
1. **Sell product design services** — the site's conversion paths (CTAs, contact) are load-bearing.
2. **Demonstrate AI capability** — the structured-card, KB-grounded, never-invents pattern *is* the
   pitch. Don't trade guardrail rigor for a smoother-sounding chatbot; the rigor is the feature.

**Visitors:** Recruiters (R), Product Leaders (PL), Founders / SMB owners (O) at B2B scale-ups and
start-ups with 2–50 people. Persona is inferred from the opening trigger chips or free text, and it
changes the CTA and the depth of an answer — **never the facts**.

## 3. Repo relationship to `rodrigoseoane-2026`

This is a separate, new repo — different runtime (LLM API, server routes, secrets, rate limiting),
separate deploy, and the old site is mid-build. The design system is **copied, not shared**:
`Design.md`, `figma-fixes.md`, `styles/tokens.css`, `AGENTS.md`, and a subset of `components/*.md` +
`components/ui/*.tsx` were mirrored in on 2026-10-12 (commit
`aae5036a2d7f20c8a378e6a6298b85dcb36384a6` of `rodrigoseoane-2026`), with known drift fixed on
import — see `DRIFT.md` for exactly what changed and what to backport. The live Figma reference
file for *this* repo is `Figma JSON/figma-export.json` (exported 2026-10-12, superseding the
mirrored 12-09 export, which is kept for history at `Figma JSON/archived/figma-variables-12-09.json`
— see `Design.md`'s provenance note).

> **Component status (2026-10-12):** the mirrored `components/ui/*` were built for the old static
> site, not this chat UI. The foundations — color, typography, and the 4px Scale grid — are what
> must be kept faithful to Figma; the existing components are a reference, not a locked library, and
> should be expected to need rework. Which chat-specific cards are genuinely new is Phase 3's job
> (`docs/conversation-spec.md`'s "Card inventory" section) — don't treat the 8 mirrored components as
> the final card set.

> **`rodrigoseoane-2026` is read-only for this project.** Never modify it, never commit to it, never
> run git commands in it. If a design-system fix is needed, make it here and log it in `DRIFT.md`
> for Rodrigo to backport manually.

**Remote:** `https://github.com/Rodrigo-Seoane/conversation-portfolio.git` — note the name mismatch
with the local folder (`conversational-portfolio`); both stay as they are, don't rename either.
**Visibility:** public (`gh repo view --json visibility`, checked 2026-10-12). Because of that:
**no `internal` or `confidential` KB entry may be committed.** Those entries live in
`content/kb/internal/`, which is git-ignored (see `.gitignore`); the build must work without that
folder present.

## 4. Target audience & the customer's problem

Same three personas as §2. What each is actually trying to resolve when they land in the chat:
- **Recruiter:** "Is this person real / qualified / available, and what's it going to cost?"
- **Product Leader:** "Has this person solved a problem shaped like mine, and how did it go?"
- **Founder/SMB owner:** "Can this person diagnose *my* specific situation, cheaply enough, soon
  enough?"

**Implications:**
- Proof over adjectives — metrics, before/after, and outcomes earn their space; "passionate" /
  "seamless" / "user-centric" do not (ties to `Design.md` §1 principle 1).
- A visitor is evaluating whether Rodrigo can diagnose *their* problem — let relevant cases
  self-select via intent, don't make them dig.
- When evidence doesn't exist (e.g. "does he have fintech experience?"), the assistant says so. That
  refusal is a feature, not a gap to paper over.

## 5. Stack & architecture

- **Framework:** Next.js App Router, same major version as `rodrigoseoane-2026` (16.x), TypeScript,
  Tailwind v4, `@phosphor-icons/react`. Read `node_modules/next/dist/docs/` before writing Next code —
  this version has breaking changes from training-data Next.js (see `AGENTS.md`).
- **AI layer:** Vercel AI SDK with the Anthropic provider — streaming responses, tool calls rendered
  as React components. Check current SDK docs rather than relying on memory for API names.
- **Model:** read from the env var `CHAT_MODEL` — **never hardcode a model string in code.** Default
  `claude-sonnet-5`; cheaper fallback `claude-haiku-4-5`. (The kickoff brief named
  `claude-sonnet-5-5` / `claude-haiku-5-5` — those aren't real model IDs; corrected here, flagged at
  Checkpoint 1.)
- **Knowledge base:** versioned files under `content/kb/` for the MVP (Phase 2), validated with zod
  at build time. Notion sync is a later phase, explicitly not part of this build.
- **Supabase:** optional in the MVP — only the anonymous question log (Phase 6). URL is public-safe
  to document; keys are secrets (§6).
- **Hosting:** Vercel, preview deploys only until Rodrigo approves production (Phase 6).

**The core architectural rule:** the model never writes card content. Tool arguments are **KB ids**,
never free text — the server resolves ids to data. Guardrails live in code, not only in the prompt:
the server builds model context from `visibility: "public"` KB entries only; `internal` and
`confidential` items never leave the server; any fact whose `status` isn't `documented` renders as
the designed "pending" state regardless of what the model says.

## 6. What the agent may / may not do

**May do autonomously:**
- Implement phases in order, following `kickoff-conversational-portfolio.md`, and stop at each ⛔
  checkpoint for approval.
- Draft and edit code-layer content (components, layouts, styles, KB schema) following `Design.md`.
- Fix design-system drift found while implementing — log it in `DRIFT.md`, don't silently carry it
  forward or silently fix it in `rodrigoseoane-2026`.
- Propose changes with clear reasoning; surface tradeoffs rather than guessing confidently.

**Must ask before doing:**
- Adding a new component not covered by the reused set in `components/*.md` — new components need
  explicit approval (checkpoint 3 covers the MVP's new-component list as a batch).
- Anything touching deploy config, environment variables, or production domains.
- Publishing or pushing live content, or merging to `main`.
- Filling a `pending`/`proposed` KB fact, upgrading a claim (e.g. "contributed" → "led"), or inferring
  availability/rate/start date — these are Rodrigo's open decisions (§8); the pending-state UX covers
  them, it doesn't need an agent's best guess.

**Must never do:**
- State a fact that isn't in the KB.
- Expose internal/confidential data — including any Pronetx/Caylent module, client, or product name —
  outside the server, or in a public-repo-committed file.
- Invent tokens, colors, or raw hex/px in components (`Design.md` §5).
- Modify `rodrigoseoane-2026`.
- Commit secrets (`.env*` — check `git status` before every commit) or internal/confidential content
  to this public repo.
- Push to `main` or force-push, under any circumstance.
- Present a published metric as a causal outcome of design work (it's correlational at best until
  Rodrigo confirms the measurement method — see `content/kb` `measurementStatus` field, Phase 2).

## 7. Working conventions

- **Branching:** `main` holds only checkpoint-approved work. Each phase's work goes on
  `phase-N-<slug>`. At each ⛔ checkpoint, push the branch and open a PR with `gh` — Rodrigo merges
  it. Never push directly to `main`; never force-push.
- **Checkpoints are real stops.** When `kickoff-conversational-portfolio.md` marks a ⛔, finish that
  phase's listed deliverables, present them, and wait — don't continue into the next phase on the
  same turn.
- **When unsure, surface it.** An honest "here's the tradeoff" beats confident guessing — especially
  around KB facts, measurement claims, and anything touching Pronetx/Caylent confidentiality.
- **Prefer the design system.** Check `components/*.md` before proposing a new component; document a
  genuine gap rather than improvising one.
- **Design.md is a snapshot, Figma is truth.** Re-sync via variable export, never by hand-editing
  values; if a component needs a token not in `Design.md`, that's a stale-doc signal, not permission
  to invent one.

## 8. Open items (living list — update as resolved)

- [x] Phase 1 scaffold — Next.js + Tailwind v4 + TypeScript, design system mirrored, 7 drift items
      fixed (`DRIFT.md`), repo visibility confirmed public.
- [ ] Phase 2 — Knowledge base (`content/kb/*.json`, zod schema, `PENDING.md`). Blocked on reading the
      Notion inventory ("Inventário de Conteúdo — Portfolio Conversacional") via the Notion MCP.
- [ ] Phase 3 — Conversation design spec (`docs/conversation-spec.md`), no code.
- [ ] Phase 4 — Build the actual chat UI, server route, system prompt, guardrails-in-code.
- [ ] Phase 5 — Evals (`evals/questions.json` + pass/fail runner).
- [ ] Phase 6 — Optional logging (Supabase) + Vercel preview deploys.

**Rodrigo's open decisions (not the agent's to resolve — the KB's `pending` state covers all of
these until he does):** day rate / salary expectation, availability & start date, daily overlap
window; what Pronetx/Caylent authorizes for publication; final wording for published metrics (Atlas,
Atlas Optimise, AXA "43%"); whether the public location stays "Barcelona"; the positioning headline
(Senior Product Designer vs. Design Lead vs. Product Design & Strategy).

## 9. Source provenance

- **`kickoff-conversational-portfolio.md`** — the project brief. Authoritative on scope, phasing, and
  the must-never list; this file restates it for day-to-day agent context but defers to the brief if
  they ever disagree.
- **`rodrigoseoane-2026`** (`Design.md`, `CLAUDE.md` §4/§5/§6, `styles/tokens.css`, `AGENTS.md`,
  `components/*`) — mirrored 2026-10-12 @ commit `aae5036a2d7f20c8a378e6a6298b85dcb36384a6`, drift
  fixed per `DRIFT.md`. Read-only source for this project going forward.
- **Notion** ("Inventário de Conteúdo — Portfolio Conversacional") — the content source for Phase 2,
  not yet fetched as of this file's writing.
