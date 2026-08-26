import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as {
  name: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
};

function numericVersion(version: string) {
  return version.replace(/^[^0-9]*/, "").split(".").map(Number);
}

function isAtLeast(actual: string, minimum: string) {
  const left = numericVersion(actual);
  const right = numericVersion(minimum);

  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    const difference = (left[index] ?? 0) - (right[index] ?? 0);
    if (difference !== 0) return difference > 0;
  }

  return true;
}

test("the OpenNext adapter uses a supported Next.js release", () => {
  const nextVersion = packageJson.dependencies.next;

  assert.ok(
    isAtLeast(nextVersion, "15.5.21"),
    `Next.js ${nextVersion} is below OpenNext's minimum supported version 15.5.21`,
  );
  assert.equal(packageJson.dependencies["eslint-config-next"], nextVersion);
  assert.equal(
    packageJson.dependencies["@next/swc-wasm-nodejs"],
    undefined,
    "Next.js supplies its supported platform SWC package; do not pin a stale WASM compiler",
  );
  assert.ok(
    isAtLeast(packageJson.dependencies.eslint, "8.57.0"),
    "eslint-config-next 14 requires ESLint 8.57.0 or newer",
  );
});

test("the repository packages the existing Worker without Wrangler autoconfiguration", () => {
  assert.equal(packageJson.name, "howtofish");
  assert.equal(packageJson.dependencies["@opennextjs/cloudflare"], "1.20.2");
  assert.equal(packageJson.devDependencies.wrangler, "4.125.0");
  assert.equal(packageJson.scripts["cf:build"], "opennextjs-cloudflare build");
  assert.equal(packageJson.scripts["cf:deploy"], "opennextjs-cloudflare deploy");
  assert.equal(packageJson.scripts["cf:upload"], "opennextjs-cloudflare upload");

  const wranglerUrl = new URL("../wrangler.jsonc", import.meta.url);
  const openNextUrl = new URL("../open-next.config.ts", import.meta.url);
  assert.ok(existsSync(wranglerUrl), "wrangler.jsonc must be committed");
  assert.ok(existsSync(openNextUrl), "open-next.config.ts must be committed");

  const wrangler = JSON.parse(readFileSync(wranglerUrl, "utf8")) as {
    name: string;
    main: string;
    services: Array<{ binding: string; service: string }>;
  };
  assert.equal(wrangler.name, "howtofish");
  assert.equal(wrangler.main, ".open-next/worker.js");
  assert.deepEqual(wrangler.services, [
    { binding: "WORKER_SELF_REFERENCE", service: "howtofish" },
  ]);
});
