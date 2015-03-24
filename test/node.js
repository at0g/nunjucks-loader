var chai = require('chai');
var should = chai.should();
var lib = require('/tmp/nunjucks-loader.js');

describe('compiled templates', function() {

    describe('child.nunj', function() {

        lib.child.should.exist();
        lib.child.render.should.be.a.Function;

    })

});