/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';
const resolve = require('../utils/resolve');

function configureAlias(options: WebOptions) {
  const alias = [
    'react',
    'react-dom',
    'core-js',
    'immutable',
    'raven-js',
    'screenfull',
    'hoist-non-react-statics',
    'lodash'
  ];

  if (options.alias) {
    alias.push(...options.alias);
  }

  const result = {};
  alias.forEach((name) => {
    result[name] = resolve(options.root, `node_modules/${name}`);
  });

  return result;
}

module.exports = configureAlias;
