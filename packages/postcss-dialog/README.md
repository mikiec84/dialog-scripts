# PostCSS Dialog

## Installation

```
npm install --save-dev postcss
npm install --save-dev @dlghq/postcss-dialog
```

## Usage

```js
postcss([
  require('@dlghq/postcss-dialog')({
    // options
  })
]);
```

## Options

Name      | Plugin
--------- | ------------
`import`  | [`postcss-import`](https://github.com/postcss/postcss-import)
`debug`   | [`postcss-browser-reporter`](https://github.com/postcss/postcss-browser-reporter)
`report`  | [`postcss-reporter`](https://github.com/postcss/postcss-reporter)
`rtl`     | [`rtlcss`](https://github.com/MohammadYounes/rtlcss)
`dedupe`  | [`postcss-discard-duplicates`](https://github.com/ben-eb/postcss-discard-duplicates)
`modules` | [`postcss-modules`](https://github.com/css-modules/postcss-modules)
`env`     | [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env)
`color`   | [`postcss-color-mod-function`](https://github.com/jonathantneal/postcss-color-mod-function)
`mixins`  | [`postcss-mixins`](https://github.com/postcss/postcss-mixins)

Set value to `false` or `null` to disable plugin.

#### Default values

```
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
```

## License

[Apache-2.0](LICENSE)
