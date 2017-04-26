/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

const getBuildNumber = require('build-number');
const configureOutput = require('./configureOutput');
const configureRules = require('./configureRules');
const configurePlugins = require('./configurePlugins');
const resolve = require('../utils/resolve');

export type Options = {
  root: string,
  version: string,
  override: { [path: string]: string },
  cssPrefix: string,
  environment: string,
  sentry?: {
    apiKey: string,
    project: string,
    organisation: string
  }
};

function createWebpackConfig(options: Options) {
  options.version += '-' + (getBuildNumber() || 'dev');

  return {
    context: resolve(options.root),
    entry: {
      index: [
        resolve(options.root, 'app/index.js'),
        resolve(options.root, 'app/styles/global.css')
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
