const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const appEnv        = process.env.NODE_ENV || 'development';
const appPath       = path.join(__dirname, 'app');
const distPath      = path.join(__dirname, 'dist');
const exclude       = /node_modules/;

const config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: 'index.js',

  resolve: {
    modules: [
      'node_modules',
      appPath
    ],

    extensions: ['.js'],

    symlinks: false
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    publicPath: '',
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].bundle.js'
  },

  plugins: [

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html'
    }),



    // Pass environment variable to frontend scipts
    new webpack.DefinePlugin({
      $_ENVIRONMENT: JSON.stringify(appEnv),
      'process.env.NODE_ENV': JSON.stringify(appEnv)
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: path.join(__dirname, '.eslintrc'),
          failOnError: false,
          failOnWarning: false,
          emitWarning: true
        },
        postcss: [
          autoprefixer({
            browsers: ['last 2 versions']
          })
        ]
      }
    }),

    new CaseSensitivePathsPlugin()
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: exclude
      },

      // Expose React as global object
      {
        test: require.resolve('react'),
        loader: 'expose-loader',
        query: 'React'
      },

      // Transpile ES6 and enable Hot Reload
      {
        test: /\.js$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: { cacheDirectory: true }
          }
        ],
        exclude: exclude
      },

      // SCSS
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: { root: encodeURIComponent(appPath) }
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: true
            }
          }
        ]
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        query: {
          limit: 5120,
          name: '[name].[hash].[ext]'
        }
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
        loader: 'url-loader',
        query: {
          limit: 5120,
          name: '[name].[hash].[ext]'
        }
      }
    ]
  },

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: appPath,
    noInfo: true,
    historyApiFallback: true
  }
};

config.devtool     = 'inline-source-map';

module.exports = config;
