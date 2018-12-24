/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

const {
  DefinePlugin,
  EnvironmentPlugin,
  LoaderOptionsPlugin,
} = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const SentryPlugin = require('webpack-sentry-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OverridePlugin = require('../webpack/OverridePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function configurePlugins(options: WebOptions) {
  const plugins = [];

  plugins.push(
    new LoaderOptionsPlugin({
      debug: options.environment === 'development',
      minimize: options.environment === 'production',
      options: {
        context: __dirname,
      },
    }),
  );

  plugins.push(
    new HTMLPlugin({
      favicon: options.favicon,
      template: options.entry.html,
    }),
  );

  plugins.push(
    new DefinePlugin({
      __DEV__: JSON.stringify(options.environment === 'development'),
      __BROWSER__: JSON.stringify(true),
      __VERSION__: JSON.stringify(options.version),
    }),
  );

  plugins.push(
    new EnvironmentPlugin({
      VERSION: options.version,
      NODE_ENV: options.environment,
      DEPLOY_CHANNEL: null,
    }),
  );

  plugins.push(new OverridePlugin(options.root, options.override));

  if (options.copyWebpack) {
    plugins.push(
      new CopyWebpackPlugin(
        options.copyWebpack.patterns,
        options.copyWebpack.options,
      ),
    );
  }

  plugins.push(new DuplicatePackageCheckerPlugin());

  if (options.environment === 'production') {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    );

    if (options.gzip !== false) {
      plugins.push(
        new CompressionPlugin({
          test: /\.(js|css|html)$/,
          minRatio: 0.8,
          threshold: 10240,
        }),
      );
    }

    if (options.configureSentry) {
      const sentry = options.configureSentry();

      if (sentry) {
        plugins.push(
          new SentryPlugin({
            apiKey: sentry.apiKey,
            project: sentry.project,
            organisation: sentry.organisation,
            baseSentryURL: sentry.url,
            release() {
              return options.version;
            },
          }),
        );
      }
    }
  }

  return plugins;
}

module.exports = configurePlugins;
