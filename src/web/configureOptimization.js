/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

function getChunkConfig() {
  return {
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

            return packageName === 'dlghq' ? 'dlghq' : 'vendor';
          },
        },
      },
    },
  };
}

function getMinimizerProdConfig() {
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

function getMinimizerDevConfig() {
  return {
    minimize: false,
  };
}

export function configureWebpackOptimization(options: WebOptions) {
  const prodMode = options.environment === 'production';

  return {
    ...getChunkConfig(),
    ...(prodMode ? getMinimizerProdConfig() : getMinimizerDevConfig()),
  };
}
