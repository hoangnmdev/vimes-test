import { createApp } from "./app";
import { env } from "./config/env";
import { getDbPool } from "./db/pool";

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`API server listening on port ${env.port}`);
});

async function shutdown() {
  server.close(async () => {
    try {
      await getDbPool().end();
    } catch (error) {
      console.error("Failed to close DB pool:", error);
    } finally {
      process.exit(0);
    }
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
