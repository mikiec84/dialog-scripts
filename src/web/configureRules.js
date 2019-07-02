/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { WebOptions } from '../types';

export function configureRules(options: WebOptions) {
  const prodMode = options.environment === 'production';
  const devMode = !prodMode;

  const babelLoaderOptions = {
    babelrc: false,
    cacheDirectory: true,
    presets: [
      [
        '@dlghq/babel-preset-dialog',
        {
          development: devMode,
          optimize: prodMode,
        },
      ],
    ],
    plugins: ['astroturf/plugin'],
  };

  const rules = [];

  rules.push({
    test: [
      /@dlghq\/rxjs-sdk-app\/src\/utils\/generateMessages\.js/,
      ...(options.paths.valFiles || []),
    ],
    loader: 'val-loader',
  });

  rules.push({
    test: /\.js$/,
    include: [/@dlghq\/.+/, ...(options.paths.js ? [options.paths.js] : [])],
    sideEffects: false,
    use: [
      {
        loader: 'babel-loader',
        options: babelLoaderOptions,
      },
      'astroturf/loader',
    ],
  });

  rules.push({
    test: /\.worker\.js$/,
    include: [/@dlghq\/.+/, ...(options.paths.js ? [options.paths.js] : [])],
    use: [
      'worker-loader',
      {
        loader: 'babel-loader',
        options: babelLoaderOptions,
      },
    ],
  });

  rules.push({
    test: /\.css$/,
    use: [
      {
        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: prodMode
              ? `${options.cssPrefix}-[sha1:hash:hex]`
              : `${options.cssPrefix}-[name]__[local]`,
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-import')({
              skipDuplicates: true,
              resolve(id: string, base: string): string {
                if (
                  base.startsWith(options.paths.styles) ||
                  base.startsWith(options.paths.cssModules)
                ) {
                  return id;
                }

                if (id.startsWith('@')) {
                  return require.resolve(id);
                }

                return id;
              },
            }),
            require('postcss-preset-env')({
              stage: 3,
              features: {
                'nesting-rules': true,
                'custom-properties': false,
                'color-mod-function': { unresolved: 'warn' },
              },
            }),
            require('cssnano')({
              preset: 'default',
            }),
          ],
        },
      },
    ],
  });

  rules.push({
    test: /\.yml$/,
    loader: 'yml-loader',
  });

  const iconPaths = [/@dlghq\/dialog-ui\/src\/components\/Icon\/svg/];
  rules.push({
    test: /\.(png|svg|gif|jpe?g|mp3|ttf|eot|woff|woff2|webm|mp4)$/,
    exclude: [...iconPaths],
    loader: 'file-loader',
    options: {
      name: devMode ? '[name].[sha1:hash:hex].[ext]' : '[sha1:hash:hex].[ext]',
    },
  });
  rules.push({
    test: /\.svg$/,
    include: [...iconPaths],
    loader: 'svg-sprite-loader',
    options: {
      runtimeCompat: true,
      plainSprite: true,
      spriteAttrs: {
        id: 'dialog-icon-sprite',
      },
    },
  });

  return rules;
}
