const rollup = require('rollup');
const test = require('tape');

const { singletons, unexport } = require('../index');

process.chdir(__dirname);

test('adds singleton pattern', assert => rollup.rollup({
    input: 'samples/basic/main.js',
    plugins: [ singletons(['GrumpyCat']) ]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    assert.true(generated.code.indexOf('const GrumpyCat = new ( // Singleton reassignment pattern') !== -1);
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));

test('strip exports', assert => rollup.rollup({
    input: 'samples/basic/main.js',
    plugins: [ unexport() ]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    assert.true(generated.code.indexOf('export') === -1);
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));
