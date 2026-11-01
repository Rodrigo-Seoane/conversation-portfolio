import factsJson from "@/content/kb/facts.json";
import casesJson from "@/content/kb/cases.json";
import capabilitiesJson from "@/content/kb/capabilities.json";
import offersJson from "@/content/kb/offers.json";
import processJson from "@/content/kb/process.json";
import answersJson from "@/content/kb/answers.json";
import guardrailsJson from "@/content/kb/guardrails.json";
import {
  AnswersFileSchema,
  CapabilitiesFileSchema,
  CasesFileSchema,
  FactsFileSchema,
  GuardrailsFileSchema,
  OffersFileSchema,
  ProcessFileSchema,
  type Answer,
  type Capability,
  type Case,
  type Fact,
  type Guardrail,
  type Intent,
  type Offer,
  type Persona,
  type ProcessDoc,
} from "./schema";

/**
 * Loads and validates the public KB at module scope — the "build-time validation"
 * the kickoff brief asks for. Throws immediately on import if any file drifts from
 * the schema, rather than letting a bad KB entry reach a request handler.
 */
export const facts: Fact[] = FactsFileSchema.parse(factsJson);
export const cases: Case[] = CasesFileSchema.parse(casesJson);
export const capabilities: Capability[] = CapabilitiesFileSchema.parse(capabilitiesJson);
export const offers: Offer[] = OffersFileSchema.parse(offersJson);
export const processDocs: ProcessDoc[] = ProcessFileSchema.parse(processJson);
export const answers: Answer[] = AnswersFileSchema.parse(answersJson);
export const guardrails: Guardrail[] = GuardrailsFileSchema.parse(guardrailsJson);

export const factsById = new Map(facts.map((f) => [f.id, f]));
export const casesById = new Map(cases.map((c) => [c.id, c]));
export const answersById = new Map(answers.map((a) => [a.id, a]));
export const guardrailsById = new Map(guardrails.map((g) => [g.id, g]));

function intentPersonaKey(intent: Intent, persona: Persona): string {
  return `${intent}:${persona}`;
}

export const answersByIntentPersona = new Map(
  answers.map((a) => [intentPersonaKey(a.intent, a.persona), a])
);

export function getAnswer(intent: Intent, persona: Persona): Answer | undefined {
  return answersByIntentPersona.get(intentPersonaKey(intent, persona));
}

export function getFacts(ids: string[]): Fact[] {
  return ids.map((id) => factsById.get(id)).filter((f): f is Fact => f != null);
}

export function getCases(ids: string[]): Case[] {
  return ids.map((id) => casesById.get(id)).filter((c): c is Case => c != null);
}
