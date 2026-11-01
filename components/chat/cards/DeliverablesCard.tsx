import React from "react";
import { CardShell } from "./CardShell";
import { CaseCard } from "./CaseCard";
import { CardFooter } from "./CardFooter";
import type { DeliverablesCardPayload } from "@/lib/kb/resolveCard";

/** docs/conversation-spec.md §5 — Deliverables Card (intent: proof_results, persona: founder). */
export function DeliverablesCard({ cases, followUp, cta }: DeliverablesCardPayload) {
  return (
    <CardShell title="What's actually delivered">
      <div className="flex flex-col gap-3">
        {cases.map((c) => (
          <CaseCard key={c.id} caseData={c} />
        ))}
      </div>
      <CardFooter followUp={followUp} cta={cta} />
    </CardShell>
  );
}
