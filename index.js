/**
 * @author Patrick Schroen / https://github.com/pschroen
 */

'use strict';

const MagicString = require('magic-string');
const { transform } = require('babel-core');
const { minify } = require('terser');

function timestamp() {
    let now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${now.getFullYear().toString()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${hours.toString()}:${minutes.toString().padStart(2, '0')}${ampm}`;
}

// regex replace after tree shaking
function regex(replacements) {
    return {
        name: 'regex',

        renderChunk(code) {
            const magicString = new MagicString(code);
            let hasReplacements = false;

            replacements.forEach(replacement => {
                let [find, replace = ''] = replacement;
                if (typeof find === 'string') find = new RegExp(find);
                if (!find.global) find = new RegExp(find.source, 'g' + String(find).split('/').pop());

                let match, start, end;
                while ((match = find.exec(code))) {
                    hasReplacements = true;

                    start = match.index;
                    end = start + match[0].length;

                    magicString.overwrite(start, end, typeof replace === 'function' ? replace.apply(null, match) || '' : replace.replace(/\$(\d+)/, (str, index) => match[index]));
                }
            });

            if (!hasReplacements) return null;

            return {
                code: magicString.toString(),
                map: magicString.generateMap({ hires: true })
            };
        }
    };
}

// transpile after tree shaking
function babel(options = {}) {
    return {
        name: 'babel',

        renderChunk(code) {
            options.presets = [['env', { modules: false }]];
            options.sourceMaps = true;
            return transform(code, options);
        }
    };
}

// minify after tree shaking
function uglify(options = {}) {
    return {
        name: 'uglify',

        renderChunk(code) {
            options.sourceMap = true;
            return minify(code, options);
        }
    };
}

module.exports = { timestamp, regex, babel, uglify };
