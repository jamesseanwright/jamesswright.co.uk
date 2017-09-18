'use strict';

module.exports = function createMenu() {
	const menu = document.body.querySelector('.menu');
	const menuItems = menu.querySelector('.menu__items');
	const menuButton = menu.querySelector('.menu__show');

	menuButton.onclick = () => menuItems.classList.toggle('menu__items--active');
}
