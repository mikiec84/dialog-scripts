/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const path = require('path');

function detectElectronVersion(root: string): string {
  const pkg = require(path.join(root, 'node_modules/@dlghq/dialog-desktop-sdk/package.json'));
  return pkg.devDependencies.electron;
}

module.exports = detectElectronVersion;
