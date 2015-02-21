'use strict';

module.exports = function () {
	require('../utils/polyfills')();
	global.Promise = require('promise');
}