import React from "react";
import { CardShell } from "./CardShell";
import { FactLine } from "./FactLine";
import { CardFooter } from "./CardFooter";
import type { PendingFactCardPayload } from "@/lib/kb/resolveCard";

/**
 * docs/conversation-spec.md §5 — Pending Fact Card. Renders the pending-fact
 * UX from §3 for one or more facts that aren't `documented` yet.
 */
export function PendingFactCard({ facts, followUp, cta }: PendingFactCardPayload) {
  return (
    <CardShell>
      <div className="flex flex-col gap-2">
        {facts.map((fact) => (
          <FactLine key={fact.id} fact={fact} />
        ))}
      </div>
      <CardFooter followUp={followUp} cta={cta} />
    </CardShell>
  );
}
