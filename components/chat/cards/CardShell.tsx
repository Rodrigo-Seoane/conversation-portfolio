import React from "react";

/**
 * Shared container for every chat card (docs/conversation-spec.md §5). Not a
 * design-system component of its own — just the one bit of visual consistency
 * (border, radius, padding, max width) every card shell would otherwise repeat.
 */
export function CardShell({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 w-full max-w-[420px] rounded-regular border border-content-action-secondary-100 bg-surfaces-section-form-field p-4 ${className}`.trim()}
    >
      {title && <h3 className="type-h5 text-body-content-primary mb-0">{title}</h3>}
      {children}
    </div>
  );
}
