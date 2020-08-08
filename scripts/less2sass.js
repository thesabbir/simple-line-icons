// http://stackoverflow.com/questions/14970224/anyone-know-of-a-good-way-to-convert-from-less-to-sass
// https://github.com/ekryski/less2sass/releases/tag/v1.0.3
// For any deviations, look for comments prefixed with "SIMPLE LINE ICONS DEVIATION:".

function Less2Sass(){

}

Less2Sass.prototype.convert = function(file) {

    this.file = file;

    this.convertInterpolatedVariables()
        .convertVariables()
        .convertTildaStrings()
        .convertMixins()
        .includeMixins()
        .convertExtend()
        .convertColourHelpers()
        .convertFileExtensions()
        .convertFunctionUnit();

    return this.file;
};

Less2Sass.prototype.includeMixins = function() {
    var includeRegex = /^(\s*)\.([a-zA-Z][\w\-]*\(?[^;{}]*\)?;{1}$)/gm;

    this.file = this.file.replace(includeRegex, '$1@include $2');

    return this;
};


Less2Sass.prototype.convertMixins = function() {
    // Simple form: no semicolons.
    const mixinRegexNoSemicolon = /^(\s*?)\.([\w\-]*?)\s*\(([\s\S][^\;]+?)?\)\s*\{$/gm;
    this.file = this.file.replace(mixinRegexNoSemicolon, '$1@mixin $2($3) {');
    // With semicolons.
    const mixinRegexWithSemicolon = /^(\s*?)\.([\w\-]*?)\s*\(([\s\S][^\,]+?)?\)\s*\{$/gm;
    this.file = this.file.replace(mixinRegexWithSemicolon, function (match, g1, g2, g3) {
        return g1 + '@mixin ' + g2 + '(' + g3.replace(/;/g, ',') + ') {';
    });
    return this;
};

Less2Sass.prototype.convertFunctionUnit = function() {
    // Two-args.
    const unitTwoArgRegex = /unit\((\S+),(\S+)\)/g;
    this.file = this.file.replace(unitTwoArgRegex, '0$2 + $1');
    // One-arg.
    const unitOneArgRegex = /unit\(([^,]+)\)/g;
    this.file = this.file.replace(unitOneArgRegex, 'unit-less($1)');

    return this;
};

Less2Sass.prototype.convertExtend = function() {
    // http://lesscss.org/features/#extend-feature
    // &:extend syntax.
    const andExtendRegex = /&:extend\((.[\w]*)\);/g;
    this.file = this.file.replace(andExtendRegex, '@extend $1;');

    return this;
};

Less2Sass.prototype.convertColourHelpers = function() {
    var helperRegex = /spin\(/g;

    this.file = this.file.replace(helperRegex, 'adjust-hue(');

    // TODO (EK): Flag other colour helpers for manual conversion that SASS does not have

    return this;
};

Less2Sass.prototype.convertTildaStrings = function() {
    var tildaRegex = /~("|')/g;

    this.file = this.file.replace(tildaRegex, '$1');

    return this;
};

Less2Sass.prototype.convertInterpolatedVariables = function() {
    var interpolationRegex = /@\{(?!(\s|\())/g;

    this.file = this.file.replace(interpolationRegex, '#{$');

    return this;
};

Less2Sass.prototype.convertVariables = function() {
    // Matches any @ that doesn't have 'media ' or 'import ' after it.
    //
    // SIMPLE LINE ICONS DEVIATION:
    // Additionally, we capture the variable name, full variable declaration and if this
    // should be considered a default variable for "simple-line-icons"-specific logic for
    // creating default variables (because LESS doesn't have the concept of default variable declarations).
    //
    // For example, if we have a LESS variable that looked like:
    //
    //      @simple-line-font-path: "../fonts/"; // default
    //
    // The "varDeclaration" group would be 'simple-line-font-path: "../fonts/"', the varName
    // group would be "simple-line-font-path" and the isDefault group would have content (indicating
    // that this should be output as a default variable).
    var varRegex = /@(?!(media|import|mixin|font-face|keyframes)(\s|\())(?<varDeclaration>(?<varName>([^:]*))[^;]*);(?<isDefault>\s*\/\/\s*default)?/g;

    // SIMPLE LINE ICONS DEVIATION:
    // The "replace" call has been modified so we can append the "!default" string for our
    // overridable variables. We only output a variable with the "!default" string if the
    // source had a "default" comment.
    this.file = this.file.replace(varRegex, function (match, p1, p2, p3, p4, p5, p6, offset, string, groups) {
        if (groups.isDefault) {
            return `$${groups.varDeclaration} !default;`
        }

        // The "match" includes the "@" symbol which we want to convert to a "$" for SASS.
        return `$${match.substring(1)}`
    });

    return this;
};

Less2Sass.prototype.convertFileExtensions = function() {
    var extensionRegex = /\.less/g;

    this.file = this.file.replace(extensionRegex, '.scss');

    return this;
};

module.exports = new Less2Sass();
