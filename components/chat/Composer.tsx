import React from "react";
import { Button } from "@/components/ui/Button";

/**
 * The composer + the always-visible disclosure line (kickoff brief Phase 4
 * "Disclosure"). Not a design-system component — a layout composition of
 * Button plus a native input, since Input.md's Form Field needs its own
 * implementation pass that hasn't happened yet (components/Input.md §Open
 * items) and a single-line chat composer doesn't need the full field family.
 */
export function Composer({
  input,
  onInputChange,
  onSubmit,
  disabled,
  inputRef,
}: {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  inputRef: React.Ref<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <form
        className="flex gap-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !disabled) onSubmit();
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={disabled}
          placeholder="Ask about Rodrigo's work, fit, or availability…"
          aria-label="Message"
          className="flex-1 min-h-[36px] rounded-small border border-content-action-secondary-200 bg-surfaces-section-form-field px-2 py-3 type-body-md text-body-content-primary placeholder:text-body-content-placeholder focus:outline-none"
        />
        <Button size="medium" variant="primary" htmlType="submit" disabled={disabled || !input.trim()}>
          Send
        </Button>
      </form>
      <p className="type-body-xs text-body-content-placeholder mb-0">
        Answers come from Rodrigo&apos;s approved knowledge base, served by AI.
      </p>
    </div>
  );
}
