const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const getConfig = require('../config');
const commomConfig = require('../common');

const config = merge(commomConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: getConfig('devServer'),
  output: {
    path: getConfig('appDist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: getConfig('appHTMLTemplate'),
      title: getConfig('appName'),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
});

module.exports = config;
