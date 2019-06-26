// http://eslint.org/docs/user-guide/configuring

module.exports = {
  parser: 'babel-eslint',
  
  env: {
    browser: true,
    jest: true,
  },

  globals: {
    "$": true,
    "Rx": true
  },

  extends: [
    'airbnb/base'
  ],

  // add your custom rules here
  rules: {
    // allow debugger, they will be removed for production automatically
    'no-debugger':  0,

    // allow console, they will be removed for production automatically
    'no-console': 0,

    // allow new for Vue component initialization
    'no-new': 0,

    // allow prefix underscore to indicate private memeber/function
    'no-underscore-dangle': 0,

    // allow both windows and linux type linebreaks
    'linebreak-style': 0,

    // allow loose prop type check
    'react/forbid-prop-types': 0,

    // allow dev module import in config files
    'import/no-extraneous-dependencies': 0,

    // allow unary operators since we are not using auto semicolon insertion process
    'no-plusplus': 0,

    // allow nested ternary since it's helpful in JSX
    'no-nested-ternary': 0,
  }
}
