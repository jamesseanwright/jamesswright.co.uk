(function () {
	'use strict';

	mocha.setup('bdd');

	window.should = chai.should;
	chai.should();

	window.importScript = function (src) {
		var script = document.createElement('script');
		script.src = src;
		document.body.appendChild(script);
	};

	window.scratchpad = document.querySelector('.scratchpad');

	function runTests(tests) {
		var run = window.mochaPhantomJS
			? window.mochaPhantomJS.run
			: mocha.run;

		tests.forEach(function (testScript, i) {
			importScript(testScript);

			if (i === tests.length - 1) {
				setTimeout(run, 100);
			}
		});
	}

	runTests([
		'menuTests.js'
	]);
}());