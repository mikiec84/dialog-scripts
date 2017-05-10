/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const program = require('commander');
const Promise = require('bluebird');

Promise.config({
  warnings: true,
  monitoring: true,
  longStackTraces: true
});

program.version('1.0.1');

type Command = {
  name: string,
  description?: string,
  options?: Array<[string, string]>,
  action: (args: Object) => Promise<void>
};

const commands: Command[] = [
  require('./build-web'),
  require('./build-desktop')
];

commands.forEach((desc) => {
  const command = program.command(desc.name);
  if (desc.description) {
    command.description(desc.description);
  }

  if (desc.options) {
    desc.options.forEach((option) => {
      command.option(...option);
    });
  }

  command.action((...args) => {
    desc.action(...args).catch((error) => {
      const chalk = require('chalk');

      console.trace(chalk.red(error));
    });
  });
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
