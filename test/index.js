const rollup = require('rollup');
const test = require('tape');

const { regex } = require('../');

process.chdir('test');

test('strip exports', assert => rollup.rollup({
    input: 'fixtures/basic.js',
    plugins: [ regex([[/^[\r\n]+export.*/m, '']]) ]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    assert.true(!~generated.code.indexOf('export'));
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));
