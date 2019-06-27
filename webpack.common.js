const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CssNextPlugin = require('postcss-cssnext');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const fileStream = require('fs');
const path = require('path');

const publicPath = '../';

module.exports = (env, compilePages) => {
  const root = env === 'prod' ? 'prod' : (env === 'local' ? 'local' : 'dist');

  const config = {
    entry: {},

    output: {
      path: path.resolve(__dirname, root),
      publicPath,
      chunkFilename: 'entries/[name].js',
      filename: 'entries/[name].js',
    },

    devtool: 'inline-source-map',

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
    },


    mode: 'development',

    module: {
      rules: [{
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],

        loader: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src')],

        // Note the order of loader applied is opposite with the order within the loaders array
        loader: ExtractTextPlugin.extract([{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: false,
            url: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [CssNextPlugin],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'style-resources-loader',
          options: {
            patterns: [
              './src/shared/css/variables.scss', './src/shared/css/mixins.scss',
            ],
          },
        },
        ]),
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src')],

        // Note the order of loader applied is opposite with the order within the loaders array
        loader: ExtractTextPlugin.extract([
          'css-loader',
        ]),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, root), path.resolve(__dirname, 'node_modules')],
        loader: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images',
            publicPath: `${publicPath}images`,
          },
        }],
      },
      {
        test: /\.(wav|mp3|Ogg)$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, root), path.resolve(__dirname, 'node_modules')],
        loader: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'audio',
            publicPath: `${publicPath}audio`,
          },
        }],
      },
      {
        test: /\.pug$/,
        include: [path.resolve(__dirname, 'src')],
        loader: [{
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        }],
      },
      {
        test: /\.vue$/,
        include: [path.resolve(__dirname, 'src')],
        loader: [{
          loader: 'vue-loader',
          options: {
            transformAssetUrls: {
              video: [],
              source: '',
              img: '',
              image: [],
            },
            loaders: {
              js: {
                loader: 'babel-loader',
              },
            },
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?[a-z0-9]+)?$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        loader: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
            publicPath: `${publicPath}fonts`,
          },
        }],
      },
      ],
    },


    resolve: {
      extensions: ['.js', '.jsx'],
    },

    plugins: [
      new CleanWebpackPlugin(root),

      // Make css bundle
      new ExtractTextPlugin({
        filename: 'style/[name].css',
        allChunks: true,
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
      }),

      new CopyWebpackPlugin([{
        from: './src/assets/images/**/*',
        to: 'images',
        flatten: true,
      },
      {
        from: './src/assets/audio/**/*',
        to: 'audio',
        flatten: true,
      },
      {
        from: './src/assets/html/**/*',
        to: 'static',
        flatten: true,
      },
      ]),

      new VueLoaderPlugin(),

    ],
  };
  const localOnlyEntries = [
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8080',
  ];

  config.entry.main = [
    // The actual entry
    './src/entry/index.js',
  ];

  if (env === 'local') {
    config.entry.main = localOnlyEntries.concat(config.entry.main);
  }

  // Get entries from the entries path,
  // if the list of entries need to be compiled is given and the current entry is not included,
  // just don't add it to the config entry collection
  const pages = fileStream.readdirSync('./src/pages').filter(page =>
    page !== '.DS_Store' && (env !== 'local' || !compilePages || !compilePages.length || compilePages.includes(page)));

  pages.forEach((page) => {
    config.plugins.push(new HtmlWebpackPlugin({
      chunks: page === 'home-page' ? ['home-page', 'commons'] : ['main', 'commons'],
      filename: `./pages/${page}.html`, // Main html output path
      template: `./src/pages/${page}/${page}.pug`, // Html template path
    }));
  });

  config.plugins.push(new HtmlWebpackPlugin({
    inject: false,
    filename: './index.html', // Main html output path
    template: './src/index.pug', // Html template path
    pages,
  }));

  return config;
};
