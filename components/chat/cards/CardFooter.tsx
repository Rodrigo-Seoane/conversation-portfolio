import React from "react";
import { Button } from "@/components/ui/Button";
import type { CtaPayload } from "@/lib/kb/resolveCard";

/**
 * The follow-up question + optional CTA every card ends with
 * (docs/conversation-spec.md's answer formula) — server-resolved, never
 * written by the model.
 */
export function CardFooter({
  followUp,
  cta,
}: {
  followUp: string;
  cta: CtaPayload;
}) {
  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-content-action-secondary-100">
      <p className="type-body-sm text-body-content-auxiliary mb-0">{followUp}</p>
      {cta && (
        <Button size="small" variant="secondary" href={cta.href}>
          {cta.label}
        </Button>
      )}
    </div>
  );
}
