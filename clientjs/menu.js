(function () {
	'use strict';

	var menu;
	var menuButton;

	window.onload = function pageLoaded() {
		menu = document.querySelector('.menu');
		menuButton = menu.querySelector('.menu__show');
		menuButton.onclick = toggleMenu;
	};

	function toggleMenu() {
		menu.classList.toggle('menu--active');
	}
}());