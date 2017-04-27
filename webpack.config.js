const path = require('path');
// const precss = require('precss');
// const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'app'),

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  entry: path.join(__dirname, 'app/js/app.jsx'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      ga: '',
    }),
    new webpack.NamedModulesPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      // path.resolve(__dirname, 'app/js'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap&!sass-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.jpg$|\.png$/,
        loader: ['url-loader'],
      },
    ],
  },
  // postcss() {
  //   return [autoprefixer, precss];
  // }
};

