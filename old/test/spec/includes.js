var includeBasic = require('include-basic.njk');
var includeWithinBlock = require('include-within-block.njk');
var includeWithinMacro = require('include-within-macro.njk');

describe('includes', function () {

    it('should include the template', function () {
        includeBasic.render.should.be.a.Function;
        includeBasic.render().should.equal('Content to include');
    });

    it('should include a template from within a block body', function () {
        var result = includeWithinBlock.render();
        result.should.contain('Content to include');
        result.should.contain('<div class="content">');
    });

    it('should include a file within a macro', function () {
        var result = includeWithinMacro.render();
        result.should.contain('Included in macro');
        result.should.include('Hello');
    })

});
