const rollup = require('rollup');
const test = require('tape');

const { regex } = require('../');

process.chdir('test');

test('strip exports', assert => rollup.rollup({
    input: 'fixtures/basic.js',
    plugins: [regex([[/^[\r\n]+export.*/m, '']])]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    const code = generated.output[0].code;
    assert.true(!code.includes('export'));
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));
