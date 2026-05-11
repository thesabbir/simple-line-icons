"use strict";

// Shared loader that turns the v2 source-of-truth (the LESS codepoint map +
// the individual files in src/svgs/) into a normalized icon list used by the
// v3 outputs (icons.json manifest, dist/svgs/, the @simple-line-icons/* packages).

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const lessFile = path.join(root, "src", "styles", "simple-line-icons.less");
const svgDir = path.join(root, "src", "svgs");

// Some SVG files in src/svgs/ are misspelled relative to their canonical
// (LESS class) name. Map canonical name -> actual file basename.
const SVG_FILE_OVERRIDES = {
  calendar: "calender",
  envelope: "envolope",
  "envelope-letter": "envolope-letter",
  "social-pinterest": "social-pintarest",
  "symbol-female": "symble-female",
};

const VIEWBOX = "0 0 1024 1024";

function parseCodepoints() {
  const less = fs.readFileSync(lessFile, "utf8");
  const re = /\}([a-z0-9-]+):before\s*\{\s*content:\s*"\\([0-9a-fA-F]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(less)) !== null) {
    out.push({ name: m[1], codepoint: m[2].toLowerCase() });
  }
  return out;
}

function pathDataFor(name) {
  const base = SVG_FILE_OVERRIDES[name] || name;
  const file = path.join(svgDir, `${base}.svg`);
  const svg = fs.readFileSync(file, "utf8");
  const m = svg.match(/<path[^>]*\bd="([^"]+)"/);
  if (!m) throw new Error(`No <path d="..."> found in ${file}`);
  return { file: `${base}.svg`, d: m[1] };
}

// Returns: [{ name, codepoint, file, d }] sorted by name.
function loadIcons() {
  const icons = parseCodepoints().map(({ name, codepoint }) => {
    const { file, d } = pathDataFor(name);
    return { name, codepoint, file, d };
  });
  icons.sort((a, b) => a.name.localeCompare(b.name));
  return icons;
}

module.exports = { loadIcons, SVG_FILE_OVERRIDES, VIEWBOX, root };
