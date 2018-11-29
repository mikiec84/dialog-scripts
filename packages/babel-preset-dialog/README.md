# Babel Preset

Babel preset for [dialog](https://dlg.im) projects.

## Installation

```
npm install --save-dev @dlghq/babel-preset-dialog
```

## Usage

Add `@dlghq/babel-preset-dialog` to your `.babelrc`.

```json
{
  "presets": [
    [
      "@dlghq/babel-preset-dialog",
      {
        "strict": false,
        "optimize": true,
        "typecheck": true
      }
    ]
  ]
}
```

## Options

| Name          | Default | Description                                             |
| ------------- | ------- | ------------------------------------------------------- |
| `spec`        | `false` | Enable spec compliance.                                 |
| `flow`        | `false` | Convert flow-types to comments.                         |
| `loose`       | `true`  | Enable loose mode.                                      |
| `react`       | `true`  | Enable react transforms.                                |
| `es2015`      | `true`  | Enable ES2015 syntax.                                   |
| `esnext`      | `true`  | Enable ESNext syntax.                                   |
| `strict`      | `true`  | Add `"use strict";` to each file.                       |
| `runtime`     | `true`  | Enable babel runtime. Requires `babel-runtime` package. |
| `modules`     | `true`  | Enable ES2015 modules transforms.                       |
| `helpers`     | `false` | Enable babel external helpers.                          |
| `optimize`    | `false` | Enable optimization plugins.                            |
| `typecheck`   | `false` | Enable typecheck plugin.                                |
| `development` | `false` | Enable development mode plugins.                        |

## License

[Apache-2.0](LICENSE)
