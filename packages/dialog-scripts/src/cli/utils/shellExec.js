/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const { exec } = require('child_process');

type Result = {
  stdout: string,
  stderr: string,
};

function shellExec(command: string): Promise<Result> {
  return new Promise((resolve, reject) => {
    exec(command, (error: Error, stdout: string, stderr: string) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

module.exports = shellExec;
