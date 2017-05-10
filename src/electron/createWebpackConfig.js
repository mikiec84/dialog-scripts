/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { DesktopOptions, WebOptions } from '../types';

const path = require('path');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const createPackage = require('./createPackage');
const createWebConfig = require('../web/createWebpackConfig');

function createMainConfig(options: DesktopOptions) {
  return {
    context: options.root,
    entry: options.main,
    output: {
      path: options.output,
      pathinfo: true,
      filename: 'main.js'
    },
    target: 'electron-main',
    plugins: [
      new GenerateJsonPlugin('package.json', createPackage(options), null, '  ')
    ]
  };
}

function createRendererConfig(web: WebOptions, desktop: DesktopOptions) {
  return createWebConfig({
    ...web,
    gzip: false,
    output: path.join(desktop.output, 'app')
  });
}

function createWebpackConfig(web: WebOptions, desktop: DesktopOptions) {
  return [
    createMainConfig(desktop),
    createRendererConfig(web, desktop)
  ];
}

module.exports = createWebpackConfig;
