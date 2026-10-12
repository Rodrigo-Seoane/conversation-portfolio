import { BrandIcon } from "@/components/ui/BrandIcon";

/**
 * Phase 1 scaffold placeholder.
 *
 * The real page is a single-screen conversational UI (chat as the hero,
 * empty-state trigger chips, persona-driven cards) — that's Phase 4 of
 * kickoff-conversational-portfolio.md, after the KB (Phase 2) and the
 * conversation spec (Phase 3) are approved. This placeholder exists only to
 * prove the scaffold builds and the design-system tokens/components wired up
 * in this pass render correctly.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <BrandIcon size="large" />
      <h1 className="type-h1 text-body-content-primary">Conversational Portfolio</h1>
      <p className="type-body-lg text-body-content-auxiliary max-w-[480px]">
        Scaffold in progress — the chat UI lands in a later phase. See{" "}
        <code className="type-body-sm">kickoff-conversational-portfolio.md</code>.
      </p>
    </main>
  );
}
