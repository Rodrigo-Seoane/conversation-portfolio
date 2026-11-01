import React from "react";
import type { UIMessage } from "ai";
import { ProfileSummaryCard } from "./cards/ProfileSummaryCard";
import { PendingFactCard } from "./cards/PendingFactCard";
import { SegmentFitCard } from "./cards/SegmentFitCard";
import { DiagnosisCard } from "./cards/DiagnosisCard";
import { ProcessStepsCard } from "./cards/ProcessStepsCard";
import { LocationTimezoneCard } from "./cards/LocationTimezoneCard";
import { DeliverablesCard } from "./cards/DeliverablesCard";
import { GuardrailNotice } from "./cards/GuardrailNotice";
import type { GuardrailPayload } from "@/lib/kb/resolveCard";

/** A tool's execute() falls back to a GuardrailPayload if its KB lookup ever misses. */
function isGuardrailPayload(output: unknown): output is GuardrailPayload {
  return !!output && typeof output === "object" && "responseTemplate" in output;
}

function ToolPart({ type, state, output }: { type: string; state: string; output: unknown }) {
  if (state === "input-available") {
    return (
      <p className="type-body-sm text-body-content-placeholder mb-0" aria-hidden="true">
        …
      </p>
    );
  }
  if (state !== "output-available" || output == null) return null;

  if (isGuardrailPayload(output)) {
    return <GuardrailNotice {...output} />;
  }

  switch (type) {
    case "tool-showProfileSummaryCard":
      return <ProfileSummaryCard {...(output as Parameters<typeof ProfileSummaryCard>[0])} />;
    case "tool-showPendingFactCard":
      return <PendingFactCard {...(output as Parameters<typeof PendingFactCard>[0])} />;
    case "tool-showSegmentFitCard":
      return <SegmentFitCard {...(output as Parameters<typeof SegmentFitCard>[0])} />;
    case "tool-showDiagnosisCard":
      return <DiagnosisCard {...(output as Parameters<typeof DiagnosisCard>[0])} />;
    case "tool-showProcessStepsCard":
      return <ProcessStepsCard {...(output as Parameters<typeof ProcessStepsCard>[0])} />;
    case "tool-showLocationTimezoneCard":
      return <LocationTimezoneCard {...(output as Parameters<typeof LocationTimezoneCard>[0])} />;
    case "tool-showDeliverablesCard":
      return <DeliverablesCard {...(output as Parameters<typeof DeliverablesCard>[0])} />;
    case "tool-showGuardrailResponse":
      return <GuardrailNotice {...(output as GuardrailPayload)} />;
    default:
      return null;
  }
}

export function MessageList({ messages }: { messages: UIMessage[] }) {
  return (
    <div role="log" aria-live="polite" aria-relevant="additions" className="flex flex-col gap-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}
        >
          {message.parts.map((part, index) => {
            if (part.type === "text") {
              return (
                <p
                  key={index}
                  className={`type-body-lg mb-0 max-w-[560px] ${
                    message.role === "user"
                      ? "bg-content-action-secondary-700 text-content-action-primary rounded-regular px-4 py-2"
                      : "text-body-content-primary"
                  }`}
                >
                  {part.text}
                </p>
              );
            }
            if (part.type.startsWith("tool-")) {
              return (
                <ToolPart
                  key={index}
                  type={part.type}
                  state={(part as { state: string }).state}
                  output={(part as { output?: unknown }).output}
                />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}
