import { chdir } from 'node:process';
import { rollup } from 'rollup';
import test from 'ava';

import { regex } from '../index.js';

chdir('test');

test('strip exports', async t => {
    const bundle = await rollup({
        input: 'fixtures/basic.js',
        plugins: [regex([[/^[\r\n]+export.*/m, '']])]
    });

    const { output } = await bundle.generate({ format: 'es' });
    const code = output[0].code;

    t.is(!code.includes('export'), true);
});
