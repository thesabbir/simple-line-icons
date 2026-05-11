"use strict";

// Generates icons.json — the v3 manifest. It is committed (like a lockfile):
// regenerate with `npm run build:manifest` whenever icons change.

const fs = require("fs");
const path = require("path");
const { loadIcons, root } = require("./icons");
const pkg = require("../package.json");

const icons = loadIcons().map(({ name, codepoint, file }) => ({
  name,
  codepoint,
  file: `src/svgs/${file}`,
}));

const manifest = {
  name: pkg.name,
  version: pkg.version,
  count: icons.length,
  viewBox: "0 0 1024 1024",
  icons,
};

fs.writeFileSync(
  path.join(root, "icons.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);

console.log(`icons.json written (${icons.length} icons)`);
