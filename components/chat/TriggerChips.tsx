import React from "react";
import { Button } from "@/components/ui/Button";

/**
 * The three opening chips (docs/conversation-spec.md §2). Reuses Button
 * (Small, Secondary) rather than Badge — Badge.md §1 rules out Badge for
 * anything clickable.
 */
const CHIPS = [
  "I want to hire Rodrigo",
  "Show me relevant projects",
  "I have a product challenge",
];

export function TriggerChips({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
      {CHIPS.map((chip) => (
        <Button key={chip} size="small" variant="secondary" onClick={() => onSelect(chip)}>
          {chip}
        </Button>
      ))}
    </div>
  );
}
