(function () {
	'use strict';

	mocha.setup('bdd');

	window.should = chai.should;
	chai.should();

	runTests([
		'firstTest.js'
	]);

	function runTests(tests) {
		var script;
		var run = window.mochaPhantomJS
			? window.mochaPhantomJS.run
			: mocha.run;

		tests.forEach(function (testScript, i) {
			script = document.createElement('script');
			script.src = testScript;
			document.body.appendChild(script);

			if (i === tests.length - 1) {
				setTimeout(run, 100);
			}
		});
	}
}());