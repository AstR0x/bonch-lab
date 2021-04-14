module.exports = {
  /**
   * @Example
   *
   * Request from: /posts
   * Request to: https://a48bc492-f6ba-47d3-b16d-447e76cd337f.mock.pstmn.io/api/v1/posts
   */
  '/api/v*/**': {
    target: 'https://a48bc492-f6ba-47d3-b16d-447e76cd337f.mock.pstmn.io',
    changeOrigin: true,
  },
};
