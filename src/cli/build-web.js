/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const build = require('../webpack/build');
const { createWebpackConfigForWeb } = require('../web/createWebpackConfig');
const loadDialogConfig = require('./utils/loadDialogConfig');

module.exports = {
  name: 'build-web',
  description: 'Build web application',
  async action(args: Object) {
    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = 'production';

    const config = loadDialogConfig(args.config);
    const webConfig = createWebpackConfigForWeb(config.web);

    await build(webConfig);
  },
};
