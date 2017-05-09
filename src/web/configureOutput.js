/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

const path = require('path');

type Options = {
  root: string,
  environment: string
};

function configureOutput(options: Options) {
  const output = path.resolve(options.root, 'dist');

  if (options.environment === 'production') {
    return {
      path: output,
      publicPath: './',
      filename: '[name].[hash].js',
      chunkFilename: '[id].[chunkhash].js',
      sourceMapFilename: '[file].map'
    };
  }

  return {
    path: output,
    pathinfo: true,
    publicPath: './',
    filename: '[name].js'
  };
}

module.exports = configureOutput;
