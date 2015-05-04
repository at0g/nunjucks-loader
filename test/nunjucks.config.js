module.exports = function(env) {

    env.addGlobal('myGlobal', 'some global value');

    env.addFilter('double', function(input) {
        return input * 2;
    });

    env.addFilter('square', function(input, done) {
        var result = input * input;
        setTimeout(function() {
            done(null, result);
        }, 10);
    }, true);

};