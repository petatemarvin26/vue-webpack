const {resolver, assetFilter} = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const {MAX_SIZE, STYLE_REGEX} = require('./constants');

/**
 * @param {*} env
 * @returns {import('webpack').Configuration}
 */
module.exports = (env) => {
  const {PUBLIC_URL, ENV} = env;

  const output = {
    filename: 'static/js/[name].[contenthash:5].bundle.js',
    path: resolver('build'),
    clean: true
  };
  const plugins = [
    new InterpolateHtmlPlugin({PUBLIC_URL, ENV}),
    new HtmlWebpackPlugin({
      template: resolver('public/index.html'),
      title: 'vue'
    })
  ];
  const module = {
    rules: [
      {
        test: STYLE_REGEX,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]-[hash:10]'
              }
            }
          }
        ],
        exclude: '/node_modules/'
      }
    ]
  };
  const performance = {
    maxEntrypointSize: MAX_SIZE,
    maxAssetSize: MAX_SIZE,
    assetFilter
  };

  return {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-warnings',
    output,
    module,
    plugins,
    performance
  };
};
