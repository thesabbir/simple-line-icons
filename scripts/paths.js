const path = require("path");
/*
 * Paths
 */

// root
const root = path.resolve(__dirname, "..");

// src
const src = path.resolve(root, "src");
const sourceLessFile = path.resolve(src, "styles", "simple-line-icons.less");
const fontsSrc = path.resolve(src, "fonts");

// dist
const dist = path.join(root, "dist");
const distStyles = path.join(dist, "styles");
const distLessFile = path.join(distStyles, "simple-line-icons.less");
const fontsDist = path.resolve(dist, "fonts");

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
  fontsDist,
  chTemplate,
  distDocIndex,
  distDoc,
};
