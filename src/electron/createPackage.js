/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { DesktopOptions } from '../types';

function createPackage(options: DesktopOptions) {
  return {
    name: options.name,
    author: options.author,
    version: options.version,
    homepage: options.homepage,
    productName: options.productName,
    description: options.description,
    main: 'main.js',
  };
}

module.exports = createPackage;
