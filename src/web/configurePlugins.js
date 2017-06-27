/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

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

function configurePlugins(options: WebOptions) {
  const plugins = [];

  plugins.push(new LoaderOptionsPlugin({
    debug: options.environment === 'development',
    minimize: options.environment === 'production'
  }));

  plugins.push(new HTMLPlugin({
    favicon: options.favicon,
    template: options.entry.html
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
      sourceMap: true,
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
      exclude: [resolve(options.root, 'node_modules/@dlghq/dialog-java-core/core.js')]
    }));

    plugins.push(new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }));

    if (options.gzip !== false) {
      plugins.push(new CompressionPlugin({
        test: /\.(js|css|html)$/,
        minRatio: 0.8,
        threshold: 10240
      }));
    }

    if (options.configureSentry) {
      const sentry = options.configureSentry();

      if (sentry) {
        plugins.push(new SentryPlugin({
          apiKey: sentry.apiKey,
          project: sentry.project,
          organisation: sentry.organisation,
          baseSentryURL: sentry.url,
          release() {
            return options.version;
          }
        }));
      }
    }
  }

  return plugins;
}

module.exports = configurePlugins;
