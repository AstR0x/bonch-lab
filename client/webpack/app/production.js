const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const getConfig = require('../config');
const commomConfig = require('../common');

module.exports = merge(commomConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    path: getConfig('appBuild'),
    filename: 'bundle-[hash].js',
  },
  optimization: {
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          extractComments: true,
          sourceMap: true,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          minChunks: 2,
          name: 'common',
          enforce: true,
        },
        default: {
          minChunks: 3,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5,
      minChunkSize: 1000,
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1000,
    }),
    new HtmlWebpackPlugin({
      template: getConfig('appHTMLTemplate'),
      title: getConfig('appName'),
      inject: true,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['ru'],
    }),
  ],
});
