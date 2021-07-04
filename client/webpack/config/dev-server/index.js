const paths = require('../paths');
const proxy = require('./proxy');

module.exports = {
  devServer: {
    port: 3000,
    allowedHosts: [],
    open: true,
    overlay: true,
    contentBase: [paths.appBuild],
    historyApiFallback: true,
    hot: true,
    proxy,
  },
};
