var chai = require('chai'),
	chaiAsPromised = require('chai-as-promised'),
	sinon = require('sinon'),
	Promise = require('promise');

global.chai = chai;
global.sinon = sinon;
global.Promise = Promise;

//hack because sinon-as-promised won't permit waiting
//for wrapped promises in a fluent manner
sinon.stub.promisify = function (data, err) {
	this.returns(new Promise(function (resolve, reject) {
		if (data && !err) {
			resolve(data);
		}

		reject(err || new Error('data and err parameters are undefined!'));
	}));

	return this;
};

before(function () {
	chai.should();
	chai.use(chaiAsPromised);
});