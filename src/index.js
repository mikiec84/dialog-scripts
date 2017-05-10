/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

module.exports = {
  web: {
    createWebpackConfig: require('./web')
  },
  electron: {
    build: require('./electron/build'),
    deploy: require('./electron/deploy')
  }
};
