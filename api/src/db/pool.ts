import { Pool } from "pg";
import { env } from "../config/env";

let poolInstance: Pool | null = null;

export function getDbPool(): Pool {
  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: env.databaseUrl
    });
  }
  return poolInstance;
}
