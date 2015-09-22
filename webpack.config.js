var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
