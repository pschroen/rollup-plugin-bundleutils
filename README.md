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


### timestamp

```js
import { timestamp } from 'rollup-plugin-bundleutils';

console.log(timestamp()); // 2017-09-19 4:55pm
```


### singletons

Add singleton pattern to classes after tree shaking.

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
const GrumpyCat = new ( // Singleton pattern

class GrumpyCat {
    speak() {
        return this;
    }
}

)(); // Singleton pattern

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
