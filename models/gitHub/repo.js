'use strict';

module.exports = class Repo {
	constructor(data) {
		this._data = data;
	}
	
	get name() {
		return this._data.name;
	}

	get url() {
		return this._data.html_url;
	}

	get language() {
		return this._data.language;
	}

	get description() {
		return this._data.description;
	}

	get isFork() {
		return this._data.fork;
	}
};