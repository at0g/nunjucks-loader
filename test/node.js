require('./common');
var lib = require('/tmp/nunjucks-loader.js');
require('./spec')(lib);

describe('compiled templates', function() {

    describe('global.nunj', function() {
        before(function () {
            this.tpl = lib.globalValue;
        });

        it('should render a global value', function () {
            this.tpl.render.should.be.a.Function;
            this.tpl.render().should.equal('myGlobal = some global value');
        });
    });

    describe('async-filter.nunj', function() {
        before(function() {
            this.tpl = lib.asyncFilter;
        });

        it('should render async', function(done) {
            this.tpl.render.should.be.a.Function;
            should.not.exist(this.tpl.render({ number: 4 }));
            this.tpl.render({ number: 4 }, function(err, result) {
                should.not.exist(err);
                result.should.equal('16');
                done();
            });
        });

    });

    describe('include-basic.nunj', function () {
        it ('should include the template', function () {
           var tpl = lib.includeBasic;
           tpl.render.should.be.a.Function;
           tpl.render().should.equal('Content to include');
        });
    });

    describe('include-within-block.nunj', function () {
        it ('should include a template from within a block body', function () {
            var tpl = lib.includeWithinBlock;
            var result = tpl.render();
            tpl.render.should.be.a.Function;
            result.should.contain('Content to include');
            result.should.contain('<div class="content">');
        });
    });

    describe('child.nunj', function() {
        before(function() {
            this.tpl = lib.child;
        });

        it('should render', function() {
            this.tpl.render.should.be.a.Function;
            this.tpl.render().should.be.a.String;
            this.tpl.render().should.contain('hello world');
        });

        it('should render name from data context', function() {
            this.tpl.render({ name: 'hello'}).should.contain('hello hello');
        });

    });

    describe('standard-filter.nunj', function() {
        before(function() {
            this.tpl = lib.standardFilter;
        });

        it('should render (a)sync', function(done) {
            this.tpl.render.should.be.a.Function;
            this.tpl.render({ number: 10 }).should.equal('20');
            this.tpl.render({ number: 10 }, function(err, result) {
                should.not.exist(err);
                result.should.equal('20');
                done();
            });
        });

    });

});