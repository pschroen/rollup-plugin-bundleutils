# rollup-plugin-bundleutils

A set of functions commonly used after tree shaking.


## Installation

```bash
npm install --save-dev rollup-plugin-bundleutils
```


## Usage

```js
// rollup.config.js
import { timestamp, singletons, unexport, babel, uglify } from 'rollup-plugin-bundleutils';

export default {
    // ...
    plugins: [
        singletons(['GrumpyCat']),
        unexport(),
        babel(),
        uglify({
            output: {
                preamble: `// ${timestamp()}\n`
            }
        })
    ]
};
```


## Changelog

* [Releases](https://github.com/pschroen/rollup-plugin-bundleutils/releases)


## License

Released under the [MIT license](LICENSE).
