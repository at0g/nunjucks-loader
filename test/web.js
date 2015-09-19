var g = typeof window !== 'undefined' ? window : global;

g.chai = require('chai');
g.should = chai.should();

require('./spec/paths');
require('./spec/inheritance');
require('./spec/environment');
require('./spec/includes');
require('./spec/require');

