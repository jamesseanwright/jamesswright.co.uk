'use strict';

module.exports = function (data) {
	Object.defineProperty(this, 'name', {
		get: function () {
			return data.name;
		}
	});

	Object.defineProperty(this, 'url', {
		get: function () {
			return data.html_url;
		}
	});

	Object.defineProperty(this, 'language', {
		get: function () {
			return data.language;
		}
	});

	Object.defineProperty(this, 'description', {
		get: function () {
			return data.description;
		}
	});

	Object.defineProperty(this, 'isFork', {
		get: function () {
			return data.fork;
		}
	});
};