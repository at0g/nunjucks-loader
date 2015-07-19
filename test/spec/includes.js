module.exports = function (includeBasic, includeWithinBlock) {

    describe('includes', function () {

        it ('should include the template', function () {
            includeBasic.render.should.be.a.Function;
            includeBasic.render().should.equal('Content to include');
        });

        it ('should include a template from within a block body', function () {
            var result = includeWithinBlock.render();
            result.should.contain('Content to include');
            result.should.contain('<div class="content">');
        });

    });

};
