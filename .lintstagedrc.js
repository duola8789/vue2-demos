/**
 * @file config for lint-staged
 * @author zh
 */
module.exports = {
    // 使用 fecs 进行校验
    // '*.js1': filenames => filenames.map(filename => `fecs check '${filename}' --level=2 --rule=true --type=js,vue`)
    '*.js': filenames => filenames.map(file => `eslint ${file}`)
};
