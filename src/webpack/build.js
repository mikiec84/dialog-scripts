/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const chalk = require('chalk');
const webpack = require('webpack');

type WebpackConfig = Object;

function build(config: WebpackConfig | WebpackConfig[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((error, stats) => {
      if (error) {
        reject(error);
      } else {
        const info = stats.toJson();
        if (stats.hasErrors()) {
          console.error(chalk.red(info.errors));
        }

        if (stats.hasWarnings()) {
          console.warn(chalk.yellow(info.warnings));
        }

        resolve();
      }
    });
  });
}

module.exports = build;
