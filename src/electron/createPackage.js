/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { DesktopOptions } from '../types';

function createPackage(options: DesktopOptions) {
  return {
    name: options.productName,
    version: options.version,
    author: options.author,
    homepage: options.homepage,
    productName: options.productName,
    description: options.description,
    main: 'main.js'
  };
}

module.exports = createPackage;
