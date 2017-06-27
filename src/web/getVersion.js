/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

const path = require('path');
const getBuildNumber = require('build-number');

function getPackageVersion(packageName): ?string {
  try {
    // $FlowFixMe
    const pkg: Object = require(path.join(packageName, 'package.json'));

    return typeof pkg.version === 'string' ? pkg.version : null;
  } catch (e) {
    return null;
  }
}

function getSDKVersion(): ?string {
  const version = getPackageVersion('@dlghq/dialog-web-core');

  return version ? `sdk-v${version}` : null;
}

function getCoreVersion(): ?string {
  const version = getPackageVersion('@dlghq/dialog-java-core');

  return version ? `core-v${version}` : null;
}

function getVersion(version: string): string {
  const versions = [
    version + '.' + (getBuildNumber() || 'dev'),
    getSDKVersion(),
    getCoreVersion()
  ];

  return versions.filter((item) => Boolean(item)).join('-');
}

module.exports = getVersion;
