/**
 * @author Patrick Schroen / https://github.com/pschroen
 */

/* eslint-disable no-cond-assign */

'use strict';

const MagicString = require('magic-string');
const { transform } = require('babel-core');
const { minify } = require('uglify-es');

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function timestamp() {
    let now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${hours}:${pad(minutes)}${ampm}`;
}

// Add singletons after tree shaking
function singletons(values = []) {
    return {
        name: 'singletons',

        transformBundle(code) {
            const magicString = new MagicString(code);
            let pattern = new RegExp(`class (${values.join('|')})(\\s[\\s\\S]*?\\n})`, 'g'),
                hasReplacements = false,
                match,
                start,
                end,
                replacement;

            while (match = pattern.exec(code)) {
                hasReplacements = true;

                start = match.index;
                end = start + match[0].length;
                replacement = String(`const ${match[1]} = new ( // Singleton pattern (IICE)\n\nclass ${match[1]}${match[2]}\n\n)(); // Singleton pattern (IICE)`);

                magicString.overwrite(start, end, replacement);
            }

            if (!hasReplacements) return null;

            return {
                code: magicString.toString(),
                map: magicString.generateMap({ hires: true })
            };
        }
    };
}

// Strip exports after tree shaking
function unexport() {
    return {
        name: 'unexport',

        transformBundle(code) {
            const magicString = new MagicString(code);
            let pattern = new RegExp('\\n{2,}export.*$', 'g'),
                hasReplacements = false,
                match,
                start,
                end,
                replacement;

            while (match = pattern.exec(code)) {
                hasReplacements = true;

                start = match.index;
                end = start + match[0].length;
                replacement = String('');

                magicString.overwrite(start, end, replacement);
            }

            if (!hasReplacements) return null;

            return {
                code: magicString.toString(),
                map: magicString.generateMap({ hires: true })
            };
        }
    };
}

// Transpile after tree shaking
function babel() {
    return {
        name: 'babel',

        transformBundle(code) {
            return transform(code, {
                presets: [['env', { modules: false }]],
                sourceMaps: true
            });
        }
    };
}

// Minify after tree shaking
function uglify(options = {}) {
    return {
        name: 'uglify',

        transformBundle(code) {
            options.sourceMap = true;
            return minify(code, options);
        }
    };
}

module.exports = { pad, timestamp, singletons, unexport, babel, uglify };
