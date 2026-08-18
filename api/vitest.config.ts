import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/test/**/*.test.ts"],
    exclude: ["dist/**", "node_modules/**"],
    reporters: process.env.VITEST_REPORTER ? [process.env.VITEST_REPORTER] : ["verbose"],
    coverage: {
      provider: "v8",
      skipFull: false,
      reporter: [
        ["text", { maxCols: 0, skipFull: false }],
        "text-summary",
        "html",
        "lcov"
      ],
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts"],
      exclude: ["src/test/**", "src/server.ts"],
      watermarks: {
        statements: [50, 80],
        branches: [50, 80],
        functions: [50, 80],
        lines: [50, 80]
      }
    }
  }
});
