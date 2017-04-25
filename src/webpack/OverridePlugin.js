/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const path = require('path');

type OverrideConfig = {
  [from: string]: string
};

class OverridePlugin {
  config: OverrideConfig;

  constructor(root: string, override: OverrideConfig) {
    this.config = {};

    Object.keys(override).forEach((_from) => {
      const _to = override[_from];

      const to = path.join(root, _to.replace(/~/g, 'node_modules'));
      const from = path.join(root, _from.replace(/~/g, 'node_modules'));

      this.config[from] = to;
    });
  }

  apply(resolver: any) {
    resolver.plugin('normal-module-factory', (nmf) => {
      nmf.plugin('before-resolve', (result, callback) => {
        if (result) {
          const realRequest = path.join(result.context, result.request);
          const fakeRequest = this.config[realRequest];
          if (fakeRequest) {
            result.request = fakeRequest;
          }

          callback(null, result);
        } else {
          callback();
        }
      });
    });
  }
}

module.exports = OverridePlugin;
