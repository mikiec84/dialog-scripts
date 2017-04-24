/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

module.exports = {
  electron: {
    build: require('./electron/build'),
    deploy: require('./electron/deploy')
  }
};
