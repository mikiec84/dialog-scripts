/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

function configureDevTool(options: WebOptions): string | false {
  if (typeof options.devtool === 'boolean') {
    return options.devtool ? 'source-map' : false;
  }

  return options.devtool || 'source-map';
}

module.exports = configureDevTool;
