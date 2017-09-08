/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PlatformType } from '../types';
const Promise = require('bluebird');
const { build: _build, Platform, Arch } = require('electron-builder');

function getTaskByPlatform(platform: PlatformType): mixed[] {
  switch (platform) {
    case 'macos':
      return [
        'osx_64',
        Platform.MAC.createTarget('zip', Arch.x64)
      ];

    case 'deb':
    case 'linux':
      return [
        'linux_32',
        Platform.LINUX.createTarget('deb', Arch.ia32, Arch.x64)
      ];

    case 'rpm':
      return [
        'linux_32',
        Platform.LINUX.createTarget('rpm', Arch.ia32, Arch.x64)
      ];

    case 'windows':
      return [
        'windows_32',
        Platform.WINDOWS.createTarget('nsis', Arch.ia32, Arch.x64)
      ];

    default:
      (platform: empty); // eslint-disable-line
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

async function build(platforms: PlatformType[], config: Object): Promise<Array<[string, string]>> {
  const result = [];

  const tasks = platforms.map((platform) => getTaskByPlatform(platform));

  for (const [
    platform,
    targets
  ] of tasks) {
    const [path] = await _build({ ...config, targets });
    result.push([
      platform,
      path
    ]);
  }

  return result;
}

module.exports = build;
