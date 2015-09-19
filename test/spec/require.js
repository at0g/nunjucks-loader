var requireTpl = require('require.nunj');

describe('require filter', function () {
    it ('should include hello.txt using the module loader', function () {
        var expected = require('../fixtures/static/hello.txt');
        var result = requireTpl.render();
        result.should.equal(expected);
    });
});
