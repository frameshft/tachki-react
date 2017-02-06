const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'app'),

  entry: {
    javascript: './js/app.js',
    html: "./index.html",
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist"),
      publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
        // path.resolve(__dirname, 'app/js'),
        path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader", "babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!postcss!sass?sourceMap'
      }
    ]
  }
  // postcss() {
  //   return [autoprefixer, precss];
  // }
};

