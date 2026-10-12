import React from "react";
import { MapPin } from "@phosphor-icons/react";
import { CardShell } from "./CardShell";
import { FactLine } from "./FactLine";
import { CardFooter } from "./CardFooter";
import { MetricTile } from "@/components/ui/MetricTile";
import { FACT_LABELS } from "./factLabels";
import type { LocationTimezoneCardPayload } from "@/lib/kb/resolveCard";

/**
 * docs/conversation-spec.md §5 — Location/Timezone Card
 * (intent: location_timezone). The documented location fact renders as a
 * MetricTile (icon type); any pending fact (the overlap window) renders
 * through the shared FactLine pending-fact sub-state instead.
 */
export function LocationTimezoneCard({ facts, followUp, cta }: LocationTimezoneCardPayload) {
  const documented = facts.filter((f) => f.status === "documented");
  const pending = facts.filter((f) => f.status !== "documented");

  return (
    <CardShell>
      {documented.map((fact) => (
        <MetricTile
          key={fact.id}
          orientation="horizontal"
          type="icon"
          icon={MapPin}
          chipValue="transparent"
          background="transparent"
          title={FACT_LABELS[fact.id] ?? fact.key}
          description={fact.value ?? undefined}
        />
      ))}
      {pending.length > 0 && (
        <div className="flex flex-col gap-2">
          {pending.map((fact) => (
            <FactLine key={fact.id} fact={fact} />
          ))}
        </div>
      )}
      <CardFooter followUp={followUp} cta={cta} />
    </CardShell>
  );
}
