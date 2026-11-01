/**
 * Simple in-memory abuse limits (Phase 4 "Abuse limits"). Per-IP request counter
 * reset on a rolling window, plus message-length and turn-count caps. This is a
 * best-effort limiter: it lives in module scope, so it resets on cold start and
 * doesn't share state across serverless instances. Fine for an MVP preview
 * deploy; a durable version (Supabase/Upstash) is a Phase 6 conversation if
 * Rodrigo needs one, not built here.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 20;
export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_TURNS_PER_SESSION = 40;

type Bucket = { count: number; windowStart: number };
const buckets = new Map<string, Bucket>();

export type AbuseCheckResult = { ok: true } | { ok: false; reason: string };

export function checkRateLimit(ip: string): AbuseCheckResult {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(ip, { count: 1, windowStart: now });
    return { ok: true };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      ok: false,
      reason: "Too many messages — please wait a few minutes before trying again.",
    };
  }

  bucket.count += 1;
  return { ok: true };
}

export function checkMessageLength(text: string): AbuseCheckResult {
  if (text.length > MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      reason: `That message is too long (max ${MAX_MESSAGE_LENGTH} characters) — could you shorten it?`,
    };
  }
  return { ok: true };
}

export function checkTurnCount(messageCount: number): AbuseCheckResult {
  if (messageCount > MAX_TURNS_PER_SESSION) {
    return {
      ok: false,
      reason:
        "This conversation has reached its length limit — please start a new one or contact Rodrigo directly.",
    };
  }
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
