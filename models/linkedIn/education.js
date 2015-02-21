'use strict';

module.exports = function (data) {
	Object.defineProperty(this, 'title', {
		get: function () {
			return data.degree + ', ' + data.fieldOfStudy;
		}
	});

	Object.defineProperty(this, 'endYear', {
		get: function () {
			return data.endDate.year;
		}
	});

	Object.defineProperty(this, 'subject', {
		get: function () {
			return data.fieldOfStudy;
		}
	});
};