const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  // entry: './src/main.js',
  entry: {},
  output: {
    // 發佈的路徑
    path: path.resolve(__dirname, '../server/public/bulletscreen/js'),
    filename: '[name]',
    // 異步載入的路徑(以web為主的路徑)
    publicPath: '/bulletscreen/js/',
    // 異步載入的檔案名
    chunkFilename: '[id].build.js?[chunkhash]',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            /* sass: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader?indentedSyntax',
              fallback: 'vue-style-loader',
            }),
            css: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader',
            }),*/
            js: 'babel-loader?presets[]=es2015,presets[]=stage-2',
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2'],
        },
      },
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
  },
  plugins: [
    // ExtractTextPlugin好像無法用在lazy loading的組件上
    // new ExtractTextPlugin('../css/style.css'),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
};

function getEntry(sourcePath) {
  const entries = {};
  glob.sync(sourcePath).forEach((entry) => {
    entries[entry.replace('./src/', './')] = entry;
  });
  return entries;
}
const entries = getEntry('./src/*.js');
Object.keys(entries).forEach((name) => {
	// config.entry[name] = entries[name].replace("./src/", "./");
  config.entry[name] = entries[name];
});
module.exports = config;
console.log(config.entry);

if (process.env.NODE_ENV === 'production') {
  //module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
} else {
  module.exports.devtool = '#source-map';
}
