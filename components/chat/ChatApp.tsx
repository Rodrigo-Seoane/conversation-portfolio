"use client";

import React, { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageList } from "./MessageList";
import { Composer } from "./Composer";
import { TriggerChips } from "./TriggerChips";

/**
 * The page's single hero (kickoff brief Phase 4 "Layout"). Empty state shows
 * the trigger copy + chips; once the conversation starts, the chips make way
 * for the message list.
 */
export function ChatApp() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const disabled = status === "submitted" || status === "streaming";

  function send(text: string) {
    sendMessage({ text });
    setInput("");
    // Refocus right after sending, not after the assistant finishes — lets the
    // visitor keep typing the next message while the response streams, without
    // yanking focus away from wherever they've moved to once it's done.
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1092px] mx-auto px-4 py-10 min-h-screen">
      <MessageList messages={messages} />

      {status === "submitted" && (
        <p className="type-body-sm text-body-content-placeholder mb-0" aria-hidden="true">
          Thinking…
        </p>
      )}

      {messages.length === 0 && (
        <div className="flex flex-col gap-4">
          <p className="type-body-xl text-body-content-primary mb-0">
            Hi, I&apos;m Rodrigo&apos;s assistant. I can help you understand his experience, find
            relevant projects, or explore how he could contribute to your product. What would you
            like to know?
          </p>
          <TriggerChips onSelect={send} />
        </div>
      )}

      {error && (
        <p className="type-body-sm text-accent-error mb-0" role="alert">
          Something went wrong — please try again.
        </p>
      )}

      <div className="mt-auto">
        <Composer
          input={input}
          onInputChange={setInput}
          onSubmit={() => send(input)}
          disabled={disabled}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
