/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { WebOptions } from '../types';

const path = require('path');
const postcss = require('@dlghq/postcss-dialog');

function configurePostCSSRule(options: WebOptions) {
  const override = {};
  Object.keys(options.override).forEach((_from) => {
    const _to = options.override[_from];

    const to = path.join(options.root, _to.replace(/~/g, 'node_modules'));
    const from = path.join(options.root, _from.replace(/~/g, 'node_modules'));

    override[from] = to;
  });

  return {
    loader: 'postcss-loader',
    options: {
      plugins() {
        return postcss({
          stage: 0,
          import: {
            resolve(id: string, base: string): string {
              if (
                base.startsWith(options.paths.styles) ||
                base.startsWith(options.paths.cssModules)
              ) {
                return id;
              }

              const fullName = id.startsWith('.') ? path.resolve(base, id) : id;

              return override[fullName] || id;
            },
          },
        });
      },
    },
  };
}

module.exports = configurePostCSSRule;
