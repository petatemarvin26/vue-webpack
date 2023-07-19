const {resolver} = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const {
  PORT,
  IMG_REGEX,
  GIF_REGEX,
  ICON_REGEX,
  STYLE_REGEX
} = require('./constants');

/**
 * @param {*} env
 * @returns {import('webpack').Configuration}
 */
module.exports = (env) => {
  const {ENV} = env;

  const output = {
    filename: 'static/js/[name].[contenthash:5].bundle.js',
    path: resolver('build'),
    clean: true
  };
  const devServer = {
    open: true,
    compress: true,
    historyApiFallback: true,
    port: PORT,
    hot: false,
    allowedHosts: ['all']
  };
  const module = {
    rules: [
      {
        test: STYLE_REGEX,
        use: [
          'vue-style-loader',
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
      },
      {
        test: [ICON_REGEX, IMG_REGEX, GIF_REGEX],
        type: 'asset/resource',
        generator: {
          filename: '[name]-[hash:10].[ext]'
        }
      }
    ]
  };
  const plugins = [
    new InterpolateHtmlPlugin({PUBLIC_URL: '', ENV}),
    new HtmlWebpackPlugin({
      template: resolver('public/index.html')
    })
  ];

  return {
    mode: 'development',
    devtool: 'eval-source-map',
    stats: 'errors-warnings',
    output,
    devServer,
    module,
    plugins
  };
};
