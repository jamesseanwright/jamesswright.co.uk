var polyfills = require('../../utils/polyfills'),
	array = ['Bob', 'Greg'];

describe('the ECMAScript 6 and 7 polyfills', function () {
	describe('the Array.prototype.includes polyfill', function () {
		it('should add includes to Array.prototype when polyfills is initialised', function () {
			polyfills();
			Array.prototype.should.have.property('includes');
			Array.prototype.includes.should.be.a.Function;
		});

		it('should return true when an array contains the searchElement', function () {
			array.includes('Bob').should.be.true;
			array.includes('Greg').should.be.true;
		});

		it('should return false when an array contains the searchElement', function () {
			array.includes('Rob').should.be.false;
			array.includes('Fred').should.be.false;
		});

	});
});