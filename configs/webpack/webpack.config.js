const webpack = require('webpack');
const {merge} = require('webpack-merge');

const {VueLoaderPlugin} = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {resolver, getEnv, copyMetaFiles} = require('./utils');
const {VUE_SOURCE_REGEX, SOURCE_REGEX, STYLE_REGEX} = require('./constants');

/**
 * @param {*} env
 * @returns {import('webpack').Configuration}
 */
module.exports = (webpack_env) => {
  const {WEBPACK_SERVE, variant} = webpack_env;

  const is_development = !!WEBPACK_SERVE;
  const process_env = getEnv(is_development, variant);

  const entry = resolver('src/index.ts');

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process_env)
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolver('public'),
          to: resolver('build'),
          filter: copyMetaFiles
        }
      ]
    }),
    new VueLoaderPlugin()
  ];
  const module = {
    rules: [
      {
        test: VUE_SOURCE_REGEX,
        loader: 'vue-loader'
      },
      {
        test: SOURCE_REGEX,
        loader: 'ts-loader'
      }
    ]
  };
  const resolve = {
    extensions: ['.vue', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  };

  const optimization = {
    mergeDuplicateChunks: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimize: !is_development,
    minimizer: [
      new CssMinimizerPlugin({parallel: 2, include: STYLE_REGEX}),
      new TerserPlugin({
        parallel: 2,
        include: SOURCE_REGEX,
        terserOptions: {
          mangle: true,
          output: {beautify: false}
        }
      })
    ]
  };

  let config = {
    target: 'web',
    entry,
    plugins,
    module,
    resolve,
    optimization
  };

  if (is_development) {
    return merge(config, devConfig(process_env));
  }
  return merge(config, prodConfig(process_env));
};
