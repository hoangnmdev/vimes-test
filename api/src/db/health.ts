import { getDbPool } from "./pool";

export async function checkDbReadiness(): Promise<boolean> {
  const pool = getDbPool();
  try {
    await pool.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}
