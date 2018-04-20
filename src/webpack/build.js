/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const webpack = require('webpack');
const { default: chalk } = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const logger = require('../utils/logger');

type WebpackConfig = Object;

const ccb = chalk.cyan.bold;
const cgb = chalk.cyan.green;

function build(config: WebpackConfig | WebpackConfig[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);

    compiler.apply(new ProgressBarPlugin({
      format: `  ${ccb('build')} ${ccb('[')}:bar${ccb(']')} ${cgb(':percent')} - :msg`
    }));

    compiler.run((error, stats) => {
      if (error) {
        reject(error);
      } else {
        logger.log(stats.toString({
          chunks: false,
          colors: true
        }));

        resolve();
      }
    });
  });
}

module.exports = build;
