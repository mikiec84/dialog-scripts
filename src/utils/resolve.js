/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

const fs = require('fs');
const path = require('path');

function resolve(...args: string[]): string {
  return fs.realpathSync(path.join(...args));
}

module.exports = resolve;
