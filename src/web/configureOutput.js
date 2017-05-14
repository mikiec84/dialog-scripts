/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

function configureOutput(options: WebOptions) {
  if (options.environment === 'production') {
    return {
      path: options.output,
      publicPath: './',
      filename: '[name].[hash].js',
      chunkFilename: '[id].[chunkhash].js',
      sourceMapFilename: '[file].map'
    };
  }

  return {
    path: options.output,
    pathinfo: true,
    publicPath: './',
    filename: '[name].js'
  };
}

module.exports = configureOutput;
