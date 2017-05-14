/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

const chalk = require('chalk');
const util = require('util');

module.exports = {
  log(...args: any[]) {
    console.log(...args);
  },
  info(...args: any[]) {
    console.log(chalk.blue(util.format(...args)));
  },
  warn(...args: any[]) {
    console.warn(chalk.yellow(util.format(...args)));
  },
  error(...args: any[]) {
    console.error(chalk.red(util.format(...args)));
  },
  trace(error: Error) {
    console.trace(chalk.red(error));
  }
};

