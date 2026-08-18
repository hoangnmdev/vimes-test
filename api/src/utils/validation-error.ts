import type { ZodError } from "zod";

export function formatValidationError(error: ZodError): string {
  const firstIssue = error.issues[0];
  if (!firstIssue) {
    return "Payload không hợp lệ.";
  }

  const path = firstIssue.path.length > 0 ? firstIssue.path.join(".") : "body";
  return `${path}: ${firstIssue.message}`;
}
