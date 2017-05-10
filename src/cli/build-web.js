/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const chalk = require('chalk');
const webpack = require('webpack');
const loadDialogConfig = require('./utils/loadDialogConfig');

function createWebpackConfig() {
  const createWebConfig = require('../web');
  const config = loadDialogConfig();

  return createWebConfig(config.web);
}

module.exports = {
  name: 'build-web',
  description: 'Build web application',
  async action() {
    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = 'production';

    const compiler = webpack(createWebpackConfig());

    compiler.run((error, stats) => {
      if (error) {
        console.error(chalk.red(error.stack || error));
        if (error.details) {
          console.error(chalk.yellow(error.details));
        }
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(chalk.red(info.errors));
      }

      if (stats.hasWarnings()) {
        console.warn(chalk.yellow(info.warnings));
      }
    });
  }
};
