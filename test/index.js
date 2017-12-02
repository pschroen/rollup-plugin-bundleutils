const rollup = require('rollup');
const test = require('tape');

const { singletons, unexport } = require('../');

process.chdir('test');

test('adds singleton pattern', assert => rollup.rollup({
    input: 'fixtures/basic.js',
    plugins: [ singletons(['GrumpyCat']) ]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    assert.true(~generated.code.indexOf('const GrumpyCat = new ( // Singleton reassignment'));
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));

test('strip exports', assert => rollup.rollup({
    input: 'fixtures/basic.js',
    plugins: [ unexport() ]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    assert.true(!~generated.code.indexOf('export'));
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));
