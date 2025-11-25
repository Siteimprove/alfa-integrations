import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/alfa-test-utils/test/report/git.spec.ts"],
  },
});
