var globalValue = require('global-value.nunj');
var standardFilter = require('standard-filter.nunj');

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

});
