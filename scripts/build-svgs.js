"use strict";

// Emits SVG outputs under dist/svgs/:
//   - one cleaned <name>.svg per icon (canonical names, fill="currentColor")
//   - sprite.svg containing every icon as a <symbol id="icon-<name>">
// This is additive; it does not touch the existing scripts/build.js pipeline.

const fs = require("fs");
const path = require("path");
const { loadIcons, VIEWBOX, root } = require("./icons");

const outDir = path.join(root, "dist", "svgs");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const icons = loadIcons();

for (const { name, d } of icons) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" fill="currentColor"><path d="${d}"/></svg>\n`;
  fs.writeFileSync(path.join(outDir, `${name}.svg`), svg);
}

const symbols = icons
  .map(
    ({ name, d }) =>
      `<symbol id="icon-${name}" viewBox="${VIEWBOX}"><path d="${d}"/></symbol>`
  )
  .join("");
const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" fill="currentColor">${symbols}</svg>\n`;
fs.writeFileSync(path.join(outDir, "sprite.svg"), sprite);

console.log(`dist/svgs/: ${icons.length} icons + sprite.svg`);
