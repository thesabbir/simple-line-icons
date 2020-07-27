const less = require("less");

function less2css(content) {
  let output = "";
  less.render(content, (e, { css }) => {
    output = css;
  });
  return output;
}

module.exports = less2css;
