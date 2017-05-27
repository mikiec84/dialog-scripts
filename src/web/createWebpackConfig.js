/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

const getVersion = require('./getVersion');
const configureOutput = require('./configureOutput');
const configureRules = require('./configureRules');
const configurePlugins = require('./configurePlugins');
const resolve = require('../utils/resolve');

function createWebpackConfig(options: WebOptions) {
  options.version += getVersion(options.version);

  return {
    context: resolve(options.root),
    entry: {
      app: [
        options.entry.js,
        options.entry.css
      ],
      vendor: [
        '@dlghq/dialog-java-core'
      ]
    },
    output: configureOutput(options),
    resolveLoader: {
      moduleExtensions: ['-loader']
    },
    module: {
      rules: configureRules(options)
    },
    resolve: {
      alias: {
        'react': resolve(options.root, 'node_modules/react'),
        'react-dom': resolve(options.root, 'node_modules/react-dom'),
        'core-js': resolve(options.root, 'node_modules/core-js'),
        'immutable': resolve(options.root, 'node_modules/immutable'),
        'raven-js': resolve(options.root, 'node_modules/raven-js')
      }
    },
    plugins: configurePlugins(options),
    devServer: {
      port: 3000
    },
    devtool: 'source-map',
    target: 'web',
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  };
}

module.exports = createWebpackConfig;
