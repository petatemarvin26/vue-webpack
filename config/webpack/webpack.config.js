const {merge} = require('webpack-merge');
const {DefinePlugin} = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {getEnv, resolver} = require('./utils');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {SRC_FILE} = require('./constants');

/**
 * @param {object} webpack_env
 * @return {import('webpack').Configuration}
 */
module.exports = (webpack_env) => {
  const env = getEnv(webpack_env);

  /**
   * @type {import('webpack').Configuration['module']}
   */
  const entry = {
    index: './index.ts'
  };

  /**
   * @type {import('webpack').Configuration['module']}
   */
  const modules = {
    rules: [
      {
        test: /\.(vue)$/,
        loader: 'vue-loader'
      },
      {
        test: SRC_FILE,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          configFile: resolver('config/.babelrc')
        }
      }
    ]
  };

  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new VueLoaderPlugin(),
    new DefinePlugin({'process.env': JSON.stringify(env)})
  ];

  /**
   * @type {import('webpack').Configuration['resolve']}
   */
  const resolve = {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.ts', '.vue']
  };

  /**
   * @type {import('webpack').Configuration['optimization']}
   */
  const optimization = {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          filename: 'static/js/vendor.[contenthash:10].js',
          reuseExistingChunk: true,
          maxSize: 500000
        }
      }
    }
  };
  /**
   * @type {import('webpack').Configuration}
   */
  const config = {
    mode: 'development',
    entry,
    module: modules,
    plugins,
    resolve,
    optimization
  };

  if (!webpack_env.WEBPACK_SERVE) {
    config.mode = 'production';
    return merge(config, prodConfig(env));
  }
  return merge(config, devConfig(env));
};
