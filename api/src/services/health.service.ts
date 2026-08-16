import { checkDbReadiness } from "../db/health";

export function getAliveStatus(): { status: "ok" } {
  return { status: "ok" };
}

export async function getReadyStatus(): Promise<{ status: "ok" | "degraded" }> {
  const dbReady = await checkDbReadiness();
  return { status: dbReady ? "ok" : "degraded" };
}
