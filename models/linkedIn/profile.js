'use strict';

var Profile = require('./position');
var Education = require('./education');
var Recommendation = require('./recommendation');

module.exports = function (positions, educations, recommendations) {
	var positionModels = [];
	var educationModels = [];
	var recommendationModels = [];

	Object.defineProperty(this, 'positions', {
		get: function () {
			if (!positionModels.length) {
				positionModels = positions.map(function (position) {
					return new Position(position);
				});
			}

			return positionModels;
		}
	});

	Object.defineProperty(this, 'educations', {
		get: function () {
			if (!educationModels.length) {
				educationModels = educations.map(function (education) {
					return new Education(education);
				});
			}

			return educationModels;
		}
	});

	Object.defineProperty(this, 'recommendations', {
		get: function () {
			if (!recommendationModels.length) {
				recommendationModels = recommendations.map(function (recommendation) {
					return new Recommendation(recommendation);
				});
			}

			return recommendationModels;
		}
	});
};