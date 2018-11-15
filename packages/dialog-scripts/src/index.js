/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

require('./monkeypatch');

module.exports = {
  createWebWebpackConfig: require('./web/createWebpackConfig'),
  createDesktopWebpackConfig: require('./electron/createWebpackConfig'),
  buildDesktop: require('./electron/build'),
};
