var tpl = require('child.nunj');

describe('template inheritance', function () {

    it('should inherit from parent template', function () {
        tpl.render.should.be.a.Function;
        tpl.render().should.have.length.above(0);
    });

    it('should render a default argument', function () {
        var result = tpl.render();
        result.should.be.a.String
        result.should.contain('hello world');
        result.should.contain('<div class="content">');
    });

    it('should render using the data context', function () {
        var context = { name: 'everyone' };
        var result = tpl.render(context);
        result.should.be.a.String
        result.should.contain('hello ' + context.name);
    });

});
