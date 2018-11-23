# rollup-plugin-bundleutils
[![Build Status](https://travis-ci.org/pschroen/rollup-plugin-bundleutils.svg)]()
[![Latest NPM release](https://img.shields.io/npm/v/rollup-plugin-bundleutils.svg)]()
[![License](https://img.shields.io/npm/l/rollup-plugin-bundleutils.svg)]()
[![Dependencies](https://img.shields.io/david/pschroen/rollup-plugin-bundleutils.svg)]()
[![Dev Dependencies](https://img.shields.io/david/dev/pschroen/rollup-plugin-bundleutils.svg)]()

A set of functions commonly used after tree shaking.


## Installation

```bash
npm install --save-dev rollup-plugin-bundleutils
```


## Usage

```js
// rollup.config.js
import { timestamp, regex, babel, uglify } from 'rollup-plugin-bundleutils';

export default {
    // ...
    plugins: [
        regex([
            [/^import.*\n{2,}/, '']
        ]),
        babel({
            compact: false
        }),
        uglify({
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
            [/\n{2,}export.*$/, '']
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


### uglify

Minify bundle after tree shaking.

```js
// rollup.config.js
import { uglify } from 'rollup-plugin-bundleutils';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'es'
    },
    plugins: [
        uglify()
    ]
};
```


### pad

```js
import { pad } from 'rollup-plugin-bundleutils';

console.log(pad(1)); // 01
```


## Changelog

* [Releases](https://github.com/pschroen/rollup-plugin-bundleutils/releases)


## License

Released under the [MIT license](LICENSE).
