/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

const {
  DefinePlugin,
  EnvironmentPlugin,
  LoaderOptionsPlugin,
  optimize: {
    UglifyJsPlugin,
    CommonsChunkPlugin
  }
} = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const SentryPlugin = require('webpack-sentry-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const OverridePlugin = require('../webpack/OverridePlugin');
const resolve = require('../utils/resolve');

type Options = {
  root: string,
  version: string,
  override: { [path: string]: string },
  environment: string,
  sentry?: {
    apiKey: string,
    project: string,
    organisation: string
  }
};

function configurePlugins(options: Options) {
  const plugins = [];

  plugins.push(new LoaderOptionsPlugin({
    debug: options.environment === 'development',
    minimize: options.environment === 'production'
  }));

  plugins.push(new HTMLPlugin({
    favicon: resolve(options.root, 'assets/favicon.png'),
    template: resolve(options.root, 'app/index.html')
  }));

  plugins.push(new DefinePlugin({
    __DEV__: JSON.stringify(options.environment === 'development'),
    __BROWSER__: JSON.stringify(true),
    __VERSION__: JSON.stringify(options.version)
  }));

  plugins.push(new EnvironmentPlugin({
    VERSION: options.version,
    NODE_ENV: options.environment
  }));

  plugins.push(new OverridePlugin(options.root, options.override));

  plugins.push(new CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  }));

  plugins.push(new DuplicatePackageCheckerPlugin());

  if (options.environment === 'production') {
    plugins.push(new UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      exclude: [
        resolve(options.root, 'node_modules/@dlghq/dialog-java-core/core.js')
      ]
    }));

    plugins.push(new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }));

    plugins.push(new CompressionPlugin({
      test: /\.(js|css|html)$/,
      minRatio: 0.8,
      threshold: 10240
    }));

    if (options.sentry) {
      plugins.push(new SentryPlugin({
        apiKey: options.sentry.apiKey,
        project: options.sentry.project,
        organisation: options.sentry.organisation,
        release() {
          return options.version;
        }
      }));
    }
  }

  return plugins;
}

module.exports = configurePlugins;
