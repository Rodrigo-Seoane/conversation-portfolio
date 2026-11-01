import React from "react";
import { CardShell } from "./CardShell";
import { CardFooter } from "./CardFooter";
import type { ProcessStepsCardPayload } from "@/lib/kb/resolveCard";

/**
 * docs/conversation-spec.md §5 — Process Steps Card
 * (intent: time_to_value or process). Deliberately not ListItemWithIcon — its
 * checkmark means "included/done," not "step N of a sequence" (Design.md
 * principle 4: structure encodes meaning). `process` has a step list;
 * `time_to_value` has no process doc to show, just the followUp/cta.
 */
export function ProcessStepsCard({ process, followUp, cta }: ProcessStepsCardPayload) {
  return (
    <CardShell title={process ? process.title : undefined}>
      {process && (
        <ol className="flex flex-col gap-3 list-none pl-0 mb-0">
          {process.steps.map((step) => (
            <li key={step.order} className="flex gap-3">
              <span
                className="type-caption-md flex items-center justify-center shrink-0 w-6 h-6 rounded-round bg-content-action-secondary-700 text-content-action-primary"
                aria-hidden="true"
              >
                {step.order}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="type-body-md font-semibold text-body-content-primary">
                  {step.title}
                </span>
                <span className="type-body-sm text-body-content-auxiliary">
                  {step.description}
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
      <CardFooter followUp={followUp} cta={cta} />
    </CardShell>
  );
}
