const path = require("path");
/*
 * Paths
 */

// root
const root = path.resolve(__dirname, "..");

// filename
const styleFileName = "simple-line-icons";
const lessFileName = `${styleFileName}.less`;
const scssFileName = `${styleFileName}.scss`;
const cssFileName = `${styleFileName}.css`;

// src
const src = path.resolve(root, "src");
const sourceLessFile = path.resolve(src, "styles", lessFileName);
const fontsSrc = path.resolve(src, "fonts");

// dist
const dist = path.join(root, "dist");
const distStyles = path.join(dist, "styles");
const distLessFile = path.join(distStyles, lessFileName);
const distSCSSFile = path.join(distStyles, scssFileName);
const distCSSFile = path.join(distStyles, cssFileName);
const distFonts = path.resolve(dist, "fonts");

// legacy dist

const legacyCSS = path.join(root, "css");
const legacySCSS = path.join(root, "scss");
const legacyLESS = path.join(root, "less");
const legacyFonts = path.resolve(root, "fonts");
const legacyCSSFile = path.join(root, "css", cssFileName);
const legacySCSSFile = path.join(root, "scss", scssFileName);
const legacyLESSFile = path.join(root, "less", lessFileName);

const distDoc = path.resolve(root, "docs");
const distDocIndex = path.resolve(distDoc, "index.html");
// cheetsheet
const chTemplate = path.resolve(__dirname, "cheatsheet.template.html");

module.exports = {
  dist,
  distStyles,
  sourceLessFile,
  distLessFile,
  fontsSrc,
  distFonts,
  chTemplate,
  distDocIndex,
  distDoc,
  distCSSFile,
  distSCSSFile,
  legacyCSSFile,
  legacySCSSFile,
  legacyLESSFile,
  legacyFonts,
  legacyLESS,
  legacySCSS,
  legacyCSS,
};
