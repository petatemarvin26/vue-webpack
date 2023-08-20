const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {resolver, copyFilter, assetOutputPath} = require('./utils');
const {STYLE_FILE, SRC_FILE, IMG_FILE} = require('./constants');

/**
 * @param {any} env
 * @return {import('webpack').Configuration}
 */
module.exports = (env) => {
  /**
   * @type {import('webpack').Configuration['output']}
   */
  const output = {
    filename: 'static/js/index.js',
    path: resolver('build')
  };

  /**
   * @type {import('webpack').Configuration['module']}
   */
  const modules = {
    rules: [
      {
        test: IMG_FILE,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: assetOutputPath
          }
        }
      },
      {
        test: STYLE_FILE,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[hash:10]'
              }
            }
          }
        ]
      }
    ]
  };

  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new HtmlWebpackPlugin({
      PUBLIC_URL: env.PUBLIC_URL,
      publicPath: env.PUBLIC_URL,
      template: resolver('public/index.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolver('public'),
          to: resolver('build'),
          filter: copyFilter
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ];

  /**
   * @type {import('webpack').Configuration['optimization']}
   */
  const optimization = {
    // sideEffects: true,
    minimize: true,
    concatenateModules: true,
    mergeDuplicateChunks: true,
    mangleExports: 'deterministic',
    minimizer: [
      new CssMinimizerPlugin({test: STYLE_FILE}),
      new TerserPlugin({
        test: SRC_FILE,
        minify: TerserPlugin.terserMinify,
        terserOptions: {
          mangle: true,
          compress: {passes: 2},
          output: {beautify: false}
        }
      })
    ]
  };

  return {
    devtool: 'source-map',
    module: modules,
    plugins,
    output,
    optimization
  };
};
