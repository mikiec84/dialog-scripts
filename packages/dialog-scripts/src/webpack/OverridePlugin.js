/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const path = require('path');

type OverrideConfig = {
  [from: string]: string,
};

class OverridePlugin {
  root: string;
  config: OverrideConfig;

  constructor(root: string, override: OverrideConfig) {
    this.root = root;
    this.config = {};

    Object.keys(override).forEach((_from) => {
      const _to = override[_from];

      const to = path.join(root, _to.replace(/~/g, 'node_modules'));
      const from = path.join(root, _from.replace(/~/g, 'node_modules'));

      this.config[from] = to;
    });
  }

  apply(compiler: any) {
    compiler.hooks.normalModuleFactory.tap(
      'OverridePlugin',
      (normalModuleFactory) => {
        normalModuleFactory.hooks.beforeResolve.tap(
          'OverridePlugin',
          (result) => {
            if (!result) {
              return false;
            }

            let realRequest = null;
            if (result.request[0] === '.') {
              // relative paths
              realRequest = path.join(result.context, result.request);
            } else if (result.context.indexOf('node_modules') >= 0) {
              // import from dependant module
              realRequest = path.join(
                this.root,
                'node_modules',
                result.request,
              );
            } else {
              realRequest = result.request;
            }

            const fakeRequest = this.config[realRequest];
            if (fakeRequest) {
              result.request = fakeRequest;
            }

            return result;
          },
        );
      },
    );
  }
}

module.exports = OverridePlugin;
