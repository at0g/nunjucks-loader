var globalValue = require('global-value.nunj');
var standardFilter = require('standard-filter.nunj');
var jinjaCompat = require('jinja-compat.nunj');

describe('nunjucks environment', function () {

    describe('add global', function () {

        it('should render a global', function () {
            globalValue.render.should.be.a.Function;
            globalValue.render().should.equal('myGlobal = some global value');
        });
    });

    describe('filters', function () {

        it('should register "double" filter', function() {
            standardFilter.render.should.be.a.Function;
        });

        it('should render sync OR async, depending on how it is called', function (done) {
            standardFilter.render({number: 2}).should.equal('4');
            standardFilter.render({number: 20}, function (err, result) {
                should.not.exist(err);
                result.should.equal('40');
                done();
            });
        });

    });

    describe('jinja compat', function () {

        it('should render a property value', function (done) {
            jinjaCompat.render({myObject: {myProp: 'foo'}}).should.equal('foo');
            jinjaCompat.render({myObject: {myProp: 'bar'}}, function (err, result) {
                should.not.exist(err);
                result.should.equal('bar');
                done();
            });
        });

        it('should render a default property value', function (done) {
            jinjaCompat.render().should.equal('notfound');
            jinjaCompat.render(null, function (err, result) {
                should.not.exist(err);
                result.should.equal('notfound');
                done();
            });
        });

    });

});
