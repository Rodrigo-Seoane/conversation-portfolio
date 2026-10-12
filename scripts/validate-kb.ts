import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { ZodType } from "zod";
import {
  AnswersFileSchema,
  CapabilitiesFileSchema,
  CasesFileSchema,
  FactsFileSchema,
  GuardrailsFileSchema,
  OffersFileSchema,
  ProcessFileSchema,
} from "../lib/kb/schema";

const KB_DIR = join(__dirname, "..", "content", "kb");

function validateFile(relativePath: string, schema: ZodType, required: boolean) {
  const path = join(KB_DIR, relativePath);
  if (!existsSync(path)) {
    if (required) {
      console.error(`✗ ${relativePath} — missing (required)`);
      return false;
    }
    console.log(`– ${relativePath} — absent (ok, not committed to a public repo)`);
    return true;
  }

  const raw = readFileSync(path, "utf-8");
  const json = JSON.parse(raw);
  const result = schema.safeParse(json);
  if (!result.success) {
    console.error(`✗ ${relativePath}`);
    for (const issue of result.error.issues) {
      console.error(`    ${issue.path.join(".")}: ${issue.message}`);
    }
    return false;
  }
  const count = Array.isArray(json) ? json.length : 1;
  console.log(`✓ ${relativePath} (${count} entries)`);
  return true;
}

const checks = [
  validateFile("facts.json", FactsFileSchema, true),
  validateFile("cases.json", CasesFileSchema, true),
  validateFile("capabilities.json", CapabilitiesFileSchema, true),
  validateFile("offers.json", OffersFileSchema, true),
  validateFile("process.json", ProcessFileSchema, true),
  validateFile("answers.json", AnswersFileSchema, true),
  validateFile("guardrails.json", GuardrailsFileSchema, true),
  validateFile("internal/facts-internal.json", FactsFileSchema, false),
  validateFile("internal/cases-internal.json", CasesFileSchema, false),
];

if (checks.every(Boolean)) {
  console.log("\nKB validation passed.");
  process.exit(0);
} else {
  console.error("\nKB validation failed.");
  process.exit(1);
}
