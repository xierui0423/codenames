const Merge = require('webpack-merge');

const CommonConfig = require('./webpack.common.js');


module.exports = function (env, compileEntries) {
  return Merge(CommonConfig(env, compileEntries), {

  });
};

