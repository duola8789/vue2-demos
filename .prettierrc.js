/**
 * @file Prettier 配置文件
 * prettier options: https://prettier.io/docs/en/options.html
 */
module.exports = {
    // max 120 characters per line
    printWidth: 140,
    // use 4 spaces for indentation
    tabWidth: 2,
    // use spaces instead of indentations
    useTabs: false,
    // semicolon at the end of the line
    semi: true,
    // use single quotes
    singleQuote: true,
    // object's key is quoted only when necessary
    quoteProps: 'as-needed',
    // use double quotes instead of single quotes in jsx
    jsxSingleQuote: false,
    // no comma at the end
    trailingComma: 'none',
    // spaces are required at the beginning and end of the braces
    bracketSpacing: false,
    // end tag of jsx need to wrap
    jsxBracketSameLine: false,
    // brackets are required for arrow function parameter, even when there is only one parameter
    arrowParens: 'always',
    // format the entire contents of the file
    rangeStart: 0,
    rangeEnd: Infinity,
    // no need to write the beginning @prettier of the file
    requirePragma: false,
    // No need to automatically insert @prettier at the beginning of the file
    insertPragma: false,
    // use default break criteria
    proseWrap: 'preserve',
    // decide whether to break the html according to the display style
    htmlWhitespaceSensitivity: 'ignore',
    // lf for newline
    endOfLine: 'lf',
    // Whether or not to indent the code inside <script> and <style> tags in Vue files
    vueIndentScriptAndStyle: false,
    overrides: [
        {
            'files': ['*.css', '*.less', '*.sass', '*.scss'],
            'options': {
                'singleQuote': false
            }
        },
    ]
};
