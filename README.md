# rollup-plugin-bundleutils

[![NPM Package][npm]][npm-url]
[![NPM Package][deepscan]][deepscan-url]

A set of functions commonly used after tree shaking.

## Installation

```sh
npm i -D rollup-plugin-bundleutils

# or

yarn add -D rollup-plugin-bundleutils
```

## Usage

```js
// rollup.config.js
import { timestamp, regex, babel, terser } from 'rollup-plugin-bundleutils';

export default {
    // ...
    plugins: [
        regex([
            [/^import\s.*[\r\n]+/gm, '']
        ]),
        babel({
            compact: false,
            plugins: ['@babel/plugin-proposal-class-properties']
        }),
        terser({
            output: {
                preamble: `// ${timestamp()}`
            }
        })
    ]
};
```

### timestamp

```js
import { timestamp } from 'rollup-plugin-bundleutils';

console.log(timestamp()); // 2017-09-19 4:55pm
```

### regex

[JavaScript String replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) after tree shaking. Expects an Array of `regexp|substr, newSubstr|function` pairs.

```js
// rollup.config.js
import { regex } from 'rollup-plugin-bundleutils';

export default {
    input: 'src/main.js',
    output: {
        file: 'public/bundle.js',
        format: 'es'
    },
    plugins: [
        regex([
            [/^[\r\n]+export\s.*/gm, '']
        ])
    ]
};
```

### babel

Transpile bundle after tree shaking.

```js
// rollup.config.js
import { babel } from 'rollup-plugin-bundleutils';

export default {
    input: 'src/main.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife'
    },
    plugins: [
        babel({
            // Default
            presets: [
                ['@babel/preset-env', { modules: false }]
            ]
        })
    ]
};
```

### terser [uglify|minify]

Minify bundle after tree shaking.

```js
// rollup.config.js
import { terser } from 'rollup-plugin-bundleutils';

export default {
    input: 'src/main.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife'
    },
    plugins: [
        terser()
    ]
};
```

## Changelog

* [Releases](https://github.com/pschroen/rollup-plugin-bundleutils/releases)

## License

Released under the [MIT license](LICENSE).


[npm]: https://img.shields.io/npm/v/rollup-plugin-bundleutils.svg
[npm-url]: https://www.npmjs.com/package/rollup-plugin-bundleutils
[deepscan]: https://deepscan.io/api/teams/20020/projects/23506/branches/715192/badge/grade.svg
[deepscan-url]: https://deepscan.io/dashboard#view=project&tid=20020&pid=23506&bid=715192
