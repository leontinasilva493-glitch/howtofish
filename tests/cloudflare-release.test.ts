import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as {
  dependencies: Record<string, string>;
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

test("Cloudflare Wrangler automatic configuration uses an OpenNext-supported release", () => {
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
