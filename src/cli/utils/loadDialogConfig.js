/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions, DesktopOptions } from '../../types';
import path from 'path';
import fs from 'fs';

type DialogConfig = {
  web: WebOptions,
  desktop: DesktopOptions,
};

function loadDialogConfig(filename: string = 'dialog.config.js'): DialogConfig {
  const filePath: string = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Cannot find config file '${filePath}'`);
  }

  // $FlowFixMe: not fixable =)
  return require(filePath);
}

module.exports = loadDialogConfig;
