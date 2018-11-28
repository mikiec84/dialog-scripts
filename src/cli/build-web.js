/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const build = require('../webpack/build');
const createWebConfig = require('../web/createWebpackConfig');
const loadDialogConfig = require('./utils/loadDialogConfig');

module.exports = {
  name: 'build-web',
  description: 'Build web application',
  async action() {
    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = 'production';

    const config = loadDialogConfig();
    const webConfig = createWebConfig(config.web);

    await build(webConfig);
  },
};
