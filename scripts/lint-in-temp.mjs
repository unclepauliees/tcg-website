import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tempRoot = "/tmp/tcg-web-lint";

const excluded = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  "tcg-solid-handoff",
  "tcg-web-handoff",
  "tsconfig.tsbuildinfo",
]);

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

rmSync(tempRoot, { force: true, recursive: true });
mkdirSync(tempRoot, { recursive: true });

cpSync(root, tempRoot, {
  recursive: true,
  filter(source) {
    return !excluded.has(source.slice(root.length + 1).split("/")[0]);
  },
});

run("npm", ["ci", "--prefer-offline", "--no-audit"], tempRoot);
run(join(tempRoot, "node_modules/.bin/eslint"), ["app", "components", "lib", "scripts"], tempRoot);
