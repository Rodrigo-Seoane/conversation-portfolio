import React from "react";
import { CardShell } from "./CardShell";
import { FactLine } from "./FactLine";
import { CaseCard } from "./CaseCard";
import { CardFooter } from "./CardFooter";
import type { SegmentFitCardPayload } from "@/lib/kb/resolveCard";

/** docs/conversation-spec.md §5 — Segment Fit Card (intent: segment, persona: product_leader). */
export function SegmentFitCard({ facts, cases, followUp, cta }: SegmentFitCardPayload) {
  return (
    <CardShell title="Segment overlap">
      <div className="flex flex-col gap-2">
        {facts.map((fact) => (
          <FactLine key={fact.id} fact={fact} />
        ))}
      </div>
      {cases.length > 0 && (
        <div className="flex flex-col gap-3">
          {cases.map((c) => (
            <CaseCard key={c.id} caseData={c} />
          ))}
        </div>
      )}
      <CardFooter followUp={followUp} cta={cta} />
    </CardShell>
  );
}
