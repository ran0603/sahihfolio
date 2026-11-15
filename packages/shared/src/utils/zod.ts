import type { z } from "zod";

export type FieldErrors = Record<string, string[]>;

export function flattenZodErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";

    errors[key] ??= [];
    errors[key].push(issue.message);
  }

  return errors;
}
