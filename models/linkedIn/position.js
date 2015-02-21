'use strict';

module.exports = function (data) {
	Object.defineProperty(this, 'company', {
		get: function () {
			return data.company.name;
		}
	});

	Object.defineProperty(this, 'startDate', {
		get: function () {
			return data.startDate.month + '/' + data.startDate.year;
		}
	});

	Object.defineProperty(this, 'endDate', {
		get: function () {
			return data.isCurrent
				? 'present'
				: data.endDate.month + '/' + data.endDate.year;
		}
	});

	Object.defineProperty(this, 'summary', {
		get: function () {
			return data.summary;
		}
	});

	Object.defineProperty(this, 'title', {
		get: function () {
			return data.title;
		}
	});
};