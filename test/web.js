require('./common');

describe('path resolution', function() {

    it('should resolve paths using webpack resolve', function() {
        var tpl1 = require('./fixtures/templates/child.nunj');
        var tpl2 = require('child.nunj');

        tpl1.render.should.be.a.Function;
        tpl2.render.should.be.a.Function;
        tpl1.render().should.equal(tpl2.render());
        tpl1.render().should.have.length.above(0);
    });

});


describe('template inheritance', function() {

    beforeEach(function() {
        this.tpl = require('child.nunj');
    });

    it('should inherit from parent template', function() {
        this.tpl.render.should.be.a.Function;
        this.tpl.render().should.have.length.above(0);
    });

    it('should render a default argument', function() {
        var result = this.tpl.render();
        result.should.be.a.String
        result.should.contain('hello world');
        result.should.contain('<div class="content">');
    });

    it('should render using the data context', function() {
        var context = { name: 'everyone'};
        var result = this.tpl.render(context);
        result.should.be.a.String
        result.should.contain('hello ' + context.name);
    });

});

describe('include', function () {

    it ('should include the template', function () {
        var tpl = require('include-basic.nunj');
        tpl.render.should.be.a.Function;
        tpl.render().should.equal('Content to include');
    });

    it ('should include a template from within a block body', function () {
        var tpl = require('include-within-block.nunj');
        var result = tpl.render();
        tpl.render.should.be.a.Function;
        result.should.contain('Content to include');
        result.should.contain('<div class="content">');
    });

});


describe('environment config', function() {

    describe('add global', function () {
        before(function () {
            this.tpl = require('global-value.nunj');
        });

        it('should render a global', function () {
            this.tpl.render.should.be.a.Function;
            this.tpl.render().should.equal('myGlobal = some global value');
        });
    });

    describe('filters', function() {

        before(function() {
            this.tpl = require('standard-filter.nunj');
        });

        it('should register "double" filter', function() {
            this.tpl.render.should.be.a.Function;
        });

        it('should render (a)sync', function(done) {
            this.tpl.render({number: 2}).should.equal('4');
            this.tpl.render({number: 20}, function(err, result) {
                should.not.exist(err);
                result.should.equal('40');
                done();
            });
        });

    });

    describe('filters [async]', function() {

        before(function() {
            this.tpl = require('async-filter.nunj');
        });

        it('should add "square" async filter', function() {
            this.tpl.render.should.be.a.Function;
        });

        it('should render async only', function(done) {
            should.not.exist(this.tpl.render());
            this.tpl.render({ number: 2 }, function(err, result) {
                should.not.exist(err);
                result.should.be.a.Number;
                done();
            });
        });

    });

});