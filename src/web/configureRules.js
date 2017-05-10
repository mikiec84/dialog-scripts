/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = require('../utils/resolve');
const configurePostCSS = require('./configurePostCSS');

function configureModuleRules(options: WebOptions) {
  const rules = [];

  const valFiles = [
    resolve(options.root, 'node_modules/@dlghq/dialog-web-core/src/messages-generate.js')
  ];

  if (options.valFiles) {
    valFiles.push(...options.valFiles);
  }

  rules.push({
    test: valFiles,
    loader: 'val-loader'
  });

  rules.push({
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
      babelrc: false,
      cacheDirectory: true,
      presets: [
        ['@dlghq/dialog', {
          modules: false,
          optimize: options.environment === 'production',
          development: options.environment === 'development'
        }]
      ]
    },
    include: [
      path.dirname(options.main),
      resolve(options.root, 'node_modules/@dlghq'),
      resolve(options.root, 'node_modules/@dlghq/dialog-web-core'),
      resolve(options.root, 'node_modules/@dlghq/dialog-components')
    ],
    exclude: [
      ...valFiles,
      resolve(options.root, 'node_modules/@dlghq/dialog-java-core')
    ]
  });

  if (options.environment === 'production') {
    // global
    rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1
            }
          },
          configurePostCSS(options)
        ]
      }),
      include: [
        options.cssMain,
        resolve(options.root, 'node_modules/@dlghq/dialog-web-core/src/styles/global.css')
      ]
    });

    // css-modules
    rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: `${options.cssPrefix}-[sha1:hash:hex]`
            }
          },
          configurePostCSS(options)
        ]
      }),
      include: [
        path.dirname(options.cssMain),
        resolve(options.root, 'node_modules/@dlghq'),
        resolve(options.root, 'node_modules/@dlghq/dialog-web-core'),
        resolve(options.root, 'node_modules/@dlghq/dialog-components')
      ],
      exclude: [
        options.cssMain,
        resolve(options.root, 'node_modules/@dlghq/dialog-web-core/src/styles/global.css')
      ]
    });
  } else {
    // global
    rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
            importLoaders: 1
          }
        },
        configurePostCSS(options)
      ],
      include: [
        options.cssMain,
        resolve(options.root, 'node_modules/@dlghq/dialog-web-core/src/styles/global.css')
      ]
    });

    // app css-modules
    rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: `${options.cssPrefix}-[name]-[local]`
          }
        },
        configurePostCSS(options)
      ],
      include: [
        path.dirname(options.main)
      ],
      exclude: [
        options.cssMain
      ]
    });

    // dialog sdk
    rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: 'DialogSDK-[name]-[local]'
          }
        },
        configurePostCSS(options)
      ],
      include: [
        resolve(options.root, 'node_modules/@dlghq/dialog-web-core')
      ],
      exclude: [
        resolve(options.root, 'node_modules/@dlghq/dialog-web-core/src/styles/global.css')
      ]
    });

    // dialog components
    rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: 'DialogComponents-[name]-[local]'
          }
        },
        configurePostCSS(options)
      ],
      include: [
        resolve(options.root, 'node_modules/@dlghq/dialog-components')
      ]
    });
  }

  rules.push({
    test: /\.yml$/,
    loader: 'yml-loader'
  });

  const icons = [
    resolve(options.root, 'node_modules/@dlghq/dialog-components/src/components/Icon/svg')
  ];

  rules.push({
    test: /\.(svg|png|gif|jpe?g|ttf|eot|woff2?|mp3)$/,
    loader: 'file-loader',
    options: {
      name: '[sha1:hash:hex].[ext]'
    },
    exclude: [
      ...icons
    ]
  });

  rules.push({
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
    include: [
      ...icons
    ]
  });

  return rules;
}

module.exports = configureModuleRules;
