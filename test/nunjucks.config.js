module.exports = function(env) {

    env.addFilter('double', function(input) {
        return input * 2;
    });

    env.addFilter('square', function(input, done) {
        var result = input * input;
        setTimeout(function() {
            done(null, result);
        }, 10);
    }, true)

}