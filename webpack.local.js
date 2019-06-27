const path = require('path');
const Merge = require('webpack-merge');

const CommonConfig = require('./webpack.common.js');

module.exports = function (env, compileEntries) {
  return Merge(CommonConfig(env, compileEntries), {
    devServer: {
      // match the output path
      contentBase: path.resolve(__dirname, 'dist'),

      // match the output 'publicPath'
      publicPath: '/',

      // host: '10.148.61.110',
    },

    performance: {
      hints: false,
    },


  });
};
