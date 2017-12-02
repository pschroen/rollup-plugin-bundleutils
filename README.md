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


### timestamp

```js
import { timestamp } from 'rollup-plugin-bundleutils';

console.log(timestamp()); // 2017-09-19 4:55pm
```


### singletons

Add singleton pattern (reassignment) to classes after tree shaking.

```js
// rollup.config.js
import { singletons } from 'rollup-plugin-bundleutils';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'es'
    },
    plugins: [ singletons(['GrumpyCat']) ]
};
```

```js
// src/main.js
class GrumpyCat {
    speak() {
        return this;
    }
}

export { GrumpyCat };
```

The result.

```js
const GrumpyCat = new ( // Singleton reassignment

class GrumpyCat {
    speak() {
        return this;
    }
}

)(); // Singleton reassignment

export { GrumpyCat };
```


### unexport

Strip exports after tree shaking for browsers.

```js
// rollup.config.js
import { unexport } from 'rollup-plugin-bundleutils';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'es'
    },
    plugins: [ unexport() ]
};
```

```js
// src/main.js
class GrumpyCat {
    speak() {
        return this;
    }
}

export { GrumpyCat };
```

The result.

```js
class GrumpyCat {
    speak() {
        return this;
    }
}
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
    plugins: [ babel() ]
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
    plugins: [ uglify() ]
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
