/**
 * @param {any} env
 * @return {import('webpack').Configuration}
 */
module.exports = (env) => {
  /**
   * @type {import('webpack').WebpackOptionsNormalized['devServer']}
   */
  const devServer = {
    port: env.PORT,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      logging: 'error'
    }
  };

  return {
    devServer,
    devtool: 'eval-source-map'
  };
};
