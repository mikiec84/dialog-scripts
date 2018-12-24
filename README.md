# Dialog Scripts

Build scripts preset for dialog-based web & desktop applications.

## Installation

```
yarn add @dlghq/dialog-scripts
```

## Usage

You can configure your build using `dialog.config.js` file.

```js
// dialog.config.js

const path = require('path');
const pkg = require('./package.json');

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}

module.exports = {
  // web-app build configuration
  web: {
    root: __dirname,
    output: resolve('dist/web'),
    entry: {
      js: resolve('web/index.js'),
      css: resolve('web/styles/global.css'),
      html: resolve('web/index.html'),
    },
    paths: {
      js: resolve('web'),
      styles: resolve('web/styles'),
      cssModules: resolve('web/components'),
      valFiles: [resolve('web/messages.js')],
    },
    favicon: resolve('assets/favicon.png'),
    version: pkg.version,
    cssPrefix: 'dlgee',
    environment: process.env.NODE_ENV || 'development',
    override: {
      // override any file from dialog sdk and it's dependencies
      '~/@dlghq/dialog-components/src/components/Logo/Logo':
        'web/components/Logo/Logo',
    },
    configureSentry() {
      if (process.env.SENTRY_API_KEY) {
        return {
          apiKey: process.env.SENTRY_API_KEY,
          project: 'my-app',
        };
      }

      return null;
    },
  },
  // desktop-app build configuration
  desktop: {
    root: __dirname,
    main: resolve('desktop/main.js'),
    output: resolve('dist/desktop'),
    version: pkg.version,
    homepage: 'https://my-app.com',
    name: 'my-app',
    productName: 'My App',
    description: 'My App Messenger',
    author: {
      name: 'My Company',
      email: 'support@my-app.com',
    },
    appId: 'com.my-app',
    copyright: 'Copyright © 2017 My Company',
    schema: 'mycompany',
    platforms: ['macos', 'windows', 'deb', 'rpm'],
  },
};
```

## License

[Apache-2.0](LICENSE)
