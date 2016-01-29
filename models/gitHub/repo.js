'use strict';

module.exports = class Repo {
	constructor(data) {
		this.data = data;
	}
	
	get name() {
		return data.name;
	}

	get url() {
		return data.html_url;
	}

	get language() {
		return data.language;
	}

	get description() {
		return data.description;
	}

	get isFork() {
		return data.fork;
	}
};