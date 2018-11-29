/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 * @flow
 */

const defaultOptions = {
  spec: false,
  flow: false,
  loose: true,
  react: true,
  es2015: true,
  esnext: true,
  strict: true,
  helpers: false,
  runtime: true,
  modules: true,
  optimize: false,
  // typecheck: false,
  development: false,
};

module.exports = function(api, options) {
  api.assertVersion(7);

  const {
    spec,
    flow,
    loose,
    react,
    es2015,
    esnext,
    strict,
    modules,
    helpers,
    runtime,
    optimize,
    typecheck,
    development,
  } = Object.assign({}, defaultOptions, options);

  const plugins = [];

  if (strict) {
    plugins.push(require('@babel/plugin-transform-strict-mode'));
  }

  if (helpers) {
    plugins.push(require('@babel/plugin-external-helpers'));
  }

  if (runtime) {
    plugins.push([
      require.resolve('@babel/plugin-transform-runtime'),
      {
        helpers: true,
        regenerator: false,
      },
    ]);
  }

  if (esnext) {
    plugins.push(
      require('@babel/plugin-proposal-class-properties'),
      [
        require('@babel/plugin-syntax-object-rest-spread'),
        { useBuiltIns: runtime },
      ],
      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-export-namespace-from'),
    );
  }

  plugins.push(require('@babel/plugin-syntax-flow'));
  if (flow) {
    plugins.push(require('@babel/plugin-transform-flow-comments'));
  } else {
    plugins.push(require('@babel/plugin-transform-flow-strip-types'));
  }

  if (react) {
    plugins.push(
      require('@babel/plugin-syntax-jsx'),
      [require('@babel/plugin-transform-react-jsx'), { useBuiltIns: runtime }],
      require('@babel/plugin-transform-react-display-name'),
    );

    if (development) {
      plugins.push(
        // Adds component stack to warning messages
        require.resolve('@babel/plugin-transform-react-jsx-source'),
        // Adds __self attribute to JSX which React will use for some warnings
        require.resolve('@babel/plugin-transform-react-jsx-self'),
      );
    }

    if (optimize) {
      plugins.push(
        require('@babel/plugin-transform-react-constant-elements'),
        require('@babel/plugin-transform-react-inline-elements'),
      );
    }
  }

  if (es2015) {
    plugins.push(
      require('@babel/plugin-transform-regenerator'),
      [require('@babel/plugin-transform-template-literals'), { loose, spec }],
      require('@babel/plugin-transform-literals'),
      require('@babel/plugin-transform-function-name'),
      [require('@babel/plugin-transform-arrow-functions'), { spec }],
      require('@babel/plugin-transform-block-scoped-functions'),
      [require('@babel/plugin-transform-classes'), { loose }],
      require('@babel/plugin-transform-object-super'),
      require('@babel/plugin-transform-shorthand-properties'),
      require('@babel/plugin-transform-duplicate-keys'),
      [require('@babel/plugin-transform-computed-properties'), { loose }],
      [require('@babel/plugin-transform-for-of'), { loose }],
      require('@babel/plugin-transform-sticky-regex'),
      require('@babel/plugin-transform-unicode-regex'),
      [require('@babel/plugin-transform-spread'), { loose }],
      require('@babel/plugin-transform-parameters'),
      [require('@babel/plugin-transform-destructuring'), { loose }],
      require('@babel/plugin-transform-block-scoping'),
      require('@babel/plugin-transform-typeof-symbol'),
    );

    if (modules) {
      plugins.push([
        require('@babel/plugin-transform-modules-commonjs'),
        { loose },
      ]);
    }
  }

  // if (typecheck) {
  //   plugins.push(require("babel-plugin-typecheck"));
  // }

  if (optimize) {
    plugins.push(require('babel-plugin-lodash'));
  }

  return {
    plugins,
  };
};
