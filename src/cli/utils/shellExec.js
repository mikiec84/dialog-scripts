/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const { exec } = require('child_process');

function shellExec(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

module.exports = shellExec;
