import { BrandIcon } from "@/components/ui/BrandIcon";
import { ChatApp } from "@/components/chat/ChatApp";

/**
 * Phase 4: single page, chat as the hero (kickoff brief Phase 4 "Layout").
 * No positioning-headline copy here — fact-positioning-headline is still
 * `status: "proposed"`, not approved, so the header stays generic
 * (docs/conversation-spec.md / content/kb/PENDING.md).
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center gap-3 px-4 pt-6">
        <BrandIcon size="small" />
        <span className="type-body-md font-semibold text-body-content-primary">
          Rodrigo Seoane
        </span>
      </header>
      <ChatApp />
    </main>
  );
}
