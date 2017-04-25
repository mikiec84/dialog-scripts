/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint global-require:0 */

module.exports = {
  web: {
    createWebpackConfig: require('./web')
  },
  electron: {
    build: require('./electron/build'),
    deploy: require('./electron/deploy')
  }
};
