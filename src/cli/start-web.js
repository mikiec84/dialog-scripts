/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const createWebConfig = require('../web/createWebpackConfig');
const loadDialogConfig = require('./utils/loadDialogConfig');

module.exports = {
  name: 'start-web',
  description: 'Start web dev-server',
  options: [
    [
      '--port',
      'The port'
    ],
    [
      '--host',
      'The hostname/ip address the server will bind to'
    ]
  ],
  async action(args: Object) {
    process.env.NODE_ENV = 'development';
    process.env.BABEL_ENV = 'development';

    const port = parseInt(args.port || 3000, 10);
    const host = args.host || '127.0.0.1';

    const config = loadDialogConfig();
    const webConfig = createWebConfig(config.web);

    const compiler = webpack(webConfig);
    const server = new WebpackDevServer(compiler, {
      stats: {
        colors: true
      }
    });

    server.listen(port, host, () => {
      console.log('Dialog web server started!');
    });
  }
};
