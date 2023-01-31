import { chdir } from 'node:process';
import { rollup } from 'rollup';
import test from 'ava';

import { regex, babel, terser } from '../index.js';

chdir('test');

test('regex replace', async t => {
    const bundle = await rollup({
        input: 'fixtures/basic.js',
        plugins: [regex([[/^[\r\n]+export.*/m, '']])]
    });

    const { output } = await bundle.generate({ format: 'es' });
    const code = output[0].code;

    t.is(!code.includes('export'), true);
});

test('transpile class', async t => {
    const bundle = await rollup({
        input: 'fixtures/basic.js',
        plugins: [babel()]
    });

    const { output } = await bundle.generate({ format: 'es' });
    const code = output[0].code;

    t.is(code.includes('_createClass'), true);
});

test('minify', async t => {
    const bundle = await rollup({
        input: 'fixtures/basic.js',
        plugins: [terser()]
    });

    const { output } = await bundle.generate({ format: 'es' });
    const code = output[0].code;

    t.is(code.trim(), 'class GrumpyCat{speak(){return this}}export{GrumpyCat};');
});
