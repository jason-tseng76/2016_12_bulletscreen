// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',

  // 才能 lint .vue 檔
  plugins: [
    'html',
  ],

  // eslint-plugin-import 會用 webpack 的 resolve modules 設定
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },

  // 自訂規則
  rules: {
    // import 的時候不用寫 .js 跟 .vue
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'no-console': ['off'],
    'no-underscore-dangle': ['off'],
    // 'no-param-reassign': ["error", { "props": false }],
  },

  'globals': {
    '$': false,
    'Vue': false,
    'VueRouter': false,
    'io':false,
    'swal': false,
    'gapi': false,
    'moment': false,
    'signOut':false,
    'Cookies': false,
    'BtnLoading': false,
    'Sortable': false,
    'Clipboard': false,
  }
};