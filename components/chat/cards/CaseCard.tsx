import React from "react";
import { ListItemWithIcon } from "@/components/ui/ListItemWithIcon";
import { MetricTile } from "@/components/ui/MetricTile";
import { Button } from "@/components/ui/Button";
import type { Case } from "@/lib/kb/schema";

/**
 * Compact case preview — docs/conversation-spec.md §5's Case Card. Composes
 * MetricTile for results and ListItemWithIcon for deliverables; links out to
 * the public case page (CLAUDE.md §5 canonical links) rather than trying to
 * be a full case page itself.
 */
export function CaseCard({ caseData }: { caseData: Case }) {
  return (
    <div className="flex flex-col gap-3 rounded-regular border border-content-action-secondary-100 p-4">
      <div>
        <h4 className="type-body-md font-extrabold text-body-content-primary mb-0">
          {caseData.title}
        </h4>
        <p className="type-body-sm text-body-content-auxiliary mb-0">
          {caseData.industry}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {caseData.deliverables.slice(0, 3).map((deliverable) => (
          <ListItemWithIcon key={deliverable} type="secondary">
            {deliverable}
          </ListItemWithIcon>
        ))}
      </div>

      {caseData.results.length > 0 && (
        <div className="flex flex-col gap-2">
          {caseData.results.map((result) => (
            <div key={result.label} className="flex flex-col gap-1">
              <MetricTile
                orientation="horizontal"
                background="transparent"
                chipValue="transparent"
                title={result.label}
                number={result.value ?? undefined}
              />
              {result.measurementStatus === "published_method_pending" && (
                <span className="type-body-xs text-body-content-placeholder">
                  Published — method pending confirmation.
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {caseData.publicUrl && (
        <Button size="small" variant="onlyText" href={caseData.publicUrl}>
          View case
        </Button>
      )}
    </div>
  );
}
