import { answers, factsById, getCases, getFacts, guardrailsById, processDocs } from "./index";
import type { Answer, Case, Fact, Guardrail, Intent, Persona, ProcessDoc } from "./schema";

/**
 * One resolver per card type. Each takes only the enums the model is allowed to
 * send (intent/persona, or a guardrailId) and returns a plain, JSON-serializable
 * payload built entirely from the KB — the model never supplies card content
 * (CLAUDE.md's core architectural rule). If a lookup fails (shouldn't happen
 * given the tool input enums are derived from the KB itself), every resolver
 * falls back to the no-kb-match guardrail payload instead of throwing.
 */

const FALLBACK_GUARDRAIL_ID = "guardrail-no-kb-match";

export type CtaPayload = { label: string; href: string } | null;

/**
 * Resolves the `cta` string every Answer/Guardrail carries into something a card
 * can actually render — looked up from the KB's own contact fact, never
 * hardcoded. `ask_followup` has no button; the follow-up question text is
 * already in the payload and is enough on its own.
 */
export function resolveCta(cta: string | undefined): CtaPayload {
  if (cta !== "contact_rodrigo") return null;
  const email = factsById.get("fact-contact-email")?.value;
  if (!email) return null;
  return { label: "Contact Rodrigo", href: `mailto:${email}` };
}

export type GuardrailPayload = {
  topic: string;
  responseTemplate: string;
  cta: CtaPayload;
};

export function resolveGuardrail(guardrailId: string): GuardrailPayload {
  const guardrail: Guardrail =
    guardrailsById.get(guardrailId) ?? guardrailsById.get(FALLBACK_GUARDRAIL_ID)!;
  return {
    topic: guardrail.topic,
    responseTemplate: guardrail.responseTemplate,
    cta: resolveCta(guardrail.cta),
  };
}

function findAnswer(intent: Intent, persona: Persona): Answer | undefined {
  return answers.find((a) => a.intent === intent && a.persona === persona);
}

export type ProfileSummaryCardPayload = {
  followUp: string;
  cta: CtaPayload;
  facts: Fact[];
  cases: Case[];
};

export function resolveProfileSummaryCard(
  persona: Persona
): ProfileSummaryCardPayload | GuardrailPayload {
  const answer = findAnswer("fit", persona);
  if (!answer) return resolveGuardrail(FALLBACK_GUARDRAIL_ID);
  return {
    followUp: answer.followUp,
    cta: resolveCta(answer.cta),
    facts: getFacts(answer.factRefs),
    cases: getCases(answer.caseRefs),
  };
}

export type PendingFactCardPayload = {
  followUp: string;
  cta: CtaPayload;
  facts: Fact[];
};

export function resolvePendingFactCard(
  intent: "budget" | "availability",
  persona: Persona
): PendingFactCardPayload | GuardrailPayload {
  const answer = findAnswer(intent, persona);
  if (!answer) return resolveGuardrail(FALLBACK_GUARDRAIL_ID);
  return {
    followUp: answer.followUp,
    cta: resolveCta(answer.cta),
    facts: getFacts(answer.factRefs),
  };
}

export type SegmentFitCardPayload = {
  followUp: string;
  cta: CtaPayload;
  facts: Fact[];
  cases: Case[];
};

export function resolveSegmentFitCard(
  persona: Persona
): SegmentFitCardPayload | GuardrailPayload {
  const answer = findAnswer("segment", persona);
  if (!answer) return resolveGuardrail(FALLBACK_GUARDRAIL_ID);
  return {
    followUp: answer.followUp,
    cta: resolveCta(answer.cta),
    facts: getFacts(answer.factRefs),
    cases: getCases(answer.caseRefs),
  };
}

export type DiagnosisCardPayload = {
  followUp: string;
  cta: CtaPayload;
  facts: Fact[];
};

export function resolveDiagnosisCard(
  persona: Persona
): DiagnosisCardPayload | GuardrailPayload {
  const answer = findAnswer("situation_diagnosis", persona);
  if (!answer) return resolveGuardrail(FALLBACK_GUARDRAIL_ID);
  return {
    followUp: answer.followUp,
    cta: resolveCta(answer.cta),
    facts: getFacts(answer.factRefs),
  };
}

export type ProcessStepsCardPayload = {
  followUp: string;
  cta: CtaPayload;
  process?: ProcessDoc;
};

export function resolveProcessStepsCard(
  intent: "time_to_value" | "process",
  persona: Persona
): ProcessStepsCardPayload | GuardrailPayload {
  const answer = findAnswer(intent, persona);
  if (!answer) return resolveGuardrail(FALLBACK_GUARDRAIL_ID);
  // Only the `process` intent (inventory Q12) is actually about Rodrigo's process —
  // `time_to_value` (Q6) explicitly has no process doc to show, just the followUp/cta.
  // There's exactly one process doc in the KB; wiring it here (rather than adding an
  // unused processRef field to the Answer schema) avoids inventing KB structure for
  // a single fixed relationship.
  const process = intent === "process" ? processDocs[0] : undefined;
  return {
    followUp: answer.followUp,
    cta: resolveCta(answer.cta),
    process,
  };
}

export type LocationTimezoneCardPayload = {
  followUp: string;
  cta: CtaPayload;
  facts: Fact[];
};

export function resolveLocationTimezoneCard(
  persona: Persona
): LocationTimezoneCardPayload | GuardrailPayload {
  const answer = findAnswer("location_timezone", persona);
  if (!answer) return resolveGuardrail(FALLBACK_GUARDRAIL_ID);
  return {
    followUp: answer.followUp,
    cta: resolveCta(answer.cta),
    facts: getFacts(answer.factRefs),
  };
}

export type DeliverablesCardPayload = {
  followUp: string;
  cta: CtaPayload;
  cases: Case[];
};

export function resolveDeliverablesCard(
  persona: Persona
): DeliverablesCardPayload | GuardrailPayload {
  const answer = findAnswer("proof_results", persona);
  if (!answer) return resolveGuardrail(FALLBACK_GUARDRAIL_ID);
  return {
    followUp: answer.followUp,
    cta: resolveCta(answer.cta),
    cases: getCases(answer.caseRefs),
  };
}
