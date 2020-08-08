const less2sass = require("./less2sass");
const less2css = require("./less2css");
const fs = require("fs").promises;
const path = require("path");
const packageJSON = require("../package.json");
const paths = require("./paths");
const styleFileName = "simple-line-icons";
const cheatSheetCssFile = `styles/${styleFileName}.css`;

async function copyFonts(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    await fs.copyFile(srcPath, destPath);
  }
}

function extension(filePath, extension) {
  return filePath.replace(/\.less$/, extension);
}

async function clearDist() {
  await fs.rmdir(paths.dist, { recursive: true });
}

async function createDist() {
  await fs.mkdir(paths.distStyles, { recursive: true });
  await fs.mkdir(paths.distFonts, { recursive: true });
  await fs.mkdir(paths.distDoc, { recursive: true });
}

async function clearLegacyDist() {
  await Promise.all([
    fs.rmdir(paths.legacyCSS, { recursive: true }),
    fs.rmdir(paths.legacySCSS, { recursive: true }),
    fs.rmdir(paths.legacyLESS, { recursive: true }),
    fs.rmdir(paths.legacyFonts, { recursive: true }),
  ]);
}
async function legacyDist() {
  await clearLegacyDist();
  try {
    await Promise.all([
      fs.mkdir(paths.legacyCSS),
      fs.mkdir(paths.legacySCSS),
      fs.mkdir(paths.legacyLESS),
      fs.mkdir(paths.legacyFonts),
    ]);
  } catch (e) {
    // exist
  }
  await Promise.all([
    fs.copyFile(paths.distLessFile, paths.legacyLESSFile),
    fs.copyFile(paths.distSCSSFile, paths.legacySCSSFile),
    fs.copyFile(paths.distCSSFile, paths.legacyCSSFile),
    copyFonts(paths.distFonts, paths.legacyFonts),
  ]);
}

async function generateCheatSheet() {
  const cssPath = path.join(extension(paths.distLessFile, ".css"));
  const css = await fs.readFile(cssPath, "UTF8");
  const regex = /\.(icon-(?:\w+(?:-)?)+):before\s+{\s*content:\s*"(.+)";\s+}/g;
  const icons = [];

  css.match(regex).forEach((item) => {
    let res = regex.exec(item);
    if (!res) return;
    icons.push(res[1]);
  });

  const iconHTML = icons
    .map(
      (icon) => `<div class="icon-preview-box col-xs-6 col-md-3 col-lg-3">
      <div class="preview">
      <a href="#" class="show-code" title="click to show css class name"><i class="${icon} icons"></i><span class="name">${icon.replace(
        /icon-/g,
        ""
      )}</span> <code class="code-preview">.${icon}</code></a>
  </div>
  </div>`
    )
    .join("");

  const html = (await fs.readFile(paths.chTemplate, "UTF8"))
    .replace(/{{version}}/g, packageJSON.version)
    .replace(/{{fontCss}}/g, cheatSheetCssFile)
    .replace(/{{contents}}/g, iconHTML);
  await fs.writeFile(paths.distDocIndex, html);
}

async function compileStyleSheets() {
  const buffer = await fs.readFile(paths.sourceLessFile);
  const less = buffer.toString();
  const css = less2css(less);
  const sass = less2sass.convert(less);

  await Promise.all([
    fs.writeFile(paths.distLessFile, less),
    fs.writeFile(paths.distSCSSFile, sass),
    fs.writeFile(paths.distCSSFile, css),
  ]);
}

async function build() {
  await clearDist();
  await createDist();
  await Promise.all([
    copyFonts(paths.fontsSrc, paths.distFonts),
    compileStyleSheets(),
  ]);
  await Promise.all([legacyDist(), generateCheatSheet()]);
}

(async () => await build())();
