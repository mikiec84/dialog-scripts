/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions, DesktopOptions } from '../../types';

type DialogConfig = {
  web: WebOptions,
  desktop: DesktopOptions
};

function loadDialogConfig(): DialogConfig {
  const path = require('path');

  try {
    // $FlowFixMe: not fixable =)
    return require(path.join(process.cwd(), 'dialog.config.js'));
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      throw new Error(`dialog.config.js not found at ${process.cwd()}`);
    }

    throw e;
  }
}

module.exports = loadDialogConfig;
