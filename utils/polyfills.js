module.exports = function () {
	Array.prototype.includes = function includes(searchElement) {
		return this.indexOf(searchElement) > -1;
	};
};