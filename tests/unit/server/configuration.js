module.exports = (function () {
	var chai = require('chai');
	var chaiAsPromised = require('chai-as-promised');
	var sinon = require('sinon');
	var Promise = require('promise');

	global.chai = chai;
	global.sinon = sinon;
	global.Promise = Promise;

	chai.should();
	chai.use(chaiAsPromised);
}());