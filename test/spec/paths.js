module.exports = function (tplByRelativePath, tplByResolvedPath) {
    describe('paths', function () {
        it('should resolve paths using webpack resolve', function () {
            var result1 = tplByRelativePath.render();
            var result2 = tplByResolvedPath.render();
            tplByRelativePath.render.should.be.a.Function;
            tplByResolvedPath.render.should.be.a.Function;
            result1.should.equal(result2);
            result1.should.have.length.above(0);
        });
    });
};
