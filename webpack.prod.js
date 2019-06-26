const webpack = require('webpack');
const Merge = require('webpack-merge');

const CommonConfig = require('./webpack.common.js');

process.env.NODE_ENV = 'production';

module.exports = function (env, compileEntries) {
  return Merge(CommonConfig(env, compileEntries), {
    devtool: false,

    mode: 'production',

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  });
};

