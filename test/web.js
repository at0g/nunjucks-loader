require('./common');
var lib = require('./fixtures/lib');
require('./spec')(lib);

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