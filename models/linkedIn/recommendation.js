'use strict';

module.exports = function (data) {
	Object.defineProperty(this, 'text', {
		get: function () {
			return data.recommendationText;
		}
	});

	Object.defineProperty(this, 'author', {
		get: function () {
			return data.recommender.firstName + ' ' + data.recommender.lastName;
		}
	});
};