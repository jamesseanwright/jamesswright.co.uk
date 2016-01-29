(function () {
	const chai = require('chai');
	const chaiAsPromised = require('chai-as-promised');
	const sinon = require('sinon');

	global.chai = chai;
	global.sinon = sinon;

	chai.should();
	chai.use(chaiAsPromised);
}());