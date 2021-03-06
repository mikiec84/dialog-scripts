/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

require('../monkeypatch');

const program = require('commander');
const Promise = require('bluebird');

Promise.config({
  warnings: true,
  monitoring: true,
  longStackTraces: true,
});

program.version('1.0.1');

type Command = {
  name: string,
  description?: string,
  options?: Array<[string, string]>,
  action: (args: Object) => Promise<void>,
};

const commands: Command[] = [
  require('./build-web'),
  require('./start-web'),
  require('./build-desktop'),
];

const commonOptions = [['-c, --config [filename]', 'Config file name']];

commands.forEach((desc) => {
  const command = program.command(desc.name);

  if (desc.description) {
    command.description(desc.description);
  }

  commonOptions.forEach((option) => command.option(...option));

  if (desc.options) {
    desc.options.forEach((option) => {
      command.option(...option);
    });
  }

  command.action((...args) => {
    desc
      .action(...args)
      .then(() => {
        process.exit(0); // eslint-disable-line no-process-exit
      })
      .catch((error) => {
        console.error(error);
        process.exit(1); // eslint-disable-line no-process-exit
      });
  });
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
