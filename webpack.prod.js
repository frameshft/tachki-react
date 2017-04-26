const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    //extractSass,
    new ExtractTextPlugin('styles.css'),
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
        //loader: 'style-loader!css-loader!sass-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',

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

