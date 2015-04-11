(function () {
	'use strict';

	var menu
	var menuItems;
	var menuButton;

	document.addEventListener('DOMContentLoaded', function domReady() {
		menu = document.querySelector('.menu');
		menuItems = menu.querySelector('.menu__items');
		menuButton = menu.querySelector('.menu__show');
		menuButton.onclick = toggleMenu;
	});

	function toggleMenu() {
		menuItems.classList.toggle('menu__items--active');
	}
}());