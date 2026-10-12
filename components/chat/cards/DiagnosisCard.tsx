import React from "react";
import { CardShell } from "./CardShell";
import { FactLine } from "./FactLine";
import { CardFooter } from "./CardFooter";
import type { DiagnosisCardPayload } from "@/lib/kb/resolveCard";

/**
 * docs/conversation-spec.md §5 — Diagnosis Card
 * (intent: situation_diagnosis, persona: product_leader or founder).
 */
export function DiagnosisCard({ facts, followUp, cta }: DiagnosisCardPayload) {
  return (
    <CardShell title="Possible approach">
      <div className="flex flex-col gap-2">
        {facts.map((fact) => (
          <FactLine key={fact.id} fact={fact} />
        ))}
      </div>
      <CardFooter followUp={followUp} cta={cta} />
    </CardShell>
  );
}
