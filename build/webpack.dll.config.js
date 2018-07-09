/**
 * Created by zh on 2018/7/9.
 */
const webpack = require('webpack');
const vendors = ['vue', 'vuex', 'vue-router', 'element-ui'];
const path = require('path');

module.exports = {
  entry: {
    "lib": vendors,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[chunkhash].dll.js',
    library: '[name]_lib_[chunkhash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './dist/manifest.json'),
      // This must match the output.library option above
      name: '[name]_lib_[chunkhash]',
    }),
  ],
};
