module.exports = function (env) {
  // Use this array to control which entries will be compiled
  // (leave it empty to compile all entries);
  const compilePages = [
    // 'about-us',
    // 'industries-l2-single-industry',
    // 'search-results',
  ];

  // eslint-disable-next-line
  return require(`./webpack.${env}.js`)(env, compilePages);
};
