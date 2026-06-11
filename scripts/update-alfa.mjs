import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;

/**
 * Collect all package.json paths (root + workspace packages), excluding
 * node_modules.
 */
function findPackageJsonPaths() {
  const results = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "node_modules") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name === "package.json") {
        results.push(full);
      }
    }
  }

  walk(root);
  return results;
}

const DEPENDENCY_KEYS = ["dependencies", "devDependencies", "peerDependencies"];
const ALFA_PATTERN = /^@siteimprove\/alfa-/;

/**
 * Collect all @siteimprove/alfa-* packages that are not resolved via
 * workspace: protocol, across all package.json files.
 */
function collectExternalAlfaPackages(packageJsonPaths) {
  const packages = new Set();

  for (const pkgPath of packageJsonPaths) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

    for (const key of DEPENDENCY_KEYS) {
      if (!pkg[key]) continue;
      for (const [name, version] of Object.entries(pkg[key])) {
        if (ALFA_PATTERN.test(name) && !version.startsWith("workspace:")) {
          packages.add(name);
        }
      }
    }
  }

  return packages;
}

/**
 * Query the npm registry via yarn for the latest version of a package.
 */
function fetchLatestVersion(packageName) {
  const output = execSync(`yarn npm info ${packageName} --json`, {
    encoding: "utf8",
    cwd: root,
  });
  const info = JSON.parse(output);
  return info["dist-tags"].latest;
}

/**
 * Update all external @siteimprove/alfa-* versions in a package.json file.
 * Returns true if any changes were made.
 */
function updatePackageJson(pkgPath, latestVersions) {
  const raw = fs.readFileSync(pkgPath, "utf8");
  const pkg = JSON.parse(raw);
  let changed = false;

  for (const key of DEPENDENCY_KEYS) {
    if (!pkg[key]) continue;
    for (const [name, version] of Object.entries(pkg[key])) {
      if (!ALFA_PATTERN.test(name) || version.startsWith("workspace:")) {
        continue;
      }
      const latest = latestVersions.get(name);
      if (!latest) continue;

      const updated = `^${latest}`;
      if (version !== updated) {
        pkg[key][name] = updated;
        changed = true;
      }
    }
  }

  if (changed) {
    // Preserve trailing newline if present
    const trailingNewline = raw.endsWith("\n") ? "\n" : "";
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + trailingNewline);
  }

  return changed;
}

// --- main ---

const packageJsonPaths = findPackageJsonPaths();
const externalPackages = collectExternalAlfaPackages(packageJsonPaths);

if (externalPackages.size === 0) {
  console.log("No external @siteimprove/alfa-* packages found.");
  process.exit(0);
}

console.log(
  `Fetching latest versions for ${externalPackages.size} packages...`,
);

const latestVersions = new Map();
for (const name of externalPackages) {
  process.stdout.write(`  ${name} ... `);
  const version = fetchLatestVersion(name);
  latestVersions.set(name, version);
  console.log(version);
}

console.log("\nUpdating package.json files...");

let updatedCount = 0;
for (const pkgPath of packageJsonPaths) {
  const rel = path.relative(root, pkgPath);
  if (updatePackageJson(pkgPath, latestVersions)) {
    console.log(`  updated: ${rel}`);
    updatedCount++;
  }
}

if (updatedCount === 0) {
  console.log("  All packages already up to date.");
} else {
  console.log(`\nDone. Updated ${updatedCount} file(s).`);
}
