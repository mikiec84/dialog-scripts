/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function configureOptimization(options: WebOptions) {
  if (options.environment === 'production') {
    return {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin(),
      ],
    };
  }

  return {
    minimize: false,
  };
}

module.exports = configureOptimization;
