var chai = require('chai');
var should = chai.should();
var lib = require('/tmp/nunjucks-loader.js');

describe('compiled templates', function() {

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