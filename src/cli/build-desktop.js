/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const path = require('path');
const webpackBuild = require('../webpack/build');
const electronBuild = require('../electron/build');
const electronPublish = require('../electron/deploy');
const loadDialogConfig = require('./utils/loadDialogConfig');
const createWebpackConfig = require('../electron/createWebpackConfig');
const detectElectronVersion = require('../electron/detectElectronVersion');

module.exports = {
  name: 'build-desktop',
  description: 'Build desktop application',
  options: [
    ['--force-sign', 'Fail if signing failed'],
    ['--publish', 'Publish artifacts to electron-release-server'],
    ['--pack-only', 'Build app without webpack bundling'],
    ['--channel [channel]', 'Publish to specific channel (stable, rc, beta, alpha)']
  ],
  async action(args: Object) {
    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = 'production';

    const config = loadDialogConfig();
    if (!args.packOnly) {
      await webpackBuild(createWebpackConfig(config.web, config.desktop));
    }

    const binaries = await electronBuild(config.desktop.platforms, {
      appId: config.desktop.appId,
      copyright: config.desktop.copyright,
      mac: {
        category: 'public.app-category.social-networking'
      },
      protocols: {
        name: config.desktop.productName + ' URL',
        schemes: [config.desktop.schema]
      },
      projectDir: config.desktop.root,
      config: {
        forceCodeSigning: args.forceSign,
        electronVersion: detectElectronVersion(config.desktop.root),
        directories: {
          app: config.desktop.output,
          buildResources: path.join(config.desktop.root, 'assets')
        }
      }
    });

    if (args.publish) {
      const publishConfig = config.desktop.configurePublish();
      if (!publishConfig) {
        throw new Error('Publish config not specified');
      }

      await electronPublish(binaries, {
        ...publishConfig,
        version: config.desktop.version,
        channel: args.channel || 'stable'
      });
    }
  }
};
