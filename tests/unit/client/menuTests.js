'use strict';

const createMenu = require('../../../clientjs/menu');

const createMenuMarkup = () => `
	<nav class="menu">
		<button class="menu__show" aria-hidden="true">Menu</button>

		<ul class="menu__items">
			<li class="menu__item"><a href="/">Home</a></li>
		</ul>
	</nav>
`;

describe('the menu tests', function () {
	let menuElement;

	beforeEach(function () {
		createDom(createMenuMarkup());
		createMenu();
		menuElement = document.body.querySelector('.menu');
	});

	afterEach(function () {
		destroyDom();
	});

	it('should display the menu when the button is clicked', function () {
		menuElement.querySelector('.menu__show').click();
		menuElement.querySelector('.menu__items').classList.contains('menu__items--active').should.be.true;
	});

	it('should hide the menu when the button is clicked again', function () {
		menuElement.querySelector('.menu__show').click();
		menuElement.querySelector('.menu__show').click();
		menuElement.querySelector('.menu__items').classList.contains('menu__items--active').should.be.false;
	});
});