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
const configureOptimization = require('./configureOptimization');
const resolve = require('../utils/resolve');

function createWebpackConfig(options: WebOptions) {
  const { bail = true, root, entry } = options;
  options.version = getVersion(options.version);

  return {
    context: resolve(root),
    mode: process.env.NODE_ENV,
    entry: {
      app: [entry.js, entry.css],
    },
    optimization: configureOptimization(options),
    output: configureOutput(options),
    resolveLoader: {
      moduleExtensions: ['-loader'],
    },
    module: {
      rules: configureRules(options),
    },
    resolve: {
      alias: configureAlias(options),
    },
    plugins: configurePlugins(options),
    devServer: {
      port: 3000,
    },
    devtool: configureDevTool(options),
    target: 'web',
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    bail,
  };
}

module.exports = createWebpackConfig;
