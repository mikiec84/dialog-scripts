/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

module.exports = {
  createWebWebpackConfig: require('./web/createWebpackConfig'),
  createDesktopWebpackConfig: require('./electron/createWebpackConfig'),
  buildDesktop: require('./electron/build'),
  deployDesktop: require('./electron/deploy')
};
