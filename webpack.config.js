var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  debug: true,

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8081',
      'webpack/hot/only-dev-server',
      './src/scripts/main.js'
    ]
  },

  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },

  watchOptions: {
    poll: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],

  resolve: {
    modulesDirectories: ['src/scripts', 'node_modules', 'bower_components']
  },

  externals: {
    ga: 'ga'
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!less-loader'
        )
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!sass-loader'
        )
      },
      {
        test: /\.yml/,
        loader: 'json!yaml'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(ttf|eot).*?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(svg).*?$/,
        loader: 'url-loader?limit=10000&minetype=image/svg+xml'
      },
      {
        test: /\.woff2?.*$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 32000,
          name: 'assets/images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[path][name].[ext]&context=./src'
      }
    ]
  }
};
