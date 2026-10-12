import { z } from "zod";

/**
 * Knowledge-base schema for the conversational portfolio.
 * Mirrors kickoff-conversational-portfolio.md §Phase 2 exactly — the field lists there
 * are authoritative. Validated at build time by scripts/validate-kb.ts.
 */

export const StatusSchema = z.enum([
  "documented",
  "pending",
  "proposed",
  "review_before_publish",
  "confidential",
]);
export type Status = z.infer<typeof StatusSchema>;

export const VisibilitySchema = z.enum(["public", "internal"]);
export type Visibility = z.infer<typeof VisibilitySchema>;

export const MeasurementStatusSchema = z.enum([
  "published_method_pending",
  "not_measured",
]);
export type MeasurementStatus = z.infer<typeof MeasurementStatusSchema>;

export const FactSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string().nullable(),
  status: StatusSchema,
  visibility: VisibilitySchema,
  source: z.string(),
  updatedAt: z.string(),
});
export type Fact = z.infer<typeof FactSchema>;

export const CaseResultSchema = z.object({
  label: z.string(),
  value: z.string().nullable(),
  measurementStatus: MeasurementStatusSchema,
});
export type CaseResult = z.infer<typeof CaseResultSchema>;

export const CaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  industry: z.string(),
  productType: z.string(),
  problemTags: z.array(z.string()),
  role: z.string(),
  contributions: z.array(z.string()),
  deliverables: z.array(z.string()),
  results: z.array(CaseResultSchema),
  publicUrl: z.string().url().optional(),
  visibility: VisibilitySchema,
  status: StatusSchema,
  source: z.string(),
});
export type Case = z.infer<typeof CaseSchema>;

export const CapabilitySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: StatusSchema,
  visibility: VisibilitySchema,
  source: z.string(),
});
export type Capability = z.infer<typeof CapabilitySchema>;

export const OfferPricingTierSchema = z.object({
  tier: z.string(),
  price: z.string(),
  turnaround: z.string(),
});
export type OfferPricingTier = z.infer<typeof OfferPricingTierSchema>;

export const OfferSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["engagement_model", "service"]),
  summary: z.string(),
  pricingTiers: z.array(OfferPricingTierSchema).optional(),
  caveats: z.array(z.string()),
  status: StatusSchema,
  visibility: VisibilitySchema,
  source: z.string(),
});
export type Offer = z.infer<typeof OfferSchema>;

export const ProcessStepSchema = z.object({
  order: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
});
export type ProcessStep = z.infer<typeof ProcessStepSchema>;

export const ProcessDocSchema = z.object({
  id: z.string(),
  title: z.string(),
  steps: z.array(ProcessStepSchema),
  principles: z.array(z.string()),
  status: StatusSchema,
  visibility: VisibilitySchema,
  source: z.string(),
});
export type ProcessDoc = z.infer<typeof ProcessDocSchema>;

export const PersonaSchema = z.enum(["recruiter", "product_leader", "founder"]);
export type Persona = z.infer<typeof PersonaSchema>;

export const IntentSchema = z.enum([
  "fit",
  "budget",
  "availability",
  "location_timezone",
  "segment",
  "situation_diagnosis",
  "time_to_value",
  "process",
  "proof_results",
]);
export type Intent = z.infer<typeof IntentSchema>;

export const AnswerSchema = z.object({
  id: z.string(),
  intent: IntentSchema,
  persona: PersonaSchema,
  approvedText: z.string(),
  card: z.string(),
  factRefs: z.array(z.string()),
  caseRefs: z.array(z.string()),
  followUp: z.string(),
  cta: z.string(),
  status: StatusSchema,
  source: z.string(),
});
export type Answer = z.infer<typeof AnswerSchema>;

export const GuardrailSchema = z.object({
  id: z.string(),
  topic: z.string(),
  triggerExamples: z.array(z.string()),
  behavior: z.enum(["refuse", "redirect", "pending_state", "honest_no_evidence"]),
  responseTemplate: z.string(),
  cta: z.string().optional(),
  status: StatusSchema,
  visibility: VisibilitySchema,
  source: z.string(),
});
export type Guardrail = z.infer<typeof GuardrailSchema>;

export const FactsFileSchema = z.array(FactSchema);
export const CasesFileSchema = z.array(CaseSchema);
export const CapabilitiesFileSchema = z.array(CapabilitySchema);
export const OffersFileSchema = z.array(OfferSchema);
export const ProcessFileSchema = z.array(ProcessDocSchema);
export const AnswersFileSchema = z.array(AnswerSchema);
export const GuardrailsFileSchema = z.array(GuardrailSchema);
