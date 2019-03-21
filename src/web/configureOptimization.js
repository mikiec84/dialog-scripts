/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function configureOptimization(options: WebOptions) {
  const chunkConfig = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/].*\.js$/,
          name(module: { context: string }) {
            // Splitting of all dependencies into 2 files - "dialog" packages and all the rest
            const nameData = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            );

            let packageName = null;
            if (nameData && nameData.length > 0) {
              packageName = nameData[1].replace('@', '');
            }

            return packageName === 'dlghq' ? 'core' : 'vendor';
          },
        },
      },
    },
  };

  if (options.environment === 'production') {
    return {
      ...chunkConfig,
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
    ...chunkConfig,
    minimize: false,
  };
}

module.exports = configureOptimization;
