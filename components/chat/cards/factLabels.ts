/**
 * Presentation-only display labels for facts.json ids — not KB content, just
 * how to label a known fact in a card. Never invent a label for an id not
 * listed here; fall back to the fact's own `key` instead.
 */
export const FACT_LABELS: Record<string, string> = {
  "fact-current-role-generic": "Current role",
  "fact-prior-role-axa": "Prior role — AXA Group Operations",
  "fact-prior-role-atlas": "Prior role — ATS / Atlas",
  "fact-rate-salary-expectation": "Salary expectation",
  "fact-rate-day-rate": "Day rate",
  "fact-availability-current": "Current availability",
  "fact-availability-start-date": "Start date",
  "fact-availability-overlap-window": "Daily overlap window",
  "fact-location": "Location",
};
