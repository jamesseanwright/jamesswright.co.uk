'use strict';

describe('the menu tests', function () {
	var menuElement;

	before(function () {
		menuElement = scratchpad.querySelector('.menu');
	});

	it('should display the menu when the button is clicked', function () {
		menuElement.querySelector('.menu__show').click();
		menuElement.querySelector('.menu__items').classList.contains('menu__items--active').should.be.true;
	});

	it('should hide the menu when the button is clicked again', function () {
		menuElement.querySelector('.menu__show').click();
		menuElement.querySelector('.menu__items').classList.contains('menu__items--active').should.be.false;
	});
});