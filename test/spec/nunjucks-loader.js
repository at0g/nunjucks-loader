var nunjucks = require("nunjucks/browser/nunjucks-slim");

var templateOne = require('hero/include.njk');
var templateTwo = require('villain/include.njk');

describe('nunjucks-loader', function () {
    describe('when requiring templates with the same base name', function() {
        it('should have unique entries in nunjucksPrecompiled', function() {
            nunjucks.nunjucksPrecompiled.should.include.keys([
                'fixtures/templates/hero/include.njk',
                'fixtures/templates/villain/include.njk'
            ]);
        });

        it('should have unique entries in `webpackDependencies`', function() {
            nunjucks.webpackDependencies.should.include.keys([
                'fixtures/templates/hero/default.njk',
                'fixtures/templates/villain/default.njk'
            ]);
        });
    });
});
