var nunjucks = require("exports?nunjucks!nunjucks/browser/nunjucks-slim");

var templateOne = require('hero/default.nunj');
var templateTwo = require('villain/default.nunj');

describe('nunjucks-loader', function () {
    describe('when requiring templates with the same base name', function() {
        it('should have unique entries in nunjucksPrecompiled', function() {
            nunjucks.nunjucksPrecompiled.should.include.keys([
                'fixtures/templates/hero/default.nunj',
                'fixtures/templates/villain/default.nunj'
            ]);
        });
    });
});
