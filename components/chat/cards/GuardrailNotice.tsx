import React from "react";
import { Button } from "@/components/ui/Button";
import type { GuardrailPayload } from "@/lib/kb/resolveCard";

/**
 * Renders a showGuardrailResponse result. Deliberately not a card (docs/
 * conversation-spec.md §4) — a refusal, redirect, or honest "no evidence"
 * reply is plain assistant text, so it doesn't read as structured content.
 * The text here is always the KB's literal `responseTemplate` — the model
 * supplies no free text of its own for this tool (lib/prompt/system.md).
 */
export function GuardrailNotice({ responseTemplate, cta }: GuardrailPayload) {
  return (
    <div className="flex flex-col gap-2">
      <p className="type-body-lg text-body-content-primary mb-0">{responseTemplate}</p>
      {cta && (
        <Button size="small" variant="secondary" href={cta.href}>
          {cta.label}
        </Button>
      )}
    </div>
  );
}
