/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Options as WebOptions } from '../../web';

type DialogConfig = {
  web: WebOptions
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
