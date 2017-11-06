/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PlatformType } from '../types';
const { Platform, Arch } = require('electron-builder');

function createTargetByPlatform(platform: PlatformType) {
  switch (platform) {
    case 'macos':
      return Platform.MAC.createTarget('zip', Arch.x64);

    case 'deb':
    case 'linux':
      return Platform.LINUX.createTarget('deb', Arch.ia32, Arch.x64);

    case 'deb_32':
      return Platform.LINUX.createTarget('deb', Arch.ia32);

    case 'deb_64':
      return Platform.LINUX.createTarget('deb', Arch.x64);

    case 'rpm':
      return Platform.LINUX.createTarget('rpm', Arch.ia32, Arch.x64);

    case 'rpm_32':
      return Platform.LINUX.createTarget('rpm', Arch.ia32);

    case 'rpm_64':
      return Platform.LINUX.createTarget('rpm', Arch.x64);

    case 'nsis':
    case 'windows':
      return Platform.WINDOWS.createTarget('nsis', Arch.ia32, Arch.x64);

    case 'nsis_32':
      return Platform.WINDOWS.createTarget('nsis', Arch.ia32);

    case 'nsis_64':
      return Platform.WINDOWS.createTarget('nsis', Arch.x64);

    case 'msi':
      return Platform.WINDOWS.createTarget('msi', Arch.ia32, Arch.x64);

    case 'msi_32':
      return Platform.WINDOWS.createTarget('msi', Arch.ia32);

    case 'msi_64':
      return Platform.WINDOWS.createTarget('msi', Arch.x64);

    default:
      (platform: empty); // eslint-disable-line
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

module.exports = createTargetByPlatform;
