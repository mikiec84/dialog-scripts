/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 */

const postcss = require('postcss');
const defaultsDeep = require('lodash.defaultsdeep');

const defaultOptions = {
  import: {
    skipDuplicates: true,
  },
  mixins: true,
  env: {
    stage: 3,
    browsers: 'Chrome >= 45, ff >= 40, ie >= 10, Safari >= 8',
    autoprefixer: true,
    features: {
      'custom-media-queries': true,
      'custom-properties': {
        preserve: false,
      },
      'all-property': {
        reset: 'all',
      },
      'nesting-rules': true,
      'color-mod-function': true,
    },
  },
  modules: false,
  dedupe: true,
  rtl: false,
  report: true,
  debug: false,
};

const plugin = postcss.plugin('postcss-dialog', (_options) => {
  const options = defaultsDeep({}, _options, defaultOptions);
  const plugins = [];

  if (options.import) {
    plugins.push(require('postcss-import')(options.import));
  }

  if (options.mixins) {
    plugins.push(require('postcss-mixins')(options.mixins));
  }

  if (options.env) {
    plugins.push(require('postcss-preset-env')(options.env));
  }

  if (options.dedupe) {
    plugins.push(require('postcss-discard-duplicates')(options.dedupe));
  }

  if (options.modules) {
    plugins.push(require('postcss-modules')(options.modules));
  }

  if (options.rtl) {
    plugins.push(require('rtlcss')(options.rtl));
  }

  if (options.report) {
    plugins.push(require('postcss-reporter')(options.report));
  }

  if (options.debug) {
    plugins.push(require('postcss-browser-reporter')(options.debug));
  }

  return postcss(plugins);
});

module.exports = plugin;
