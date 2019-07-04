# rollup-plugin-bundleutils
[![NPM Package][npm]][npm-url]
[![Build Status][build-status]][build-status-url]
[![Dependencies][dependencies]][dependencies-url]
[![Dev Dependencies][dev-dependencies]][dev-dependencies-url]

A set of functions commonly used after tree shaking.

## Installation

```bash
npm install --save-dev rollup-plugin-bundleutils
```

## Usage

```js
// rollup.config.js
import { timestamp, regex, babel, terser } from 'rollup-plugin-bundleutils';

export default {
    // ...
    plugins: [
        regex([
            [/^import.*[\r\n]+/m, '']
        ]),
        babel({
            compact: false
        }),
        terser({
            output: {
                preamble: `// ${timestamp()}\n`
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
        file: 'bundle.js',
        format: 'es'
    },
    plugins: [
        regex([
            [/^[\r\n]+export.*/m, '']
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
        file: 'bundle.js',
        format: 'es'
    },
    plugins: [
        babel()
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
        file: 'bundle.js',
        format: 'es'
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
[build-status]: https://travis-ci.org/pschroen/rollup-plugin-bundleutils.svg
[build-status-url]: https://travis-ci.org/pschroen/rollup-plugin-bundleutils
[dependencies]: https://img.shields.io/david/pschroen/rollup-plugin-bundleutils.svg
[dependencies-url]: https://david-dm.org/pschroen/rollup-plugin-bundleutils
[dev-dependencies]: https://img.shields.io/david/dev/pschroen/rollup-plugin-bundleutils.svg
[dev-dependencies-url]: https://david-dm.org/pschroen/rollup-plugin-bundleutils?type=dev
