
module.exports = {
    '**/*.js?(x)': filenames => filenames.map(filename => `fecs format '${filename}'`)
};
