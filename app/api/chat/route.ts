import { readFileSync } from "fs";
import { join } from "path";
import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, isStepCount, streamText, type UIMessage } from "ai";
import { tools } from "@/lib/ai/tools";
import {
  checkMessageLength,
  checkRateLimit,
  checkTurnCount,
  getClientIp,
} from "@/lib/ai/rateLimit";
import { buildKbContext } from "@/lib/prompt/context";

export const runtime = "nodejs";
export const maxDuration = 30;

const systemPromptTemplate = readFileSync(
  join(process.cwd(), "lib/prompt/system.md"),
  "utf-8"
);

function lastUserText(messages: UIMessage[]): string {
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return "";
  return last.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join(" ");
}

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const ip = getClientIp(request);
  const rateLimitResult = checkRateLimit(ip);
  if (!rateLimitResult.ok) {
    return new Response(rateLimitResult.reason, { status: 429 });
  }

  const turnCountResult = checkTurnCount(messages.length);
  if (!turnCountResult.ok) {
    return new Response(turnCountResult.reason, { status: 400 });
  }

  const messageLengthResult = checkMessageLength(lastUserText(messages));
  if (!messageLengthResult.ok) {
    return new Response(messageLengthResult.reason, { status: 400 });
  }

  const instructions = `${systemPromptTemplate}\n\n${buildKbContext()}`;

  if (!process.env.CHAT_MODEL) {
    throw new Error("CHAT_MODEL env var is not set — see .env.example.");
  }

  const result = streamText({
    model: anthropic(process.env.CHAT_MODEL),
    instructions,
    messages: await convertToModelMessages(messages),
    tools,
    // Exactly one model step: the bounded lead-in text plus (at most) one tool
    // call, then stop. A higher step count would let the model see the tool's
    // resolved KB payload and generate follow-up commentary on it — exactly
    // what the bounded-paraphrase design (system.md) is meant to prevent.
    stopWhen: isStepCount(1),
  });

  return result.toUIMessageStreamResponse();
}
