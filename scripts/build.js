const less2sass = require("./less2sass");
const less2css = require("./less2css");
const fs = require("fs").promises;
const path = require("path");
const packageJSON = require("../package.json");
const paths = require("./paths");

async function copyFonts() {
  const entries = await fs.readdir(paths.fontsSrc, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(paths.fontsSrc, entry.name);
    const destPath = path.join(paths.fontsDist, entry.name);
    console.log(srcPath, destPath);
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
  await fs.mkdir(paths.fontsDist, { recursive: true });
  await fs.mkdir(paths.distDoc, { recursive: true });
}

async function generateCheatSheet() {
  const cssPath = path.join(extension(paths.distLessFile, ".css"));
  const css = await fs.readFile(cssPath, "UTF8");
  const regex = /\.(icon-(?:\w+(?:-)?)+):before\s+{\s*content:\s*"(.+)";\s+}/g;
  const cheatSheetCssFile = "../styles/simple-line-icons.css";
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
    fs.writeFile(extension(paths.distLessFile, ".scss"), sass),
    fs.writeFile(extension(paths.distLessFile, ".css"), css),
  ]);
}

async function build() {
  await clearDist();
  await createDist();
  await Promise.all([copyFonts(), compileStyleSheets()]);
  await generateCheatSheet();
}

(async () => await build())();
