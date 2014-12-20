module.exports = function () {
	Array.prototype.includes = function (searchElement) {
		return this.indexOf(searchElement) > -1;
	};
};