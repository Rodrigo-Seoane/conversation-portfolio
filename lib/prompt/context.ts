import { answers, guardrails } from "@/lib/kb";

/**
 * The only KB content the model ever sees. Deliberately minimal: the model's
 * whole job is (1) pick an intent/persona → tool, (2) paraphrase that answer's
 * `approvedText` in a bounded lead-in. It doesn't need facts/cases/capabilities/
 * offers/process directly — those are resolved server-side, after the tool call,
 * from KB ids the model never has to see the content of. Smaller model context
 * here also means less surface for an injection attempt to latch onto.
 */
export function buildKbContext(): string {
  const answersBlock = answers
    .map(
      (a) =>
        `- id: ${a.id}\n  intent: ${a.intent}\n  persona: ${a.persona}\n  approvedText: ${a.approvedText}`
    )
    .join("\n");

  const guardrailsBlock = guardrails
    .map(
      (g) =>
        `- guardrailId: ${g.id}\n  topic: ${g.topic}\n  examples: ${g.triggerExamples.join(" | ")}`
    )
    .join("\n");

  return [
    "## Approved answers (one per intent × persona — paraphrase approvedText in your lead-in, never add to it)",
    answersBlock,
    "",
    "## Guardrail topics (for showGuardrailResponse's guardrailId)",
    guardrailsBlock,
  ].join("\n");
}
