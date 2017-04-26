/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Options as WebOptions } from '../web';

type DialogConfig = {
  web: WebOptions
};

function loadDialogConfig(): DialogConfig {
  const path = require('path');

  try {
    // $FlowFixMe: not fixable =)
    return require(path.join(process.cwd(), 'dialog.config.js'));
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      throw new Error(`dialog.config.js not found at ${process.cwd()}`);
    }

    throw e;
  }
}

module.exports = {
  name: 'build',
  description: 'Build web and desktop applications',
  options: [
    ['--no-desktop', 'build web without desktop'],
    ['--no-web', 'build desktop without web']
  ],
  async action() {
    const chalk = require('chalk');
    const webpack = require('webpack');
    const createWebConfig = require('../web');

    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = 'production';

    const config = loadDialogConfig();

    const web = createWebConfig(config.web);

    webpack(web, (error, stats) => {
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
