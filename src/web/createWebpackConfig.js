/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

const getVersion = require('./getVersion');
const configureOutput = require('./configureOutput');
const configureRules = require('./configureRules');
const configurePlugins = require('./configurePlugins');
const configureAlias = require('./configureAlias');
const configureDevTool = require('./configureDevTool');
const resolve = require('../utils/resolve');

function createWebpackConfig(options: WebOptions) {
  options.version = getVersion(options.version);

  return {
    context: resolve(options.root),
    entry: {
      app: [
        options.entry.js,
        options.entry.css
      ],
      vendor: ['@dlghq/dialog-java-core']
    },
    optimization: {
      minimize: process.env.NODE_ENV === 'production'
    },
    output: configureOutput(options),
    resolveLoader: {
      moduleExtensions: ['-loader']
    },
    module: {
      rules: configureRules(options)
    },
    resolve: {
      alias: configureAlias(options)
    },
    plugins: configurePlugins(options),
    devServer: {
      port: 3000
    },
    devtool: configureDevTool(options),
    target: 'web',
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  };
}

module.exports = createWebpackConfig;
