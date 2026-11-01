import React from "react";
import { ListItemWithIcon } from "@/components/ui/ListItemWithIcon";
import { Badge } from "@/components/ui/Badge";
import { FACT_LABELS } from "./factLabels";
import type { Fact } from "@/lib/kb/schema";

/**
 * Renders one Fact. A `documented` fact is just a line; anything else renders
 * the pending-fact UX from docs/conversation-spec.md §3 — the label, a status
 * tag, and nothing invented. The follow-up question and contact CTA for the
 * whole card render once, in CardFooter, not repeated per fact.
 */
export function FactLine({ fact }: { fact: Fact }) {
  const label = FACT_LABELS[fact.id] ?? fact.key;

  if (fact.status === "documented") {
    return (
      <ListItemWithIcon type="secondary">
        {label}: {fact.value}
      </ListItemWithIcon>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Badge type="warning" colorValue="100">
          To be confirmed
        </Badge>
        <span className="type-body-sm text-body-content-auxiliary">{label}</span>
      </div>
    </div>
  );
}
